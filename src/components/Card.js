export class Card  {
  constructor(data, templateSelector, userId, { handleCardClick, handleBucketClick, handleLikeClick }){
    this.data = data;
    this.name = data.name;
    this.src = data.link;
    this.alt = data.name;
    this.templateSelector = templateSelector;
    this._handleCardClick = handleCardClick;
    this._handleBucketClick = handleBucketClick;
    this.handleLikeClick = handleLikeClick;
    this.ownerId = data.owner._id;
    this.likes = data.likes;
    this.id = data._id;
    this.userId = userId;
  }

  _getTemplate() {
    const itemElement = document
      .querySelector(this.templateSelector)
      .content
      .querySelector('.element')
      .cloneNode(true);
    return itemElement;
  }

  handleLikeToggle() {
      this._heartElement.classList.toggle('element__heart_active');
  }

  setLikesCounter(cardData) {
    this._likesCounter.value = cardData.likes.length;
  }

  deleteElement() {
    this._element.remove();
    this._element = null;
  }

  isLiked(){
    return Boolean(this.likes.find(user =>
      user._id === this.userId
    ));
  }

   createCard() {
    this._element = this._getTemplate();
    this._heartElement = this._element.querySelector('.element__heart');
    this._title = this._element.querySelector('.element__title');
    this._image = this._element.querySelector('.element__image');
    this._bucket = this._element.querySelector('.element__bucket');
    this._likesCounter = this._element.querySelector('.element__likes-counter');

    if (this.userId !== this.ownerId){
      this._bucket.classList.add('element__bucket_inactive');
    }

    this.setLikesCounter(this.data);
    this._title.textContent = this.name;
    this._image.src = this.src;
    this._image.alt = this.alt;
    this._setEventListeners();
    return this._element;
  }

  _setEventListeners() {
    this._heartElement.addEventListener('click', () => {
      this.handleLikeClick();
    });

    this._bucket.addEventListener('click', () => {
      this._handleBucketClick(this.id);
    });

    this._image.addEventListener('click', () => {
      this._handleCardClick(this.name,this.src,this.alt)
    });
  }
}
