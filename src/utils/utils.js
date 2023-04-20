import { errorTextBox, imagePost, captionPost, api } from './constants.js';
import PopupWithForm from '../components/PopupWithForm.js';

export function renderLoading(isLoading, submitButton, loadingText) {
  if (isLoading) {
    sessionStorage.setItem('buttonText', submitButton.textContent);
    submitButton.textContent = loadingText;
  } else {
    submitButton.textContent = sessionStorage.getItem('buttonText');
    sessionStorage.removeItem('buttonText');
  }
}

const popupError = new PopupWithForm('.popup_error', submitError);
popupError.setEventListeners();

function submitError(evt) {
  evt.preventDefault();
  popupError.closePopup();
}

function showError(errMessage) {
  errorTextBox.textContent = errMessage;
  popupError.openPopup();
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

export function editUserData(data, name, about) {
  return api.editProfileInfo(data)
    .then((data) => {
      name.textContent = data.name;
      about.textContent = data.about;
    });
}

export function getUserData() {
  return api.getProfileData();
}

export function renderPost({ title, link }) {
  imagePost.alt = title;
  imagePost.src = link;
  captionPost.textContent = title;
}

export function addNewPostData(data, addPost) {
  return api.addNewCard(data)
    .then(addPost);
}