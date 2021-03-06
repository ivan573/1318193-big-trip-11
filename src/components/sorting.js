import AbstractSmartComponent from "./abstract-smart-component.js";

const SortType = {
  EVENT: `Event`,
  TIME: `Time`,
  PRICE: `Price`
};

const createSortingTemplate = () => {
  return (
    /* html */
    `<form class="trip-events__trip-sort  trip-sort" action="#" method="get">
      <span class="trip-sort__item  trip-sort__item--day"></span>

      <div class="trip-sort__item  trip-sort__item--event">
        <input id="sort-event" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-event" checked>
        <label class="trip-sort__btn" for="sort-event">
        Event
        </label>
      </div>

      <div class="trip-sort__item  trip-sort__item--time">
        <input id="sort-time" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-time">
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

class Sorting extends AbstractSmartComponent {
  constructor() {
    super();

    this._currentSortType = SortType.EVENT;

    this._sortTypeChangeHandler = null;
  }

  getTemplate() {
    return createSortingTemplate();
  }

  getSortType() {
    return this._currentSortType;
  }

  setSortType(sortType = SortType.EVENT) {
    this._currentSortType = sortType;
  }

  setSortTypeChangeHandler(handler) {
    this._sortTypeChangeHandler = handler;

    this.getElement().addEventListener(`click`, (evt) => {

      if (evt.target.tagName !== `LABEL`) {
        return;
      }

      const sortType = evt.target.textContent.trim();

      if (this._currentSortType === sortType) {
        return;
      }

      this._currentSortType = sortType;

      handler(this._currentSortType);
    });
  }

  recoverListeners() {
    this.setSortTypeChangeHandler(this._sortTypeChangeHandler);
  }
}

export {Sorting as default, SortType};
