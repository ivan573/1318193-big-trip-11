import {render, remove} from '../utils/render.js';

import NoEventsComponent from '../components/no-events.js';
import SortingComponent from '../components/sorting.js';
import TripEventsListComponent, {SORTED_ARRRAY_KEY} from '../components/trip-events-list.js';

import TripEventController, {Mode as EventControllerMode, EmptyEvent} from './trip-event.js';

const sortedEventsKey = SORTED_ARRRAY_KEY;

const newEventButtonElement = document.querySelector(`.trip-main__event-add-btn`);

class TripController {
  constructor(container, eventsModel) {
    this._container = container;
    this._eventsModel = eventsModel;

    this._eventControllers = [];

    this._noEventsComponent = new NoEventsComponent();
    this._sortingComponent = new SortingComponent();
    this._tripEventsListComponent = null;

    this._newEventButtonElement = newEventButtonElement;

    this._creatingEvent = null;

    this._onDataChange = this._onDataChange.bind(this);
    this._onSortTypeChange = this._onSortTypeChange.bind(this);
    this._onViewChange = this._onViewChange.bind(this);
    this._onFilterChange = this._onFilterChange.bind(this);
    this._onNewEventButtonClick = this._onNewEventButtonClick.bind(this);

    this._sortingComponent.setSortTypeChangeHandler(this._onSortTypeChange);
    this._eventsModel.setFilterChangeHandler(this._onFilterChange);

    this._newEventButtonElement.addEventListener(`click`, this._onNewEventButtonClick);
  }

  render() {
    const container = this._container.querySelector(`h2`);
    const events = this._eventsModel.getFilteredEvents();

    const areEventsAbsent = Object.keys(events).length === 0;

    if (areEventsAbsent) {
      render(this._container, this._noEventsComponent, `beforeend`);
      return;
    }

    render(container, this._sortingComponent, `afterend`);

    this._eventControllers = this._renderEvents(events, this._onDataChange, this._onViewChange);
  }

  createEvent() {
    if (this._creatingEvent) {
      return;
    }

    this._onViewChange();

    const tripDayElement = document.querySelector(`.trip-events__list`);

    this._creatingEvent = new TripEventController(tripDayElement, this._onDataChange, this._onViewChange);
    // this._eventControllers.unshift(this._creatingEvent);
    this._creatingEvent.render(EmptyEvent, EventControllerMode.ADDING);
  }

  _renderEvents(events, onDataChange, onViewChange) {

    const renderEvent = (event, container) => {
      const tripEventController = new TripEventController(container, onDataChange, onViewChange);
      tripEventController.render(event, EventControllerMode.DEFAULT);

      return tripEventController;
    };

    const eventControllers = [];

    this._tripEventsListComponent = new TripEventsListComponent(events);

    render(this._container, this._tripEventsListComponent, `beforeend`);

    const tripDayElements = document.querySelectorAll(`.trip-days__item`);

    if (Object.keys(events).length > 0) {
      tripDayElements.forEach((element) => {

        const eventsList = element.querySelector(`.trip-events__list`);

        if (events.hasOwnProperty(sortedEventsKey)) {
          events[sortedEventsKey].forEach((event) => {
            eventControllers.push(renderEvent(event, eventsList));
          });
        } else {
          const dayNumber = element.querySelector(`.day__counter`).textContent;

          events[dayNumber].forEach((event) => {
            eventControllers.push(renderEvent(event, eventsList));
          });
        }
      });

    }

    return eventControllers;
  }

  _removeEvents() {
    this._eventControllers.forEach((it) => {
      it.destroy();
    });
    this._eventControllers = [];
  }

  _updateEvents() {
    this._removeEvents();
    remove(this._tripEventsListComponent);
    this._eventControllers = this._renderEvents(this._eventsModel.getFilteredEvents(), this._onDataChange, this._onViewChange);
  }

  _onViewChange() {
    this._eventControllers.forEach((it) => {
      it.setDefaultView();
    });
  }

  _onDataChange(eventController, oldData, newData, mode = EventControllerMode.EDIT) {
    if (oldData === EmptyEvent) {
      this._creatingEvent = null;
      if (newData === null) {
        eventController.destroy();
      } else {
        this._eventsModel.addEvent(newData);
        eventController.render(newData, EventControllerMode.DEFAULT);

        this.__eventControllers = [].concat(eventController, this._eventControllers);

        this._updateEvents();
      }
    } else if (newData === null) {
      this._eventsModel.removeEvent(oldData.id);
      this._updateEvents();
    } else {
      const isSuccess = this._eventsModel.updateEvent(oldData.id, newData);

      if (isSuccess) {
        eventController.render(newData, mode);
        this._updateEvents();
      }
    }
  }

  _onSortTypeChange() {
    this._removeEvents();
    remove(this._tripEventsListComponent);
    this._eventsModel.setEvents(this._eventsModel.getEvents(), this._sortingComponent.getSortType());
    this._eventControllers = this._renderEvents(this._eventsModel.getFilteredEvents(), this._onDataChange, this._onViewChange);

    this._creatingEvent = null;
  }

  _onFilterChange() {
    this._updateEvents();

    this._creatingEvent = null;
  }

  _onNewEventButtonClick() {
    this.createEvent();
  }
}

export {TripController as default};
