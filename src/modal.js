import { resetFormValidation } from './validate-forms.js';
import { FormConfig, editProfileForm, updateAvatarForm } from './constants.js';
import { addPost } from './utils.js';
import { setProfileData, setProfileInputs, setAvatarByLink } from './profile.js';

const closeButtons = document.querySelectorAll('.popup__close-button');

// Popups
const popupEditProfile = document.querySelector('.popup_edit-profile');
const popupNewPost = document.querySelector('.popup_new-post');
const popupUpdateAvatar = document.querySelector('.popup_update-avatar');
const popupPost = document.querySelector('.popup_post');

// Forms and forms' elements
const newPostForm = document.forms['new-post'];
const imagePost = popupPost.querySelector('.view-post__image');
const captionPost = popupPost.querySelector('.view-post__caption');

//Inputs
const newPostInputTitle = newPostForm.title;
const newPostInputLink = newPostForm.link;

const handleEscapeButton = (evt) => {
  const openedPopup = document.querySelector('.popup_opened');
  if (evt.key === 'Escape' && openedPopup) {
    closePopup(openedPopup);
  }
}

const handlePopupOverlayClick = (evt) => {
  if (evt.target === evt.currentTarget) {
    closePopup(evt.currentTarget);
  }
}

function openPopup(popup) {
  popup.classList.add('popup_opened');
  if (!popup.classList.contains('popup_transition')) {
    popup.classList.add('popup_transition');
  }
  document.addEventListener('keydown', handleEscapeButton);
}

function closePopup(popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', handleEscapeButton);
}

function renderEditProfile() {
  editProfileForm.reset();
  setProfileInputs();
  resetFormValidation(editProfileForm, FormConfig);
}

function handleEditProfileClick() {
  renderEditProfile();
  openPopup(popupEditProfile);
}

function renderPost({ title, link }) {
  imagePost.alt = title;
  imagePost.src = link;
  captionPost.textContent = title;
}

function openPost(cardValues) {
  renderPost(cardValues);
  openPopup(popupPost);
}

function renderNewPost() {
  newPostForm.reset();
  resetFormValidation(newPostForm, FormConfig);
}

function handleNewPostClick() {
  renderNewPost();
  openPopup(popupNewPost);
}

function renderUpdateAvatar() {
  updateAvatarForm.reset();
  resetFormValidation(updateAvatarForm, FormConfig);
}

function handleUpdateAvatarClick() {
  renderUpdateAvatar();
  openPopup(popupUpdateAvatar);
}

// Сделать "сеттеры" и "геттеры"
function saveProfileInfo (evt) {
  evt.preventDefault();
  setProfileData();
  closePopup(popupEditProfile);
}

function saveNewPost(evt) {
  evt.preventDefault();
  addPost(newPostInputTitle.value, newPostInputLink.value);
  closePopup(popupNewPost);
}

function saveAvatar(evt) {
  evt.preventDefault();
  setAvatarByLink();
  closePopup(popupUpdateAvatar);
}

export function initModals() {
  editProfileForm.addEventListener('submit', saveProfileInfo);
  newPostForm.addEventListener('submit', saveNewPost);
  updateAvatarForm.addEventListener('submit', saveAvatar);
  closeButtons.forEach((button) => {
    const popup = button.closest('.popup');
    button.addEventListener('click', () => closePopup(popup));
    popup.addEventListener('click', handlePopupOverlayClick);
  });
}

export { handleEditProfileClick, handleNewPostClick, handleUpdateAvatarClick, openPost};