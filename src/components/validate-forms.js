function hasInvalidInput(inputList) {
  return inputList.some((inputElement) => !inputElement.validity.valid);
}

function toggleSubmitButtonState(inputList, submitButton, inactiveButtonClass) {
  if (hasInvalidInput(inputList)) {
    submitButton.disabled = true;
    submitButton.classList.add(inactiveButtonClass);
  } else {
    submitButton.disabled = false;
    submitButton.classList.remove(inactiveButtonClass);
  }
}

function showInputError(inputElement, message, { inputErrorClass, errorClass }) {
  inputElement.classList.add(inputErrorClass);
  const formError = document.getElementById(`${inputElement.id}-error`);
  formError.classList.add(errorClass);
  formError.textContent = message;
}

function hideInputError(inputElement, { inputErrorClass, errorClass }) {
  inputElement.classList.remove(inputErrorClass);
  const formError = document.getElementById(`${inputElement.id}-error`) //formElement.querySelector(`.${inputElement.id}-error`);
  formError.classList.remove(errorClass);
  formError.textContent = '';
}

function checkInputValidity (inputElement, inputConfig) {
  if (inputElement.validity.patternMismatch) {
    inputElement.setCustomValidity(inputElement.dataset.alphabetError);
  } else if (inputElement.type === 'url' && inputElement.validity.typeMismatch) {
    inputElement.setCustomValidity(inputElement.dataset.urlError);
  } else {
    inputElement.setCustomValidity('');
  }

  if (!inputElement.validity.valid) {
    showInputError(inputElement, inputElement.validationMessage, inputConfig);
  } else {
    hideInputError(inputElement, inputConfig);
  }
}

function setInputEventListeners(formElement, formConfig) {
  const { inputSelector, submitButtonSelector, inactiveButtonClass, inputErrorClass, errorClass } = formConfig;
  const inputList = Array.from(formElement.querySelectorAll(inputSelector));
  const submitButton = formElement.querySelector(submitButtonSelector);
  toggleSubmitButtonState(inputList, submitButton, inactiveButtonClass);
  inputList.forEach(inputElement => {
    inputElement.addEventListener('input', () => {
      checkInputValidity(inputElement, { inputErrorClass, errorClass });
      toggleSubmitButtonState(inputList, submitButton, inactiveButtonClass);
    });
  });
}

function enableFormValidation(formConfig) {
  const formList = Array.from(document.querySelectorAll(formConfig.formSelector));
  formList.forEach(formElement => {
    setInputEventListeners(formElement, formConfig);
  });
}

function resetFormValidation(formElement, formConfig) {
  const { inputSelector, submitButtonSelector, inactiveButtonClass, inputErrorClass, errorClass } = formConfig;
  const inputList = Array.from(formElement.querySelectorAll(inputSelector));
  const submitButton = formElement.querySelector(submitButtonSelector);
  toggleSubmitButtonState(inputList, submitButton, inactiveButtonClass);
  inputList.forEach(inputElement => {
    hideInputError(inputElement, { inputErrorClass, errorClass });
  });
}

export { enableFormValidation, resetFormValidation };