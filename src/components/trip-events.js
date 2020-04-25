const NUMBER_OF_CHARACTERS_TO_REMOVE = 3; // я не придумал как сделать это элегантнее, чтобы получалось как в разметке

const MILLISECONDS_IN_A_SECOND = 1000;
const SECONDS_IN_A_MINUTE = 60;
const MINUTES_IN_AN_HOUR = 60;

const getEventTitle = (event) => {
  let preposition;

  switch (event.type) {
    case `Check-in`:
    case `Sightseeing`:
    case `Restaurant`:
      preposition = `in`;
      break;
    default:
      preposition = `to`;
      break;
  }

  return `${event.type} ${preposition} ${event.destination}`;
};

const getFullDate = (date) => {
  const string = date.toISOString();
  return string.slice(0, string.indexOf(`.`) - NUMBER_OF_CHARACTERS_TO_REMOVE); // без вычитания возвращает еще и секунды
};

const getTime = (date) => {
  const hours = date.getHours();
  const minutes = date.getMinutes();

  return `${hours}:${minutes.toString().length < 2 ? `0` + minutes : minutes}`;
};

const getDuration = (start, end) => {
  const duration = (end - start);
  const minutes = duration / MILLISECONDS_IN_A_SECOND / SECONDS_IN_A_MINUTE;
  if (minutes <= 60) {
    return minutes + `M`;
  } else {
    const hours = Math.floor(minutes / MINUTES_IN_AN_HOUR);
    minutes = minutes % MINUTES_IN_AN_HOUR;
    return hours + `H ` + minutes + `M`;
  }
};

const createTripEventsTemplate = (event) => {
  const {type, /* destination, */ startDate, endDate, cost, extraOffers /* , info */} = event;

  return (
    /* html */
    `<li class="trip-events__item">
      <div class="event">
        <div class="event__type">
          <img class="event__type-icon" width="42" height="42" src="img/icons/${type}.png" alt="Event type icon">
        </div>
        <h3 class="event__title">${getEventTitle(event)}</h3>

        <div class="event__schedule">
          <p class="event__time">
            <time class="event__start-time" datetime="${getFullDate(startDate)}">${getTime(startDate)}</time>
            &mdash;
            <time class="event__end-time" datetime="${getFullDate(endDate)}">${getTime(endDate)}</time>
          </p>
          <p class="event__duration">${getDuration(startDate, endDate)}</p>
        </div>

        <p class="event__price">
          &euro;&nbsp;<span class="event__price-value">${cost}</span>
        </p>

        <h4 class="visually-hidden">Offers:</h4>
        <ul class="event__selected-offers">
          <li class="event__offer">
            <span class="event__offer-title">${extraOffers[0].title}</span>
            &plus;
            &euro;&nbsp;<span class="event__offer-price">${extraOffers[0].price}</span>
          </li>
        </ul>

        <button class="event__rollup-btn" type="button">
          <span class="visually-hidden">Open event</span>
        </button>
      </div>
    </li>`
  );
};

export {createTripEventsTemplate};
