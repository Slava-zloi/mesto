export default class Section {
  constructor ({ renderer }, elementsContainer){
    this._renderer = renderer;
    this._container = elementsContainer;
  }

  renderElements(card) {
    this._renderer(card);
  }

  addItem(card) {
    this._container.prepend(card);
  }
}
