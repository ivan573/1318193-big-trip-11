import {render, replace} from '../utils/render.js';
import TripEventComponent from '../components/trip-event.js';
import EventFormComponent from '../components/event-form.js';
import NoEventsComponent from '../components/no-events.js';
import SortingComponent from '../components/sorting.js';
import TripEventsListComponent from '../components/trip-events-list.js';

const renderEvent = (dayElement, event) => {

  const replaceEventToEdit = () => {
    replace(eventFormComponent, tripEventComponent);
  };

  const replaceEditToEvent = () => {
    replace(tripEventComponent, eventFormComponent);
  };

  const onEscKeyDown = (evt) => {
    const isEscKey = evt.key === `Escape` || evt.key === `Esc`;

    if (isEscKey) {
      replaceEditToEvent();
      document.removeEventListener(`keydown`, onEscKeyDown);
    }
  };

  const tripEventComponent = new TripEventComponent(event);
  tripEventComponent.setEditButtonClickHandler(() => {
    replaceEventToEdit();
    document.addEventListener(`keydown`, onEscKeyDown);
  });

  const eventFormComponent = new EventFormComponent(event);
  eventFormComponent.setSubmitHandler((evt) => {
    evt.preventDefault();
    replaceEditToEvent();
    document.removeEventListener(`keydown`, onEscKeyDown);
  });

  render(dayElement, tripEventComponent, `beforeend`);
};

class TripController {
  constructor(container) {
    this._container = container;

    this._noEventsComponent = new NoEventsComponent();
    this._sortingComponent = new SortingComponent();
    this._tripEventsListComponent = new TripEventsListComponent();
  }

  render(structuredEvents) {
    if (Object.keys(structuredEvents).length === 0) {
      render(this._container, this._noEventsComponent, `beforeend`);
      return;
    }

    render(this._container.querySelector(`h2`), this._sortingComponent, `afterend`);

    render(this._container, this._tripEventsListComponent, `beforeend`);

    const tripDayElements = document.querySelectorAll(`.trip-days__item`);

    tripDayElements.forEach((element) => {
      const dayNumber = element.querySelector(`.day__counter`).textContent;
      const eventsList = element.querySelector(`.trip-events__list`);

      structuredEvents[dayNumber].forEach((event) => {
        renderEvent(eventsList, event);
      });
    });

  }
}

export {TripController as default};
