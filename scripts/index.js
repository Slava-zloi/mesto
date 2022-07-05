const popupEdit = document.querySelector('.popup');
const formEditContainer = document.querySelector('.popup__container');
const inputName = formEditContainer.querySelector('.popup__input_type_name');
const inputStatus = formEditContainer.querySelector('.popup__input_type_status');
const btnSave = formEditContainer.querySelector('.popup__save');
const btnClose = formEditContainer.querySelector('.popup__close');
const formEdit = formEditContainer.querySelector('.popup__form');

const profile = document.querySelector('.profile');
const btnProfileEdit =  document.querySelector('.profile__edit-button');
const profileName = document.querySelector('.profile__name');
const profileStatus = document.querySelector('.profile__status');

const elementsContainer = document.querySelector('.elements');
const btnHeart = document.querySelectorAll('.element__heart');
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

function addElement(elementTitle, elementImage, elementAlt) {
  const elementTemplate = document.querySelector('#element-template').content;
  const itemElement = elementTemplate.querySelector('.element').cloneNode(true);
  itemElement.querySelector('.element__title').textContent = elementTitle;
  itemElement.querySelector('.element__image').src = elementImage;
  itemElement.querySelector('.element__image').alt = elementAlt;
  elementsContainer.prepend(itemElement);
}

function openFormEdit() {
  inputName.value= profileName.textContent;
  inputStatus.value = profileStatus.textContent;
  popupEdit.classList.add('popup_opened');
 }

function closeFormEdit() {
  popupEdit.classList.remove('popup_opened');
}

function formSubmitHandler(evt) {
  evt.preventDefault();
  profileName.textContent = inputName.value;
  profileStatus.textContent = inputStatus.value;
  closeFormEdit();
}

function heartClick() {
  this.classList.toggle('element__heart_active');
}

btnProfileEdit.addEventListener('click', openFormEdit);
btnClose.addEventListener('click', closeFormEdit);
formEdit.addEventListener('submit', formSubmitHandler);
btnHeart.forEach(element => element.addEventListener('click', heartClick));
// addButton.addEventListener('click', function () {
//   const artist = document.querySelector('.input__text_type_artist');
//   const title = document.querySelector('.input__text_type_title');
//   addSong(artist.value, title.value);
// }
