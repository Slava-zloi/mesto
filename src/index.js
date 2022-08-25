import { Card } from './components/Card.js';
import { FormValidator, selectorsCurrent } from './components/FormValidator.js';
import { initialElements } from './components/initialElements.js';
import Section from './components/Section.js';
import Popup from './components/Popup.js';
import PopupWithForm from './components/PopupWithForm.js';
import PopupWithImage from './components/PicturePopup.js';
import UserInfo from './components/UserInfo.js';
import './pages/index.css';

const btnProfileEdit =  document.querySelector('.profile__edit-button');
const btnElementAdd = document.querySelector('.profile__add-button');
const templateHtml = '#element-template';
const elementsContainer = document.querySelector('.elements');

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
popupWithImage.setEventListeners();

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
popupEdit.setEventListeners();

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
popupAdd.setEventListeners();

const formEditProfileValidator = new FormValidator(popupEdit.form, selectorsCurrent);
formEditProfileValidator.enableValidation();

const formAddCardValidator = new FormValidator(popupAdd.form, selectorsCurrent);
formAddCardValidator.enableValidation();

btnProfileEdit.addEventListener('click', () => {
  formEditProfileValidator.removeInputErrors();
  if (userInfo.getUserInfo()) {
    document.querySelector('.popup__input_type_profile-name').value = userInfo.getUserInfo().name;
    document.querySelector('.popup__input_type_profile-status').value = userInfo.getUserInfo().status;
  }
  popupEdit.open();
});

btnElementAdd.addEventListener('click', () => {
  formAddCardValidator.removeInputErrors();
  popupAdd.open()
});
