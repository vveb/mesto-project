import { resetFormValidation } from './validate-forms.js';
import { formConfig, editProfileForm, updateAvatarForm } from './constants.js';
import { addNewPost, editProfile, editAvatar, deleteCard } from './utils.js';
import { getProfileData } from './profile.js';

const closeButtons = document.querySelectorAll('.popup__close-button');

// Popups
const popupEditProfile = document.querySelector('.popup_edit-profile');
const popupNewPost = document.querySelector('.popup_new-post');
const popupUpdateAvatar = document.querySelector('.popup_update-avatar');
const popupPost = document.querySelector('.popup_post');
const popupDeleteSubmit = document.querySelector('.popup_delete-submit');

// Forms and forms' elements
const newPostForm = document.forms['new-post'];
const newPostSubmitButton = newPostForm['submit-button'];
const imagePost = popupPost.querySelector('.view-post__image');
const captionPost = popupPost.querySelector('.view-post__caption');
const deleteSubmitForm = document.forms['delete-submit'];
const deleteSubmitButton = deleteSubmitForm['submit-button'];

//Inputs
const newPostInputTitle = newPostForm.title;
const newPostInputLink = newPostForm.link;
const editProfileInputName = editProfileForm.name;
const editProfileInputVocation = editProfileForm.vocation;
const avatarInputLink = updateAvatarForm.elements['input-avatar-link'];

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

function setProfileInputs({ name, about }) {
  editProfileInputName.value = name;
  editProfileInputVocation.value = about;
}

function getProfileInputs() {
  return {name: editProfileInputName.value, about: editProfileInputVocation.value};
}

function renderEditProfile() {
  editProfileForm.reset();
  setProfileInputs(getProfileData());
  resetFormValidation(editProfileForm, formConfig);
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
  resetFormValidation(newPostForm, formConfig);
}

function handleNewPostClick() {
  renderNewPost();
  openPopup(popupNewPost);
}

function renderUpdateAvatar() {
  updateAvatarForm.reset();
  resetFormValidation(updateAvatarForm, formConfig);
}

function handleUpdateAvatarClick() {
  renderUpdateAvatar();
  openPopup(popupUpdateAvatar);
}

function saveProfileInfo (evt) {
  evt.preventDefault();
  editProfile(getProfileInputs());
  closePopup(popupEditProfile);
}

function getNewPostInputs() {
  return { name: newPostInputTitle.value, link: newPostInputLink.value }
}

function saveNewPost(evt) {
  evt.preventDefault();
  addNewPost(getNewPostInputs(), evt);
  
  closePopup(popupNewPost);
}

function getAvatarInput() {
  return { avatar: avatarInputLink.value };
}

function saveAvatar(evt) {
  evt.preventDefault();
  editAvatar(getAvatarInput());
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
  deleteSubmitForm.addEventListener('submit', (evt) => {
    evt.preventDefault();
    deleteCard(localStorage.getItem('cardIdToDelete'));
    localStorage.removeItem('cardIdToDelete');
    closePopup(popupDeleteSubmit);
  });
}

export { handleEditProfileClick,
  handleNewPostClick,
  handleUpdateAvatarClick,
  openPost,
  openPopup,
  popupDeleteSubmit,
  newPostSubmitButton,
  deleteSubmitButton
};

//Унести в index.js все то, что я бы не оставил в абстрактном классе popup