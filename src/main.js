import RouteAndCostComponent from './components/route-and-cost.js';
import MenuComponent from './components/menu.js';
import FiltersComponent from './components/filters.js';
import SortingComponent from './components/sorting.js';
// import EventFormComponent from './components/event-form.js';
import TripEventsListComponent from './components/trip-events-list.js';

// import {generateEvent} from './mock/trip-events.js';

import {render} from './utils.js';

// const tripEvent = generateEvent();

const tripMainElement = document.querySelector(`.trip-main`);
const tripControlsElement = document.querySelector(`.trip-controls`);
const tripEventsElement = document.querySelector(`.trip-events`);


render(tripMainElement, new RouteAndCostComponent().getElement());
render(tripControlsElement.querySelector(`h2`), new MenuComponent().getElement());
render(tripControlsElement, new FiltersComponent().getElement(), `beforeend`);

// const sortingComponent = new SortingComponent();
render(tripEventsElement.querySelector(`h2`), new SortingComponent().getElement(), `afterend`);

// render(sortingComponent.getElement(), new EventFormComponent(tripEvent).getElement(), `afterend`);

render(tripEventsElement, new TripEventsListComponent().getElement(), `beforeend`);
