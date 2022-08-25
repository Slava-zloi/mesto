import { Card } from './components/Card.js';
import { FormValidator, selectorsCurrent } from './components/FormValidator.js';
import { initialElements } from './components/initialElements.js';
import Section from './components/Section.js';
import Popup from './components/Popup.js';
import PopupWithForm from './components/PopupWithForm.js';
import PopupWithImage from './components/PicturePopup.js';
import UserInfo from './components/UserInfo.js';
import './pages/index.css';
import { btnProfileEdit, btnElementAdd, templateHtml, elementsContainer, inputProfileName, inputProfileStatus } from './utils/constants.js';

// в задании ПР8 был написано: Требования к коду:
// ...
// 4. В файле index.js должно остаться только создание классов и добавление некоторых обработчиков.
// п.4  запрещает создание функций внутри index.js, поэтому и был выбран прошлый вариант реализации.

// Предложенный вами вариант более изящный, конечно, но вступает в противоречие с пунктом 4 задания к ПР8, есл я правильно его понял.
// Ниже реализовано ваше предложение, как я его понял, мне оно тоже нравится больше исходного варианта)))

function createCard(item){
  const card = new Card(item, templateHtml, { handleCardClick: () => {
    popupWithImage.open(card);
    }
  });
  const cardElement = card.createCard();
  return cardElement;
}

const defaultCardList = new Section({
    data: initialElements,
    renderer: (item) => {defaultCardList.addItem(createCard(item))}
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
    defaultCardList.addNewItem(createCard({
      name: formData.inputElementTitle,
      link: formData.inputElementImageSrc,
      alt: formData.inputElementTitle
      })
    )
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
    inputProfileName.value = userInfo.getUserInfo().name;
    inputProfileStatus.value = userInfo.getUserInfo().status;
  }
  popupEdit.open();
});

btnElementAdd.addEventListener('click', () => {
  formAddCardValidator.removeInputErrors();
  popupAdd.open()
});
