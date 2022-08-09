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

class Card {
  constructor(itemName, itemSrc, itemAlt, templateSelector){
    this.name = itemName,
    this.link = itemSrc,
    this.alt = itemAlt,
    this.templateSelector = templateSelector
  }

  _getTemplate() {
    const itemElement = document
      .querySelector(this.templateSelector)
      .content
      .querySelector('.element')
      .cloneNode(true);

    return itemElement;
  }

  _handleLikeClick() {
    this._element.querySelector('.element__heart').classList.toggle('element__heart_active');
  }

  _deleteElement() {
    this._element.remove();
  }

  _openImage() {
    titleInPicturePopup.textContent =  this.name;
    imageInPicturePopup.src = this.link;
    imageInPicturePopup.alt = this.alt;
    openPopup(popupForImage);
  }

   createCard() {
    this._element = this._getTemplate();
    this._element.querySelector('.element__title').textContent = this.name;
    this._element.querySelector('.element__image').src = this.link;
    this._element.querySelector('.element__image').alt = this.alt;
    this._setEventListeners()
    return this._element;
  }

  _setEventListeners() {
    this._element.querySelector('.element__heart').addEventListener('click', () => { this._handleLikeClick() });
    this._element.querySelector('.element__bucket').addEventListener('click', () => { this._deleteElement() });
    this._element.querySelector('.element__image').addEventListener('click', () => { this._openImage() });
  }
}

const renderElements = () => {
  initialElements.forEach((item) => {
    const card = new Card(item.name, item.link, item.alt,'#element-template');
    const cardElement = card.createCard();
    elementsContainer.append(cardElement);
  });
};

renderElements();
