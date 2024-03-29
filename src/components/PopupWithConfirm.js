import Popup from "./Popup.js";

export default class PopupWithConfirm extends Popup {
  constructor({ popupSelector,}) {
    super({ popupSelector });
    this.buttonSubmit = this.form.querySelector('.popup__button');
  }

  open(cardId) {
    super.open();
    this._cardId = cardId;
  }

  setSubmitAction(submitAction){
    this.handleSubmit = submitAction;
  }

  setEventListeners(){
    super.setEventListeners();
    this.form.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this.handleSubmit(this._cardId);
    })
  }
}
