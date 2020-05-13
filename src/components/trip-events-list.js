const EVENTS_COUNT = 15;

import {generateEvents} from '../mock/trip-events.js';
import {MONTHS} from '../const.js';
import {formatTime, getEventsPerDay} from '../utils/common.js';
import AbstractComponent from "./abstract-component.js";

const tripEvents = generateEvents(EVENTS_COUNT);

const eventsPerDay = getEventsPerDay(tripEvents);

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

const createTripDaysTemplate = () => {

  let template = ``;

  for (const day in eventsPerDay) {
    if (eventsPerDay[day].length !== 0) {
      const date = eventsPerDay[day][0].startDate;
      template += createTripDay(date.getDate(), date.getMonth(), date.getFullYear(), day) + `\n`;
    }
  }

  return template;
};


const createTripEventsList = () => {
  return (
    /* html */
    `<ul class="trip-days">
      ${createTripDaysTemplate()}
    </ul>`
  );
};

class TripEventsList extends AbstractComponent {
  getTemplate() {
    return createTripEventsList();
  }
}

export {TripEventsList as default, eventsPerDay};
