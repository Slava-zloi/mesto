import Popup from "./Popup.js";

export default class PopupWithConfirm extends Popup {
  constructor({ popupSelector, handleFormSubmit }) {
    super({ popupSelector });
    this.handleFormSubmit = handleFormSubmit;
  }

  open(cardId) {
    super.open();
    this._cardId = cardId;
  }

  setEventListeners(){
    super.setEventListeners();
    this.form.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this.handleFormSubmit(this._cardId);
    })
  }
}
