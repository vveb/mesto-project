import './index.css';
import {
  formConfig,
  cardTemplateSelector, photoGridSelector, userNameSelector, userAboutSelector,
  profileEditButton, newPostAddButton, profileAvatar,
  api,
  } from '../utils/constants.js';
import { renderLoading, handleError, editLike, editUserData, renderPost, getUserData } from '../utils/utils.js';

import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithImage from '../components/PopupWithImage.js';
import Section from '../components/Section.js';
import UserInfo from '../components/UserInfo.js';

// popups
const popupPost = new PopupWithImage('.popup_post', renderPost);
popupPost.setEventListeners();

const popupEditProfile = new PopupWithForm('.popup_edit-profile', saveProfileInfo);
popupEditProfile.setEventListeners();

const popupNewPost = new PopupWithForm('.popup_new-post', saveNewPost);
popupNewPost.setEventListeners();

const popupEditAvatar = new PopupWithForm('.popup_update-avatar', saveAvatar);
popupEditAvatar.setEventListeners();

const popupDeleteSubmit = new PopupWithForm('.popup_delete-submit', submitDeleteCard);
popupDeleteSubmit.setEventListeners();

// form validators
const editProfileFormValidator = new FormValidator(formConfig, popupEditProfile.form);
const newPostFormValidator = new FormValidator(formConfig, popupNewPost.form);
const editAvatarFormValidator = new FormValidator(formConfig, popupEditAvatar.form);

// user info
const userInfo = new UserInfo({ userNameSelector, userAboutSelector }, editUserData, getUserData);

//profile processing
function renderEditProfile() {
  popupEditProfile.resetForm();
  userInfo.getUserInfo()
    .then(popupEditProfile.setInputValues)
    .catch(handleError);
  editProfileFormValidator.resetFormValidation();
}

function handleEditProfileClick() {
  renderEditProfile();
  popupEditProfile.openPopup();
}

function saveProfileInfo(evt, data) {
  evt.preventDefault();
  editProfile(data);
  popupEditProfile.closePopup();
}

function editProfile(data) {
  renderLoading(true, popupEditProfile.submitButton, 'Сохранение...');
  userInfo.setUserInfo(data)
    .finally(() => {
      renderLoading(false, popupEditProfile.submitButton);
    });
}

//new post processing
function renderNewPost() {
  popupNewPost.resetForm()
  newPostFormValidator.resetFormValidation();
}

function handleNewPostClick() {
  renderNewPost();
  popupNewPost.openPopup();
}

function saveNewPost(evt, data) {
  evt.preventDefault();
  addNewPost(data);
  popupNewPost.closePopup();
}

function addPost(newCardData) {
  const updatedPhotoGrid = new Section({ items: [newCardData], renderer: (newCardData) => {
    const newCard = new Card (newCardData,
      cardTemplateSelector,
      userInfo.mainUserId,
      { likeClickHandler: editLike, imageClickHandler: popupPost.openPopup },
      popupDeleteSubmit,
    );
    updatedPhotoGrid.addItemReverse(newCard.createNewCard());
  }}, photoGridSelector);
  
  updatedPhotoGrid.renderItems();
}

function addNewPost(data) {
  renderLoading(true, popupNewPost.submitButton, 'Сохранение...');
  api.addNewCard(data)
    .then(addPost)
    .catch(handleError)
    .finally(() => {
      renderLoading(false, popupNewPost.submitButton);
    })
}

// avatar processing
function renderEditAvatar() {
  popupEditAvatar.resetForm();
  editAvatarFormValidator.resetFormValidation();
}

function handleEditAvatarClick() {
  renderEditAvatar();
  popupEditAvatar.openPopup();
}

function saveAvatar(evt, data) {
  evt.preventDefault();
  editAvatar(data);
  popupEditAvatar.closePopup();
}

function editAvatar(data) {
  renderLoading(true, popupEditAvatar.submitButton, 'Сохранение...');
  api.editProfileAvatar(data)
  .then(({ avatar }) => {
    profileAvatar.style.backgroundImage = `url(${avatar})`;
  })
  .catch(handleError)
  .finally(() => {
    renderLoading(false, popupEditAvatar.submitButton);
  });
}

function deleteCard(id) {
  renderLoading(true, popupDeleteSubmit.submitButton, 'Удаление...');
  api.deleteCardData(id)
  .then(() => {
    document.getElementById(id).remove();
  })
  .catch(handleError)
  .finally(() => {
    renderLoading(false, popupDeleteSubmit.submitButton);
  });
}

//main processing

function loadInitialData() {
  Promise.all([userInfo.getUserInfo(), api.loadCards()])
    .then(([ profileData, cards ]) => {
      const { name, about, avatar, _id } = profileData;
      userInfo.mainUserId = _id;
      userInfo.setUserInfo({ name, about });
      profileAvatar.style.backgroundImage = `url(${avatar})`;
      
      const initialPhotoGrid = new Section({ items: cards, renderer: (card) => {
        const newCard = new Card (card,
          cardTemplateSelector,
          userInfo.mainUserId,
          { likeClickHandler: editLike, imageClickHandler: popupPost.openPopup },
          popupDeleteSubmit,
        );
        initialPhotoGrid.addItem(newCard.createNewCard());
      }}, photoGridSelector);
      initialPhotoGrid.renderItems();
    })
    .catch(handleError);
}

function initMainScreen() {
  profileEditButton.addEventListener('click', handleEditProfileClick);
  newPostAddButton.addEventListener('click', handleNewPostClick);
  profileAvatar.addEventListener('click', handleEditAvatarClick);
}

function submitDeleteCard(evt) {
  evt.preventDefault();
  deleteCard(localStorage.getItem('cardIdToDelete'));
  localStorage.removeItem('cardIdToDelete');
  popupDeleteSubmit.closePopup()
}

function initFormValidation() {
  editProfileFormValidator.enableFormValidation();
  newPostFormValidator.enableFormValidation();
  editAvatarFormValidator.enableFormValidation();
}

function initApp() {
  loadInitialData();
  initMainScreen();
  // initModals();
  initFormValidation();
}

initApp();