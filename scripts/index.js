const popupEditProfile = document.querySelector('.popup_type_profile');
const popupAddCard = document.querySelector('.popup_type_element');
const formEditContainer = document.querySelector('.popup__container');
const inputName = document.querySelector('.popup__input_type_profile-name');
const inputStatus = document.querySelector('.popup__input_type_profile-status');
const btnSave = document.querySelector('.popup__button_type_save');
const btnEditClose = popupEditProfile.querySelector('.popup__close');
const formEditProfile = popupEditProfile.querySelector(selectorsCurrent.formSelector);
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
const formAddCard = popupAddCard.querySelector(selectorsCurrent.formSelector);

const popupForImage = document.querySelector('.popup_type_for-image');
const imageInPicturePopup = document.querySelector('.popup__image');
const titleInPicturePopup = document.querySelector('.popup__image-title');
const btnPopupForImageClose = popupForImage.querySelector('.popup__close');
const formsToListen = document.querySelectorAll(selectorsCurrent.formSelector);


for(let elIndex = initialElements.length-1; elIndex>=0; elIndex--){
  let newCard = createCard(initialElements[elIndex].name, initialElements[elIndex].link, initialElements[elIndex].alt);
  addCard(newCard);
}

function createCard(elementTitleText, elementImageSrc, elementImageAlt) {
  const itemElement = elementTemplate.querySelector('.element').cloneNode(true);
  const elementImage = itemElement.querySelector('.element__image');
  const elementTitle = itemElement.querySelector('.element__title');
  elementTitle.textContent = elementTitleText;
  elementImage.src = elementImageSrc;
  elementImage.alt = elementImageAlt;
  const btnHeart = itemElement.querySelector('.element__heart');
  const btnDeleteElement = itemElement.querySelector('.element__bucket');
  btnHeart.addEventListener('click', heartClick);
  btnDeleteElement.addEventListener('click', deleteElement);
  elementImage.addEventListener('click', () => openImage(elementTitleText, elementImageSrc, elementImageAlt));
  return itemElement;
}

function addCard(elementToAdd){
  elementsContainer.prepend(elementToAdd);
}

function deleteElement() {
  const currentElement = this.closest('.element');
  currentElement.remove();
}

function openImage(cardName, cardSrc, cardAlt){
  titleInPicturePopup.textContent = cardName;
  imageInPicturePopup.src = cardSrc;
  imageInPicturePopup.alt = cardAlt;
  openPopup(popupForImage);
}

function openFormEdit() {
  inputName.value = profileName.textContent;
  inputStatus.value = profileStatus.textContent;
  openPopup(popupEditProfile);
}

function openFormCreateElement() {
  formAddCard.reset();
  openPopup(popupAddCard);
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
  const formCurrent = popupToOpen.querySelector(selectorsCurrent.formSelector);
  window.addEventListener('keydown', closeFormEsc);
  popupToOpen.addEventListener('click',closeFormOverlay);
  // if (formCurrent != null){
  //   enableValidation(formCurrent, selectorsCurrent);
  // }
}

function closePopup(popupToClose) {
  popupToClose.classList.remove('popup_opened');
  const formCurrent = popupToClose.querySelector(selectorsCurrent.formSelector);
  const popupToOpen = popupToClose;
  if (formCurrent != null){
    RemoveInputErrors(formCurrent, selectorsCurrent);
  }
  window.removeEventListener('keydown', closeFormEsc);
  popupToOpen.removeEventListener('click', closeFormOverlay);
}

function submitEditProfileForm(evt) {
  evt.preventDefault();
  profileName.textContent = inputName.value;
  profileStatus.textContent = inputStatus.value;
  closePopup(popupEditProfile);
}

function submitAddCardForm(evt){
  evt.preventDefault();
  const newCard = createCard(inputElementTitle.value, inputElementSrc.value, inputElementTitle.value);
  addCard(newCard);
  closePopup(popupAddCard);
}

function heartClick() {
  this.classList.toggle('element__heart_active');
}

btnProfileEdit.addEventListener('click', openFormEdit);
btnElementAdd.addEventListener('click', openFormCreateElement);
btnEditClose.addEventListener('click', () => closePopup(popupEditProfile));
btnCreateElementClose.addEventListener('click', () => closePopup(popupAddCard));
formEditProfile.addEventListener('submit', submitEditProfileForm);
formAddCard.addEventListener('submit', submitAddCardForm);
btnPopupForImageClose.addEventListener('click', () => closePopup(popupForImage));
