let formEdit = document.querySelector('.popup');
let btnEdit =  document.querySelector('.profile__edit-button');
let btnClose = document.querySelector('.popup__close');

function openFormEdit() {
  formEdit.classList.add('popup_opened');
}

function closeFormEdit() {
  formEdit.classList.remove('popup_opened');
}

btnEdit.addEventListener('click', openFormEdit);
btnClose.addEventListener('click', closeFormEdit);
