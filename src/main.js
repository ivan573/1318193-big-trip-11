import RouteAndCostComponent from './components/route-and-cost.js';
import MenuComponent from './components/menu.js';

import FiltersController from './controllers/filters.js';
import TripController from './controllers/trip-events-list.js';

import EventsModel from "./models/trip-events.js";

import {render} from './utils/render.js';

import {generateEvents} from './mock/trip-events.js';

const EVENTS_COUNT = 15;

const tripMainElement = document.querySelector(`.trip-main`);
const tripControlsElement = document.querySelector(`.trip-controls`);
const tripEventsElement = document.querySelector(`.trip-events`);

const tripEvents = generateEvents(EVENTS_COUNT);
const eventsModel = new EventsModel();
eventsModel.setEvents(tripEvents);

render(tripControlsElement.querySelector(`h2`), new MenuComponent());
const filtersController = new FiltersController(tripControlsElement, eventsModel);
filtersController.render();

render(tripMainElement, new RouteAndCostComponent());

const tripController = new TripController(tripEventsElement, eventsModel);
tripController.render();
