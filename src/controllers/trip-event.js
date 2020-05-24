import {render, replace, remove} from '../utils/render.js';

import TripEventComponent from '../components/trip-event.js';
import EventFormComponent from '../components/event-form.js';

const Mode = {
  ADDING: `adding`,
  DEFAULT: `default`,
  EDIT: `edit`
};

const EmptyEvent = {
  type: `Flight`,
  destination: ``,
  startDate: new Date(),
  endDate: new Date(),
  cost: 0,
  isFavorite: false,
  extraOffers: [
    {
      title: `Order Uber`,
      shortTitle: `uber`,
      price: 20
    }
  ],
  info: {
    description: `Temporary description`,
    photos: [`http://picsum.photos/248/152?r=${Math.random()}`]
  }
};

class TripEventController {
  constructor(container, onDataChange, onViewChange) {
    this._container = container;
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

    this._tripEventComponent = new TripEventComponent(event);
    this._eventFormComponent = new EventFormComponent(event);

    this._tripEventComponent.setEditButtonClickHandler(() => {
      this._replaceEventToEdit();
      document.addEventListener(`keydown`, this._onEscKeyDown);
    });

    this._eventFormComponent.setAddToFavoriteHandler(() => {
      this._onDataChange(this, event, Object.assign({}, event, {
        isFavorite: !event.isFavorite
      }));
    });

    this._eventFormComponent.setChangeTypeHandlers((evt) => {
      this._onDataChange(this, event, Object.assign({}, event, {
        type: evt.target.textContent
      }));
    });

    this._eventFormComponent.setChangePriceHandler((evt) => {
      this._onDataChange(this, event, Object.assign({}, event, {
        cost: evt.target.value
      }));
    });

    // this._eventFormComponent.setChangeStartDateHandler((evt) => { // test
    //   this._onDataChange(this, event, Object.assign({}, event, {
    //     startDate: evt.target.value
    //   }));
    // });

    this._eventFormComponent.setSubmitHandler((evt) => {
      evt.preventDefault();
      const data = this._eventFormComponent.getData();
      this._onDataChange(this, event, data, Mode.DEFAULT);
    });
    this._eventFormComponent.setDeleteButtonClickHandler(() => this._onDataChange(this, event, null));

    switch (mode) {
      case Mode.EDIT:
        if (oldEventFormComponent && oldTripEventComponent) {
          replace(this._tripEventComponent, oldTripEventComponent);
          replace(this._eventFormComponent, oldEventFormComponent);
        } else {
          render(this._container, this._eventFormComponent, `beforeend`);
        }
        break;
      case Mode.DEFAULT:
        if (oldEventFormComponent && oldTripEventComponent) {
          replace(this._tripEventComponent, oldTripEventComponent);
          replace(this._eventFormComponent, oldEventFormComponent);
          this._replaceEditToEvent();
        } else {
          render(this._container, this._tripEventComponent, `beforeend`);
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
