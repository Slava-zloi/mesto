export class Card  {
  constructor(data, templateSelector, isLiked, { handleCardClick }){
    this.name = data.name,
    this.src = data.link,
    this.alt = data.alt,
    this.templateSelector = templateSelector,
    this._handleCardClick = handleCardClick,
    this.ownerId = data.ownerId
    this.likesNumber = data.likes.length
    this.isLiked = isLiked;
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
    if (this.isLiked){
      this._heartElement.classList.remove('element__heart_active');
      this.isLiked = false;
    }
    else {
      this._heartElement.classList.add('element__heart_active');
      this.isLiked = true;
    }
  }

  _setLikesCounter(idArray) {
    this._likesCounter.value = this.likesNumber;
  }

  _deleteElement() {
    this._element.remove();
    this._element = null;
  }
   createCard(myId) {
    this._element = this._getTemplate();
    this._heartElement = this._element.querySelector('.element__heart');
    this._title = this._element.querySelector('.element__title');
    this._image = this._element.querySelector('.element__image');
    this._bucket = this._element.querySelector('.element__bucket');
    this._likesCounter = this._element.querySelector('.element__likes-counter');

    if (myId !== this.ownerId){
      this._bucket.classList.add('.element__bucket_inactive')
    }

    this._title.textContent = this.name;
    this._image.src = this.src;
    this._image.alt = this.alt;
    this._setEventListeners();
    this._setLikesCounter();
    return this._element;
  }

  _setEventListeners() {
    this._heartElement.addEventListener('click', () => {
      this._handleLikeClick();
    });

    this._bucket.addEventListener('click', () => {

    });

    this._image.addEventListener('click', () => {
      this._handleCardClick(this.name,this.src,this.alt)
    });
  }
}
