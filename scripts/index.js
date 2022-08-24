import { Card } from './Card.js';
import { FormValidator, selectorsCurrent } from './FormValidator.js';
import { initialElements } from './initialElements.js';
import Section from './Section.js';
import Popup from './Popup.js';
import PopupWithForm from './PopupWithForm.js';
import PopupWithImage from './PicturePopup.js';

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
// const formAddCard = popupAddCard.querySelector('.popup__form');

const popupForImage = document.querySelector('.popup_type_for-image');

const btnPopupForImageClose = popupForImage.querySelector('.popup__close');


// function openFormEdit() {
//   inputName.value = profileName.textContent;
//   inputStatus.value = profileStatus.textContent;
//   formEditProfileValidator.removeInputErrors();
//   openPopup(popupEditProfile);
// }

function openFormCreateElement() {
  formAddCard.reset();
  formAddCardValidator.removeInputErrors();
  openPopup(popupAddCard);
}

// function openImage(elementTitle, elementSrc, elementAlt) {
//   titleInPicturePopup.textContent = elementTitle;
//   imageInPicturePopup.src = elementSrc;
//   imageInPicturePopup.alt = elementAlt;
//   openPopup(popupForImage);
// }

// function closeFormEsc(evt) {
//   if (evt.key==='Escape') {
//     const popupOpened = document.querySelector('.popup_opened');
//     closePopup(popupOpened);
//   }
// }

// function closeFormOverlay(evt) {
//   if (evt.target === evt.currentTarget){
//     closePopup(evt.currentTarget);
//   }
// }

// function openPopup(popupToOpen) {
//   popupToOpen.classList.add('popup_opened');
//   window.addEventListener('keydown', closeFormEsc);
//   popupToOpen.addEventListener('click',closeFormOverlay);
// }

// function closePopup(popupToClose) {
//   popupToClose.classList.remove('popup_opened');
//   window.removeEventListener('keydown', closeFormEsc);
//   popupToClose.removeEventListener('click', closeFormOverlay);
// }

// function submitEditProfileForm(evt) {
//   evt.preventDefault();
//   profileName.textContent = inputName.value;
//   profileStatus.textContent = inputStatus.value;
//   closePopup(popupEditProfile);
// }

// function submitAddCardForm(evt){
//   evt.preventDefault();
//   elementsContainer.prepend(makeNewCard(inputElementTitle.value, inputElementSrc.value, inputElementTitle.value,'#element-template'));
//   closePopup(popupAddCard);
// }


const defaultCardList = new Section({data: initialElements, renderer: (item) => {
    const card = new Card(item, templateHtml, { handleCardClick: () => {
          popupWithImage.open(card);
        }
      }
    )
    const cardElement = card.createCard();
    defaultCardList.addItem(cardElement);
  }
}, elementsContainer);

const popupWithImage = new PopupWithImage({ popupSelector: '.popup_type_for-image' });
const popupEdit = new PopupWithForm({popupSelector: '.popup_type_profile', handleFormSubmit: (formData) => {
    popupEdit.close();
  }
});

const popupAdd = new PopupWithForm({popupSelector: '.popup_type_element', handleFormSubmit: (formData) => {
    const newCardSection = new Section({data: popupAdd.inputData , renderer: (item) => {
      const card = new Card(item, templateHtml,{ handleCardClick: () => {
        popupWithImage.open(card);
        }
      });
      const cardElement = card.createCard();
      newCardSection.addItem(cardElement);
      newCardSection.renderElements()
      popupAdd.close();
      }
    }, elementsContainer);
}});

btnProfileEdit.addEventListener('click', () => popupEdit.open());
btnEditClose.addEventListener('click', () => popupEdit.close());
btnElementAdd.addEventListener('click', () => popupAdd.open());
btnCreateElementClose.addEventListener('click', () => popupAdd.close());
btnPopupForImageClose.addEventListener('click', () => popupWithImage.close());

defaultCardList.renderElements();

const formEditProfileValidator = new FormValidator(formEditProfile, selectorsCurrent);
formEditProfileValidator.enableValidation();

const formAddCardValidator = new FormValidator(formAddCard, selectorsCurrent);
formAddCardValidator.enableValidation();
