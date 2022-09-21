export class Card  {
  constructor(data, templateSelector, { handleCardClick, handleBucketClick }){
    this.name = data.name;
    this.src = data.link;
    this.alt = data.name;
    this.templateSelector = templateSelector;
    this._handleCardClick = handleCardClick;
    this._handleBucketClick = handleBucketClick;
    this.ownerId = data.owner._id;
    this.likesNumber = data.likes.length;
    this.id = data._id;
    this.isLiked = false;
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

  deleteElement() {
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

    // if (myId !== this.ownerId){
    //   this._bucket.classList.add('.element__bucket_inactive');
    // }

    this._title.textContent = this.name;
    this._image.src = this.src;
    this._image.alt = this.alt;
    this._setEventListeners();
    this._setLikesCounter();
    return this._element;
  }

  // id(){
  //   return this.id;
  // }

  _setEventListeners() {
    this._heartElement.addEventListener('click', () => {
      this._handleLikeClick();
    });

    this._bucket.addEventListener('click', () => {
      this._handleBucketClick(this.id);
    });

    this._image.addEventListener('click', () => {
      this._handleCardClick(this.name,this.src,this.alt)
    });
  }
}
