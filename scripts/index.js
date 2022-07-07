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
const formCreate = popupCreate.querySelector('.popup__form');


const popupForImage = document.querySelector('.popup__for-image');
const popupImage = document.querySelector('.popup__image');
const popupTitle = document.querySelector('.popup__image-title');
const btnPopupForImageClose = popupForImage.querySelector('.popup__close');

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

function addElement(elementTitleText, elementImageSrc, elementImageAlt) {
  const elementTemplate = document.querySelector('#element-template').content;
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
  // elementImage.addEventListener('click', openImage(elementImage, elementTitle));
  elementImage.addEventListener('click', openImage);
  elementsContainer.prepend(itemElement);
}

function openImage(){
  popupImage.src = this.src;
  currentTitle = this.closest('.element').querySelector('.element__title');
  popupTitle.textContent = currentTitle.textContent;
  popupForImage.classList.add('popup_opened');
}
function deleteElement() {
  const currentElement = this.closest('.element');
  currentElement.remove();
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
function closeImagePopup() {
  popupForImage.classList.remove('popup_opened');
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
btnElementAdd.addEventListener('click', openFormCreateElement);
btnEditClose.addEventListener('click', closeEditForm);
btnCreateElementClose.addEventListener('click', closeCreateForm);
formEdit.addEventListener('submit', formSubmitHandler);
formCreate.addEventListener('submit', formCreateSubmitHandler);
 btnPopupForImageClose.addEventListener('click', closeImagePopup);

//  elementImages =
//  itemElement.forEach(element => element
//   elementImage.addEventListener('click', openImage(elementImage, elementTitle));
