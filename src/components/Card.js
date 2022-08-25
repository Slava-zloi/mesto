export class Card  {
  constructor(data, templateSelector, { handleCardClick }){
    this.name = data.name,
    this.src = data.link,
    this.alt = data.alt,
    this.templateSelector = templateSelector,
    this._handleCardClick = handleCardClick
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
    this._element = null;
  }
   createCard() {
    this._element = this._getTemplate();
    this._image = this._element.querySelector('.element__image');
    this._element.querySelector('.element__title').textContent = this.name;
    this._image.src = this.src;
    this._image.alt = this.alt;
    this._setEventListeners()
    return this._element;
  }

  _setEventListeners() {
    this._element.querySelector('.element__heart').addEventListener('click', () => { this._handleLikeClick() });
    this._element.querySelector('.element__bucket').addEventListener('click', () => { this._deleteElement() });
    this._image.addEventListener('click', () => { this._handleCardClick(this.name,this.src,this.alt)});
  }
}
