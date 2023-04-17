import '../pages/index.css';
import {
  formConfig,
  photoGridSelector,
  popupEditProfile,
  popupNewPost,
  popupEditAvatar,
  popupPost,
  popupDeleteSubmit,
  popupError,
  forms,
  submitButtons,
  profileEditButton,
  newPostAddButton,
  profileAvatar,
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
  api,
  userInfo,
  } from './constants.js';
// import { openPopup, closePopup } from './Popup.js';
import { setProfileAvatar } from './profile.js';
import Card from './card.js';
import FormValidator from './validate-forms';
import { renderLoading, handleError, getInputsData, editLike } from './utils.js';
import Section from './Section.js';

const editProfileFormValidator = new FormValidator(formConfig, editProfileForm);
const newPostFormValidator = new FormValidator(formConfig, newPostForm);
const editAvatarFormValidator = new FormValidator(formConfig, editAvatarForm);

//profile processing
function renderEditProfile() {
  forms.editProfileForm.reset();
  userInfo.getUserInfo()
    .then(popupEditProfile.setInputValues) // setInputsData(editProfileFormInputsArray, editProfileFormPrefix, data);
    .catch(handleError);
  editProfileFormValidator.resetFormValidation();
}

function handleEditProfileClick() {
  renderEditProfile();
  popupEditProfile.openPopup();
}

export function saveProfileInfo(evt, data) {
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
  forms.newPostForm.reset();
  newPostFormValidator.resetFormValidation();
}

function handleNewPostClick() {
  renderNewPost();
  popupNewPost.openPopup();
}

export function saveNewPost(evt, data) {
  evt.preventDefault();
  addNewPost(data);
  popupNewPost.closePopup();
}

function addPost(newCardData) {
  const updatedPhotoGrid = new Section({ items: [newCardData], renderer: (newCardData) => {
    const newCard = new Card (newCardData,
      cardTemplateSelector,
      userInfo.mainUserId,
      { likeClickHandler: editLike, imageClickHandler: popupPost.openPopup }
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
  forms.editAvatarForm.reset();
  editAvatarFormValidator.resetFormValidation();
}

function handleEditAvatarClick() {
  renderEditAvatar();
  popupEditAvatar.openPopup();
}

export function saveAvatar(evt, data) {
  evt.preventDefault();
  editAvatar(data);
  popupEditAvatar.closePopup();
}

function editAvatar(data) {
  renderLoading(true, popupEditAvatar.submitButton, 'Сохранение...');
  api.editProfileAvatar(data)
  .then(setProfileAvatar)
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
      setProfileAvatar({ avatar });
      const initialPhotoGrid = new Section({ items: cards, renderer: (card) => {
        const newCard = new Card (card,
          cardTemplateSelector,
          userInfo.mainUserId,
          { likeClickHandler: editLike, imageClickHandler: popupPost.openPopup }
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

export function submitDeleteCard(evt) {
  evt.preventDefault();
  deleteCard(localStorage.getItem('cardIdToDelete'));
  localStorage.removeItem('cardIdToDelete');
  popupDeleteSubmit.closePopup()
}

function initModals() {
  // forms.editProfileForm.addEventListener('submit', saveProfileInfo);
  // forms.newPostForm.addEventListener('submit', saveNewPost);
  // forms.editAvatarForm.addEventListener('submit', saveAvatar);
  // forms.deleteSubmitForm.addEventListener('submit', submitDeleteCard);
  forms.errorForm.addEventListener('submit', (evt) => {
    evt.preventDefault();
    closePopup(popupError);
  })
}

function initFormValidation() {
  editProfileFormValidator.enableFormValidation();
  newPostFormValidator.enableFormValidation();
  editAvatarFormValidator.enableFormValidation();
}

function initApp() {
  loadInitialData();
  initMainScreen();
  initModals();
  initFormValidation();
}

initApp();