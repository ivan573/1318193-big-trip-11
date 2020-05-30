import API from "./api.js";
import MenuComponent from './components/menu.js';

import FiltersController from './controllers/filters.js';
import TripController from './controllers/trip-events-list.js';

import EventsModel from "./models/trip-events.js";
import DestinationsModel from "./models/destinations.js";
import OffersModel from "./models/offers.js";

import {render} from './utils/render.js';

// import {generateEvents} from './mock/trip-events.js';

// const EVENTS_COUNT = 3; // 15;

const AUTHORIZATION = `Basic h3770s3rv3rh0wru`;

const api = new API(AUTHORIZATION);

const tripControlsElement = document.querySelector(`.trip-controls`);
const tripEventsElement = document.querySelector(`.trip-events`);

// const tripEvents = generateEvents(EVENTS_COUNT);
const eventsModel = new EventsModel();
// eventsModel.setEvents(tripEvents);
const destinationsModel = new DestinationsModel();
const offersModel = new OffersModel();

render(tripControlsElement.querySelector(`h2`), new MenuComponent());
const filtersController = new FiltersController(tripControlsElement, eventsModel);
filtersController.render();

const tripController = new TripController(tripEventsElement, eventsModel, destinationsModel, offersModel);

tripController.renderLoadingMessage();

const loadPromises = [
  api.getDestinations()
  .then((destinations) => {
    destinationsModel.setDestinations(destinations);
  }),
  api.getOffers()
  .then((offers) => {
    offersModel.setOffers(offers);
  }),
  api.getEvents()
  .then((events) => {
    eventsModel.setEvents(events);
  })
];

Promise.all(loadPromises)
  .then(() => tripController.render());
