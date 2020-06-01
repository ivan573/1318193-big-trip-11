import AbstractComponent from "./abstract-component.js";

const MenuItem = {
  TABLE: `Table`,
  STATS: `Stats`,
};

const ACTIVE_CLASS = `trip-tabs__btn--active`;

const createMenuTemplate = () => {
  return (
    /* html */
    `<nav class="trip-controls__trip-tabs  trip-tabs">
      <a class="trip-tabs__btn  trip-tabs__btn--active" href="#">Table</a>
      <a class="trip-tabs__btn" href="#">Stats</a>
    </nav>`
  );
};

class MenuTemplate extends AbstractComponent {
  getTemplate() {
    return createMenuTemplate();
  }

  setActiveItem(menuItem) {
    const items = this.getElement().querySelectorAll(`a`);

    items.forEach((it) => {
      if (it.textContent === menuItem) {
        it.classList.add(ACTIVE_CLASS);
      } else {
        it.classList.remove(ACTIVE_CLASS);
      }
    });
  }

  setOnChange(handler) {
    this.getElement().addEventListener(`click`, (evt) => {
      evt.preventDefault();

      const menuItem = evt.target.textContent;

      handler(menuItem);
    });
  }
}

export {MenuTemplate as default};
