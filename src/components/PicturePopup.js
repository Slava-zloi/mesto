import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  constructor({ popupSelector} ) {
    super({ popupSelector} );
    this._popupItem = document.querySelector(popupSelector);
    this._popupImage = this._popupItem.querySelector('.popup__image');
    this._popupImageTitle = this._popupItem.querySelector('.popup__image-title');
  }
  open(card) {
    this._popupImageTitle.textContent = card.name;
    this._popupImage.src = card.src;
    this._popupImage.alt = card.alt;
    super.open();
  }
}


