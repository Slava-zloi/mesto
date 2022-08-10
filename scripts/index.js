import { Card } from './cards.js';
import { FormValidator, selectorsCurrent } from './validate.js';
import { initialElements } from './initialElements.js';

const popupEditProfile = document.querySelector('.popup_type_profile');
const popupAddCard = document.querySelector('.popup_type_element');
const formEditContainer = document.querySelector('.popup__container');
const inputName = document.querySelector('.popup__input_type_profile-name');
const inputStatus = document.querySelector('.popup__input_type_profile-status');
const btnSave = document.querySelector('.popup__button_type_save');
const btnEditClose = popupEditProfile.querySelector('.popup__close');
const formEditProfile = popupEditProfile.querySelector('.popup__form');
const profile = document.querySelector('.profile');
const btnProfileEdit =  profile.querySelector('.profile__edit-button');
const profileName = profile.querySelector('.profile__name');
const profileStatus = profile.querySelector('.profile__status');
const btnElementAdd = profile.querySelector('.profile__add-button');
const inputElementTitle = document.querySelector('.popup__input_type_element-title');
const inputElementSrc = document.querySelector('.popup__input_type_element-src');

const elementTemplate = document.querySelector('#element-template').content;
const elementsContainer = document.querySelector('.elements');
const btnCreateElementClose = popupAddCard.querySelector('.popup__close');
const formAddCard = popupAddCard.querySelector('.popup__form');

const popupForImage = document.querySelector('.popup_type_for-image');
const imageInPicturePopup = document.querySelector('.popup__image');
const titleInPicturePopup = document.querySelector('.popup__image-title');
const btnPopupForImageClose = popupForImage.querySelector('.popup__close');
const formsToListen = document.querySelectorAll('.popup__form');

const formToValidate = []



function openFormEdit() {
  inputName.value = profileName.textContent;
  inputStatus.value = profileStatus.textContent;
  openPopup(popupEditProfile);
}

function openFormCreateElement() {
  formAddCard.reset();
  openPopup(popupAddCard);
}

function openImage(elementTitle, elementSrc, elementAlt) {
  titleInPicturePopup.textContent = elementTitle;
  imageInPicturePopup.src = elementSrc;
  imageInPicturePopup.alt = elementAlt;
  openPopup(popupForImage);
}

function closeFormEsc(evt) {
  if (evt.key==='Escape') {
    const popupOpened = document.querySelector('.popup_opened');
    closePopup(popupOpened);
  }
}

function closeFormOverlay(evt) {
  if (evt.target === evt.currentTarget){
    closePopup(evt.currentTarget);
  }
}

function openPopup(popupToOpen) {
  popupToOpen.classList.add('popup_opened');
  window.addEventListener('keydown', closeFormEsc);
  popupToOpen.addEventListener('click',closeFormOverlay);
  formToValidate.forEach ((formValidation) => {
    formValidation.removeInputErrors();
  });
}

function closePopup(popupToClose) {
  popupToClose.classList.remove('popup_opened');
  window.removeEventListener('keydown', closeFormEsc);
  popupToClose.removeEventListener('click', closeFormOverlay);
}

function submitEditProfileForm(evt) {
  evt.preventDefault();
  profileName.textContent = inputName.value;
  profileStatus.textContent = inputStatus.value;
  closePopup(popupEditProfile);
}

function submitAddCardForm(evt){
  evt.preventDefault();
  const cardNew = new Card(inputElementTitle.value, inputElementSrc.value, inputElementTitle.value,'#element-template');
  const cardElement = cardNew.createCard();
  elementsContainer.prepend(cardElement);
  closePopup(popupAddCard);
}

const renderElements = () => {
  initialElements.forEach((item) => {
    const card = new Card(item.name, item.link, item.alt,'#element-template', openImage);
    const cardElement = card.createCard();
    elementsContainer.append(cardElement);
  });
};

btnProfileEdit.addEventListener('click', openFormEdit);
btnElementAdd.addEventListener('click', openFormCreateElement);
btnEditClose.addEventListener('click', () => closePopup(popupEditProfile));
btnCreateElementClose.addEventListener('click', () => closePopup(popupAddCard));
formEditProfile.addEventListener('submit', submitEditProfileForm);
formAddCard.addEventListener('submit', submitAddCardForm);
btnPopupForImageClose.addEventListener('click', () => closePopup(popupForImage));

renderElements();

formsToListen.forEach((formElement,index) => {
  formToValidate[index] = new FormValidator(formElement, selectorsCurrent);
  formToValidate[index].enableValidation();
});
