import AbstractSmartComponent from "./abstract-smart-component.js";

const FILTER_ID_PREFIX = `filter-`;

const getFilterNameById = (id) => {
  return id.substring(FILTER_ID_PREFIX.length);
};

const createFilterTemplate = (filter) => {
  const {name, checked} = filter;

  const isChecked = (value) => {
    return value ? `checked` : ``;
  };

  return (
    /* html */
    `<div class="trip-filters__filter">
    <input id="filter-${name}" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="${name}" ${isChecked(checked)}>
    <label class="trip-filters__filter-label" for="filter-${name}">${name}</label>
    </div>`
  );

};

const createFiltersTemplate = (filters) => {

  const filterTemplates = filters.map((it) => createFilterTemplate(it)).join(`\n`);

  return (
    /* html */
    `<form class="trip-filters" action="#" method="get">
      ${filterTemplates}

      <button class="visually-hidden" type="submit">Accept filter</button>
    </form>`
  );
};

class Filters extends AbstractSmartComponent {
  constructor(filters) {
    super();

    this._filters = filters;

    this._filterChangeHandler = null;
  }

  getTemplate() {
    return createFiltersTemplate(this._filters);
  }

  setFilterChangeHandler(handler) {
    this._filterChangeHandler = handler;
    this.getElement().addEventListener(`change`, (evt) => {
      const filterName = getFilterNameById(evt.target.id);
      handler(filterName);
    });
  }

  recoverListeners() {
    this.setFilterChangeHandler(this._filterChangeHandler);
  }
}

export {Filters as default};
