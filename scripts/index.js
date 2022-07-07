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
  elementImage.addEventListener('click', openImage);
  elementsContainer.prepend(itemElement);
}

function openImage(){
  imageInPicturePopup.src = this.src;
  currentTitle = this.closest('.element').querySelector('.element__title');
  titleInPicturePopup.textContent = currentTitle.textContent;
  openPopup(popupForImage);
}
function deleteElement() {
  const currentElement = this.closest('.element');
  currentElement.remove();
}

function openFormEdit() {
  inputName.value = profileName.textContent;
  inputStatus.value = profileStatus.textContent;
  openPopup(popupEditProfile);
 }

 function openFormCreateElement() {
  inputElementTitle.value = '';
  inputElementSrc.value = '';
  openPopup(popupAddCard);
 }

 function openPopup(popupToOpen) {
  popupToOpen.classList.add('popup_opened');
}

function closePopup(popupToClose) {
  popupToClose.classList.remove('popup_opened');
}

// function closeImagePopup(popupToClose) {
//   popupForImage.classList.remove('popup_opened');
// }

function submitEditProfileForm(evt) {
  evt.preventDefault();
  profileName.textContent = inputName.value;
  profileStatus.textContent = inputStatus.value;
  closePopup(popupEditProfile);
}

function submitAddCardForm(evt){
  evt.preventDefault();
  addElement(inputElementTitle.value, inputElementSrc.value, '');
  closePopup(popupAddCard);
}

function heartClick() {
  this.classList.toggle('element__heart_active');
}

btnProfileEdit.addEventListener('click', openFormEdit);
btnElementAdd.addEventListener('click', openFormCreateElement);
btnEditClose.addEventListener('click', () => closePopup(popupEditProfile));
btnCreateElementClose.addEventListener('click', () =>closePopup(popupAddCard));
formEditProfile.addEventListener('submit', submitEditProfileForm);
formAddCard.addEventListener('submit', submitAddCardForm);
btnPopupForImageClose.addEventListener('click', () => closePopup(popupForImage));
