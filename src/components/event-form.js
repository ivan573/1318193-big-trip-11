import {formatType, formatDate} from "../utils/common.js";
import AbstractSmartComponent from "./abstract-smart-component.js";

import flatpickr from "flatpickr";

import "flatpickr/dist/flatpickr.min.css";

const creareOffersTemplate = (offers) => {
  let template = ``;

  offers.forEach((it) => {
    template +=
    /* html */
    `<div class="event__offer-selector">
      <input class="event__offer-checkbox  visually-hidden" id="event-offer-${it.shortTitle}-1" type="checkbox" name="event-offer-${it.shortTitle}" checked>
      <label class="event__offer-label" for="event-offer-${it.shortTitle}-1">
        <span class="event__offer-title">${it.title}</span>
        &plus;
        &euro;&nbsp;<span class="event__offer-price">${it.price}</span>
      </label>
    </div>` + `\n`;
  });

  return template;
};

const createPhotosTemplate = (photos) => {
  let template = ``;

  photos.forEach((it) => {
    template += /* html */ `<img class="event__photo" src="${it}" alt="Event photo"></img>` + `\n`;
  });

  return template;
};

const createEventFormTemplate = (event) => {
  const {type, destination, startDate, endDate, cost, isFavorite, extraOffers, info} = event;

  const setChecked = (thisType) => {
    return type.toLowerCase() === thisType ? `checked` : ``;
  };

  return (
    /* html */
    `<li class="trip-events__item">
        <form class="trip-events__item  event  event--edit" action="#" method="post">
          <header class="event__header">
            <div class="event__type-wrapper">
              <label class="event__type  event__type-btn" for="event-type-toggle-1">
                <span class="visually-hidden">Choose event type</span>
                <img class="event__type-icon" width="17" height="17" src="img/icons/${type.toLowerCase()}.png" alt="Event type icon">
              </label>
              <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox">

              <div class="event__type-list">
                <fieldset class="event__type-group">
                  <legend class="visually-hidden">Transfer</legend>

                  <div class="event__type-item">
                    <input id="event-type-taxi-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="taxi" ${setChecked(`taxi`)}>
                    <label class="event__type-label  event__type-label--taxi" for="event-type-taxi-1">Taxi</label>
                  </div>

                  <div class="event__type-item">
                    <input id="event-type-bus-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="bus" ${setChecked(`bus`)}>
                    <label class="event__type-label  event__type-label--bus" for="event-type-bus-1">Bus</label>
                  </div>

                  <div class="event__type-item">
                    <input id="event-type-train-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="train" ${setChecked(`train`)}>
                    <label class="event__type-label  event__type-label--train" for="event-type-train-1">Train</label>
                  </div>

                  <div class="event__type-item">
                    <input id="event-type-ship-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="ship" ${setChecked(`ship`)}>
                    <label class="event__type-label  event__type-label--ship" for="event-type-ship-1">Ship</label>
                  </div>

                  <div class="event__type-item">
                    <input id="event-type-transport-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="transport" ${setChecked(`transport`)}>
                    <label class="event__type-label  event__type-label--transport" for="event-type-transport-1">Transport</label>
                  </div>

                  <div class="event__type-item">
                    <input id="event-type-drive-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="drive" ${setChecked(`drive`)}>
                    <label class="event__type-label  event__type-label--drive" for="event-type-drive-1">Drive</label>
                  </div>

                  <div class="event__type-item">
                    <input id="event-type-flight-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="flight" ${setChecked(`flight`)}>
                    <label class="event__type-label  event__type-label--flight" for="event-type-flight-1">Flight</label>
                  </div>
                </fieldset>

                <fieldset class="event__type-group">
                  <legend class="visually-hidden">Activity</legend>

                  <div class="event__type-item">
                    <input id="event-type-check-in-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="check-in" ${setChecked(`check-in`)}>
                    <label class="event__type-label  event__type-label--check-in" for="event-type-check-in-1">Check-in</label>
                  </div>

                  <div class="event__type-item">
                    <input id="event-type-sightseeing-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="sightseeing" ${setChecked(`sightseeing`)}>
                    <label class="event__type-label  event__type-label--sightseeing" for="event-type-sightseeing-1">Sightseeing</label>
                  </div>

                  <div class="event__type-item">
                    <input id="event-type-restaurant-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="restaurant" ${setChecked(`restaurant`)}>
                    <label class="event__type-label  event__type-label--restaurant" for="event-type-restaurant-1">Restaurant</label>
                  </div>
                </fieldset>
              </div>
            </div>

            <div class="event__field-group  event__field-group--destination">
              <label class="event__label  event__type-output" for="event-destination-1">
                ${formatType(type)}
              </label>
              <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value="${destination}" list="destination-list-1">
              <datalist id="destination-list-1">
                <option value="Amsterdam"></option>
                <option value="Geneva"></option>
                <option value="Chamonix"></option>
                <option value="Saint Petersburg"></option>
              </datalist>
            </div>

            <div class="event__field-group  event__field-group--time">
              <label class="visually-hidden" for="event-start-time-1">
                From
              </label>
              <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" value="${formatDate(startDate)}">
              &mdash;
              <label class="visually-hidden" for="event-end-time-1">
                To
              </label>
              <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" value="${formatDate(endDate)}">
            </div>

            <div class="event__field-group  event__field-group--price">
              <label class="event__label" for="event-price-1">
                <span class="visually-hidden">Price</span>
                &euro;
              </label>
              <input class="event__input  event__input--price" id="event-price-1" type="text" name="event-price" value="${cost}">
            </div>

            <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
            <button class="event__reset-btn" type="reset">Delete</button>

                      <input id="event-favorite-1" class="event__favorite-checkbox  visually-hidden" type="checkbox" name="event-favorite" ${isFavorite ? `checked` : ``}>
                      <label class="event__favorite-btn" for="event-favorite-1">
                        <span class="visually-hidden">Add to favorite</span>
                        <svg class="event__favorite-icon" width="28" height="28" viewBox="0 0 28 28">
                          <path d="M14 21l-8.22899 4.3262 1.57159-9.1631L.685209 9.67376 9.8855 8.33688 14 0l4.1145 8.33688 9.2003 1.33688-6.6574 6.48934 1.5716 9.1631L14 21z"/>
                        </svg>
                      </label>

                      <button class="event__rollup-btn" type="button">
                        <span class="visually-hidden">Open event</span>
                      </button>
          </header>
          <section class="event__details">
            <section class="event__section  event__section--offers">
              <h3 class="event__section-title  event__section-title--offers">Offers</h3>

              <div class="event__available-offers">
                ${creareOffersTemplate(extraOffers)}
              </div>
            </section>

            <section class="event__section  event__section--destination">
              <h3 class="event__section-title  event__section-title--destination">Destination</h3>
              <p class="event__destination-description">${info.description}</p>

              <div class="event__photos-container">
                <div class="event__photos-tape">
                  ${createPhotosTemplate(info.photos)}
                </div>
              </div>
            </section>
          </section>
      </form>
    </li>`
  );
};

class EventForm extends AbstractSmartComponent {
  constructor(event) {
    super();

    this._event = event;

    this._flatpickr = null;

    this._submitHandler = null;
    this._addToFavoriteHandler = null;
    this._changeTypeHandler = null;

    this._applyFlatpickr();
  }

  getTemplate() {
    return createEventFormTemplate(this._event);
  }

  recoverListeners() {
    this.setSubmitHandler(this._submitHandler);
    this.setAddToFavoriteHandler(this._addToFavoriteHandler);
    this.setChangeTypeHandlers(this._changeTypeHandler);
  }

  rerender() {
    super.rerender();

    this._applyFlatpickr();
  }

  _applyFlatpickr() {
    if (this._flatpickr) {
      this._flatpickr.destroy();
      this._flatpickr = null;
    }

    const apply = (element, date) => {
      this._flatpickr = flatpickr(element, {
        enableTime: true,
        altFormat: `d/m/y H:i`,
        dateFormat: `d/m/y H:i`,
        altInput: true,
        allowInput: true,
        defaultDate: date || `today`
      });
    };

    const startDateElement = this.getElement().querySelector(`input[name=event-start-time]`);
    const endDateElement = this.getElement().querySelector(`input[name=event-end-time]`);

    apply(startDateElement, this._event.startDate);
    apply(endDateElement, this._event.endDate);
  }

  setSubmitHandler(handler) {
    this._submitHandler = handler;
    this.getElement().querySelector(`form`)
      .addEventListener(`submit`, this._submitHandler);
  }

  setAddToFavoriteHandler(handler) {
    this._addToFavoriteHandler = handler;
    this.getElement().querySelector(`.event__favorite-checkbox`)
    .addEventListener(`click`, this._addToFavoriteHandler);
  }

  setChangeTypeHandlers(handler) {
    this._changeTypeHandler = handler;
    this.getElement().querySelectorAll(`.event__type-label`).forEach((it) => {
      it.addEventListener(`click`, this._changeTypeHandler);
    });
  }
}

export {EventForm as default};
