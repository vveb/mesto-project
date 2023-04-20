export default class Popup {
  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector);
    this._handleEscapeButton = this._handleEscapeButton.bind(this);
    this._handlePopupOverlayClick = this._handlePopupOverlayClick.bind(this);
    this._closeButton = this._popup.querySelector('.popup__close-button');
    this.closePopup = this.closePopup.bind(this);
  }

  _handleEscapeButton = (evt) => {
    if (evt.key === 'Escape') {
      this.closePopup();
    }
  }

  _handlePopupOverlayClick = (evt) => {
    if (evt.target === evt.currentTarget) {
      this.closePopup();
    }
  }

  openPopup() {
    this._popup.classList.add('popup_opened');
    if (!this._popup.classList.contains('popup_transition')) {
      this._popup.classList.add('popup_transition');
    }
    document.addEventListener('keydown', this._handleEscapeButton);
  }

  closePopup() {
    this._popup.classList.remove('popup_opened');
    document.removeEventListener('keydown', this._handleEscapeButton);
  }

  setEventListeners() {
    this._closeButton.addEventListener('click', this.closePopup);
    this._popup.addEventListener('click', this._handlePopupOverlayClick);
  }
}