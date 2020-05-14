import RouteAndCostComponent from './components/route-and-cost.js';
import MenuComponent from './components/menu.js';
import FiltersComponent from './components/filters.js';

import TripController from './controllers/trip-events-list.js';

import {render} from './utils/render.js';

const tripMainElement = document.querySelector(`.trip-main`);
const tripControlsElement = document.querySelector(`.trip-controls`);
const tripEventsElement = document.querySelector(`.trip-events`);

render(tripControlsElement.querySelector(`h2`), new MenuComponent());
render(tripControlsElement, new FiltersComponent(), `beforeend`);

render(tripMainElement, new RouteAndCostComponent());

const tripController = new TripController(tripEventsElement);
tripController.render();
