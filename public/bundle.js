/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/main.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/components/event-form.js":
/*!**************************************!*\
  !*** ./src/components/event-form.js ***!
  \**************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return EventForm; });
/* harmony import */ var _utils_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils.js */ "./src/utils.js");


const creareOffersTemplate = (offers) => {
  let template = ``;

  offers.forEach((it) => {
    template +=
    /* html */
    `<div class="event__offer-selector">
      <input class="event__offer-checkbox  visually-hidden" id="event-offer-${it.shortTitle}-1" type="checkbox" name="event-offer-${it.shortTitle}" checked>
      <label class="event__offer-label" for="event-offer-${it.shortTitle}-1">
        <span class="event__offer-title">${it.title}</span>
        &plus;
        &euro;&nbsp;<span class="event__offer-price">${it.price}</span>
      </label>
    </div>` + `\n`;
  });

  return template;
};

const createPhotosTemplate = (photos) => {
  let template = ``;

  photos.forEach((it) => {
    template += /* html */ `<img class="event__photo" src="${it}" alt="Event photo"></img>` + `\n`;
  });

  return template;
};

const createEventFormTemplate = (event) => {
  const {type, destination, startDate, endDate, cost, extraOffers, info} = event;
  return (
    /* html */
    `<li class="trip-events__item">
        <form class="trip-events__item  event  event--edit" action="#" method="post">
          <header class="event__header">
            <div class="event__type-wrapper">
              <label class="event__type  event__type-btn" for="event-type-toggle-1">
                <span class="visually-hidden">Choose event type</span>
                <img class="event__type-icon" width="17" height="17" src="img/icons/${type.toLowerCase()}.png" alt="Event type icon">
              </label>
              <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox">

              <div class="event__type-list">
                <fieldset class="event__type-group">
                  <legend class="visually-hidden">Transfer</legend>

                  <div class="event__type-item">
                    <input id="event-type-taxi-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="taxi">
                    <label class="event__type-label  event__type-label--taxi" for="event-type-taxi-1">Taxi</label>
                  </div>

                  <div class="event__type-item">
                    <input id="event-type-bus-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="bus">
                    <label class="event__type-label  event__type-label--bus" for="event-type-bus-1">Bus</label>
                  </div>

                  <div class="event__type-item">
                    <input id="event-type-train-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="train">
                    <label class="event__type-label  event__type-label--train" for="event-type-train-1">Train</label>
                  </div>

                  <div class="event__type-item">
                    <input id="event-type-ship-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="ship">
                    <label class="event__type-label  event__type-label--ship" for="event-type-ship-1">Ship</label>
                  </div>

                  <div class="event__type-item">
                    <input id="event-type-transport-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="transport">
                    <label class="event__type-label  event__type-label--transport" for="event-type-transport-1">Transport</label>
                  </div>

                  <div class="event__type-item">
                    <input id="event-type-drive-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="drive">
                    <label class="event__type-label  event__type-label--drive" for="event-type-drive-1">Drive</label>
                  </div>

                  <div class="event__type-item">
                    <input id="event-type-flight-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="flight" checked>
                    <label class="event__type-label  event__type-label--flight" for="event-type-flight-1">Flight</label>
                  </div>
                </fieldset>

                <fieldset class="event__type-group">
                  <legend class="visually-hidden">Activity</legend>

                  <div class="event__type-item">
                    <input id="event-type-check-in-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="check-in">
                    <label class="event__type-label  event__type-label--check-in" for="event-type-check-in-1">Check-in</label>
                  </div>

                  <div class="event__type-item">
                    <input id="event-type-sightseeing-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="sightseeing">
                    <label class="event__type-label  event__type-label--sightseeing" for="event-type-sightseeing-1">Sightseeing</label>
                  </div>

                  <div class="event__type-item">
                    <input id="event-type-restaurant-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="restaurant">
                    <label class="event__type-label  event__type-label--restaurant" for="event-type-restaurant-1">Restaurant</label>
                  </div>
                </fieldset>
              </div>
            </div>

            <div class="event__field-group  event__field-group--destination">
              <label class="event__label  event__type-output" for="event-destination-1">
                ${Object(_utils_js__WEBPACK_IMPORTED_MODULE_0__["formatType"])(type)}
              </label>
              <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value="${destination}" list="destination-list-1">
              <datalist id="destination-list-1">
                <option value="Amsterdam"></option>
                <option value="Geneva"></option>
                <option value="Chamonix"></option>
                <option value="Saint Petersburg"></option>
              </datalist>
            </div>

            <div class="event__field-group  event__field-group--time">
              <label class="visually-hidden" for="event-start-time-1">
                From
              </label>
              <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" value="${Object(_utils_js__WEBPACK_IMPORTED_MODULE_0__["formatDate"])(startDate)}">
              &mdash;
              <label class="visually-hidden" for="event-end-time-1">
                To
              </label>
              <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" value="${Object(_utils_js__WEBPACK_IMPORTED_MODULE_0__["formatDate"])(endDate)}">
            </div>

            <div class="event__field-group  event__field-group--price">
              <label class="event__label" for="event-price-1">
                <span class="visually-hidden">Price</span>
                &euro;
              </label>
              <input class="event__input  event__input--price" id="event-price-1" type="text" name="event-price" value="${cost}">
            </div>

            <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
            <button class="event__reset-btn" type="reset">Cancel</button>
          </header>
          <section class="event__details">
            <section class="event__section  event__section--offers">
              <h3 class="event__section-title  event__section-title--offers">Offers</h3>

              <div class="event__available-offers">
                ${creareOffersTemplate(extraOffers)}
              </div>
            </section>

            <section class="event__section  event__section--destination">
              <h3 class="event__section-title  event__section-title--destination">Destination</h3>
              <p class="event__destination-description">${info.description}</p>

              <div class="event__photos-container">
                <div class="event__photos-tape">
                  ${createPhotosTemplate(info.photos)}
                </div>
              </div>
            </section>
          </section>
      </form>
    </li>`
  );
};

class EventForm {
  constructor(event) {
    this._element = null;

    this._event = event;
  }

  getTemplate() {
    return createEventFormTemplate(this._event);
  }

  getElement() {
    if (!this._element) {
      this._element = Object(_utils_js__WEBPACK_IMPORTED_MODULE_0__["createElement"])(this.getTemplate());
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}




/***/ }),

/***/ "./src/components/filters.js":
/*!***********************************!*\
  !*** ./src/components/filters.js ***!
  \***********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Filters; });
/* harmony import */ var _utils_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils.js */ "./src/utils.js");


const createFiltersTemplate = () => {
  return (
    /* html */
    `<div class="trip-main__trip-controls  trip-controls">
      <h2 class="visually-hidden">Switch trip view</h2>
      <nav class="trip-controls__trip-tabs  trip-tabs">
        <a class="trip-tabs__btn  trip-tabs__btn--active" href="#">Table</a>
        <a class="trip-tabs__btn" href="#">Stats</a>
      </nav>

      <h2 class="visually-hidden">Filter events</h2>
      <form class="trip-filters" action="#" method="get">
        <div class="trip-filters__filter">
          <input id="filter-everything" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="everything" checked>
          <label class="trip-filters__filter-label" for="filter-everything">Everything</label>
        </div>

        <div class="trip-filters__filter">
          <input id="filter-future" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="future">
          <label class="trip-filters__filter-label" for="filter-future">Future</label>
        </div>

        <div class="trip-filters__filter">
          <input id="filter-past" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="past">
          <label class="trip-filters__filter-label" for="filter-past">Past</label>
        </div>

        <button class="visually-hidden" type="submit">Accept filter</button>
      </form>
    </div>`
  );
};

class Filters {
  constructor() {
    this._element = null;
  }

  getTemplate() {
    return createFiltersTemplate();
  }

  getElement() {
    if (!this._element) {
      this._element = Object(_utils_js__WEBPACK_IMPORTED_MODULE_0__["createElement"])(this.getTemplate());
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}




/***/ }),

/***/ "./src/components/menu.js":
/*!********************************!*\
  !*** ./src/components/menu.js ***!
  \********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return MenuTemplate; });
/* harmony import */ var _utils_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils.js */ "./src/utils.js");


const createMenuTemplate = () => {
  return (
    /* html */
    `<nav class="trip-controls__trip-tabs  trip-tabs">
      <a class="trip-tabs__btn  trip-tabs__btn--active" href="#">Table</a>
      <a class="trip-tabs__btn" href="#">Stats</a>
    </nav>`
  );
};

class MenuTemplate {
  constructor() {
    this._element = null;
  }

  getTemplate() {
    return createMenuTemplate();
  }

  getElement() {
    if (!this._element) {
      this._element = Object(_utils_js__WEBPACK_IMPORTED_MODULE_0__["createElement"])(this.getTemplate());
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}




/***/ }),

/***/ "./src/components/route-and-cost.js":
/*!******************************************!*\
  !*** ./src/components/route-and-cost.js ***!
  \******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return RouteAndCost; });
/* harmony import */ var _utils_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils.js */ "./src/utils.js");


const createRouteAndCostTemplate = () => {
  return (
    /* html */
    `<section class="trip-main__trip-info  trip-info">
      <div class="trip-info__main">
        <h1 class="trip-info__title">Amsterdam &mdash; Chamonix &mdash; Geneva</h1>

        <p class="trip-info__dates">Mar 18&nbsp;&mdash;&nbsp;20</p>
      </div>

      <p class="trip-info__cost">
        Total: &euro;&nbsp;<span class="trip-info__cost-value">1230</span>
      </p>
    </section>`
  );
};

class RouteAndCost {
  constructor() {
    this._element = null;
  }

  getTemplate() {
    return createRouteAndCostTemplate();
  }

  getElement() {
    if (!this._element) {
      this._element = Object(_utils_js__WEBPACK_IMPORTED_MODULE_0__["createElement"])(this.getTemplate());
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}




/***/ }),

/***/ "./src/components/sorting.js":
/*!***********************************!*\
  !*** ./src/components/sorting.js ***!
  \***********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Sorting; });
/* harmony import */ var _utils_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils.js */ "./src/utils.js");


const createSortingTemplate = () => {
  return (
    /* html */
    `<form class="trip-events__trip-sort  trip-sort" action="#" method="get">
      <span class="trip-sort__item  trip-sort__item--day"></span>

      <div class="trip-sort__item  trip-sort__item--event">
        <input id="sort-event" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-event">
        <label class="trip-sort__btn" for="sort-event">Event</label>
      </div>

      <div class="trip-sort__item  trip-sort__item--time">
        <input id="sort-time" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-time" checked>
        <label class="trip-sort__btn  trip-sort__btn--active  trip-sort__btn--by-increase" for="sort-time">
          Time
        </label>
      </div>

      <div class="trip-sort__item  trip-sort__item--price">
        <input id="sort-price" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-price">
        <label class="trip-sort__btn" for="sort-price">
          Price
        </label>
      </div>

      <span class="trip-sort__item  trip-sort__item--offers">Offers</span>
    </form>`
  );
};

class Sorting {
  constructor() {
    this._element = null;
  }

  getTemplate() {
    return createSortingTemplate();
  }

  getElement() {
    if (!this._element) {
      this._element = Object(_utils_js__WEBPACK_IMPORTED_MODULE_0__["createElement"])(this.getTemplate());
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}




/***/ }),

/***/ "./src/components/trip-event.js":
/*!**************************************!*\
  !*** ./src/components/trip-event.js ***!
  \**************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return TripEvent; });
/* harmony import */ var _utils_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils.js */ "./src/utils.js");


const createOffersTemplate = (offers) => {
  let template = ``;
  offers.forEach((it) => (
    template +=
    /* html */
    `<li class="event__offer">
      <span class="event__offer-title">${it.title}</span>
      &plus;
      &euro;&nbsp;<span class="event__offer-price">${it.price}</span>
    </li>` + `\n`
  ));
  return template;
};

const createTripEventTemplate = (event) => {
  const {type, startDate, endDate, cost, extraOffers} = event;

  return (
    /* html */
    `<li class="trip-events__item">
      <div class="event">
        <div class="event__type">
          <img class="event__type-icon" width="42" height="42" src="img/icons/${type.toLowerCase()}.png" alt="Event type icon">
        </div>
        <h3 class="event__title">${Object(_utils_js__WEBPACK_IMPORTED_MODULE_0__["getEventTitle"])(event)}</h3>

        <div class="event__schedule">
          <p class="event__time">
            <time class="event__start-time" datetime="${Object(_utils_js__WEBPACK_IMPORTED_MODULE_0__["getFullDate"])(startDate)}">${Object(_utils_js__WEBPACK_IMPORTED_MODULE_0__["getTime"])(startDate)}</time>
            &mdash;
            <time class="event__end-time" datetime="${Object(_utils_js__WEBPACK_IMPORTED_MODULE_0__["getFullDate"])(endDate)}">${Object(_utils_js__WEBPACK_IMPORTED_MODULE_0__["getTime"])(endDate)}</time>
          </p>
          <p class="event__duration">${Object(_utils_js__WEBPACK_IMPORTED_MODULE_0__["getDuration"])(startDate, endDate)}</p>
        </div>

        <p class="event__price">
          &euro;&nbsp;<span class="event__price-value">${cost}</span>
        </p>

        <h4 class="visually-hidden">Offers:</h4>
        <ul class="event__selected-offers">
          ${createOffersTemplate(extraOffers)}
        </ul>

        <button class="event__rollup-btn" type="button">
          <span class="visually-hidden">Open event</span>
        </button>
      </div>
    </li>`
  );
};

class TripEvent {
  constructor(event) {
    this._element = null;

    this._event = event;
  }

  getTemplate() {
    return createTripEventTemplate(this._event);
  }

  getElement() {
    if (!this._element) {
      this._element = Object(_utils_js__WEBPACK_IMPORTED_MODULE_0__["createElement"])(this.getTemplate());
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}




/***/ }),

/***/ "./src/components/trip-events-list.js":
/*!********************************************!*\
  !*** ./src/components/trip-events-list.js ***!
  \********************************************/
/*! exports provided: default, eventsPerDay */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return TripEventsList; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "eventsPerDay", function() { return eventsPerDay; });
/* harmony import */ var _mock_trip_events_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../mock/trip-events.js */ "./src/mock/trip-events.js");
/* harmony import */ var _const_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../const.js */ "./src/const.js");
/* harmony import */ var _utils_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../utils.js */ "./src/utils.js");
const EVENTS_COUNT = 15;





const tripEvents = Object(_mock_trip_events_js__WEBPACK_IMPORTED_MODULE_0__["generateEvents"])(EVENTS_COUNT);

const eventsPerDay = {};

const createTripDay = (day, month, year, index) => {

  return (
    /* html */
    `<li class="trip-days__item  day">
      <div class="day__info">
        <span class="day__counter">${index}</span>
        <time class="day__date" datetime="${year}-${Object(_utils_js__WEBPACK_IMPORTED_MODULE_2__["formatTime"])(month)}-${Object(_utils_js__WEBPACK_IMPORTED_MODULE_2__["formatTime"])(day)}">${_const_js__WEBPACK_IMPORTED_MODULE_1__["MONTHS"][month]} ${day}</time>
      </div>
      <ul class="trip-events__list">
      </ul>
    </li>`);
};

const isSameDate = (originalDate, checkedDate) => {
  return Object(_utils_js__WEBPACK_IMPORTED_MODULE_2__["convertDateToString"])(originalDate) === Object(_utils_js__WEBPACK_IMPORTED_MODULE_2__["convertDateToString"])(checkedDate);
};

const createTripDaysTemplate = (events) => {

  const uniqueDays = {};
  events.forEach((it) => {
    uniqueDays[Object(_utils_js__WEBPACK_IMPORTED_MODULE_2__["convertDateToString"])(it.startDate)] = it.startDate;
  });

  let template = ``;
  let counter = 1;

  for (const day in uniqueDays) {
    if (uniqueDays[day] instanceof Date) {

      const correspondingEvents = [];

      events.forEach((event) => {

        if (isSameDate(uniqueDays[day], event.startDate)) {
          correspondingEvents.push(event);
        }

      });

      template += createTripDay(uniqueDays[day].getDate(), uniqueDays[day].getMonth(), uniqueDays[day].getFullYear(),
          counter) + `\n`;

      eventsPerDay[(counter).toString()] = correspondingEvents;

      counter++;
    }
  }

  return template;
};


const createTripEventsList = () => {
  return (
    /* html */
    `<ul class="trip-days">
      ${createTripDaysTemplate(tripEvents)}
    </ul>`
  );
};

class TripEventsList {
  constructor() {
    this._element = null;
  }

  getTemplate() {
    return createTripEventsList();
  }

  getElement() {
    if (!this._element) {
      this._element = Object(_utils_js__WEBPACK_IMPORTED_MODULE_2__["createElement"])(this.getTemplate());
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}




/***/ }),

/***/ "./src/const.js":
/*!**********************!*\
  !*** ./src/const.js ***!
  \**********************/
/*! exports provided: EVENT_TYPES, MONTHS */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "EVENT_TYPES", function() { return EVENT_TYPES; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MONTHS", function() { return MONTHS; });
const EVENT_TYPES = [
  `Taxi`,
  `Bus`,
  `Train`,
  `Ship`,
  `Transport`,
  `Drive`,
  `Flight`,
  `Check-in`,
  `Sightseeing`,
  `Restaurant`
];

const MONTHS = {
  0: `JAN`,
  1: `FEB`,
  2: `MAR`,
  3: `APR`,
  4: `MAY`,
  5: `JUN`,
  6: `JUL`,
  7: `AUG`,
  8: `SEP`,
  9: `OCT`,
  10: `NOV`,
  11: `DEC`
};




/***/ }),

/***/ "./src/main.js":
/*!*********************!*\
  !*** ./src/main.js ***!
  \*********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _components_route_and_cost_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./components/route-and-cost.js */ "./src/components/route-and-cost.js");
/* harmony import */ var _components_menu_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./components/menu.js */ "./src/components/menu.js");
/* harmony import */ var _components_filters_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./components/filters.js */ "./src/components/filters.js");
/* harmony import */ var _components_sorting_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./components/sorting.js */ "./src/components/sorting.js");
/* harmony import */ var _components_event_form_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./components/event-form.js */ "./src/components/event-form.js");
/* harmony import */ var _components_trip_events_list_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./components/trip-events-list.js */ "./src/components/trip-events-list.js");
/* harmony import */ var _components_trip_event_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./components/trip-event.js */ "./src/components/trip-event.js");
/* harmony import */ var _utils_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./utils.js */ "./src/utils.js");












const renderEvent = (dayElement, event) => {

  const onEditButtonClick = () => {
    dayElement.replaceChild(eventFormComponent.getElement(), tripEventComponent.getElement());
  };

  const onEditFormSubmit = (evt) => {
    evt.preventDefault();
    dayElement.replaceChild(tripEventComponent.getElement(), eventFormComponent.getElement());
  };

  const tripEventComponent = new _components_trip_event_js__WEBPACK_IMPORTED_MODULE_6__["default"](event);
  const editButton = tripEventComponent.getElement().querySelector(`button`);
  editButton.addEventListener(`click`, onEditButtonClick);

  const eventFormComponent = new _components_event_form_js__WEBPACK_IMPORTED_MODULE_4__["default"](event);
  const editForm = eventFormComponent.getElement().querySelector(`form`);
  editForm.addEventListener(`submit`, onEditFormSubmit);

  Object(_utils_js__WEBPACK_IMPORTED_MODULE_7__["render"])(dayElement, tripEventComponent.getElement(), `beforeend`);
};

const tripMainElement = document.querySelector(`.trip-main`);
const tripControlsElement = document.querySelector(`.trip-controls`);
const tripEventsElement = document.querySelector(`.trip-events`);


Object(_utils_js__WEBPACK_IMPORTED_MODULE_7__["render"])(tripMainElement, new _components_route_and_cost_js__WEBPACK_IMPORTED_MODULE_0__["default"]().getElement());
Object(_utils_js__WEBPACK_IMPORTED_MODULE_7__["render"])(tripControlsElement.querySelector(`h2`), new _components_menu_js__WEBPACK_IMPORTED_MODULE_1__["default"]().getElement());
Object(_utils_js__WEBPACK_IMPORTED_MODULE_7__["render"])(tripControlsElement, new _components_filters_js__WEBPACK_IMPORTED_MODULE_2__["default"]().getElement(), `beforeend`);
Object(_utils_js__WEBPACK_IMPORTED_MODULE_7__["render"])(tripEventsElement.querySelector(`h2`), new _components_sorting_js__WEBPACK_IMPORTED_MODULE_3__["default"]().getElement(), `afterend`);
Object(_utils_js__WEBPACK_IMPORTED_MODULE_7__["render"])(tripEventsElement, new _components_trip_events_list_js__WEBPACK_IMPORTED_MODULE_5__["default"]().getElement(), `beforeend`);

const tripDayElements = document.querySelectorAll(`.trip-days__item`);

tripDayElements.forEach((element) => {
  const dayNumber = element.querySelector(`.day__counter`).innerHTML;
  const eventsList = element.querySelector(`.trip-events__list`);

  _components_trip_events_list_js__WEBPACK_IMPORTED_MODULE_5__["eventsPerDay"][dayNumber].forEach((event) => {
    renderEvent(eventsList, event);
  });
});


/***/ }),

/***/ "./src/mock/trip-events.js":
/*!*********************************!*\
  !*** ./src/mock/trip-events.js ***!
  \*********************************/
/*! exports provided: generateEvent, generateEvents */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "generateEvent", function() { return generateEvent; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "generateEvents", function() { return generateEvents; });
/* harmony import */ var _const_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../const.js */ "./src/const.js");


const MINUTES_INCREMENT = 5;
const COST_INCREMENT = 10;
const MAX_SENTENCES = 5;

const destinations = [
  `Amsterdam`,
  `Geneva`,
  `Chamonix`,
  `Saint Petersburg`
];

const descriptionSentences = [
  `Lorem ipsum dolor sit amet, consectetur adipiscing elit.`,
  `Cras aliquet varius magna, non porta ligula feugiat eget.`,
  `Fusce tristique felis at fermentum pharetra.`,
  `Aliquam id orci ut lectus varius viverra.`,
  `Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante.`,
  `Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum.`,
  `Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui.`,
  `Sed sed nisi sed augue convallis suscipit in sed felis.`,
  `Aliquam erat volutpat.`,
  `Nunc fermentum tortor ac porta dapibus.`,
  `In rutrum ac purus sit amet tempus.`
];

const getRandomArrayElement = (array) => {
  return array[Math.floor(Math.random() * array.length)];
};

const getRandomDate = (date = new Date()) => {
  const targetDate = date;

  const targetDateMinutes = targetDate.getMinutes();

  const currentMinutes = targetDateMinutes % 5 !== 0 ?
    Math.floor(targetDateMinutes / MINUTES_INCREMENT) * MINUTES_INCREMENT : targetDateMinutes;

  const minutesToAdd = Math.ceil(Math.random() * 24) * MINUTES_INCREMENT; // 5 minutes-2 hours

  targetDate.setMinutes(currentMinutes + minutesToAdd);

  return targetDate;
};

const getRandomDescription = () => {

  return new Array(Math.ceil(Math.random() * MAX_SENTENCES)).fill(``).map(() => {
    return descriptionSentences[Math.round(Math.random() * descriptionSentences.length - 1)];
  }).join(` `);
};

const generateEvent = () => {
  const startDate = getRandomDate();

  return {
    type: getRandomArrayElement(_const_js__WEBPACK_IMPORTED_MODULE_0__["EVENT_TYPES"]),
    destination: getRandomArrayElement(destinations),
    startDate,
    endDate: getRandomDate(new Date(startDate.getTime())),
    cost: Math.ceil(Math.random() * 50) * COST_INCREMENT,
    extraOffers: [
      {
        title: `Order Uber`,
        shortTitle: `uber`,
        price: 20
      }
    ],
    info: {
      description: getRandomDescription().trim(),
      photos: [`http://picsum.photos/248/152?r=${Math.random()}`]
    }
  };
};

const generateEvents = (count) => {
  return new Array(count).fill(``).map(generateEvent).sort((a, b) => {
    return a.startDate - b.startDate;
  });
};




/***/ }),

/***/ "./src/utils.js":
/*!**********************!*\
  !*** ./src/utils.js ***!
  \**********************/
/*! exports provided: formatTime, formatType, getEventTitle, formatDate, convertDateToString, getFullDate, getTime, getDuration, createElement, render */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "formatTime", function() { return formatTime; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "formatType", function() { return formatType; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getEventTitle", function() { return getEventTitle; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "formatDate", function() { return formatDate; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "convertDateToString", function() { return convertDateToString; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getFullDate", function() { return getFullDate; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getTime", function() { return getTime; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getDuration", function() { return getDuration; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createElement", function() { return createElement; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "render", function() { return render; });
const MILLISECONDS_IN_A_SECOND = 1000;
const SECONDS_IN_A_MINUTE = 60;
const MINUTES_IN_AN_HOUR = 60;

const RenderPosition = {
  AFTERBEGIN: `afterbegin`,
  BEFOREEND: `beforeend`,
  AFTEREND: `afterend`
};

const formatTime = (time) => {
  return time.toString().length > 1 ? time : `0` + time;
};

const formatType = (type) => {
  let preposition;

  switch (type) {
    case `Check-in`:
    case `Sightseeing`:
    case `Restaurant`:
      preposition = `in`;
      break;
    default:
      preposition = `to`;
      break;
  }

  return `${type} ${preposition}`;
};

const getEventTitle = (event) => {

  return `${formatType(event.type)} ${event.destination}`;
};

const formatDate = (date) => {

  const day = date.getDate();
  const month = date.getMonth();
  const year = date.getFullYear().toString().slice(2, 4);
  const hours = formatTime(date.getHours());
  const minutes = formatTime(date.getMinutes());
  return `${day}/${month}/${year} ${hours}:${minutes}`;
};

const convertDateToString = (date) => {
  return `${date.getFullYear()}-${formatTime(date.getMonth() + 1)}-${formatTime(date.getDate())}`;
};

const getFullDate = (date) => {
  return `${convertDateToString(date)}T${formatTime(date.getHours())}:${formatTime(date.getMinutes())}`;
};

const getTime = (date) => {
  const hours = date.getHours();
  const minutes = date.getMinutes();

  return `${formatTime(hours)}:${formatTime(minutes)}`;
};

const getDuration = (start, end) => {
  const duration = (end - start);
  let minutes = duration / MILLISECONDS_IN_A_SECOND / SECONDS_IN_A_MINUTE;
  if (minutes < MINUTES_IN_AN_HOUR) {
    return minutes + `M`;
  } else {
    const hours = Math.floor(minutes / MINUTES_IN_AN_HOUR);
    minutes = minutes % MINUTES_IN_AN_HOUR;
    return hours + `H ` + minutes + `M`;
  }
};

const createElement = (template) => {
  const newElement = document.createElement(`div`);
  newElement.innerHTML = template;

  return newElement.firstChild;
};

const render = (container, element, place = RenderPosition.AFTERBEGIN) => {
  switch (place) {
    case RenderPosition.AFTERBEGIN:
      container.prepend(element);
      break;
    case RenderPosition.BEFOREEND:
      container.append(element);
      break;
    case RenderPosition.AFTEREND:
      container.after(element);
      break;
  }
};




/***/ })

/******/ });
//# sourceMappingURL=bundle.js.map