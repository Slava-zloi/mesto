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

  // makeNewCard(cardTitle, cardSrc, cardAlt, templateHtml) {
  //   const card = new Card(cardTitle, cardSrc, cardAlt, templateHtml, openImage);
  //   const cardElement = card.createCard();
  //   return cardElement;
  // }

  // renderElementsPrepend() {
  //   this._initialArray.forEach((item) => {
  //     elementsContainer.prepend(makeNewCard(item.name, item.link, item.alt, this._templateHtml));
  //   });
  // }
}
