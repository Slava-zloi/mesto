import { Card } from '../components/Card.js';
import { Api } from '../components/Api.js';
import { FormValidator, selectorsCurrent } from '../components/FormValidator.js';
import Section from '../components/Section.js';
import Popup from '../components/Popup.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithImage from '../components/PicturePopup.js';
import UserInfo from '../components/UserInfo.js';
import './index.css';
import { btnProfileEdit, btnElementAdd, templateHtml, elementsContainer, inputProfileName, inputProfileStatus, myId } from '../utils/constants.js';
import PopupWithConfirm from '../components/PopupWithConfirm.js';
const isLiked = false;

function createCard(item){
  const card = new Card(item, templateHtml, isLiked,
    { handleCardClick: () => {
        popupWithImage.open(card);
      },
      handleBucketClick: (card) =>{
        popupConfirm.open();
      }
  });
  const cardElement = card.createCard();
  return cardElement;
}

const userInfo = new UserInfo({
  name: '.profile__name',
  status:'.profile__status'
});
const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-50',
  headers: {
    authorization: '98271a86-ee56-4c01-a13f-8848eb7ff835',
    'Content-Type': 'application/json'
  }
});

const cardList = new Section({
  renderer: (cardInitial) => {
    cardList.addItem(createCard(cardInitial))
  }},
  elementsContainer
);

const popupWithImage = new PopupWithImage({ popupSelector: '.popup_type_for-image' });
popupWithImage.setEventListeners();

const popupEdit = new PopupWithForm({
  popupSelector: '.popup_type_profile',
  handleFormSubmit: (formData) => {
    api.changeUserInfo(formData.inputProfileName, formData.inputProfileStatus)
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
    api.makeNewCard(formData.inputElementTitle, formData.inputElementImageSrc)
    .then(res => {
      cardList.addItem(createCard({
        name: res.name,
        link: res.link,
        alt: res.name
        })
      )
    })

    .catch((err) => {
      console.log(err); // выведем ошибку в консоль
    });

    popupAdd.close();
    }
  });
popupAdd.setEventListeners();

const popupConfirm = new PopupWithConfirm ({
  popupSelector: '.popup_type_delete-approve',
  handleFormSubmit: () => {
    api.deleteCard()
    .then(res => {
      console.log(res);
    });
    popupConfirm.close();
  }
});

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

api.getInitialCards()
.then((data) => {
  data.reverse().forEach((cardData) => {
    cardList.renderElements(cardData);
  });
})

.catch((error) => {
  console.log(`Ошибка: ${error}`);
})

api.getUserInfo()
.then(res => {
  userInfo.setUserInfo({ name: res.name, status: res.about, });
})

.catch((err) => {
  console.log(err); // выведем ошибку в консоль
});



