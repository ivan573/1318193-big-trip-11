const NUMBER_OF_CHARACTERS_TO_REMOVE = 3; // я не придумал как сделать это элегантнее, чтобы получалось как в разметке

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

const getFullDate = (date) => {
  const string = date.toISOString();
  return string.slice(0, string.indexOf(`.`) - NUMBER_OF_CHARACTERS_TO_REMOVE); // без вычитания возвращает еще и секунды
};

const getTime = (date) => {
  const hours = date.getHours();
  const minutes = date.getMinutes();

  return `${formatTime(hours)}:${formatTime(minutes)}`;
};

const getDuration = (start, end) => {
  const duration = (end - start);
  const minutes = duration / MILLISECONDS_IN_A_SECOND / SECONDS_IN_A_MINUTE;
  if (minutes < MINUTES_IN_AN_HOUR) {
    return minutes + `M`;
  } else {
    const hours = Math.floor(minutes / MINUTES_IN_AN_HOUR);
    minutes = minutes % MINUTES_IN_AN_HOUR;
    return hours + `H ` + minutes + `M`;
  }
};

export {formatTime, formatType, getEventTitle, formatDate, getFullDate, getTime, getDuration};
