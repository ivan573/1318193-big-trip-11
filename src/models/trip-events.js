
import {SortType} from '../components/sorting.js';

import {getEventsPerDay} from '../utils/common.js';
import {getEventsByFilter} from "../utils/filter.js";
import {FilterType} from "../const.js";

const DEFAULT_SORT_TYPE = SortType.EVENT;

const getSortedEvents = (events, sortType) => {
  let sortedEvents = {
    sorted: []
  };

  const eventsToSort = events.slice();

  const getDuration = (firstDate, secondDate) => {
    if (typeof firstDate === `string` && typeof secondDate === `string`) {
      firstDate = new Date(secondDate);
      secondDate = new Date(secondDate);
    }
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

// const getEvents = (object) => {
//   const array = Object.values(object);
//   let events = [];
//   array.forEach((it) => {
//     events = events.concat(it);
//   });
//   return events;
// };

class TripEvents {
  constructor() {
    this._events = [];
    this._filteredEvents = {};
    // this._structuredEvents = {};
    this._currentSortType = DEFAULT_SORT_TYPE;
    this._activeFilterType = FilterType.EVERYTHING;

    this._dataChangeHandlers = [];
    this._filterChangeHandlers = [];
  }

  getEvents() {
    return this._events;
  }

  getFilteredEvents() {
    this._filteredEvents = getEventsByFilter(this._events, this._activeFilterType);
    return getSortedEvents(this._filteredEvents, this._currentSortType);
  }

  // getStructuredEvents() {
  //   return this._structuredEvents;
  // }

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

  addEvent(task) {
    this._updateEvents([].concat(task, this._events));
  }


  setDataChangeHandler(handler) {
    this._dataChangeHandlers.push(handler);
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
    // this._structuredEvents = getSortedEvents(this._events, this._currentSortType);

    this._callHandlers(this._dataChangeHandlers);
  }
}

export {TripEvents as default};