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

const uniqueEvents = tripEvents.filter((it, index, array) => {
  if (index === 0) {
    return true;
  } else {
    return (it.toString() !== array[0].toString());
  }
});

const uniqueDays = new Set();
uniqueEvents.forEach((it, index) => {
  uniqueDays.add({
    day: it.startDate.getDate(),
    month: it.startDate.getMonth(),
    year: it.startDate.getFullYear(),
    dateIndex: index
  });
});

const isSameDate = (originalDate, checkedDate) => {

  return originalDate.day === checkedDate.startDate.getDate() && originalDate.month === checkedDate.startDate.getMonth() && originalDate.year === checkedDate.startDate.getFullYear() ?
    true : false;
};

const createTripDaysTemplate = () => {

  let template = ``;

  uniqueDays.forEach((day) => {

    let correspondingEvents = [];

    tripEvents.forEach((event) => {

      if (isSameDate(day, event)) {
        correspondingEvents.push(event);
      }

    });

    template += createTripDay(day.day, day.month, day.year, day.dateIndex, correspondingEvents) + `\n`;
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
