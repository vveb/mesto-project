import '../pages/index.css'
import {
  formConfig,
  photoGrid,
  popups,
  forms,
  submitButtons,
  imagePost,
  captionPost,
  profileEditButton,
  newPostAddButton,
  profileAvatar,
  avatarFormInputsArray,
  newPostFormInputsArray,
  editProfileFormInputsArray,
  avatarFormPrefix,
  newPostFormPrefix,
  editProfileFormPrefix,
} from './constants.js';
import { openPopup, closePopup } from './modal.js'
import { setProfileData, getProfileData, setProfileAvatar } from './profile.js'
import { createNewPost } from './card.js'
import { enableFormValidation, resetFormValidation } from './validate-forms';
import { renderLoading, handleError, getInputsData, setInputsData } from './utils.js'
import { api } from './api.js'

//profile processing
function renderEditProfile() {
  forms.editProfileForm.reset();
  setInputsData(editProfileFormInputsArray, editProfileFormPrefix, getProfileData());
  resetFormValidation(forms.editProfileForm, formConfig);
}

function handleEditProfileClick() {
  renderEditProfile();
  openPopup(popups.popupEditProfile);
}

function saveProfileInfo(evt) {
  evt.preventDefault();
  editProfile(getInputsData(editProfileFormInputsArray, editProfileFormPrefix));
  closePopup(popups.popupEditProfile);
}

function editProfile(data) {
  renderLoading(true, submitButtons.editProfileSubmitButton, 'Сохранение...');
  api.editProfileInfo(data)
    .then(setProfileData)
    .catch(handleError)
    .finally(() => {
      renderLoading(false, submitButtons.editProfileSubmitButton);
    });
}

//new post processing
function renderNewPost() {
  forms.newPostForm.reset();
  resetFormValidation(forms.newPostForm, formConfig);
}

function handleNewPostClick() {
  renderNewPost();
  openPopup(popups.popupNewPost);
}

function saveNewPost(evt) {
  evt.preventDefault();
  addNewPost(getInputsData(newPostFormInputsArray, newPostFormPrefix), evt);
  closePopup(popups.popupNewPost);
}

function addPost(data) {
  photoGrid.prepend(createNewPost(data, mainUserId));
}

function addNewPost(data) {
  renderLoading(true, submitButtons.newPostSubmitButton, 'Сохранение...');
  api.addNewCard(data)
    .then(addPost)
    .catch(handleError)
    .finally(() => {
      renderLoading(false, submitButtons.newPostSubmitButton);
    })
}

// avatar processing
function renderEditAvatar() {
  forms.editAvatarForm.reset();
  resetFormValidation(forms.editAvatarForm, formConfig);
}

function handleEditAvatarClick() {
  renderEditAvatar();
  openPopup(popups.popupEditAvatar);
}

function saveAvatar(evt) {
  evt.preventDefault();
  editAvatar(getInputsData(avatarFormInputsArray, avatarFormPrefix));
  closePopup(popups.popupEditAvatar);
}

function editAvatar(data) {
  renderLoading(true, submitButtons.editAvatarSubmitButton, 'Сохранение...');
  api.editProfileAvatar(data)
  .then(setProfileAvatar)
  .catch(handleError)
  .finally(() => {
    renderLoading(false, submitButtons.editAvatarSubmitButton);
  });
}

//view post processing
export function handleCardImageClick(evt) {
  openPost({ title: evt.target.alt, link: evt.target.src });
}

function renderPost({ title, link }) {
  imagePost.alt = title;
  imagePost.src = link;
  captionPost.textContent = title;
}

function openPost(cardValues) {
  renderPost(cardValues);
  openPopup(popups.popupPost);
}

//like processing
export function editLike(cardData, setLikes) {
  api.toggleLike({ cardId: cardData.id, isLiked: cardData.likes.includes(mainUserId) })
    .then(setLikes)
    .catch(handleError);
}

//delete post processing
export function handleDeleteClick(evt) {
  const { id } = evt.target.closest('.photo-post');
  localStorage.setItem('cardIdToDelete', id);
  openPopup(popups.popupDeleteSubmit);
}

function deleteCard(id) {
  renderLoading(true, submitButtons.deleteSubmitButton, 'Удаление...');
  api.deleteCardData(id)
  .then(() => {
    document.getElementById(id).remove();
  })
  .catch(handleError)
  .finally(() => {
    renderLoading(false, submitButtons.deleteSubmitButton);
  });
}

//main processing

let mainUserId;

function loadInitialData() {
  Promise.all([api.getProfileData(), api.loadCards()])
    .then(([ profileData, cards ]) => {
      const { name, about, avatar, _id } = profileData;
      mainUserId = _id;
      setProfileData({ name, about });
      setProfileAvatar({ avatar });
      cards.forEach(function(item) {
        photoGrid.append(createNewPost(item, mainUserId));
      });
    })
    .catch(handleError);
}

function initMainScreen() {
  profileEditButton.addEventListener('click', handleEditProfileClick);
  newPostAddButton.addEventListener('click', handleNewPostClick);
  profileAvatar.addEventListener('click', handleEditAvatarClick);
}

function initModals() {
  forms.editProfileForm.addEventListener('submit', saveProfileInfo);
  forms.newPostForm.addEventListener('submit', saveNewPost);
  forms.editAvatarForm.addEventListener('submit', saveAvatar);
  forms.deleteSubmitForm.addEventListener('submit', (evt) => {
    evt.preventDefault();
    deleteCard(localStorage.getItem('cardIdToDelete'));
    localStorage.removeItem('cardIdToDelete');
    closePopup(popups.popupDeleteSubmit);
  });
  forms.errorForm.addEventListener('submit', (evt) => {
    evt.preventDefault();
    closePopup(popups.popupError);
  })
}

function initApp() {
  loadInitialData();
  initMainScreen();
  initModals();
  enableFormValidation(formConfig);
}

initApp();