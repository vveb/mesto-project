import Api from '../components/Api.js';

const formConfig = {
  formSelector: '.form',
  inputSelector: '.form__input',
  submitButtonSelector: '.form__submit',
  inactiveButtonClass: 'form__submit_disabled',
  inputErrorClass: 'form__input_invalid',
  errorClass: 'form__input-error_active'
}

// view post elements
const imagePost = document.querySelector('.view-post__image');
const captionPost = document.querySelector('.view-post__caption');

//selectors
const cardTemplateSelector = '#template-photo-post';
const userNameSelector = '.profile__name';
const userAboutSelector = '.profile__vocation';
const photoGridSelector = '.photo-grid';

const profileAvatar = document.querySelector('.profile__avatar');
const profileEditButton = document.querySelector('.profile__edit-button');
const newPostAddButton = document.querySelector('.profile__add-button');

const errorTextBox = document.getElementById('error-textbox');

// server api
const endpointURLs = {
  profile: '/users/me',
  cards: `/cards`,
  likes: `/cards/likes`,
  avatar: `/users/me/avatar`,
}

const requestHeaders = {
  authorization: '8d808c3f-b327-4ea6-8bf0-44d89d4dbe86',
  "Content-Type": "application/json",
}

const api = new Api({
  baseUrl: 'https://nomoreparties.co/v1/plus-cohort-22',
  headers: requestHeaders,
});


export { formConfig,
  profileAvatar, profileEditButton, newPostAddButton, imagePost, captionPost,
  errorTextBox,
  cardTemplateSelector, photoGridSelector, userNameSelector, userAboutSelector,
  api, endpointURLs,
}