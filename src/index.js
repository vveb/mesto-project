import { enableFormValidation, resetFormValidation } from './validate-forms.js';
import { FormConfig, initialPostsList } from './constants.js'

// Page elements
const photoGrid = document.querySelector('.photo-grid');
const profileAvatar = document.querySelector('.profile__avatar')
const templatePhotoPost = document.querySelector('#template-photo-post').content;

// Popups
const popupEditProfile = document.querySelector('.popup_edit-profile');
const popupNewPost = document.querySelector('.popup_new-post');
const popupPost = document.querySelector('.popup_post');
const popupUpdateAvatar = document.querySelector('.popup_update-avatar');

// Forms and forms' elements
const editProfileForm = document.forms['edit-profile'];
const editProfileInputName = editProfileForm.name;
const editProfileInputVocation = editProfileForm.vocation;

const newPostForm = document.forms['new-post'];
const newPostInputTitle = newPostForm.title;
const newPostInputLink = newPostForm.link;

const updateAvatarForm = document.forms['update-avatar'];
const updateAvatarLink = updateAvatarForm.elements['input-avatar-link'];

// Buttons
const profileEditButton = document.querySelector('.profile__edit-button');
const newPostAddButton = document.querySelector('.profile__add-button');
const closeButtons = document.querySelectorAll('.popup__close-button');

// Elements of popup Post
const imagePost = popupPost.querySelector('.view-post__image');
const captionPost = popupPost.querySelector('.view-post__caption');

// Event listener for closing popup by click on close-button or overlay
const handlePopupOverlayClick = (evt) => {
  if (evt.target === evt.currentTarget) {
    closePopup(evt.currentTarget);
  }
}

// Event listener for closing popup by press Escape-button
const handleEscapeButton = (evt) => {
  const openedPopup = document.querySelector('.popup_opened');
  if (evt.key === 'Escape' && openedPopup) {
    closePopup(openedPopup);
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
  editProfileInputName.value = profileName.textContent;
  editProfileInputVocation.value = profileVocation.textContent;
  resetFormValidation(editProfileForm, FormConfig);
}

function handleEditProfileClick() {
  renderEditProfile();
  openPopup(popupEditProfile);
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

function renderPost({ title, link }) {
  imagePost.alt = title;
  imagePost.src = link;
  captionPost.textContent = title;
}

function handleCardImageClick(evt) {
  renderPost({ title: evt.target.alt, link: evt.target.src });
  openPopup(popupPost);
}

function saveProfileInfo (evt) {
  evt.preventDefault();
  profileName.textContent = editProfileInputName.value;
  profileVocation.textContent = editProfileInputVocation.value;
  closePopup(popupEditProfile);
}

function saveNewPost(evt) {
  evt.preventDefault();
  addPost(newPostInputTitle.value, newPostInputLink.value);
  closePopup(popupNewPost);
}

function saveAvatar(evt) {
  evt.preventDefault();
  profileAvatar.style.backgroundImage = `url(${updateAvatarLink.value})`;
  closePopup(popupUpdateAvatar);
}

function handleLikeClick(evt) {
  evt.target.classList.toggle('photo-post__like-button_active');
}

function createNewPost(title, link) {
  const photoPost = templatePhotoPost.querySelector('.photo-post').cloneNode(true);
  const photoPostImage = photoPost.querySelector('.photo-post__image');
  photoPostImage.src = link;
  photoPostImage.alt = title;
  photoPostImage.addEventListener('click', handleCardImageClick);
  photoPost.querySelector('.photo-post__title').textContent = title;
  photoPost.querySelector('.photo-post__like-button').addEventListener('click', handleLikeClick);
  const deleteButton = photoPost.querySelector('.photo-post__delete-button');
    deleteButton.addEventListener('click', function() {
    deleteButton.closest('.photo-post').remove();
  });
  return photoPost;
}

function addPost(title, link) {
  photoGrid.prepend(createNewPost(title, link));
}

function loadInitialPosts() {
    initialPostsList.forEach(function(item) {
    addPost(item.title, item.link);
  });
}

// Event listeners for all Close popup buttons
closeButtons.forEach((button) => {
  const popup = button.closest('.popup');
  button.addEventListener('click', () => closePopup(popup));
  popup.addEventListener('click', handlePopupOverlayClick);
});

// Event listeners for Edit profile
const profileName = document.querySelector('.profile__name');
const profileVocation = document.querySelector('.profile__vocation');

profileEditButton.addEventListener('click', handleEditProfileClick);
editProfileForm.addEventListener('submit', saveProfileInfo);
// editProfileForm.addEventListener('input', () => checkEmptyInputs(editProfileInputName.value, true, profileEditSaveButton));

// Event listeners for New Post
newPostAddButton.addEventListener('click', handleNewPostClick);
newPostForm.addEventListener('submit', saveNewPost);
// newPostForm.addEventListener('input', () => checkEmptyInputs(newPostInputTitle.value, newPostInputLink.value, newPostSaveButton));

// Event listeners for Update Avatar
profileAvatar.addEventListener('click', handleUpdateAvatarClick);
updateAvatarForm.addEventListener('submit', saveAvatar);
// updateAvatarForm.addEventListener('input', () => checkEmptyInputs(updateAvatarLink.value, true, updateAvatarSaveButton));

// Оставил для себя, чтобы не забыть, что callback-функцию можно убрать в отдельную переменную
// const callbackFunction = () => openPopup(popupEditProfile);

loadInitialPosts();

enableFormValidation(FormConfig);