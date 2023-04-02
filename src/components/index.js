import '../pages/index.css'
import {
  formConfig,
  closeButtons,
  photoGrid,
  popups,
  forms,
  formInputs,
  submitButtons,
  imagePost,
  captionPost,
  profileEditButton,
  newPostAddButton,
  profileAvatar,
} from './constants.js';
import { openPopup, closePopup, handlePopupOverlayClick } from './modal.js'
import { setProfileData, getProfileData, setProfileAvatar } from './profile.js'
import { createNewPost, setLike } from './card.js'
import { enableFormValidation, resetFormValidation } from './validate-forms';
import { renderLoading } from './utils.js'
import { api } from './api.js'

//profile processing
function setProfileInputs({ name, about }) {
  formInputs.editProfileInputName.value = name;
  formInputs.editProfileInputVocation.value = about;
}

function getProfileInputs() {
  return {name: formInputs.editProfileInputName.value, about: formInputs.editProfileInputVocation.value};
}

function renderEditProfile() {
  forms.editProfileForm.reset();
  setProfileInputs(getProfileData());
  resetFormValidation(forms.editProfileForm, formConfig);
}

function handleEditProfileClick() {
  renderEditProfile();
  openPopup(popups.popupEditProfile);
}

function saveProfileInfo (evt) {
  evt.preventDefault();
  editProfile(getProfileInputs());
  closePopup(popups.popupEditProfile);
}

function editProfile(data) {
  renderLoading(true, submitButtons.editProfileSubmitButton, 'Сохранение...');
  api.editProfileInfo(data)
    .then(setProfileData)
    .catch(console.dir)
    .finally(() => {
      renderLoading(false, submitButtons.editProfileSubmitButton);
    });
}

//new post processing
function renderNewPost() {
  forms.newPostForm.reset();
  // resetFormValidation(forms.newPostForm, formConfig);
}

function handleNewPostClick() {
  renderNewPost();
  openPopup(popups.popupNewPost);
}

function getNewPostInputs() {
  return { name: formInputs.newPostInputTitle.value, link: formInputs.newPostInputLink.value }
}

function saveNewPost(evt) {
  evt.preventDefault();
  addNewPost(getNewPostInputs(), evt);
  closePopup(popups.popupNewPost);
}

function addPost(data) {
  photoGrid.prepend(createNewPost(data, mainUserId));
}

function addNewPost(data) {
  renderLoading(true, submitButtons.newPostSubmitButton, 'Сохранение...');
  api.addNewCard(data)
    .then(addPost)
    .catch(console.dir)
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

function getAvatarInput() {
  return { avatar: formInputs.avatarInputLink.value };
}

function saveAvatar(evt) {
  evt.preventDefault();
  editAvatar(getAvatarInput());
  closePopup(popups.popupEditAvatar);
}

function editAvatar(data) {
  renderLoading(true, submitButtons.editAvatarSubmitButton, 'Сохранение...')
  api.editProfileAvatar(data)
  .then(setProfileAvatar)
  .catch(console.dir) //Здесь можно дописать функцию-коллбэк, которая будет выводить message ошибки в отдельное модальное окно
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
export function handleLikeClick(evt) {
  if (evt.target.classList.contains('photo-post__like-button')) {
    const card = evt.target.closest('.photo-post');
    editLike(card);
  }
}

function editLike(cardData) {
  api.toggleLike({ cardId: cardData.id, isLiked: cardData.likes.includes(mainUserId) })
    .then(setLike)
    .catch(console.dir);
}

photoGrid.addEventListener('click', handleLikeClick);

//delete post processing
export function handleDeleteClick(evt) {
  const { id } = evt.target.closest('.photo-post');
  localStorage.setItem('cardIdToDelete', id);
  openPopup(popups.popupDeleteSubmit);
}

function deleteCard(id) {
  renderLoading(true, submitButtons.deleteSubmitButton, 'Удаление...')
  api.deleteCardData(id)
  .then(() => {
    document.getElementById(id).remove();
  })
  .catch(console.dir)
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
    .catch(console.dir);
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
  closeButtons.forEach((button) => {
    const popup = button.closest('.popup');
    button.addEventListener('click', () => closePopup(popup));
    popup.addEventListener('click', handlePopupOverlayClick);
  });
  forms.deleteSubmitForm.addEventListener('submit', (evt) => {
    evt.preventDefault();
    deleteCard(localStorage.getItem('cardIdToDelete'));
    localStorage.removeItem('cardIdToDelete');
    closePopup(popups.popupDeleteSubmit);
  });
}

function initApp() {
  loadInitialData();
  initMainScreen();
  initModals();
  // enableFormValidation(formConfig);
}

initApp();