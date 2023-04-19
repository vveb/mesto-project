import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
  constructor(popupSelector, callBackSubmit) {
    super(popupSelector);
    this._callBackSubmit = callBackSubmit;
    this._form = this._popup.querySelector('.form');
    this._inputList = Array.from(this._form.querySelectorAll('.form__input'));
    this._getInputValues = this._getInputValues.bind(this);
    this._submitHandler = this._submitHandler.bind(this);
    this._submitButton = this._popup.querySelector('.form__submit');
    this.setInputValues = this.setInputValues.bind(this);
  }

  get submitButton() {
    return this._submitButton;
  }

  get form() {
    return this._form;
  }

  resetForm() {
    this._form.reset();
  }

  _getInputValues() {
    return this._inputList.reduce((acc, input) => {
      acc[input.name] = input.value;
      return acc;
    }, {});
  }

  setInputValues(data) {
    this._inputList.forEach(input => {
      input.value = data[input.name];
    });
  }

  _submitHandler(evt) {
    this._callBackSubmit(evt, this._getInputValues());
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