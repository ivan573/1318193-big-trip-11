import {formatType} from "../utils/common.js";
import AbstractSmartComponent from "./abstract-smart-component.js";

import flatpickr from "flatpickr";

import "flatpickr/dist/flatpickr.min.css";

const creareOffersTemplate = (offers) => {
  let template = ``;

  if (!offers) {
    return template;
  }

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

const setFirstLetterToCapital = (string) => {
  return string[0].toUpperCase() + string.slice(1);
};

const createEventFormTemplate = (event) => {
  const {type, destination, startDate, endDate, cost, isFavorite, extraOffers, info} = event;

  const setChecked = (thisType) => {
    return type.toLowerCase() === thisType ? `checked` : ``;
  };

  const setSelected = (place) => {
    return destination === place ? `selected` : ``;
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
              <select class="event__input  event__input--destination" id="event-destination-1" name="event-destination">
	              <option value="Amsterdam" ${setSelected(`Amsterdam`)}>Amsterdam</option>
                <option value="Geneva" ${setSelected(`Geneva`)}>Geneva</option>
                <option value="Chamonix" ${setSelected(`Chamonix`)}>Chamonix</option>
                <option value="Saint Petersburg" ${setSelected(`Saint Petersburg`)}>Saint Petersburg</option>
              </select>
            </div>

            <div class="event__field-group  event__field-group--time">
              <label class="visually-hidden" for="event-start-time-1">
                From
              </label>
              <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" value="${startDate}">
              &mdash;
              <label class="visually-hidden" for="event-end-time-1">
                To
              </label>
              <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" value="${endDate}">
            </div>

            <div class="event__field-group  event__field-group--price">
              <label class="event__label" for="event-price-1">
                <span class="visually-hidden">Price</span>
                &euro;
              </label>
              <input type="number" min="0" max="100000" class="event__input  event__input--price" id="event-price-1" type="text" name="event-price" value="${cost}">
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

const parseFormData = (formData) => {

  const startDate = formData.get(`event-start-time`);
  const endDate = formData.get(`event-end-time`);

  return {
    type: setFirstLetterToCapital(formData.get(`event-type`)),
    destination: formData.get(`event-destination`),
    startDate: new Date(startDate),
    endDate: new Date(endDate),
    cost: formData.get(`event-price`),
    isFavorite: (formData.get(`event-favorite`) === `on`),
    extraOffers: null,
    info: {
      description: ``,
      photos: [``]
    }
  };
};

class EventForm extends AbstractSmartComponent {
  constructor(event) {
    super();

    this._event = event;

    this._flatpickr = null;

    this._submitHandler = null;
    this._deleteButtonClickHandler = null;
    // this._addToFavoriteHandler = null;
    this._changeTypeHandler = null;

    // this._changePriceHandler = null;
    // this._changeStartDateHandler = null; // test

    this._applyFlatpickr();
  }

  getTemplate() {
    return createEventFormTemplate(this._event);
  }

  removeElement() {
    if (this._flatpickr) {
      this._flatpickr.destroy();
      this._flatpickr = null;
    }

    super.removeElement();
  }

  recoverListeners() {
    this.setSubmitHandler(this._submitHandler);
    this.setDeleteButtonClickHandler(this._deleteButtonClickHandler);
    this.setChangeTypeHandlers(this._changeTypeHandler);
  }

  rerender() {
    super.rerender();

    this._applyFlatpickr();
  }

  getData() {
    const form = this.getElement().querySelector(`form`);
    const formData = new FormData(form);

    return parseFormData(formData);
  }

  setSubmitHandler(handler) {
    this._submitHandler = handler;
    this.getElement().querySelector(`form`)
      .addEventListener(`submit`, this._submitHandler);
  }

  setDeleteButtonClickHandler(handler) {
    this.getElement().querySelector(`.event__reset-btn`)
      .addEventListener(`click`, handler);

    this._deleteButtonClickHandler = handler;
  }

  setChangeTypeHandlers(handler) {
    this._changeTypeHandler = handler;
    this.getElement().querySelectorAll(`.event__type-label`).forEach((it) => {
      it.addEventListener(`click`, this._changeTypeHandler);
    });
  }

  onTypeChange(type) {
    const chosenType = type.toLowerCase();

    const checkedTypeElement = this.getElement().querySelector(`.event__type-input:checked`);
    const chosentTypeElement = this.getElement().querySelector(`.event__type-input[value="${chosenType}"]`);
    const eventTypeIconElement = this.getElement().querySelector(`.event__type-icon`);
    // const eventTypeListElement = this.getElement().querySelector(`.event__type-list`); // (`.event__type-list`); `.event__type-toggle`
    const eventTypeOutPutElement = this.getElement().querySelector(`.event__type-output`);

    checkedTypeElement.removeAttribute(`checked`);
    chosentTypeElement.setAttribute(`checked`, `checked`);
    eventTypeIconElement.src = `img/icons/${chosenType}.png`;
    eventTypeOutPutElement.textContent = setFirstLetterToCapital(formatType(chosenType));
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
        dateFormat: `Z`,
        altInput: true,
        // allowInput: true,
        defaultDate: date || `today`
      });
    };

    const startDateElement = this.getElement().querySelector(`input[name=event-start-time]`);
    const endDateElement = this.getElement().querySelector(`input[name=event-end-time]`);

    apply(startDateElement, this._event.startDate);
    apply(endDateElement, this._event.endDate);
  }
}

export {EventForm as default};
