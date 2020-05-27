import AbstractComponent from "./abstract-component.js";

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
    `<div class="trip-main__trip-controls  trip-controls">
      <h2 class="visually-hidden">Switch trip view</h2>
      <nav class="trip-controls__trip-tabs  trip-tabs">
        <a class="trip-tabs__btn  trip-tabs__btn--active" href="#">Table</a>
        <a class="trip-tabs__btn" href="#">Stats</a>
      </nav>

      <h2 class="visually-hidden">Filter events</h2>
      <form class="trip-filters" action="#" method="get">
        ${filterTemplates}

        <button class="visually-hidden" type="submit">Accept filter</button>
      </form>
    </div>`
  );
};

class Filters extends AbstractComponent {
  constructor(filters) {
    super();

    this._filters = filters;
  }

  getTemplate() {
    return createFiltersTemplate(this._filters);
  }

  setFilterChangeHandler(handler) {
    this.getElement().addEventListener(`change`, (evt) => {
      const filterName = getFilterNameById(evt.target.id);
      handler(filterName);
    });
  }
}

export {Filters as default};
