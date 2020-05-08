const EVENTS_COUNT = 15;

import {generateEvents} from '../mock/trip-events.js';
import {MONTHS} from '../const.js';
import {formatTime, convertDateToString, createElement} from '../utils.js';

const tripEvents = generateEvents(EVENTS_COUNT);

const eventsPerDay = {};

const createTripDay = (day, month, year, index) => {

  return (
    /* html */
    `<li class="trip-days__item  day">
      <div class="day__info">
        <span class="day__counter">${index}</span>
        <time class="day__date" datetime="${year}-${formatTime(month)}-${formatTime(day)}">${MONTHS[month]} ${day}</time>
      </div>
      <ul class="trip-events__list">
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
  let counter = 1;

  for (const day in uniqueDays) {
    if (uniqueDays[day] instanceof Date) {

      const correspondingEvents = [];

      events.forEach((event) => {

        if (isSameDate(uniqueDays[day], event.startDate)) {
          correspondingEvents.push(event);
        }

      });

      template += createTripDay(uniqueDays[day].getDate(), uniqueDays[day].getMonth(), uniqueDays[day].getFullYear(),
          counter) + `\n`;

      eventsPerDay[(counter).toString()] = correspondingEvents;

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

class TripEventsList {
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
}

export {TripEventsList as default, eventsPerDay};
