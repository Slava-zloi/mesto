let formEdit = document.querySelector('.popup');
let Container = formEdit.querySelector('.popup__container');
let btnEdit =  document.querySelector('.profile__edit-button');
let btnClose = document.querySelector('.popup__close');
let inputNames = Container.querySelectorAll('.popup__input');
let btnSave = Container.querySelector('.popup__save');
let profile = document.querySelector('.profile');

function openFormEdit() {
  let profileName = profile.querySelector('.profile__name');
  let profileStatus = profile.querySelector('.profile__status');
  inputNames[0].value= profileName.innerHTML;
  inputNames[1].value = profileStatus.innerHTML;
  formEdit.classList.add('popup_opened');
 }

function closeFormEdit() {
  formEdit.classList.remove('popup_opened');
}


function formSubmitHandler(evt) {
  evt.preventDefault();
  let profileName = profile.querySelector('.profile__name');
  let profileStatus = profile.querySelector('.profile__status');
  profileName.textContent = inputNames[0].value;
  profileStatus.textContent = inputNames[1].value;
  closeFormEdit();
}

btnEdit.addEventListener('click', openFormEdit);
btnClose.addEventListener('click', closeFormEdit);
Container.addEventListener('submit', formSubmitHandler);
