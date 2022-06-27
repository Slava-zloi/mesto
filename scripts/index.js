let formEdit = document.querySelector('.popup');
let formEditContainer = formEdit.querySelector('.popup__container');
let btnEdit =  document.querySelector('.profile__edit-button');
let btnClose = document.querySelector('.popup__close');
let inputName = formEditContainer.querySelector('.popup__input_type_name');
let inputStatus = formEditContainer.querySelector('.popup__input_type_status');
let btnSave = formEditContainer.querySelector('.popup__save');
let profile = document.querySelector('.profile');

function openFormEdit() {
  let profileName = profile.querySelector('.profile__name');
  let profileStatus = profile.querySelector('.profile__status');
  inputName.value= profileName.textContent;
  inputStatus.value = profileStatus.textContent;
  formEdit.classList.add('popup_opened');
 }

function closeFormEdit() {
  formEdit.classList.remove('popup_opened');
}

function formSubmitHandler(evt) {
  evt.preventDefault();
  let profileName = profile.querySelector('.profile__name');
  let profileStatus = profile.querySelector('.profile__status');
  profileName.textContent = inputName.value;
  profileStatus.textContent = inputStatus.value;
  closeFormEdit();
}

btnEdit.addEventListener('click', openFormEdit);
btnClose.addEventListener('click', closeFormEdit);
formEditContainer.addEventListener('submit', formSubmitHandler);
