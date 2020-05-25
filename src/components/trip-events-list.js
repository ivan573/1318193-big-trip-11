import AbstractComponent from "./abstract-component.js";

import moment from "moment";

const SORTED_ARRRAY_KEY = `sorted`;

function createTripDay(date, index) {
  const dayInfo = arguments.length === 0 ? `` : (
    /* html */
    `<span class="day__counter">${index}</span>
    <time class="day__date" datetime="${date}">${moment(date).format(`MMM D`).toUpperCase()}</time>`
  );

  return (
    /* html */
    `<li class="trip-days__item  day">
      <div class="day__info">
        ${dayInfo}
      </div>
      <ul class="trip-events__list">
      </ul>
    </li>`);
}

const createTripDaysTemplate = (structuredEvents) => {

  let template = ``;

  for (const day in structuredEvents) {
    if (day === SORTED_ARRRAY_KEY || Object.keys(structuredEvents).length === 0) {
      template = createTripDay();
    } else {
      const date = structuredEvents[day][0].startDate;
      template += createTripDay(date, day) + `\n`;
    }
  }

  return template;
};


const createTripEventsList = (structuredEvents) => {
  return (
    /* html */
    `<ul class="trip-days">
      ${createTripDaysTemplate(structuredEvents)}
    </ul>`
  );
};

class TripEventsList extends AbstractComponent {
  constructor(structuredEvents) {
    super();

    this._structuredEvents = structuredEvents;
  }

  getTemplate() {
    return createTripEventsList(this._structuredEvents);
  }
}

export {TripEventsList as default, SORTED_ARRRAY_KEY};
