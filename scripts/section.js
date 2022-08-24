import { Card } from './Card.js';
import { initialElements } from './initialElements.js';
export default class Section {
  constructor ({data, renderer}, elementsContainer){
    this._initialArray = data;
    this._renderer = renderer;
    this._container = elementsContainer;
  }

  renderElements() {
    this._initialArray.forEach(item => {
      this._renderer(item);
    });
  }

  addItem(card) {
    this._container.append(card);
  }

  addNewItem(card) {
    this._container.prepend(card);
  }
}
