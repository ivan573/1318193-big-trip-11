import TripEventModel from "../models/trip-event.js";
import TripEventComponent from '../components/trip-event.js';
import EventFormComponent from '../components/event-form.js';
import {RenderPosition, render, replace, remove} from '../utils/render.js';
import {getId} from "../utils/common.js";

const SHAKE_ANIMATION_TIMEOUT = 600;

const EVENT_FORM_ELEMENTS = [`input`, `select`, `button`];

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

const Keys = {
  type: `event-type`,
  destination: `event-destination`,
  startDate: `event-start-time`,
  endDate: `event-end-time`
};

const ButtonText = {
  defaultText: {
    delete: `Delete`,
    save: `Save`
  },
  processText: {
    delete: `Deleting...`,
    save: `Saving...`
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

const parseFormData = (formData, info, offers) => {
  if (!info || !offers) {
    return null;
  }

  return new TripEventModel({
    "base_price": formData.get(`event-price`),
    "date_from": formData.get(`event-start-time`),
    "date_to": formData.get(`event-end-time`),
    "destination": {
      "description": info.description,
      "name": formData.get(`event-destination`),
      "pictures": info.photos
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

    this._escKeyDownHandler = this._escKeyDownHandler.bind(this);
    this._onFormClosure = this._onFormClosure.bind(this);
  }

  render(event, mode) {
    const oldTripEventComponent = this._tripEventComponent;
    const oldEventFormComponent = this._eventFormComponent;
    this._mode = mode;

    const info = (event === EmptyEvent) ? null : this._destinationsModel.getDestinationForName(event.destination);
    const offers = (event === EmptyEvent) ? null : this._offersModel.getOfferForType(event.type);
    const destinationsList = this._destinationsModel.getDestinationsList();

    this._tripEventComponent = new TripEventComponent(event);
    this._eventFormComponent = new EventFormComponent(event, info, offers, destinationsList);

    this._tripEventComponent.setEditButtonClickHandler(() => {
      this._replaceEventToEdit();
      document.addEventListener(`keydown`, this._escKeyDownHandler);
    });

    this._eventFormComponent.setChangeTypeHandlers((evt) => {
      const type = evt.target.textContent;
      const offersForType = this._offersModel.getOfferForType(type);
      this._eventFormComponent.onTypeChange(type, offersForType);
    });

    this._eventFormComponent.setChangeDestinationHandler((evt) => {
      const optionElements = evt.target.querySelectorAll(`option`);
      const selectedIndex = evt.target.options.selectedIndex;
      const name = optionElements[selectedIndex].value;
      const newInfo = this._destinationsModel.getDestinationForName(name);
      this._eventFormComponent.onDestinationChange(newInfo);
    });

    this._eventFormComponent.setChangeStartDateHandler(() => {
      const startDateElement = this._eventFormComponent.getElement().querySelector(`input[name=event-start-time]`);
      const endDateElement = this._eventFormComponent.getElement().querySelector(`input[name=event-end-time]`);

      const endDateMinimumValue = startDateElement.value;
      const endDateCurrentValue = endDateElement.value;

      this._eventFormComponent.onStartDateChange(endDateMinimumValue, endDateCurrentValue, endDateElement);
    });

    this._eventFormComponent.setRollUpButtonHandler(() => {
      this._onFormClosure();
    });

    this._eventFormComponent.setSubmitHandler((evt) => {
      evt.preventDefault();

      this._eventFormComponent.setSaveButtonText(ButtonText.processText.save);

      const formData = this._eventFormComponent.getData();

      this._disableForm();

      if (!formData.has(Keys.type) || !formData.has(Keys.destination) || formData.get(Keys.startDate) > formData.get(Keys.endDate)) {
        this.shake();
        return;
      }

      const data = parseFormData(formData, this._eventFormComponent.getInfo(), this._eventFormComponent.getOffers());

      this._onDataChange(this, event, data, Mode.DEFAULT);
    });

    this._eventFormComponent.setDeleteButtonClickHandler(() => {
      this._disableForm();
      this._eventFormComponent.setDeleteButtonText(ButtonText.processText.delete);
      this._onDataChange(this, event, null);
    });

    switch (mode) {
      case Mode.DEFAULT:
        if (oldEventFormComponent && oldTripEventComponent) {
          replace(this._tripEventComponent, oldTripEventComponent);
          replace(this._eventFormComponent, oldEventFormComponent);
          this._replaceEditToEvent();
        } else {
          render(this._container, this._tripEventComponent, RenderPosition.BEFOREEND);
        }
        break;
      case Mode.EDIT:
        if (oldEventFormComponent && oldTripEventComponent) {
          replace(this._tripEventComponent, oldTripEventComponent);
          replace(this._eventFormComponent, oldEventFormComponent);
        } else {
          render(this._container, this._eventFormComponent, RenderPosition.BEFOREEND);
        }
        break;
      case Mode.ADDING:
        if (oldEventFormComponent && oldTripEventComponent) {
          remove(oldTripEventComponent);
          remove(oldEventFormComponent);
        }
        document.addEventListener(`keydown`, this._escKeyDownHandler);
        render(this._container, this._eventFormComponent);
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
    document.removeEventListener(`keydown`, this._escKeyDownHandler);
  }

  shake() {
    this._eventFormComponent.getElement().style.animation = `shake ${SHAKE_ANIMATION_TIMEOUT / 1000}s`;
    this._tripEventComponent.getElement().style.animation = `shake ${SHAKE_ANIMATION_TIMEOUT / 1000}s`;

    setTimeout(() => {
      this._eventFormComponent.getElement().style.animation = ``;
      this._tripEventComponent.getElement().style.animation = ``;

      this._eventFormComponent.setSaveButtonText(ButtonText.defaultText.save);
      this._eventFormComponent.setDeleteButtonText(ButtonText.defaultText.delete);

      this._enableForm();
    }, SHAKE_ANIMATION_TIMEOUT);
  }

  getMode() {
    return this._mode;
  }

  applyFlatpickr() {
    this._eventFormComponent.applyFlatpickr();
  }

  disableFlatpickr() {
    this._eventFormComponent.disableFlatpickr();
  }


  _replaceEventToEdit() {
    this._onViewChange();
    this._eventFormComponent.applyFlatpickr();

    replace(this._eventFormComponent, this._tripEventComponent);
    this._mode = Mode.EDIT;
  }

  _replaceEditToEvent() {
    document.removeEventListener(`keydown`, this._escKeyDownHandler);
    this._eventFormComponent.disableFlatpickr();
    if (document.contains(this._eventFormComponent.getElement())) {
      replace(this._tripEventComponent, this._eventFormComponent);
    }
    this._mode = Mode.DEFAULT;
  }

  _onFormClosure() {
    if (this._mode === Mode.ADDING) {
      this._onDataChange(this, EmptyEvent, null);
    }
    this._replaceEditToEvent();
  }

  _escKeyDownHandler(evt) {
    const isEscKey = evt.key === `Escape` || evt.key === `Esc`;

    if (isEscKey) {
      this._onFormClosure();
    }
  }

  _disableForm() {
    EVENT_FORM_ELEMENTS.forEach((it) => {
      this._eventFormComponent.getElement().querySelectorAll(`${it}`).forEach((element) => {
        element.setAttribute(`disabled`, `disabled`);
      });
    });
  }

  _enableForm() {
    EVENT_FORM_ELEMENTS.forEach((it) => {
      this._eventFormComponent.getElement().querySelectorAll(`${it}`).forEach((element) => {
        element.removeAttribute(`disabled`);
      });
    });
  }
}

export {Mode, EmptyEvent, TripEventController as default};
