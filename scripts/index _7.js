
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
  const cardNew = new Card(inputElementTitle.value, inputElementSrc.value, inputElementTitle.value,'#element-template');
  const cardElement = cardNew.createCard();
  elementsContainer.prepend(cardElement);
  closePopup(popupAddCard);
}

btnProfileEdit.addEventListener('click', openFormEdit);
btnElementAdd.addEventListener('click', openFormCreateElement);
btnEditClose.addEventListener('click', () => closePopup(popupEditProfile));
btnCreateElementClose.addEventListener('click', () => closePopup(popupAddCard));
formEditProfile.addEventListener('submit', submitEditProfileForm);
formAddCard.addEventListener('submit', submitAddCardForm);
btnPopupForImageClose.addEventListener('click', () => closePopup(popupForImage));
