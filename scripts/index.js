const popupEdit = document.querySelector('.popup__profile');
const popupCreate = document.querySelector('.popup__element');
const formEditContainer = document.querySelector('.popup__container');
const inputName = document.querySelector('.popup__input_type_profile-name');
const inputStatus = document.querySelector('.popup__input_type_profile-status');
const btnSave = document.querySelector('.popup__save');
const btnEditClose = popupEdit.querySelector('.popup__close');
const formEdit = popupEdit.querySelector('.popup__form');
const profile = document.querySelector('.profile');
const btnProfileEdit =  profile.querySelector('.profile__edit-button');
const profileName = profile.querySelector('.profile__name');
const profileStatus = profile.querySelector('.profile__status');
const btnElementAdd = profile.querySelector('.profile__add-button');
const inputElementTitle = document.querySelector('.popup__input_type_element-title');
const inputElementSrc = document.querySelector('.popup__input_type_element-src');

const elementsContainer = document.querySelector('.elements');
const btnCreateElementClose = popupCreate.querySelector('.popup__close');
const formCreate =popupCreate.querySelector('.popup__form');
const initialElements = [
  {
    name: 'Балаклава',
    link: './images/balaklava.jpg',
    alt: 'Балаклавская бухта летом: море и гора'
  },
  {
    name: 'Роза-Хутор',
    link: './images/rosa-hutor.jpg',
    alt: 'Роза-хутор: вид с вершины Роза-пик зимой, снег и голубое небо'
  },
  {
    name: 'Кольский полуостров',
    link: './images/kolskiy.jpg',
    alt:  'Кольский полуостров: каменные уступы, рыже-зелёный мох на земле и серое небо'
  },
  {
    name: 'Карелия',
    link: './images/karelia.jpg',
    alt:  'Волны Белого моря и остров, заросший соснами, вдали'
  },
  {
    name: 'Нижний Новгород',
    link: './images/Nizhny_Novgorod.jpg',
    alt:  'Прогулочная дорожка вокруг стен нижегородского Кремля на холме'
  },
  {
    name: 'Куршская коса',
    link: './images/kurshskaya_kosa.jpg',
    alt:  'Куршская Коса: изогнутые сосны и легкий утренний туман'
  }
];

for(let elIndex = initialElements.length-1; elIndex>=0; elIndex--){
    addElement(initialElements[elIndex].name, initialElements[elIndex].link, initialElements[elIndex].alt);
}

function addElement(elementTitle, elementImage, elementAlt) {
  const elementTemplate = document.querySelector('#element-template').content;
  const itemElement = elementTemplate.querySelector('.element').cloneNode(true);
  itemElement.querySelector('.element__title').textContent = elementTitle;
  itemElement.querySelector('.element__image').src = elementImage;
  itemElement.querySelector('.element__image').alt = elementAlt;
  let btnHeart = itemElement.querySelector('.element__heart');
  let btnDeleteElement = itemElement.querySelector('.element__bucket');
  btnHeart.addEventListener('click', heartClick);
  btnDeleteElement.addEventListener('click', deleteElement);
  elementsContainer.prepend(itemElement);
}

function deleteElement() {
  const listItem = this.closest('.element');
  listItem.remove();
}

function openFormEdit() {
  inputName.value = profileName.textContent;
  inputStatus.value = profileStatus.textContent;
  popupEdit.classList.add('popup_opened');
 }

 function openFormCreateElement() {
  inputElementTitle.textContent = '';
  inputElementSrc.textContent = '';
  let popupEl = document.querySelector('.popup__element');
  popupEl.classList.add('popup_opened');
 }

function closeEditForm() {
  popupEdit.classList.remove('popup_opened');
}

function closeCreateForm() {
  popupCreate.classList.remove('popup_opened');
}
function formSubmitHandler(evt) {
  evt.preventDefault();
  profileName.textContent = inputName.value;
  profileStatus.textContent = inputStatus.value;
  closeEditForm();
}

function formCreateSubmitHandler(evt){
  evt.preventDefault();
  addElement(inputElementTitle.value, inputElementSrc.value, '');
  closeCreateForm();
}

function heartClick() {
  this.classList.toggle('element__heart_active');
}

btnProfileEdit.addEventListener('click', openFormEdit);
btnEditClose.addEventListener('click', closeEditForm);
btnCreateElementClose.addEventListener('click', closeCreateForm);
formEdit.addEventListener('submit', formSubmitHandler);
formCreate.addEventListener('submit', formCreateSubmitHandler);
btnElementAdd.addEventListener('click', openFormCreateElement)
