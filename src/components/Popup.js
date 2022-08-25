export default class Popup {
  constructor ( { popupSelector } ){
    this._popupSelector = popupSelector;
    this._popupItem = document.querySelector(this._popupSelector);
    this.form = this._popupItem.querySelector('.popup__form');
    this._btnClose = this._popupItem.querySelector('.popup__close');
    this._handleEscClose = this._handleEscClose.bind(this)

  }

  _handleEscClose(evt) {
    if (evt.key==='Escape') {
      this.close();
    }
  }

  _handleOverlayClose(evt) {
    if (evt.target === this._popupItem){
      this.close();
    }
  }

  setEventListeners(){
    this._popupItem.addEventListener('click', this._handleOverlayClose.bind(this));
    this._btnClose.addEventListener('click', this.close.bind(this));
  }

  open() {
    this._popupItem.classList.add('popup_opened');
    window.addEventListener('keydown', this._handleEscClose);
  }

  close() {
    this._popupItem.classList.remove('popup_opened');
    window.removeEventListener('keydown', this._handleEscClose);
  }
}
