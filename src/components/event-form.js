import {formatType, capitalizeFirstLetter, getId} from "../utils/common.js";
import {createElement} from '../utils/render.js';
import AbstractSmartComponent from "./abstract-smart-component.js";

import flatpickr from "flatpickr";

import "flatpickr/dist/flatpickr.min.css";

const DEFAULT_TYPE = `Bus`;

const EventTypes = {
  transfer: [`taxi`, `bus`, `train`, `ship`, `transport`, `drive`, `flight`],
  activity: [`check-in`, `sightseeing`, `restaurant`]
};

const creareOffersTemplate = (offers, chosenOffers) => {

  let template = ``;

  const setChecked = (currentOffer) => {
    if (chosenOffers) {
      return chosenOffers.some((offer) => offer.title === currentOffer.title) ? `checked` : ``;
    } else {
      return ``;
    }
  };

  if (offers) {
    offers.offers.forEach((it) => {
      template = template.concat(
      /* html */
          `<div class="event__offer-selector">
            <input class="event__offer-checkbox  visually-hidden" id="${getId(it.title)}-1" type="checkbox" name="${getId(it.title)}" ${setChecked(it)}>
            <label class="event__offer-label" for="${getId(it.title)}-1">
            <span class="event__offer-title">${it.title}</span>
              &plus;
              &euro;&nbsp;<span class="event__offer-price">${it.price}</span>
            </label>
          </div>\n`
      );
    });
  }

  return template;
};

const createPhotosTemplate = (photos) => {
  let template = ``;

  if (photos) {
    photos.forEach((it) => {
      template = template.concat(/* html */`<img class="event__photo" src="${it.src}" alt="${it.description}"></img>\n`);
    });
  }

  return template;
};

const createDestinationsTemplate = (destinations, eventDestination) => {

  let template = /* html */ `<option ${!eventDestination ? `selected` : ``} disabled>Pick a destination</option>\n`;

  destinations.forEach((it) => {
    template = template.concat(/* html */ `<option value="${it}" ${it === eventDestination ? `selected` : ``}>${it}</option>\n`);
  });

  return template;
};

const createEventDetailsTemplate = (offers, chosenOffers, description, photos) => {

  const offersSectionTemplate = offers ?
    /* html */
    `<section class="event__section  event__section--offers">
      <h3 class="event__section-title  event__section-title--offers">Offers</h3>
      <div class="event__available-offers">
        ${creareOffersTemplate(offers, chosenOffers)}
      </div>
    </section>` : ``;

  const destinationSectionTemplate = !!description && !!photos ?
    /* html */
    `<section class="event__section  event__section--destination">
      <h3 class="event__section-title  event__section-title--destination">Destination</h3>
      <p class="event__destination-description">${description}</p>
      <div class="event__photos-container">
        <div class="event__photos-tape">
          ${createPhotosTemplate(photos)}
        </div>
      </div>
    </section>` : ``;

  const template = !!offers || (!!description && !!photos) ?
    /* html */
    `<section class="event__details">
      ${offersSectionTemplate}
      ${destinationSectionTemplate}
    </section>` : ``;

  return template;
};

const createEvetTypeListTemplate = (eventType, types) => {
  let template = ``;

  const setChecked = (thisType) => {
    if (!eventType) {
      return ``;
    }
    return eventType.toLowerCase() === thisType ? `checked` : ``;
  };

  types.forEach((it) => {
    template = template.concat(
        /* html */
        `<div class="event__type-item">
          <input id="event-type-${it}-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="${it}" ${setChecked(it)}>
          <label class="event__type-label  event__type-label--${it}" for="event-type${it}-1">${capitalizeFirstLetter(it)}</label>
        </div>\n`
    );
  });

  return template;
};

const createEventFormTemplate = (event, information, offers, destinationsList) => {
  const {type, destination, startDate, endDate, cost, isFavorite, extraOffers, info} = event;

  let eventPhotos = null;
  let eventDescription = null;

  if (!!type && !!destination) {
    eventPhotos = info ? info.photos : information.photos;
    eventDescription = info ? info.description : information.description;
    // eventPhotos = info.photos ? info.photos : information.photos;
    // eventDescription = info.description ? info.description : information.description;
  }

  return (
    /* html */
    `<li class="trip-events__item">
        <form class="trip-events__item  event  event--edit" action="#" method="post">
          <header class="event__header">
            <div class="event__type-wrapper">
              <label class="event__type  event__type-btn" for="event-type-toggle-1">
                <span class="visually-hidden">Choose event type</span>
                <img class="event__type-icon" width="17" height="17" src="img/icons/${type ? type.toLowerCase() : DEFAULT_TYPE.toLocaleLowerCase()}.png" alt="Event type icon">
              </label>
              <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox">

              <div class="event__type-list">
                <fieldset class="event__type-group">
                  <legend class="visually-hidden">Transfer</legend>
                  ${createEvetTypeListTemplate(type, EventTypes.transfer)}
                </fieldset>

                <fieldset class="event__type-group">
                  <legend class="visually-hidden">Activity</legend>
                  ${createEvetTypeListTemplate(type, EventTypes.activity)}
                </fieldset>
              </div>
            </div>

            <div class="event__field-group  event__field-group--destination">
              <label class="event__label  event__type-output" for="event-destination-1">
                ${type ? formatType(type) : `Pick a type`}
              </label>
              <select class="event__input  event__input--destination" id="event-destination-1" name="event-destination">
	              ${createDestinationsTemplate(destinationsList, destination)}
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
              <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" min="" value="${endDate}">
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
            ${createEventDetailsTemplate(offers, extraOffers, eventDescription, eventPhotos)}
      </form>
    </li>`
  );
};

class EventForm extends AbstractSmartComponent {
  constructor(event, info, offers, destinationsList) {
    super();

    this._event = event;
    this._info = info;
    this._offers = offers;
    this._destinationsList = destinationsList;

    this._flatpickr = null;

    this._submitHandler = null;
    this._deleteButtonClickHandler = null;
    this._changeTypeHandler = null;
    this._changeDestinationHandler = null;

    this._applyFlatpickr();
  }

  getTemplate() {
    return createEventFormTemplate(this._event, this._info, this._offers, this._destinationsList);
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
    this.setChangeDestinationHandler(this._changeDestinationHandler);
  }

  rerender() {
    super.rerender();

    this._applyFlatpickr();
  }

  getData() {
    const form = this.getElement().querySelector(`form`);
    const formData = new FormData(form);

    return formData;
  }

  getInfo() {
    return this._info;
  }

  getOffers() {
    return this._offers;
  }

  setSubmitHandler(handler) {
    this._submitHandler = handler;
    this.getElement().querySelector(`form`)
      .addEventListener(`submit`, this._submitHandler);
  }

  setDeleteButtonClickHandler(handler) {
    this._deleteButtonClickHandler = handler;
    this.getElement().querySelector(`.event__reset-btn`)
      .addEventListener(`click`, this._deleteButtonClickHandler);
  }

  setChangeTypeHandlers(handler) {
    this._changeTypeHandler = handler;
    this.getElement().querySelectorAll(`.event__type-label`).forEach((it) => {
      it.addEventListener(`click`, this._changeTypeHandler);
    });
  }

  setChangeDestinationHandler(handler) {
    this._changeDestinationHandler = handler;
    this.getElement().querySelector(`.event__input--destination`)
      .addEventListener(`change`, this._changeDestinationHandler);
  }

  onTypeChange(type, offers) {
    this._offers = offers;

    const chosenType = type.toLowerCase();

    const checkedTypeElement = this.getElement().querySelector(`.event__type-input:checked`);
    const chosentTypeElement = this.getElement().querySelector(`.event__type-input[value="${chosenType}"]`);
    const eventTypeIconElement = this.getElement().querySelector(`.event__type-icon`);
    const eventTypeOutPutElement = this.getElement().querySelector(`.event__type-output`);

    if (checkedTypeElement) {
      checkedTypeElement.removeAttribute(`checked`);
    }
    chosentTypeElement.setAttribute(`checked`, `checked`);
    eventTypeIconElement.src = `img/icons/${chosenType}.png`;
    eventTypeOutPutElement.textContent = capitalizeFirstLetter(formatType(chosenType));

    this._updateDetails();
  }

  onDestinationChange(info) {
    this._info = info;

    this._updateDetails();
  }

  _updateDetails() {
    const formElement = this.getElement().querySelector(`form`);
    const detailsElement = formElement.querySelector(`.event__details`);

    if (detailsElement) {
      formElement.removeChild(detailsElement);
    }

    const description = this._info ? this._info.description : null;
    const photos = this._info ? this._info.photos : null;

    const eventDetailsElement = createElement(createEventDetailsTemplate(this._offers, null, description, photos));
    formElement.appendChild(eventDetailsElement);
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
        minuteIncrement: 1,
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
