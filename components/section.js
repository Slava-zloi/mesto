import { Card } from '../scripts/cards.js';
import { initialElements } from '../scripts/initialElements.js';
export default class Section {
  constructor ({items, renderer}, elementsContainer){
    this._initialArray = items;
    this._renderer = renderer;
    this._container = document.querySelector(elementsContainer);
  }

  renderElements() {
    this._initialArray.forEach(item => {
      this._renderer(item);
    });
  }

  addItem() {
    this._container.append(element);
  }


  makeNewCard(cardTitle, cardSrc, cardAlt, templateHtml) {
    const card = new Card(cardTitle, cardSrc, cardAlt, templateHtml, openImage);
    const cardElement = card.createCard();
    return cardElement;
  }

  renderElementsPrepend() {
    this._initialArray.forEach((item) => {
      elementsContainer.prepend(makeNewCard(item.name, item.link, item.alt, this._templateHtml));
    });
  }
}
