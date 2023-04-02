import { popups, errorTextBox } from './constants.js'
import { openPopup } from './modal.js';

export function renderLoading(isLoading, submitButton, loadingText) {
  if (isLoading) {
    localStorage.setItem('buttonText', submitButton.textContent);
    submitButton.textContent = loadingText;
  } else {
    submitButton.textContent = localStorage.getItem('buttonText');
    localStorage.removeItem('buttonText');
  }
}

function showError(errMessage) {
  errorTextBox.textContent = errMessage;
  openPopup(popups.popupError);
}

export function handleError(err) {
  if (err.statusCode) {
    showError(err.message);
  } else {
    showError('Connection trouble, check your network');
  }
}