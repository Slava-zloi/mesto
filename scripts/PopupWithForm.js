import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor({ popupSelector, handleFormSubmit }) {
    super({ popupSelector });
    this.handleFormSubmit = handleFormSubmit;
    this._popupItem = document.querySelector(popupSelector);
    this._setEventListeners();
  }

  _getInputValues(){
      this._inputList = this._form.querySelectorAll('.popup__input');
      this._formValues = {};
      this._inputList.forEach(input => {
        this._formValues[input.name] = input.value;
      });
      return this._formValues;
    }

  _setEventListeners(){
    this._form.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this.handleFormSubmit(this._getInputValues());
    })
  }

  open() {
    super.open();
  }
  close(){
    this._form.reset();
    super.close();
  }
}
