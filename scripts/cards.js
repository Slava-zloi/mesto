export class Card  {
  constructor(itemName, itemSrc, itemAlt, templateSelector, openImage){
    this.name = itemName,
    this.link = itemSrc,
    this.alt = itemAlt,
    this.templateSelector = templateSelector,
    this._openImage = openImage
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
  }
   createCard() {
    this._element = this._getTemplate();
    this._image = this._element.querySelector('.element__image');
    this._element.querySelector('.element__title').textContent = this.name;
    this._image.src = this.link;
    this._image.alt = this.alt;
    this._setEventListeners()
    return this._element;
  }

  _setEventListeners() {
    this._element.querySelector('.element__heart').addEventListener('click', () => { this._handleLikeClick() });
    this._element.querySelector('.element__bucket').addEventListener('click', () => { this._deleteElement() });
    this._image.addEventListener('click', () => { this._openImage(this.name,this.link,this.alt)});
  }
}