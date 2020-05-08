import {getEventTitle, getFullDate, getTime, getDuration, createElement} from '../utils.js';

const createOffersTemplate = (offers) => {
  let template = ``;
  offers.forEach((it) => (
    template +=
    /* html */
    `<li class="event__offer">
      <span class="event__offer-title">${it.title}</span>
      &plus;
      &euro;&nbsp;<span class="event__offer-price">${it.price}</span>
    </li>` + `\n`
  ));
  return template;
};

const createTripEventTemplate = (event) => {
  const {type, startDate, endDate, cost, extraOffers} = event;

  return (
    /* html */
    `<li class="trip-events__item">
      <div class="event">
        <div class="event__type">
          <img class="event__type-icon" width="42" height="42" src="img/icons/${type.toLowerCase()}.png" alt="Event type icon">
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
          ${createOffersTemplate(extraOffers)}
        </ul>

        <button class="event__rollup-btn" type="button">
          <span class="visually-hidden">Open event</span>
        </button>
      </div>
    </li>`
  );
};

class TripEvent {
  constructor(event) {
    this._element = null;

    this._event = event;
  }

  getTemplate() {
    return createTripEventTemplate(this._event);
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }
};

export {TripEvent as default};
