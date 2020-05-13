import AbstractComponent from "./abstract-component.js";

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
}

export {MenuTemplate as default};
