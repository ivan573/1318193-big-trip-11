const POINT_COUNT = 15;

import {createRouteAndCostTemplate} from './components/route-and-cost.js';
import {createMenuTemplate} from './components/menu.js';
import {createFiltersTemplate} from './components/filters.js';
import {createSortingTemplate} from './components/sorting.js';
import {createEventFormTemplate} from './components/event-form.js';
import {createTripEventsList} from './components/trip-events-list.js';
// import {createTripEventsTemplate} from './components/trip-events.js';

import {generateEvents} from './mock/trip-events.js';
import {generateEvent} from './mock/trip-events.js';

const tripEvents = generateEvents(POINT_COUNT);
export {tripEvents};
const tripEvent = generateEvent();

const render = (container, template, place = `afterbegin`) => {
  container.insertAdjacentHTML(place, template);
};

const tripMainElement = document.querySelector(`.trip-main`);
const tripControlsElement = document.querySelector(`.trip-controls`);
const tripEventsElement = document.querySelector(`.trip-events`);


render(tripMainElement, createRouteAndCostTemplate());
render(tripControlsElement.querySelector(`h2`), createMenuTemplate());
render(tripControlsElement, createFiltersTemplate(), `beforeend`);
render(tripEventsElement.querySelector(`h2`), createSortingTemplate(), `afterend`);

const tripSortingElement = document.querySelector(`.trip-sort`);

render(tripSortingElement, createEventFormTemplate(tripEvent), `afterend`);

render(tripEventsElement, createTripEventsList(), `beforeend`);

// const tripPointsElement = document.querySelector(`.trip-events__list`);

// еще тут очень странная штука, что почему-то точки маршрута рендерятся в обратном порядке. поэтому я пока как костыль прикрутил .reverse()

// tripEvents.reverse().forEach((event) => render(tripPointsElement, createTripEventsTemplate(event)));

// for (let i = 0; i < POINT_COUNT; i++) {
//   render(tripPointsElement, createTripEventsTemplate(), `afterbegin`);
// }
