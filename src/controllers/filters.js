import FiltersComponent from "../components/filters.js";
import {FilterType} from "../const.js";
import {render, replace} from "../utils/render.js";

const DEFAULT_FILTER_TYPE = FilterType.EVERYTHING;

class FilterController {
  constructor(container, eventsModel) {
    this._container = container;
    this._eventsModel = eventsModel;

    this._activeFilterType = DEFAULT_FILTER_TYPE;
    this._filtersComponent = null;

    this._onFilterChange = this._onFilterChange.bind(this);
  }

  render() {
    const container = this._container;
    const filters = Object.values(FilterType).map((filterType) => {
      return {
        name: filterType,
        checked: filterType === this._activeFilterType,
      };
    });

    const oldComponent = this._filtersComponent;

    this._filtersComponent = new FiltersComponent(filters);
    this._filtersComponent.setFilterChangeHandler(this._onFilterChange);

    if (oldComponent) {
      replace(this._filtersComponent, oldComponent);
    } else {
      render(container, this._filtersComponent, `beforeend`);
    }
  }

  _onFilterChange(filterType) {
    this._eventsModel.setFilter(filterType);
    this._activeFilterType = filterType;
  }
}

export {FilterController as default};
