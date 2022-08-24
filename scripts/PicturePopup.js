import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  constructor({ popupSelector} ) {
    super({ popupSelector} );
    this._popupItem = document.querySelector(popupSelector);
  }
  open(card) {
    this._popupItem.querySelector('.popup__image-title').textContent = card.name;
    this._popupItem.querySelector('.popup__image').src = card.src;
    this._popupItem.querySelector('.popup__image').alt = card.alt;
    super.open();
  }
}


