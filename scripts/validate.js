export const selectorsCurrent = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'button_inactive',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input-error_active'
  }

export class FormValidator {
  constructor(form, selectors) {
    this._form = form,
    this.selectors = selectors,
    this._inputList = Array.from(this._form.querySelectorAll(this.selectors.inputSelector)),
    this._btn = this._form.querySelector(this.selectors.submitButtonSelector)
  }

  _showInputError (inputElement) {
    const errorElement = this._form.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(this.selectors.inputErrorClass);
    errorElement.textContent = inputElement.validationMessage;
    errorElement.classList.add(this.selectors.errorClass);
  }

  _hideInputError (inputElement) {
    const errorElement = this._form.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(this.selectors.inputErrorClass);
    errorElement.classList.remove(this.selectors.errorClass);
    errorElement.textContent = '';
  }

  _checkInputValidity (inputElement) {
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement);
    } else {
      this._hideInputError(inputElement);
    }
  }

  removeInputErrors() {
    this._inputList.forEach((inputElement) => {
      this._hideInputError(inputElement);
      this._toggleButtonState();
    });
  }

  _hasInvalidInput() {
    return this._inputList.some((inputElement) => {
    return !inputElement.validity.valid;
    });
  }

  _toggleButtonState() {
    if (this._hasInvalidInput()) {
      this._btn.classList.add(this.selectors.inactiveButtonClass);
      this._btn.setAttribute('disabled', true);
    } else {
      this._btn.classList.remove(this.selectors.inactiveButtonClass);
      this._btn.removeAttribute('disabled');
    }
  }

  _addInputListeners(inputElement) {
    this._checkInputValidity(inputElement);
    this._toggleButtonState();
  }

  _setEventListeners() {
    this._toggleButtonState();
    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => this._addInputListeners(inputElement));
    });
  }

  enableValidation() {
      this._setEventListeners();
  }
}

