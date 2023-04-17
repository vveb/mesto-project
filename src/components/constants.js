import UserInfo from './UserInfo.js';
import Api from './api.js';
import PopupWithImage from './PopupWithImage.js';
import {
  renderPost
} from './utils.js';
// import PopupWithForm from './PopupWithForm.js';

const formConfig = {
  formSelector: '.form',
  inputSelector: '.form__input',
  submitButtonSelector: '.form__submit',
  inactiveButtonClass: 'form__submit_disabled',
  inputErrorClass: 'form__input_invalid',
  errorClass: 'form__input-error_active'
}

//popups

const popupPost = new PopupWithImage('.popup_post', renderPost);
popupPost.setEventListeners();

// const popupEditProfile = new PopupWithForm('.popup_edit-profile', saveProfileInfo)

const popupEditProfile = document.querySelector('.popup_edit-profile');
const popupNewPost = document.querySelector('.popup_new-post');
const popupEditAvatar = document.querySelector('.popup_update-avatar');
// const popupPost = document.querySelector('.popup_post');
const popupDeleteSubmit = document.querySelector('.popup_delete-submit');
const popupError = document.querySelector('.popup_error');

//forms
const editProfileForm = document.forms['edit-profile'];
const newPostForm = document.forms['new-post'];
const editAvatarForm = document.forms['update-avatar'];
const deleteSubmitForm = document.forms['delete-submit'];
const errorForm = document.forms['error-view'];

// view post elements
const imagePost = document.querySelector('.view-post__image');
const captionPost = document.querySelector('.view-post__caption');

//submit-buttons
const editProfileSubmitButton = editProfileForm['submit-button'];
const newPostSubmitButton = newPostForm['submit-button'];
const editAvatarSubmitButton = editAvatarForm['submit-button'];
const deleteSubmitButton = deleteSubmitForm['submit-button'];

//input arrays
const avatarFormInputsArray = Array.from(editAvatarForm.querySelectorAll('.form__input'));
const newPostFormInputsArray = Array.from(newPostForm.querySelectorAll('.form__input'));
const editProfileFormInputsArray = Array.from(editProfileForm.querySelectorAll('.form__input'));

//input prefixes
const avatarFormPrefix = 'avatar-input-';
const newPostFormPrefix = 'place-input-';
const editProfileFormPrefix = 'profile-input-';

//selectors
const cardTemplateSelector = '#template-photo-post';
const userNameSelector = '.profile__name';
const userAboutSelector = '.profile__vocation';
const photoGridSelector = '.photo-grid';

const profileAvatar = document.querySelector('.profile__avatar');
const profileEditButton = document.querySelector('.profile__edit-button');
const newPostAddButton = document.querySelector('.profile__add-button');

const errorTextBox = document.getElementById('error-textbox');

const serverURL = 'https://nomoreparties.co/v1/plus-cohort-22';
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

export const api = new Api({
  baseUrl: serverURL,
  headers: requestHeaders,
});

export const userInfo = new UserInfo({ userNameSelector, userAboutSelector });

export const forms = {
  editProfileForm,
  newPostForm,
  editAvatarForm,
  deleteSubmitForm,
  errorForm,
}

export const submitButtons = {
  editProfileSubmitButton,
  newPostSubmitButton,
  editAvatarSubmitButton,
  deleteSubmitButton,
}

export { formConfig,
  // photoGrid,
  profileAvatar,
  profileEditButton,
  newPostAddButton,
  // closeButtons,
  imagePost,
  captionPost,
  errorTextBox,
  endpointURLs,
  avatarFormInputsArray,
  newPostFormInputsArray,
  editProfileFormInputsArray,
  avatarFormPrefix,
  newPostFormPrefix,
  editProfileFormPrefix,
  editProfileForm,
  newPostForm,
  editAvatarForm,
  cardTemplateSelector,
  photoGridSelector,
  popupEditProfile,
  popupNewPost,
  popupEditAvatar,
  popupPost,
  popupDeleteSubmit,
  popupError,
}