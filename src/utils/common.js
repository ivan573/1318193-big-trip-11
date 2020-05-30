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

const getDuration = (startDate, endDate) => {
  const start = new Date(startDate);
  const end = new Date(endDate);

  const duration = (end.setSeconds(0) - start.setSeconds(0));
  let minutes = Math.floor(duration / MILLISECONDS_IN_A_SECOND / SECONDS_IN_A_MINUTE);
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

  events = events.sort((a, b) => {
    return a.startDate - b.startDate;
  });

  const eventsPerDay = {};
  const uniqueDays = {};

  events.forEach((it) => {
    uniqueDays[convertDateToString(it.startDate)] = it.startDate;
  });

  let counter = 1;

  for (const day in uniqueDays) {
    if (Object.keys(uniqueDays).length > 0) {
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

const capitalizeFirstLetter = (string) => {
  return string ? string[0].toUpperCase() + string.slice(1) : null;
};

export {formatType, getEventTitle, formatDate, getTime, getDuration, getEventsPerDay, capitalizeFirstLetter};
