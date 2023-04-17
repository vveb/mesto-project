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
import { renderLoading, handleError, getInputsData, setInputsData, editLike } from './utils.js';
import Section from './Section.js';

const editProfileFormValidator = new FormValidator(formConfig, editProfileForm);
const newPostFormValidator = new FormValidator(formConfig, newPostForm);
const editAvatarFormValidator = new FormValidator(formConfig, editAvatarForm);

//profile processing
function renderEditProfile() {
  forms.editProfileForm.reset();
  userInfo.getUserInfo()
    .then((data) => {
      setInputsData(editProfileFormInputsArray, editProfileFormPrefix, data);
    })
  editProfileFormValidator.resetFormValidation();
}

function handleEditProfileClick() {
  renderEditProfile();
  openPopup(popupEditProfile);
}

function saveProfileInfo(evt) {
  evt.preventDefault();
  editProfile(getInputsData(editProfileFormInputsArray, editProfileFormPrefix));
  closePopup(popupEditProfile);
}

function editProfile(data) {
  renderLoading(true, submitButtons.editProfileSubmitButton, 'Сохранение...');
  userInfo.setUserInfo(data)
    .finally(() => {
      renderLoading(false, submitButtons.editProfileSubmitButton);
    });
}

//new post processing
function renderNewPost() {
  forms.newPostForm.reset();
  newPostFormValidator.resetFormValidation();
}

function handleNewPostClick() {
  renderNewPost();
  openPopup(popupNewPost);
}

function saveNewPost(evt) {
  evt.preventDefault();
  addNewPost(getInputsData(newPostFormInputsArray, newPostFormPrefix), evt);
  closePopup(popupNewPost);
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
  editAvatarFormValidator.resetFormValidation();
}

function handleEditAvatarClick() {
  renderEditAvatar();
  openPopup(popupEditAvatar);
}

function saveAvatar(evt) {
  evt.preventDefault();
  editAvatar(getInputsData(avatarFormInputsArray, avatarFormPrefix));
  closePopup(popupEditAvatar);
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

function initModals() {
  forms.editProfileForm.addEventListener('submit', saveProfileInfo);
  forms.newPostForm.addEventListener('submit', saveNewPost);
  forms.editAvatarForm.addEventListener('submit', saveAvatar);
  forms.deleteSubmitForm.addEventListener('submit', (evt) => {
    evt.preventDefault();
    deleteCard(localStorage.getItem('cardIdToDelete'));
    localStorage.removeItem('cardIdToDelete');
    closePopup(popupDeleteSubmit);
  });
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