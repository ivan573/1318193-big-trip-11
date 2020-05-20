import {render, replace} from '../utils/render.js';

import TripEventComponent from '../components/trip-event.js';
import EventFormComponent from '../components/event-form.js';

const Mode = {
  DEFAULT: `default`,
  EDIT: `edit`,
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

  render(event) {
    const oldTripEventComponent = this._tripEventComponent;
    const oldEventFormComponent = this._eventFormComponent;

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

    this._eventFormComponent.setSubmitHandler((evt) => {
      evt.preventDefault();
      this._replaceEditToEvent();
    });

    if (oldTripEventComponent && oldEventFormComponent) {
      replace(this._tripEventComponent, oldTripEventComponent);
      replace(this._eventFormComponent, oldEventFormComponent);
    } else {
      render(this._container, this._tripEventComponent, `beforeend`);
    }
  }

  setDefaultView() {
    if (this._mode !== Mode.DEFAULT) {
      this._replaceEditToEvent();
    }
  }

  _replaceEditToEvent() {
    document.removeEventListener(`keydown`, this._onEscKeyDown);
    this._eventFormComponent.rerender();
    replace(this._tripEventComponent, this._eventFormComponent);
    this._mode = Mode.DEFAULT;
  }

  _replaceEventToEdit() {
    this._onViewChange();
    replace(this._eventFormComponent, this._tripEventComponent);
    this._mode = Mode.EDIT;
  }

  _onEscKeyDown(evt) {
    const isEscKey = evt.key === `Escape` || evt.key === `Esc`;

    if (isEscKey) {
      this._replaceEditToEvent();
      document.removeEventListener(`keydown`, this._onEscKeyDown);
    }
  }
}

export {TripEventController as default};
