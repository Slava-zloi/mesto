export default class Popup {
  constructor ( { popupSelector } ){
    this._popupSelector = popupSelector;
    this._popupItem = document.querySelector(this._popupSelector);
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

  _setEventListeners(){
    this._popupItem.addEventListener('click', (evt) => this._handleOverlayClose(evt));
    window.addEventListener('keydown', (evt) => this._handleEscClose(evt));

  }

  open() {
    this._setEventListeners();
    this._popupItem.classList.add('popup_opened');
  }

  close() {
    this._popupItem.classList.remove('popup_opened');
    window.removeEventListener('keydown', (evt) => this._handleEscClose(evt));
    this._popupItem.removeEventListener('click', (evt) => this._handleOverlayClose(evt));
  }
}
