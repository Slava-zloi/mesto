import { Card } from '../components/Card.js';
import { Api } from '../components/Api.js';
import { FormValidator, selectorsCurrent } from '../components/FormValidator.js';
import Section from '../components/Section.js';
import Popup from '../components/Popup.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithImage from '../components/PicturePopup.js';
import UserInfo from '../components/UserInfo.js';
import './index.css';
import { btnProfileEdit, btnElementAdd, templateHtml, elementsContainer, inputProfileName, inputProfileStatus, btnAvatar, inputAvatarLink, } from '../utils/constants.js';
import PopupWithConfirm from '../components/PopupWithConfirm.js';

let userId = null;

function createCard(item){
  const card = new Card(item, templateHtml, userId,
    { handleCardClick: () => {
        popupWithImage.open(card);
      },
      handleBucketClick: () => {
        popupConfirm.open(card.id);
        popupConfirm.setSubmitAction(() => {
          renderLoading(true, popupConfirm.buttonSubmit, '');
          api.deleteCard(card.id)
          .then(res => {
            card.deleteElement();
            renderLoading(false, popupConfirm.buttonSubmit, 'Да');
            popupConfirm.close();
          });
        })
      },
      handleLikeClick: () => {
        api.changeLikeStatus(card.id,card.isLiked())
        .then(res => {
          card.handleLikeToggle();
          card.setLikesCounter(res);
          card.likes = res.likes;
        });
      }
    });
  const cardElement = card.createCard();
  if (card.isLiked()){
    card.handleLikeToggle();
   }
  return cardElement;
}

function renderLoading(isLoading, btn, text) {
  if (isLoading === true) {
    btn.textContent = 'Сохранение...';
  } else if (isLoading === false) {
    btn.textContent = text;
  }
}

const userInfo = new UserInfo({
  name: '.profile__name',
  status:'.profile__status',
  avatar:'.profile__avatar'
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

const popupAvatar = new PopupWithForm({
  popupSelector: '.popup_type_avatar',
  handleFormSubmit: () => {
    renderLoading(true, popupAvatar.buttonSubmit, '');
    api.changeAvatar(inputAvatarLink.value)
    .then(res =>{
      userInfo.setUserInfo({name: res.name, status: res.about, avatar: res.avatar })
      popupAvatar.close();
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(()=> {
      renderLoading(false, popupAvatar.buttonSubmit, 'Сохранить');
    })
  }
});
popupAvatar.setEventListeners();

const popupEdit = new PopupWithForm({
  popupSelector: '.popup_type_profile',
  handleFormSubmit: (formData) => {
    renderLoading(true, popupEdit.buttonSubmit, '');
    api.changeUserInfo(formData.inputProfileName, formData.inputProfileStatus)
      .then( res => {
        userInfo.setUserInfo({ name: res.name, status: res.about, avatar: res.avatar });
        })

      .catch((err) => {
        console.log(err); // выведем ошибку в консоль
      })
      .finally(()=> {
        renderLoading(false, popupEdit.buttonSubmit, 'Сохранить');
      })
    popupEdit.close();
  }
});
popupEdit.setEventListeners();

const popupAdd = new PopupWithForm({
  popupSelector: '.popup_type_element',
  handleFormSubmit: (formData) => {
    api.makeNewCard(formData.inputElementTitle, formData.inputElementImageSrc)
    .then(res => {
      cardList.renderElements(res);
    })
    .catch((err) => {
      console.log(err); // выведем ошибку в консоль
    })
    .finally(()=> {
      renderLoading(false, popupAdd.buttonSubmit, 'Создать');
    });

    popupAdd.close();
    }
  });
popupAdd.setEventListeners();

const popupConfirm = new PopupWithConfirm ({popupSelector: '.popup_type_delete-approve'});
popupConfirm.setEventListeners();

const formEditProfileValidator = new FormValidator(popupEdit.form, selectorsCurrent);
formEditProfileValidator.enableValidation();

const formAddCardValidator = new FormValidator(popupAdd.form, selectorsCurrent);
formAddCardValidator.enableValidation();

const formChangeAvatar = new FormValidator(popupAvatar.form, selectorsCurrent);
formChangeAvatar.enableValidation();

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

btnAvatar.addEventListener('click', () => {
  formChangeAvatar.removeInputErrors();
  popupAvatar.open();
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

api.getProfile()
.then(res => {
  userId = res._id;
  userInfo.setUserInfo({ name: res.name, status: res.about, avatar: res.avatar });
})

.catch((err) => {
  console.log(err); // выведем ошибку в консоль
});



