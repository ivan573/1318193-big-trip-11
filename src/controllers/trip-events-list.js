import {render, remove} from '../utils/render.js';

import NoEventsComponent from '../components/no-events.js';
import SortingComponent from '../components/sorting.js';
import LoadingComponent from '../components/loading.js';
import TripEventsListComponent, {SORTED_ARRRAY_KEY} from '../components/trip-events-list.js';

import TripEventController, {Mode as EventControllerMode, EmptyEvent} from './trip-event.js';

const sortedEventsKey = SORTED_ARRRAY_KEY;

const newEventButtonElement = document.querySelector(`.trip-main__event-add-btn`);

class TripController {
  constructor(container, eventsModel, destinationsModel, offersModel, api) {
    this._container = container;
    this._eventsModel = eventsModel;
    this._destinationsModel = destinationsModel;
    this._offersModel = offersModel;
    this._api = api;

    this._eventControllers = [];

    this._noEventsComponent = new NoEventsComponent();
    this._sortingComponent = new SortingComponent();
    this._loadingComponent = new LoadingComponent();
    this._tripEventsListComponent = null;

    this._newEventButtonElement = newEventButtonElement;

    this._creatingEvent = null;

    this._onDataChange = this._onDataChange.bind(this);
    this._onSortTypeChange = this._onSortTypeChange.bind(this);
    this._onViewChange = this._onViewChange.bind(this);
    // this._onFilterChange = this._onFilterChange.bind(this);
    this._onNewEventButtonClick = this._onNewEventButtonClick.bind(this);

    this._sortingComponent.setSortTypeChangeHandler(this._onSortTypeChange);
    this._eventsModel.setFilterChangeHandler(this._onSortTypeChange);

    this._newEventButtonElement.addEventListener(`click`, this._onNewEventButtonClick);
  }

  render() {
    this._newEventButtonElement.removeAttribute(`disabled`);

    const container = this._container.querySelector(`h2`);
    const events = this._eventsModel.getFilteredEvents();
    const areEventsAbsent = Object.keys(events).length === 0;

    if (this._loadingComponent) {
      remove(this._loadingComponent);
      this._loadingComponent = null;
    }

    if (areEventsAbsent && !this._creatingEvent) {
      render(this._container, this._noEventsComponent, `beforeend`);
      return;
    }

    render(container, this._sortingComponent, `afterend`);

    this._eventControllers = this._renderEvents(events, this._onDataChange, this._onViewChange);

    this._newEventButtonElement.removeAttribute(`disabled`);
  }

  renderLoadingMessage() {
    render(this._container, this._loadingComponent, `beforeend`);
  }

  createEvent() {

    this._onViewChange();

    if (this._eventsModel.getEvents().length === 0) {
      remove(this._noEventsComponent);
      if (this._tripEventsListComponent) {
        remove(this._tripEventsListComponent);
      }
      this._tripEventsListComponent = new TripEventsListComponent(this._eventsModel.getFilteredEvents());
      render(this._container, this._tripEventsListComponent, `beforeend`);
    }

    const eventsListElement = document.querySelector(`.trip-events__list`);

    this._creatingEvent = new TripEventController(eventsListElement, this._destinationsModel, this._offersModel, this._onDataChange, this._onViewChange);

    this._creatingEvent.render(EmptyEvent, EventControllerMode.ADDING);
  }

  _renderEvents(events, onDataChange, onViewChange) {

    const renderEvent = (event, container) => {
      const tripEventController = new TripEventController(container, this._destinationsModel, this._offersModel, onDataChange, onViewChange);
      tripEventController.render(event, EventControllerMode.DEFAULT);

      return tripEventController;
    };

    const eventControllers = [];

    this._tripEventsListComponent = new TripEventsListComponent(events);

    render(this._container, this._tripEventsListComponent, `beforeend`);

    const tripDayElements = document.querySelectorAll(`.trip-days__item`);

    if (Object.keys(events).length > 0) {

      tripDayElements.forEach((element) => {

        const eventsListElement = element.querySelector(`.trip-events__list`);

        if (events.hasOwnProperty(sortedEventsKey)) {
          events[sortedEventsKey].forEach((event) => {
            eventControllers.push(renderEvent(event, eventsListElement));
          });
        } else {
          const dayNumber = element.querySelector(`.day__counter`).textContent;

          events[dayNumber].forEach((event) => {
            eventControllers.push(renderEvent(event, eventsListElement));
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
    if (this._eventControllers.length === 0) {
      remove(this._sortingComponent);
      this.render();
    }
  }

  _onViewChange() {
    this._eventControllers.forEach((it) => {
      it.setDefaultView();
    });
  }

  _onDataChange(eventController, oldData, newData, mode = EventControllerMode.EDIT) {
    if (this._eventsModel.getEvents().length === 0) {
      render(this._container.querySelector(`h2`), this._sortingComponent, `afterend`);
    }

    if (oldData === EmptyEvent) {
      this._creatingEvent = null;
      if (newData === null) {
        eventController.destroy();
      } else {
        this._api.createEvent(newData)
          .then((eventModel) => {
            this._tasksModel.addTask(eventModel);
            eventController.render(eventModel, EventControllerMode.DEFAULT);
            // this.__eventControllers = [].concat(eventController, this._eventControllers);
            this._updateEvents();
          })
          .catch(() => {
            eventController.shake();
          });
      }
    } else if (newData === null) {
      // this._eventsModel.removeEvent(oldData.id);
      // this._updateEvents();

      this._api.deleteEvent(oldData.id)
        .then(() => {
          this._eventsModel.removeEvent(oldData.id);
          this._updateEvents();
        })
        .catch(() => {
          eventController.shake();
        });
    } else {
      this._api.updateEvent(oldData.id, newData)
        .then((eventModel) => {
          const isSuccess = this._eventsModel.updateEvent(oldData.id, eventModel);
          if (isSuccess) {
            eventController.render(eventModel, mode);
            this._updateEvents();
          }
        })
        .catch(() => {
          eventController.shake();
        });
    }
  }

  _onSortTypeChange() {
    this._eventsModel.setEvents(this._eventsModel.getEvents(), this._sortingComponent.getSortType());
    this._updateEvents();

    this._creatingEvent = null;
  }

  // _onFilterChange() {
  //   this._eventsModel.setEvents(this._eventsModel.getEvents(), this._sortingComponent.getSortType());
  //   this._updateEvents();

  //   this._creatingEvent = null;
  // }

  _onNewEventButtonClick() {
    if (this._creatingEvent) {
      return;
    } else {
      this.createEvent();
    }
  }
}

export {TripController as default};
