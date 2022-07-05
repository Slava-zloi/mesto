
const popupEdit = document.querySelector('.popup');
const formEditContainer = document.querySelector('.popup__container');
const inputName = formEditContainer.querySelector('.popup__input_type_name');
const inputStatus = formEditContainer.querySelector('.popup__input_type_status');
const btnSave = formEditContainer.querySelector('.popup__save');
const btnClose = formEditContainer.querySelector('.popup__close');
const formEdit = formEditContainer.querySelector('.popup__form');

const profile = document.querySelector('.profile');
const btnProfileEdit =  document.querySelector('.profile__edit-button');
const profileName = document.querySelector('.profile__name');
const profileStatus = document.querySelector('.profile__status');

const btnHeart = document.querySelectorAll('.element__heart');

function openFormEdit() {
  inputName.value= profileName.textContent;
  inputStatus.value = profileStatus.textContent;
  popupEdit.classList.add('popup_opened');
 }

function closeFormEdit() {
  popupEdit.classList.remove('popup_opened');
}

function formSubmitHandler(evt) {
  evt.preventDefault();
  profileName.textContent = inputName.value;
  profileStatus.textContent = inputStatus.value;
  closeFormEdit();
}

function heartClick() {
  this.classList.toggle('element__heart_active');
}

btnProfileEdit.addEventListener('click', openFormEdit);
btnClose.addEventListener('click', closeFormEdit);
formEdit.addEventListener('submit', formSubmitHandler);
btnHeart.forEach(element => element.addEventListener('click', heartClick));
