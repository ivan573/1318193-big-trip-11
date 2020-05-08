const MILLISECONDS_IN_A_SECOND = 1000;
const SECONDS_IN_A_MINUTE = 60;
const MINUTES_IN_AN_HOUR = 60;

const RenderPosition = {
  AFTERBEGIN: `afterbegin`,
  BEFOREEND: `beforeend`,
  AFTEREND: `afterend`
};

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

const createElement = (template) => {
  const newElement = document.createElement(`div`);
  newElement.innerHTML = template;

  return newElement.firstChild;
};

const render = (container, element, place = RenderPosition.AFTERBEGIN) => {
  switch (place) {
    case RenderPosition.AFTERBEGIN:
      container.prepend(element);
      break;
    case RenderPosition.BEFOREEND:
      container.append(element);
      break;
    case RenderPosition.AFTEREND:
      container.after(element);
      break;
  }
};

export {formatTime, formatType, getEventTitle, formatDate, convertDateToString, getFullDate, getTime, getDuration,
  createElement, render};
