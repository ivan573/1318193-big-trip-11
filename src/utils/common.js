const MILLISECONDS_IN_A_SECOND = 1000;
const SECONDS_IN_A_MINUTE = 60;
const MINUTES_IN_AN_HOUR = 60;

const formatTime = (time) => {
  return time.toString().length > 1 ? time : `0` + time;
};

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

  const day = date.getDate();
  const month = date.getMonth();
  const year = date.getFullYear().toString().slice(2, 4);
  const hours = formatTime(date.getHours());
  const minutes = formatTime(date.getMinutes());
  return `${day}/${month}/${year} ${hours}:${minutes}`;
};

const convertDateToString = (date) => {
  return `${date.getFullYear()}-${formatTime(date.getMonth() + 1)}-${formatTime(date.getDate())}`;
};

const getFullDate = (date) => {
  return `${convertDateToString(date)}T${formatTime(date.getHours())}:${formatTime(date.getMinutes())}`;
};

const getTime = (date) => {
  const hours = date.getHours();
  const minutes = date.getMinutes();

  return `${formatTime(hours)}:${formatTime(minutes)}`;
};

const getDuration = (start, end) => {
  const duration = (end - start);
  let minutes = duration / MILLISECONDS_IN_A_SECOND / SECONDS_IN_A_MINUTE;
  if (minutes < MINUTES_IN_AN_HOUR) {
    return minutes + `M`;
  } else {
    const hours = Math.floor(minutes / MINUTES_IN_AN_HOUR);
    minutes = minutes % MINUTES_IN_AN_HOUR;
    return hours + `H ` + minutes + `M`;
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

export {formatTime, formatType, getEventTitle, formatDate, getFullDate, getTime, getDuration, getEventsPerDay};
