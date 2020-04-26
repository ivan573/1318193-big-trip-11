import {getEventTitle, getFullDate, getTime, getDuration} from '../utils.js';

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
