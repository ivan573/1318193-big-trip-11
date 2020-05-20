import AbstractComponent from "./abstract-component.js";

class AbstractSmartComponent extends AbstractComponent {
  recoverListeners() {
    throw new Error(`Abstract method not implemented: recoverListeners`);
  }

  rerender() {
    const oldElement = this.getElement();
    const parent = oldElement.parentElement;

    this.removeElement();

    const newElement = this.getElement();

    parent.replaceChild(newElement, oldElement);

    this.recoverListeners();
  }
}

export {AbstractSmartComponent as default};
