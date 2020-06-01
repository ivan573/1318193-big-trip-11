
import {getDuration} from '../utils/common.js';

import {SortType} from '../components/sorting.js';

import {getEventsPerDay} from '../utils/common.js';
import {getEventsByFilter} from "../utils/filter.js";
import {FilterType} from "../const.js";

const getSortedEvents = (events, sortType) => {
  let sortedEvents = {
    sorted: []
  };

  const eventsToSort = events.slice();

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

class TripEvents {
  constructor() {
    this._events = [];
    this._filteredEvents = [];
    this._currentSortType = SortType.EVENT;
    this._activeFilterType = FilterType.EVERYTHING;

    this._filterChangeHandlers = [];
  }

  getEvents() {
    return this._events;
  }

  getFilteredEvents() {
    this._filteredEvents = getEventsByFilter(this._events, this._activeFilterType);
    return getSortedEvents(this._filteredEvents, this._currentSortType);
  }

  setEvents(events, sortType) {
    this._updateEvents(Array.from(events), sortType);
  }

  setFilter(filterType) {
    this._activeFilterType = filterType;
    this._callHandlers(this._filterChangeHandlers);
  }

  removeEvent(id) {
    const index = this._events.findIndex((it) => it.id === id);

    if (index === -1) {
      return false;
    }

    this._updateEvents([].concat(this._events.slice(0, index), this._events.slice(index + 1)));

    return true;
  }

  updateEvent(id, event) {
    const index = this._events.findIndex((it) => it.id === id);

    if (index === -1) {
      return false;
    }

    this._updateEvents([].concat(this._events.slice(0, index), event, this._events.slice(index + 1)));

    return true;
  }

  addEvent(event) {
    this._updateEvents([].concat(event, this._events));
  }

  setFilterChangeHandler(handler) {
    this._filterChangeHandlers.push(handler);
  }

  _callHandlers(handlers) {
    handlers.forEach((handler) => handler());
  }

  _updateEvents(events, sortType) {
    const newSortType = sortType ? sortType : this._currentSortType;
    this._currentSortType = newSortType;

    this._events = events;
  }
}

export {TripEvents as default};
