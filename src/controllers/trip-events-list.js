import {generateEvents} from '../mock/trip-events.js';
import {render, remove} from '../utils/render.js';
import {getEventsPerDay} from '../utils/common.js';

import NoEventsComponent from '../components/no-events.js';
import SortingComponent, {SortType} from '../components/sorting.js';
import TripEventsListComponent, {SORTED_ARRRAY_KEY} from '../components/trip-events-list.js';

import TripEventController from './trip-event.js';

const sortedEventsKey = SORTED_ARRRAY_KEY;

const EVENTS_COUNT = 15;

const tripEvents = generateEvents(EVENTS_COUNT);

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
      sortedEvents = getEventsPerDay(events);
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

    this._events = [];
    this._structuredEvents = {};

    this._eventControllers = [];

    this._noEventsComponent = new NoEventsComponent();
    this._sortingComponent = new SortingComponent();
    this._tripEventsListComponent = null;

    this._onDataChange = this._onDataChange.bind(this);
    this._onSortTypeChange = this._onSortTypeChange.bind(this);
    this._onViewChange = this._onViewChange.bind(this);

    this._sortingComponent.setSortTypeChangeHandler(this._onSortTypeChange);
  }

  _renderEvents(events, onDataChange, onViewChange) {

    const renderEvent = (event, container) => {
      const tripEventController = new TripEventController(container, onDataChange, onViewChange);
      tripEventController.render(event);

      return tripEventController;
    };

    const eventControllers = [];

    this._tripEventsListComponent = new TripEventsListComponent(this._structuredEvents);

    render(this._container, this._tripEventsListComponent, `beforeend`);

    const tripDayElements = document.querySelectorAll(`.trip-days__item`);

    tripDayElements.forEach((element) => {
      const eventsList = element.querySelector(`.trip-events__list`);

      if (events.hasOwnProperty(sortedEventsKey)) {
        events[sortedEventsKey].forEach((event) => {
          eventControllers.push(renderEvent(event, eventsList));
        });
      } else {
        const dayNumber = element.querySelector(`.day__counter`).textContent;

        events[dayNumber].forEach((event) => {
          eventControllers.push(renderEvent(event, eventsList));
        });
      }
    });

    return eventControllers;
  }

  _updateEvents(events) {
    this._events = events;
    this._structuredEvents = getEventsPerDay(this._events);
  }

  render(events = tripEvents) {
    this._updateEvents(events);

    const isEventsAbsent = Object.keys(this._structuredEvents).length === 0;

    if (isEventsAbsent) {
      render(this._container, this._noEventsComponent, `beforeend`);
      return;
    }

    render(this._container.querySelector(`h2`), this._sortingComponent, `afterend`);

    this._eventControllers = this._renderEvents(this._structuredEvents, this._onDataChange, this._onViewChange);
  }

  _onViewChange() {
    this._eventControllers.forEach((it) => {
      it.setDefaultView();
    });
  }

  _onSortTypeChange() {
    remove(this._tripEventsListComponent);
    this._structuredEvents = getSortedEvents(this._events, this._sortingComponent.getSortType());
    this._eventControllers = this._renderEvents(this._structuredEvents, this._onDataChange, this._onViewChange);
  }

  _onDataChange(eventController, oldData, newData) {
    const index = this._events.findIndex((it) => it === oldData);

    if (index === -1) {
      return;
    }

    this._updateEvents([].concat(this._events.slice(0, index), newData, this._events.slice(index + 1)));

    eventController.render(this._events[index]);
  }
}

export {TripController as default};
