import API from "./api.js";
import StatisticsComponent from "./components/statistics.js";
import MenuComponent, {MenuItem} from './components/menu.js';
import FiltersController from './controllers/filters.js';
import TripController from './controllers/trip.js';
import EventsModel from "./models/trip-events.js";
import DestinationsModel from "./models/destinations.js";
import OffersModel from "./models/offers.js";
import {RenderPosition, render} from './utils/render.js';

const AUTHORIZATION = `Basic h3770s3rv3rh0wru`;
const END_POINT = `https://11.ecmascript.pages.academy/big-trip`;

const api = new API(END_POINT, AUTHORIZATION);

const tripControlsElement = document.querySelector(`.trip-controls`);
const tripEventsElement = document.querySelector(`.trip-events`);

const eventsModel = new EventsModel();
const destinationsModel = new DestinationsModel();
const offersModel = new OffersModel();

const menuComponent = new MenuComponent();

render(tripControlsElement.querySelector(`h2`), menuComponent, RenderPosition.AFTEREND);
const filtersController = new FiltersController(tripControlsElement, eventsModel);
filtersController.render();

const tripController = new TripController(tripEventsElement, filtersController, eventsModel, destinationsModel, offersModel, api);

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

Promise.all(loadPromises).then(() => {
  tripController.render();
});

const statisticsComponent = new StatisticsComponent(eventsModel);
render(tripEventsElement, statisticsComponent, RenderPosition.AFTEREND);

statisticsComponent.hide();

menuComponent.setOnChange((menuItem) => {
  switch (menuItem) {
    case `Table`:
      statisticsComponent.hide();
      tripController.show();
      menuComponent.setActiveItem(MenuItem.TABLE);
      break;
    case `Stats`:
      tripController.hide();
      statisticsComponent.show();
      menuComponent.setActiveItem(MenuItem.STATS);
      break;
  }
});
