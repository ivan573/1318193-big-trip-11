import AbstractComponent from "./abstract-component.js";

const createLoadingTemplate = () => {
  return (
    /* html */
    `<p class="trip-events__msg">Loading...</p>`
  );
};

class Loading extends AbstractComponent {
  getTemplate() {
    return createLoadingTemplate();
  }
}

export {Loading as default};
