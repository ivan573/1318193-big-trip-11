import moment from "moment";

const TimeUnits = {
  MILLISECONDS_IN_A_SECOND: 1000,
  SECONDS_IN_A_MINUTE: 60,
  MINUTES_IN_AN_HOUR: 60,
  HOURS_IN_A_DAY: 24
};

const ID_PREFIX = `event-offer-`;

const HIDDEN_CLASS = `visually-hidden`;

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
  const firstDate = new Date(startDate);
  const secondDate = new Date(endDate);

  return secondDate.getTime() - firstDate.getTime();
};

const getStringDuration = (startDate, endDate) => {
  const formatUnits = (units) => {
    return units > 10 ? `${units}` : `0${units}`;
  };

  const start = new Date(startDate);
  const end = new Date(endDate);

  const duration = (end.setSeconds(0) - start.setSeconds(0));

  let minutes = Math.floor(duration / TimeUnits.MILLISECONDS_IN_A_SECOND / TimeUnits.SECONDS_IN_A_MINUTE);
  let hours = Math.floor(minutes / TimeUnits.MINUTES_IN_AN_HOUR);
  const days = Math.floor(hours / TimeUnits.HOURS_IN_A_DAY);

  if (minutes < TimeUnits.MINUTES_IN_AN_HOUR) {
    return `${formatUnits(minutes)}M`;
  } if (hours < TimeUnits.HOURS_IN_A_DAY) {
    minutes = minutes % TimeUnits.MINUTES_IN_AN_HOUR;
    return `${formatUnits(hours)}H ${formatUnits(minutes)}M`;
  }

  minutes = minutes % TimeUnits.MINUTES_IN_AN_HOUR;
  hours = hours % TimeUnits.HOURS_IN_A_DAY;
  return `${formatUnits(days)}D ${formatUnits(hours)}H ${formatUnits(minutes)}M`;
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

const getId = (title) => {
  return `${ID_PREFIX}${title.replace(/\s+/g, ``).toLowerCase()}`;
};

const show = (element) => {
  if (element) {
    element.classList.remove(HIDDEN_CLASS);
  }
};

const hide = (element) => {
  if (element) {
    element.classList.add(HIDDEN_CLASS);
  }
};

export {TimeUnits, formatType, getEventTitle, formatDate, getTime, getDuration, getStringDuration, getEventsPerDay, capitalizeFirstLetter, getId, show, hide};
