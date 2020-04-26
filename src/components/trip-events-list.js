import {generateEvents} from '../mock/trip-events.js';

const tripEvents = generateEvents(15);
export {tripEvents};

// import {tripEvents} from '../main.js';
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

const startDays = [];
tripEvents.forEach((it) => {

  startDays.push({
    day: it.startDate.getDate(),
    month: it.startDate.getMonth(),
    year: it.startDate.getFullYear()
  });
});

const uniqueDays = startDays.slice().filter((it, index, array) => {

  return array.indexOf(it) === index; // !! не понимаю почему не работает indexOf
});

const isSameDate = (originalDate, checkedDate) => {

  return originalDate.day === checkedDate.startDate.getDate() && originalDate.month === checkedDate.startDate.getMonth() && originalDate.year === checkedDate.startDate.getFullYear() ?
    true : false;
};

const createTripDaysTemplate = () => {

  let template = ``;
  // костыль. slice почему-то тоже не работает.
  for (let i = 0; i < 14; i++) {
    uniqueDays.pop();
  }

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
