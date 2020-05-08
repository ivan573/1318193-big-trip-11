import RouteAndCostComponent from './components/route-and-cost.js';
import MenuComponent from './components/menu.js';
import FiltersComponent from './components/filters.js';
import SortingComponent from './components/sorting.js';
import EventFormComponent from './components/event-form.js';
import TripEventsListComponent from './components/trip-events-list.js';
import TripEventComponent from './components/trip-event.js';

import {eventsPerDay} from './components/trip-events-list.js';

import {render} from './utils.js';

const renderEvent = (dayElement, event) => {

  const onEditButtonClick = () => {
    dayElement.replaceChild(eventFormComponent.getElement(), tripEventComponent.getElement());
  };

  const onEditFormSubmit = (evt) => {
    evt.preventDefault();
    dayElement.replaceChild(tripEventComponent.getElement(), eventFormComponent.getElement());
  };

  const tripEventComponent = new TripEventComponent(event);
  const editButton = tripEventComponent.getElement().querySelector(`button`);
  editButton.addEventListener(`click`, onEditButtonClick);

  const eventFormComponent = new EventFormComponent(event);
  const editForm = eventFormComponent.getElement().querySelector(`form`);
  editForm.addEventListener(`submit`, onEditFormSubmit);

  render(dayElement, tripEventComponent.getElement(), `beforeend`);
};

const tripMainElement = document.querySelector(`.trip-main`);
const tripControlsElement = document.querySelector(`.trip-controls`);
const tripEventsElement = document.querySelector(`.trip-events`);


render(tripMainElement, new RouteAndCostComponent().getElement());
render(tripControlsElement.querySelector(`h2`), new MenuComponent().getElement());
render(tripControlsElement, new FiltersComponent().getElement(), `beforeend`);
render(tripEventsElement.querySelector(`h2`), new SortingComponent().getElement(), `afterend`);
render(tripEventsElement, new TripEventsListComponent().getElement(), `beforeend`);

const tripDayElements = document.querySelectorAll(`.trip-days__item`);

tripDayElements.forEach((element) => {
  const dayNumber = element.querySelector(`.day__counter`).innerHTML;
  const eventsList = element.querySelector(`.trip-events__list`);

  eventsPerDay[dayNumber].forEach((event) => {
    renderEvent(eventsList, event);
  });
});
