import moment from "moment";

const MILLISECONDS_IN_A_SECOND = 1000;
const SECONDS_IN_A_MINUTE = 60;
const MINUTES_IN_AN_HOUR = 60;

const formatType = (type) => {
  let preposition;

  switch (type) {
    case `Check-in`:
    case `Sightseeing`:
    case `Restaurant`:
      preposition = `in`;
      break;
    default:
      preposition = `to`;
      break;
  }

  return `${type} ${preposition}`;
};

const getEventTitle = (event) => {
  return `${formatType(event.type)} ${event.destination}`;
};

const formatDate = (date) => {
  return moment(date).format(`D/M/YY HH:mm`);
};

const convertDateToString = (date) => {
  return moment(date).format(`YYYY-MM-DD`);
};

const getTime = (date) => {

  return moment(date).format(`HH:mm`);
};

const getFullDate = (date) => {
  return `${convertDateToString(date)}T${getTime(date)}`;
};

const getDuration = (start, end) => {
  const duration = (end - start);
  let minutes = duration / MILLISECONDS_IN_A_SECOND / SECONDS_IN_A_MINUTE;
  if (minutes < MINUTES_IN_AN_HOUR) {
    return minutes + `M`;
  } else {
    const hours = Math.floor(minutes / MINUTES_IN_AN_HOUR);
    minutes = minutes % MINUTES_IN_AN_HOUR;
    return minutes === 0 ? hours + `H` : hours + `H ` + minutes + `M`;
  }
};

const getEventsPerDay = (events) => {

  const isSameDate = (originalDate, checkedDate) => {
    return convertDateToString(originalDate) === convertDateToString(checkedDate);
  };

  const eventsPerDay = {};
  const uniqueDays = {};

  events.forEach((it) => {
    uniqueDays[convertDateToString(it.startDate)] = it.startDate;
  });

  let counter = 1;

  for (const day in uniqueDays) {
    if (uniqueDays[day] instanceof Date) {
      const correspondingEvents = [];

      events.forEach((event) => {
        if (isSameDate(uniqueDays[day], event.startDate)) {
          correspondingEvents.push(event);
        }
      });

      eventsPerDay[(counter).toString()] = correspondingEvents;
      counter++;
    }
  }

  return eventsPerDay;
};

export {formatType, getEventTitle, formatDate, getFullDate, getTime, getDuration, getEventsPerDay};
