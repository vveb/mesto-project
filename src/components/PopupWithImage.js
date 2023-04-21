import Popup from './Popup.js'

export default class PopupWithImage extends Popup {
  constructor(popupSelector, renderer) {
    super(popupSelector);
    this._renderer = renderer;
    this.openPopup = this.openPopup.bind(this);
  }

  openPopup(data) {
    this._renderer(data);
    super.openPopup();
  }
}