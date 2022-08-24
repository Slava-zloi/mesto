import { Card } from './Card.js';
import { FormValidator, selectorsCurrent } from './FormValidator.js';
import { initialElements } from './initialElements.js';
import Section from './Section.js';
import Popup from './Popup.js';
import PopupWithForm from './PopupWithForm.js';
import PopupWithImage from './PicturePopup.js';
import UserInfo from './UserInfo.js';

const popupEditProfile = document.querySelector('.popup_type_profile');
const popupAddCard = document.querySelector('.popup_type_element');
const formAddCard = popupAddCard.querySelector('.popup__form');
const btnEditClose = popupEditProfile.querySelector('.popup__close');
const formEditProfile = popupEditProfile.querySelector('.popup__form');
const profile = document.querySelector('.profile');
const btnProfileEdit =  profile.querySelector('.profile__edit-button');
const btnElementAdd = profile.querySelector('.profile__add-button');

const templateHtml = '#element-template';
const elementsContainer = document.querySelector('.elements');
const btnCreateElementClose = popupAddCard.querySelector('.popup__close');

const popupForImage = document.querySelector('.popup_type_for-image');

const btnPopupForImageClose = popupForImage.querySelector('.popup__close');

const defaultCardList = new Section({
  data: initialElements,
  renderer: (item) => {
    const card = new Card(item, templateHtml, { handleCardClick: () => {
          popupWithImage.open(card);
        }
      }
    )
    const cardElement = card.createCard();
    defaultCardList.addItem(cardElement);
    }
  },
  elementsContainer
);
defaultCardList.renderElements();

const userInfo = new UserInfo({
  name: '.profile__name',
  status:'.profile__status'
});
const popupWithImage = new PopupWithImage({ popupSelector: '.popup_type_for-image' });
const popupEdit = new PopupWithForm({
  popupSelector: '.popup_type_profile',
  handleFormSubmit: (formData) => {
    userInfo.setUserInfo({
      name: formData.inputProfileName,
      status: formData.inputProfileStatus
    });
    popupEdit.close();
  }
});

const popupAdd = new PopupWithForm({
  popupSelector: '.popup_type_element',
  handleFormSubmit: (formData) => {
    const card = new Card({
      name: formData.inputElementTitle,
      link: formData.inputElementImageSrc,
      alt: formData.inputElementTitle
    },
      templateHtml,{ handleCardClick: () => {
        popupWithImage.open(card);
      }
    });
    const cardElement = card.createCard();
    defaultCardList.addNewItem(cardElement);
    popupAdd.close();
  }
});

const formEditProfileValidator = new FormValidator(formEditProfile, selectorsCurrent);
formEditProfileValidator.enableValidation();

const formAddCardValidator = new FormValidator(formAddCard, selectorsCurrent);
formAddCardValidator.enableValidation();

btnProfileEdit.addEventListener('click', () => {

  formEditProfileValidator.removeInputErrors();
  if (userInfo.getUserInfo()) {
    document.querySelector('.popup__input_type_profile-name').value = userInfo.getUserInfo().name;
    document.querySelector('.popup__input_type_profile-status').value = userInfo.getUserInfo().status;
  }
  popupEdit.open();
});

btnEditClose.addEventListener('click', () => popupEdit.close());
btnElementAdd.addEventListener('click', () => {
  formAddCardValidator.removeInputErrors();
  popupAdd.open()
});

btnCreateElementClose.addEventListener('click', () => popupAdd.close());
btnPopupForImageClose.addEventListener('click', () => popupWithImage.close());

