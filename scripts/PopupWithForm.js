import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor({ popupSelector, handleFormSubmit }) {
    super({ popupSelector });
    this.handleFormSubmit = handleFormSubmit;
    this._popupItem = document.querySelector(popupSelector);
    this._form = this._popupItem.querySelector('.popup__form');

  }

  _getInputValues(){
      this._inputList = this._element.querySelectorAll('.form__input');
      this._formValues = {};
      this._inputList.forEach(input => {
        this._formValues[input.name] = input.value;
      });
      return this._formValues;
    }

  setEventListeners(){
    this._form.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this.handleFormSubmit(this._getInputValues());
      this.inputData = {
        name: this._form.querySelector('popup__input_type_element-title').textContent,
        link: this._form.querySelector('popup__input_type_element-src').textContent,
        alt: this._form.querySelector('popup__input_type_element-title').textContent
      }
      this._form.reset();
      super.setEventListeners();
    })
  }
}
