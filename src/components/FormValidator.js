export default class FormValidator {
  constructor({
    inputSelector,
    submitButtonSelector,
    inactiveButtonClass,
    inputErrorClass,
    errorClass,
  }, formElement) {
    this._inactiveButtonClass = inactiveButtonClass;
    this._inputErrorClass = inputErrorClass;
    this._errorClass = errorClass;
    this._formElement = formElement;
    this._submitButton = this._formElement.querySelector(submitButtonSelector);
    this._inputList = Array.from(this._formElement.querySelectorAll(inputSelector));
  }

  _showInputError(inputElement, message) {
    inputElement.classList.add(this._inputErrorClass);
    const formError = document.getElementById(`${inputElement.id}-error`);
    formError.classList.add(this._errorClass);
    formError.textContent = message;
  }
  
  _hideInputError(inputElement) {
    inputElement.classList.remove(this._inputErrorClass);
    const formError = document.getElementById(`${inputElement.id}-error`);
    formError.classList.remove(this._errorClass);
    formError.textContent = '';
  }

  _checkInputValidity (inputElement) {
    if (inputElement.validity.patternMismatch) {
      inputElement.setCustomValidity(inputElement.dataset.alphabetError);
    } else if (inputElement.type === 'url' && inputElement.validity.typeMismatch) {
      inputElement.setCustomValidity(inputElement.dataset.urlError);
    } else {
      inputElement.setCustomValidity('');
    }
  
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement, inputElement.validationMessage);
    } else {
      this._hideInputError(inputElement);
    }
  }

  _hasInvalidInput(inputList) {
    return inputList.some((inputElement) => !inputElement.validity.valid);
  }
  
  _disableSubmitButton(submitButton) {
    submitButton.disabled = true;
    submitButton.classList.add(this._inactiveButtonClass);
  }
  
  _enableSubmitButton(submitButton) {
    submitButton.disabled = false;
    submitButton.classList.remove(this._inactiveButtonClass);
  }

  _toggleSubmitButtonState(inputList, submitButton) {
    if (this._hasInvalidInput(inputList)) {
      this._disableSubmitButton(submitButton);
    } else {
      this._enableSubmitButton(submitButton);
    }
  }

  _setInputEventListeners() {
    this._toggleSubmitButtonState(this._inputList, this._submitButton);
    this._inputList.forEach(inputElement => {
      inputElement.addEventListener('input', () => {
        this._checkInputValidity(inputElement);
        this._toggleSubmitButtonState(this._inputList, this._submitButton);
      });
    });
  }

  enableFormValidation() {
    this._setInputEventListeners();
  }

  resetFormValidation() {
    this._disableSubmitButton(this._submitButton);
    this._inputList.forEach(inputElement => {
      this._checkInputValidity(inputElement);
      this._hideInputError(inputElement);
    });
  }
}