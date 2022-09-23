export default class Section {
  constructor ({ renderer }, elementsContainer){
    this._renderer = renderer;
    this._container = elementsContainer;
  }

  renderElements(cardsData) {
    cardsData.forEach((cardData) => this._renderer(cardData));
  }

  addItem(card) {
    this._container.prepend(card);
  }
}
