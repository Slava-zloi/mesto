import { Card } from '../components/Card.js';
import { Api } from '../components/Api.js';
import { FormValidator, selectorsCurrent } from '../components/FormValidator.js';
import { initialElements } from '../components/initialElements.js';
import Section from '../components/Section.js';
import Popup from '../components/Popup.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithImage from '../components/PicturePopup.js';
import UserInfo from '../components/UserInfo.js';
import './index.css';
import { btnProfileEdit, btnElementAdd, templateHtml, elementsContainer, inputProfileName, inputProfileStatus } from '../utils/constants.js';

function createCard(item){
  const card = new Card(item, templateHtml, { handleCardClick: () => {
    popupWithImage.open(card);
    }
  });
  const cardElement = card.createCard();
  return cardElement;
}

const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-50',
  headers: {
    authorization: '98271a86-ee56-4c01-a13f-8848eb7ff835',
    'Content-Type': 'application/json'
  }
});

api.getInitialCards()
  .then((data) => {
    const defaultCardList = new Section({
      data: data,
      renderer: (cardInitial) => {
        defaultCardList.addItem(
          createCard({
            name: cardInitial.name,
            link: cardInitial.link,
            alt: cardInitial.name
          })
        )
      }},
      elementsContainer
    );
    defaultCardList.renderElements();
  })

  .catch((error) => {
    console.log(`Ошибка: ${error}`);
  })

  api.getUserInfo()
  .then(res => {
    userInfo.setUserInfo({ name: res.name, status: res.about });
  })

  .catch((err) => {
    console.log(err); // выведем ошибку в консоль
  });

const userInfo = new UserInfo({
  name: '.profile__name',
  status:'.profile__status'
});

const popupWithImage = new PopupWithImage({ popupSelector: '.popup_type_for-image' });
popupWithImage.setEventListeners();

const popupEdit = new PopupWithForm({
  popupSelector: '.popup_type_profile',
  handleFormSubmit: (formData) => {
    api.changeUserInfo(formData.inputProfileName, formData.inputProfileStatus)
      .then(res => {
        if (res.ok) {
            return res.json ();
      }})
      .then( res => {
        userInfo.setUserInfo({ name: res.name, status: res.about });
        })

      .catch((err) => {
        console.log(err); // выведем ошибку в консоль
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
    api.getUserInfo()
    .then(res => {
        inputProfileName.value = res.name;
        inputProfileStatus.value = res.about;
    })

    .catch((err) => {
      console.log(err); // выведем ошибку в консоль
    });

    }
  popupEdit.open();
});

btnElementAdd.addEventListener('click', () => {
  formAddCardValidator.removeInputErrors();
  popupAdd.open()
})
