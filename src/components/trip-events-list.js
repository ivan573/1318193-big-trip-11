const EVENTS_COUNT = 15;

import {generateEvents} from '../mock/trip-events.js';
import {MONTHS} from '../const.js';
import {formatTime, convertDateToString, createElement} from '../utils.js';

import TripEventComponent from './trip-event.js';
import EventFormComponent from './event-form.js';

const tripEvents = generateEvents(EVENTS_COUNT);

const generateCorrespodingEventsTemplate = ((events) => {
  let template = ``;

  events.forEach((it) => { // самым простым вариантом мне показалось добавить обработчик событий тут, но оно не работает
    const tripEventComponent = new TripEventComponent(it);
    const eventFormComponent = new EventFormComponent(it);

    const expandButton = tripEventComponent.getElement().querySelector(`button`);
    expandButton.addEventListener(`click`, () => {
      // eslint-disable-next-line no-console
      console.log(`hi!`);
      tripEventComponent.getElement().replaceWith(eventFormComponent.getElement());
    });

    template += tripEventComponent.getTemplate() + `\n`;
  });
  return template;
});

const createTripDay = (day, month, year, index, events) => {

  return (
    /* html */
    `<li class="trip-days__item  day">
      <div class="day__info">
        <span class="day__counter">${index + 1}</span>
        <time class="day__date" datetime="${year}-${formatTime(month)}-${formatTime(day)}">${MONTHS[month]} ${day}</time>
      </div>
      <ul class="trip-events__list">
        ${generateCorrespodingEventsTemplate(events)}
      </ul>
    </li>`);
};

const isSameDate = (originalDate, checkedDate) => {
  return convertDateToString(originalDate) === convertDateToString(checkedDate);
};

const createTripDaysTemplate = (events) => {

  const uniqueDays = {};
  events.forEach((it) => {
    uniqueDays[convertDateToString(it.startDate)] = it.startDate;
  });

  let template = ``;
  let counter = 0;

  for (const day in uniqueDays) {
    if (uniqueDays[day] instanceof Date) {

      let correspondingEvents = [];

      events.forEach((event) => {

        if (isSameDate(uniqueDays[day], event.startDate)) {
          correspondingEvents.push(event);
        }

      });

      template += createTripDay(uniqueDays[day].getDate(), uniqueDays[day].getMonth(), uniqueDays[day].getFullYear(),
          counter, correspondingEvents) + `\n`;

      counter++;
    }
  }

  return template;
};


const createTripEventsList = () => {
  return (
    /* html */
    `<ul class="trip-days">
      ${createTripDaysTemplate(tripEvents)}
    </ul>`
  );
};

const TripEventsList = class {
  constructor() {
    this._element = null;
  }

  getTemplate() {
    return createTripEventsList();
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

export {TripEventsList as default};
