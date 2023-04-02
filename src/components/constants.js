const formConfig = {
  formSelector: '.form',
  inputSelector: '.form__input',
  submitButtonSelector: '.form__submit',
  inactiveButtonClass: 'form__submit_disabled',
  inputErrorClass: 'form__input_invalid',
  errorClass: 'form__input-error_active'
}

const photoGrid = document.querySelector('.photo-grid');
const editProfileForm = document.forms['edit-profile'];
const editProfileSubmitButton = editProfileForm['submit-button'];
const profileAvatar = document.querySelector('.profile__avatar');
const profileEditButton = document.querySelector('.profile__edit-button');
const newPostAddButton = document.querySelector('.profile__add-button');
const profileName = document.querySelector('.profile__name');
const profileVocation = document.querySelector('.profile__vocation');
const updateAvatarForm = document.forms['update-avatar'];
const updateAvatarSubmitButton = updateAvatarForm['submit-button']

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

export { formConfig,
  photoGrid,
  editProfileForm,
  profileAvatar,
  profileEditButton,
  newPostAddButton,
  profileName,
  profileVocation,
  updateAvatarForm,
  requestHeaders,
  endpointURLs,
  editProfileSubmitButton,
  updateAvatarSubmitButton,
}