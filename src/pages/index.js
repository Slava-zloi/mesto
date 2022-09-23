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
import { renderLoading } from '../utils/utils.js'
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
            popupConfirm.close();
          })
          .catch((err) => {console.log(err)
          }) // выведем ошибку в консоль
          .finally(
            renderLoading(false, popupConfirm.buttonSubmit, 'Да')
          )
        })
      },
      handleLikeClick: () => {
        api.changeLikeStatus(card.id,card.isLiked())
        .then(res => {
          card.handleLikeToggle();
          card.setLikesCounter(res);
          card.likes = res.likes;
        })
        .catch((err) => {console.log(err)
        }); // выведем ошибку в консоль
      }
    });
  const cardElement = card.createCard();
  if (card.isLiked()){
    card.handleLikeToggle();
   }
  return cardElement;
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
        popupEdit.close();
        })
      .catch((err) => {
        console.log(err); // выведем ошибку в консоль
      })
      .finally(()=> {
        renderLoading(false, popupEdit.buttonSubmit, 'Сохранить');
      })
  }
});
popupEdit.setEventListeners();

const popupAdd = new PopupWithForm({
  popupSelector: '.popup_type_element',
  handleFormSubmit: (formData) => {
    renderLoading(true, popupAdd.buttonSubmit, '');
    api.makeNewCard(formData.inputElementTitle, formData.inputElementImageSrc)
    .then(res => {
      cardList.renderElements([res]);
      popupAdd.close();
    })
    .catch((err) => {
      console.log(err); // выведем ошибку в консоль
    })
    .finally(()=> {
      renderLoading(false, popupAdd.buttonSubmit, 'Создать');
    });
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

Promise.all([api.getProfile(), api.getInitialCards()])
.then(([res, data]) => {
  userId = res._id;
  userInfo.setUserInfo({ name: res.name, status: res.about, avatar: res.avatar });
  cardList.renderElements(data.reverse());
})
.catch((error) => {
  console.log(`Ошибка: ${error}`);
})

