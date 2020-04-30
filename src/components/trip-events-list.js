import {generateEvents} from '../mock/trip-events.js';

const tripEvents = generateEvents(15);

import {MONTHS} from '../const.js';
import {formatTime} from '../utils.js';
import {createTripEventsTemplate} from './trip-events.js';

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

const tripDays = tripEvents.map((it) => {
  return {
    day: it.startDate.getDate(),
    month: it.startDate.getMonth(),
    year: it.startDate.getFullYear()
  };
});

const uniqueDays = tripDays.filter((it, index) => {
  const element = JSON.stringify(it);
  return index === tripDays.findIndex((obj) => {
    return JSON.stringify(obj) === element;
  });
});

const isSameDate = (originalDate, checkedDate) => {

  return originalDate.day === checkedDate.startDate.getDate() && originalDate.month === checkedDate.startDate.getMonth() && originalDate.year === checkedDate.startDate.getFullYear() ?
    true : false;
};

const createTripDaysTemplate = () => {

  let template = ``;

  uniqueDays.forEach((day, index) => {

    let correspondingEvents = [];

    tripEvents.forEach((event) => {

      if (isSameDate(day, event)) {
        correspondingEvents.push(event);
      }

    });

    template += createTripDay(day.day, day.month, day.year, index, correspondingEvents) + `\n`;
  });

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

export {createTripEventsList};
export {tripEvents};
