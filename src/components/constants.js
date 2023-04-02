const formConfig = {
  formSelector: '.form',
  inputSelector: '.form__input',
  submitButtonSelector: '.form__submit',
  inactiveButtonClass: 'form__submit_disabled',
  inputErrorClass: 'form__input_invalid',
  errorClass: 'form__input-error_active'
}

//popups
const popupEditProfile = document.querySelector('.popup_edit-profile');
const popupNewPost = document.querySelector('.popup_new-post');
const popupEditAvatar = document.querySelector('.popup_update-avatar');
const popupPost = document.querySelector('.popup_post');
const popupDeleteSubmit = document.querySelector('.popup_delete-submit');
const popupError = document.querySelector('.popup_error');

//forms
const editProfileForm = document.forms['edit-profile'];
const newPostForm = document.forms['new-post'];
const editAvatarForm = document.forms['update-avatar'];
const deleteSubmitForm = document.forms['delete-submit'];
const errorForm = document.forms['error-view'];

//view post elements
const imagePost = popupPost.querySelector('.view-post__image');
const captionPost = popupPost.querySelector('.view-post__caption');

//submit-buttons
const editProfileSubmitButton = editProfileForm['submit-button'];
const newPostSubmitButton = newPostForm['submit-button'];
const editAvatarSubmitButton = editAvatarForm['submit-button'];
const deleteSubmitButton = deleteSubmitForm['submit-button'];

//all close buttons
const closeButtons = document.querySelectorAll('.popup__close-button');

//inputs
const newPostInputTitle = newPostForm.title;
const newPostInputLink = newPostForm.link;
const editProfileInputName = editProfileForm.name;
const editProfileInputVocation = editProfileForm.vocation;
const avatarInputLink = editAvatarForm.elements['input-avatar-link'];

const photoGrid = document.querySelector('.photo-grid');

const templatePhotoPost = document.querySelector('#template-photo-post').content;

const profileAvatar = document.querySelector('.profile__avatar');
const profileEditButton = document.querySelector('.profile__edit-button');
const newPostAddButton = document.querySelector('.profile__add-button');
const profileName = document.querySelector('.profile__name');
const profileVocation = document.querySelector('.profile__vocation');

const errorTextBox = document.getElementById('error-textbox');

const serverURL = 'https://nomoreparties.co/v1/plus-cohort-22';
const endpointURLs = {
  profile: `${serverURL}/users/me`,
  cards: `${serverURL}/cards`,
  likes: `${serverURL}/cards/likes`,
  avatar: `${serverURL}/users/me/avatar`,
}

const requestHeaders = {
  authorization: '8d808c3f-b327-4ea6-8bf0-44d89d4dbe86',
  "Content-Type": "application/json",
}

export const popups = {
  popupEditProfile,
  popupNewPost,
  popupEditAvatar,
  popupPost,
  popupDeleteSubmit,
  popupError,
}

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

export const formInputs = {
  newPostInputTitle,
  newPostInputLink,
  editProfileInputName,
  editProfileInputVocation,
  avatarInputLink,
}

export { formConfig,
  photoGrid,
  profileAvatar,
  profileEditButton,
  newPostAddButton,
  profileName,
  profileVocation,
  closeButtons,
  imagePost,
  captionPost,
  templatePhotoPost,
  errorTextBox,
  requestHeaders,
  endpointURLs,
}