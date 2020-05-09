import RouteAndCostComponent from './components/route-and-cost.js';
import MenuComponent from './components/menu.js';
import FiltersComponent from './components/filters.js';
import SortingComponent from './components/sorting.js';
import EventFormComponent from './components/event-form.js';
import TripEventsListComponent from './components/trip-events-list.js';
import TripEventComponent from './components/trip-event.js';
import NoEventsComponent from './components/no-events.js';

import {eventsPerDay} from './components/trip-events-list.js';

import {render} from './utils.js';

const renderEvent = (dayElement, event) => {

  const replaceEventToEdit = () => {
    dayElement.replaceChild(eventFormComponent.getElement(), tripEventComponent.getElement());
  };

  const replaceEditToEvent = () => {
    dayElement.replaceChild(tripEventComponent.getElement(), eventFormComponent.getElement());
  };

  const onEscKeyDown = (evt) => {
    const isEscKey = evt.key === `Escape` || evt.key === `Esc`;

    if (isEscKey) {
      replaceEditToEvent();
      document.removeEventListener(`keydown`, onEscKeyDown);
    }
  };

  const tripEventComponent = new TripEventComponent(event);
  const editButton = tripEventComponent.getElement().querySelector(`button`);
  editButton.addEventListener(`click`, () => {
    replaceEventToEdit();
    document.addEventListener(`keydown`, onEscKeyDown);
  });

  const eventFormComponent = new EventFormComponent(event);
  const editForm = eventFormComponent.getElement().querySelector(`form`);
  editForm.addEventListener(`submit`, (evt) => {
    evt.preventDefault();
    replaceEditToEvent();
    document.removeEventListener(`keydown`, onEscKeyDown);
  });

  render(dayElement, tripEventComponent.getElement(), `beforeend`);
};

const renderEventsList = (structuredEvents) => {
  const tripEventsListElement = new TripEventsListComponent().getElement();

  if (Object.keys(structuredEvents).length === 0) {
    render(tripEventsElement, new NoEventsComponent().getElement(), `beforeend`);
    return;
  }

  render(tripMainElement, new RouteAndCostComponent().getElement());
  render(tripEventsElement.querySelector(`h2`), new SortingComponent().getElement(), `afterend`);

  render(tripEventsElement, tripEventsListElement, `beforeend`);

  const tripDayElements = document.querySelectorAll(`.trip-days__item`);

  tripDayElements.forEach((element) => {
    const dayNumber = element.querySelector(`.day__counter`).innerHTML;
    const eventsList = element.querySelector(`.trip-events__list`);

    structuredEvents[dayNumber].forEach((event) => {
      renderEvent(eventsList, event);
    });
  });
};

const tripMainElement = document.querySelector(`.trip-main`);
const tripControlsElement = document.querySelector(`.trip-controls`);
const tripEventsElement = document.querySelector(`.trip-events`);

render(tripControlsElement.querySelector(`h2`), new MenuComponent().getElement());
render(tripControlsElement, new FiltersComponent().getElement(), `beforeend`);

renderEventsList(eventsPerDay);
