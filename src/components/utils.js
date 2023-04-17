import { popups, errorTextBox, imagePost, captionPost, api } from './constants.js'
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
  console.dir(err);
  if (err.statusCode) {
    showError(err.message);
  } else {
    showError('Connection trouble, check your network');
  }
}

export function getInputsData(inputsArray, formPrefix) {
  const prefixLength = formPrefix.length;
  return inputsArray.reduce((acc, input) => {
    acc[input.id.slice(prefixLength)] = input.value;
    return acc;
  }, {});
}

export function setInputsData(inputsArray, formPrefix, data) {
  const prefixLength = formPrefix.length;
  inputsArray.forEach((input) => {
    input.value = data[input.id.slice(prefixLength)];
  })
}

export function editLike(id, isLiked, setLikes) {
  api.toggleLike({ cardId: id, isLiked })
    .then(({ likes }) => {
      setLikes(likes);
    })
    .catch(handleError);
}

export function renderPost({ title, link }) {
  imagePost.alt = title;
  imagePost.src = link;
  captionPost.textContent = title;
  openPopup(popups.popupPost);
}