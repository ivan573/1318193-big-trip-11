import {generateEvents} from '../mock/trip-events.js';
import {render, replace, remove} from '../utils/render.js';
import {getEventsPerDay} from '../utils/common.js';

import TripEventComponent from '../components/trip-event.js';
import EventFormComponent from '../components/event-form.js';
import NoEventsComponent from '../components/no-events.js';
import SortingComponent, {SortType} from '../components/sorting.js';
import TripEventsListComponent, {SORTED_ARRRAY_KEY} from '../components/trip-events-list.js';

const sortedEventsKey = SORTED_ARRRAY_KEY;

const EVENTS_COUNT = 15;

const tripEvents = generateEvents(EVENTS_COUNT);
const eventsPerDay = getEventsPerDay(tripEvents);


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

const getSortedEvents = (events, sortType) => {
  let sortedEvents = {
    sorted: []
  };
  const eventsToSort = events.slice();

  const getDuration = (firstDate, secondDate) => {
    return secondDate.getTime() - firstDate.getTime();
  };

  switch (sortType) {
    case SortType.EVENT:
      sortedEvents = eventsPerDay;
      break;
    case SortType.TIME:
      sortedEvents.sorted = eventsToSort
      .sort((a, b) => getDuration(b.startDate, b.endDate) - getDuration(a.startDate, a.endDate));
      break;
    case SortType.PRICE:
      sortedEvents.sorted = eventsToSort.sort((a, b) => b.cost - a.cost);
      break;
  }

  return sortedEvents;
};

class TripController {
  constructor(container) {
    this._container = container;
    this._structuredEvents = eventsPerDay;

    this._noEventsComponent = new NoEventsComponent();
    this._sortingComponent = new SortingComponent();
    this._tripEventsListComponent = new TripEventsListComponent(this._structuredEvents);
  }

  render(structuredEvents = this._structuredEvents) {

    if (Object.keys(structuredEvents).length === 0) {
      render(this._container, this._noEventsComponent, `beforeend`);
      return;
    }

    render(this._container.querySelector(`h2`), this._sortingComponent, `afterend`);

    render(this._container, this._tripEventsListComponent, `beforeend`);

    const tripDayElements = document.querySelectorAll(`.trip-days__item`);

    tripDayElements.forEach((element) => {
      const eventsList = element.querySelector(`.trip-events__list`);

      if (structuredEvents.hasOwnProperty(sortedEventsKey)) {
        structuredEvents[sortedEventsKey].forEach((event) => {
          renderEvent(eventsList, event);
        });
      } else {
        const dayNumber = element.querySelector(`.day__counter`).textContent;

        structuredEvents[dayNumber].forEach((event) => {
          renderEvent(eventsList, event);
        });
      }
    });

    this._sortingComponent.setSortTypeChangeHandler(() => {
      remove(this._tripEventsListComponent);
      this._structuredEvents = getSortedEvents(tripEvents, this._sortingComponent.getSortType());
      this._tripEventsListComponent.setEvents(this._structuredEvents);
      this.render(this._structuredEvents);
    });
  }
}

export {TripController as default};
