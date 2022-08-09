const selectorsCurrent = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'button_inactive',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input-error_active',
  }

class FormValidator {
  constructor(form, selectors) {
    this.form = form
    this.errorMessage = errorMessage,
    this.inputList = Array.from(this.form.querySelectorAll(selectors.inputSelector));
    this.btn = this.form.querySelector(selectors.submitButtonSelector);
  }
}

const showInputError = (formElement, inputElement, errorMessage, selectors) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add(selectors.inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(selectors.errorClass);
}

const hideInputError = (formElement, inputElement, selectors) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove(selectors.inputErrorClass);
  errorElement.classList.remove(selectors.errorClass);
  errorElement.textContent = '';
}

const checkInputValidity = (formElement, inputElement, selectors) => {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage, selectors);
  } else {
    hideInputError(formElement, inputElement, selectors);
  }
}

const RemoveInputErrors = (formElement, selectors) => {
  const inputList = Array.from(formElement.querySelectorAll(selectors.inputSelector));
  const buttonElement = formElement.querySelector(selectors.submitButtonSelector);
  inputList.forEach((inputElement) => {
    hideInputError(formElement, inputElement, selectors);
    toggleButtonState(inputList, buttonElement, selectors);
  });
}

const hasInvalidInput = (inputList, selectors) => {
   return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
}

const toggleButtonState = (inputList, buttonElement, selectors) => {
  if (hasInvalidInput(inputList,selectors)) {
    buttonElement.classList.add(selectors.inactiveButtonClass);
    buttonElement.setAttribute('disabled', true);
  } else {
    buttonElement.classList.remove(selectors.inactiveButtonClass);
    buttonElement.removeAttribute('disabled');
  }
}

const addInputListeners = (formElement, inputElement, inputList, buttonElement, selectors) =>{
  checkInputValidity(formElement, inputElement, selectors);
  toggleButtonState(inputList, buttonElement, selectors);
}

const setEventListeners = (formElement, selectors) => {
  const inputList = Array.from(formElement.querySelectorAll(selectors.inputSelector));
  const buttonElement = formElement.querySelector(selectors.submitButtonSelector);
  toggleButtonState(inputList, buttonElement, selectors);
  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', () => addInputListeners(formElement, inputElement, inputList, buttonElement, selectors ));
  });
}

const enableValidation = (formElement, selectors) => {
    setEventListeners(formElement, selectors);
}

formsToListen.forEach((formElement) => {
  enableValidation(formElement, selectorsCurrent)
});
