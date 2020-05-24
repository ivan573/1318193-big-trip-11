import {FilterType} from "../const.js";

const getFutureEvents = (events, now) => {
  return events.filter((it) => it.startDate > now);
};

const getPastEvents = (events, now) => {
  return events.filter((it) => it.endDate < now);
};

const getEventsByFilter = (events, filterType) => {
  const now = new Date();

  switch (filterType) {
    case FilterType.EVERYTHING:
      return events;
    case FilterType.FUTURE:
      return getFutureEvents(events, now);
    case FilterType.PAST:
      return getPastEvents(events, now);
  }

  return events;
};

export {getEventsByFilter};
