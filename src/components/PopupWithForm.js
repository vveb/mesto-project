import Popup from './Popup.js'

export default class PopupWithForm extends Popup {
  constructor(popupSelector, callBackSubmit) {
    super(popupSelector);
    this._callBackSubmit = callBackSubmit;
    this._form = this._popup.querySelector('.form');
    this._inputList = this._form.querySelectorAll('.form__input');
    this._getInputValues = this._getInputValues.bind(this);
    this._submitHandler = this._submitHandler.bind(this);
  }

  _getInputValues() {
    return this._inputList.reduce((acc, input) => {
      acc[input.name] = input.value;
      return acc;
    }, {});
  }

  _submitHandler() {
    this._callBackSubmit(this._getInputValues());
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener('submit', this._submitHandler);
  }

  closePopup() {
    this._form.reset();
    super.closePopup();
  }
}