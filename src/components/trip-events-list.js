const EVENTS_COUNT = 15;

import {generateEvents} from '../mock/trip-events.js';
import {MONTHS} from '../const.js';
import {formatTime} from '../utils.js';
import {convertDateToString} from '../utils.js';
import {createTripEventsTemplate} from './trip-events.js';

const tripEvents = generateEvents(EVENTS_COUNT);

const generateCorrespodingEventsTemplate = ((events) => {
  let template = ``;

  events.forEach((it) => {
    template += createTripEventsTemplate(it) + `\n`;
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

      template += createTripDay(uniqueDays[day].getDate(), uniqueDays[day].getMonth(), uniqueDays[day].getFullYear(), counter, correspondingEvents) + `\n`;

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

export {createTripEventsList};
