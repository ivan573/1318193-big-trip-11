import {getId} from "../utils/common.js";
import {render, replace, remove} from '../utils/render.js';

import TripEventComponent from '../components/trip-event.js';
import EventFormComponent from '../components/event-form.js';

import TripEventModel from "../models/trip-event.js";

const SHAKE_ANIMATION_TIMEOUT = 600;

const Mode = {
  DEFAULT: `default`,
  EDIT: `edit`,
  ADDING: `adding`
};

const EmptyEvent = {
  type: null,
  destination: null,
  startDate: new Date(),
  endDate: new Date(),
  cost: 0,
  isFavorite: false,
  extraOffers: null,
  info: {
    description: null,
    photos: null
  }
};

const getChosenOffers = (formData, offers) => {
  const chosenOffers = [];

  if (offers) {
    offers.offers.forEach((it) => {
      if (formData.get(`${getId(it.title)}`) === `on`) {
        chosenOffers.push(it);
      }
    });
  }

  return chosenOffers;
};

const parseFormData = (formData, offers) => {
  return new TripEventModel({
    "base_price": formData.get(`event-price`),
    "date_from": formData.get(`event-start-time`),
    "date_to": formData.get(`event-end-time`),
    "destination": {
      "name": formData.get(`event-destination`)
    },
    "is_favorite": (formData.get(`event-favorite`) === `on`),
    "offers": getChosenOffers(formData, offers),
    "type": formData.get(`event-type`)
  });
};

class TripEventController {
  constructor(container, destinationsModel, offersModel, onDataChange, onViewChange) {
    this._container = container;
    this._destinationsModel = destinationsModel;
    this._offersModel = offersModel;
    this._onDataChange = onDataChange;
    this._onViewChange = onViewChange;
    this._mode = Mode.DEFAULT;

    this._tripEventComponent = null;
    this._eventFormComponent = null;

    this._onEscKeyDown = this._onEscKeyDown.bind(this);
  }

  render(event, mode) {
    const oldTripEventComponent = this._tripEventComponent;
    const oldEventFormComponent = this._eventFormComponent;
    this._mode = mode;

    const info = this._destinationsModel.getDestinationForName(event.destination);
    const offers = (event === EmptyEvent) ? null : this._offersModel.getOfferForType(event.type);
    const destinationsList = this._destinationsModel.getDestinationsList();


    this._tripEventComponent = new TripEventComponent(event);
    this._eventFormComponent = new EventFormComponent(event, info, offers, destinationsList);

    this._tripEventComponent.setEditButtonClickHandler(() => {
      this._replaceEventToEdit();
      document.addEventListener(`keydown`, this._onEscKeyDown);
    });

    this._eventFormComponent.setChangeTypeHandlers((evt) => {
      const type = evt.target.textContent;
      const offersForType = this._offersModel.getOfferForType(type);
      this._eventFormComponent.onTypeChange(type, offersForType);
    });

    this._eventFormComponent.setChangeDestinationHandler((evt) => {
      const options = evt.target.querySelectorAll(`option`);
      const selectedIndex = evt.target.options.selectedIndex;
      const name = options[selectedIndex].value;
      const newInfo = this._destinationsModel.getDestinationForName(name);
      this._eventFormComponent.onDestinationChange(newInfo);
    });

    this._eventFormComponent.setSubmitHandler((evt) => {
      evt.preventDefault();

      const formData = this._eventFormComponent.getData();
      const data = parseFormData(formData, this._eventFormComponent._offers); // исправить

      if (Object.values(data).some((value) => value === null) || data.startDate > data.endDate) {
        return;
      }
      this._onDataChange(this, event, data, Mode.DEFAULT);
    });

    this._eventFormComponent.setDeleteButtonClickHandler(() => this._onDataChange(this, event, null));

    switch (mode) {
      case Mode.DEFAULT:
        if (oldEventFormComponent && oldTripEventComponent) {
          replace(this._tripEventComponent, oldTripEventComponent);
          replace(this._eventFormComponent, oldEventFormComponent);
          this._replaceEditToEvent();
        } else {
          render(this._container, this._tripEventComponent, `beforeend`);
        }
        break;
      case Mode.EDIT:
        if (oldEventFormComponent && oldTripEventComponent) {
          replace(this._tripEventComponent, oldTripEventComponent);
          replace(this._eventFormComponent, oldEventFormComponent);
        } else {
          render(this._container, this._eventFormComponent, `beforeend`);
        }
        break;
      case Mode.ADDING:
        if (oldEventFormComponent && oldTripEventComponent) {
          remove(oldTripEventComponent);
          remove(oldEventFormComponent);
        }
        document.addEventListener(`keydown`, this._onEscKeyDown);
        render(this._container, this._eventFormComponent, `afterbegin`);
        break;
    }
  }

  setDefaultView() {
    if (this._mode !== Mode.DEFAULT) {
      this._replaceEditToEvent();
    }
  }

  destroy() {
    remove(this._eventFormComponent);
    remove(this._tripEventComponent);
    document.removeEventListener(`keydown`, this._onEscKeyDown);
  }

  shake() {
    this._eventFormComponent.getElement().style.animation = `shake ${SHAKE_ANIMATION_TIMEOUT / 1000}s`;
    this._tripEventComponent.getElement().style.animation = `shake ${SHAKE_ANIMATION_TIMEOUT / 1000}s`;

    setTimeout(() => {
      this._eventFormComponent.getElement().style.animation = ``;
      this._tripEventComponent.getElement().style.animation = ``;
    }, SHAKE_ANIMATION_TIMEOUT);
  }


  _replaceEventToEdit() {
    this._onViewChange();
    replace(this._eventFormComponent, this._tripEventComponent);
    this._mode = Mode.EDIT;
  }

  _replaceEditToEvent() {
    document.removeEventListener(`keydown`, this._onEscKeyDown);
    this._eventFormComponent.rerender();
    if (document.contains(this._eventFormComponent.getElement())) {
      replace(this._tripEventComponent, this._eventFormComponent);
    }
    this._mode = Mode.DEFAULT;
  }

  _onEscKeyDown(evt) {
    const isEscKey = evt.key === `Escape` || evt.key === `Esc`;

    if (isEscKey) {
      if (this._mode === Mode.ADDING) {
        this._onDataChange(this, EmptyEvent, null);
      }
      this._replaceEditToEvent();
      document.removeEventListener(`keydown`, this._onEscKeyDown);
    }
  }
}

export {Mode, EmptyEvent, TripEventController as default};
