export default class Popup {
  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector);
    this._handleEscapeButton = this._handleEscapeButton.bind(this);
    this._handlePopupOverlayClick = this._handlePopupOverlayClick.bind(this);
    this.closePopup = this.closePopup.bind(this);
  }

  _handleEscapeButton = (evt) => {
    if (evt.key === 'Escape') {
      this.closePopup();
      // closePopup(document.querySelector('.popup_opened'));
    }
  }

  _handlePopupOverlayClick = (evt) => {
    if (evt.target === evt.currentTarget) {
      this.closePopup();
      // closePopup(evt.currentTarget);
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
    const popupCloseButton = this._popup.querySelector('.popup__close-button');
    popupCloseButton.addEventListener('click', this.closePopup);
    this._popup.addEventListener('click', this._handlePopupOverlayClick);
  }
}