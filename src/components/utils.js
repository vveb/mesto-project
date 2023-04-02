import { createNewPost, setLike } from './card.js';
import {
  photoGrid,
  profileEditButton,
  newPostAddButton,
  profileAvatar,
  formConfig,
  editProfileSubmitButton,
  updateAvatarSubmitButton,
} from './constants.js';
import { handleEditProfileClick,
  handleNewPostClick,
  handleUpdateAvatarClick,
  initModals,
  newPostSubmitButton,
  deleteSubmitButton,
} from './modal.js';
import { enableFormValidation } from './validate-forms.js';
import { api } from './api.js';
import { setProfileAvatar, setProfileData } from './profile.js'

let mainUserId;

export function addPost(data) {
  photoGrid.prepend(createNewPost(data, mainUserId));
}

export function addNewPost(data) {
  renderLoading(true, newPostSubmitButton, 'Сохранение...');
  api.addNewCard(data)
    .then(addPost)
    .catch(console.dir)
    .finally(() => {
      renderLoading(false, newPostSubmitButton);
    })
}

export function deleteCard(id) {
  renderLoading(true, deleteSubmitButton, 'Удаление...')
  api.deleteCardData(id)
  .then(() => {
    document.getElementById(id).remove();
  })
  .catch(console.dir)
  .finally(() => {
    renderLoading(false, deleteSubmitButton);
  });
}

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

export function editProfile(data) {
  renderLoading(true, editProfileSubmitButton, 'Сохранение...');
  api.editProfileInfo(data)
    .then(setProfileData)
    .catch(console.dir)
    .finally(() => {
      renderLoading(false, editProfileSubmitButton);
    });
}

export function editAvatar(data) {
  renderLoading(true, updateAvatarSubmitButton, 'Сохранение...')
  api.editProfileAvatar(data)
  .then(setProfileAvatar)
  .catch(console.dir) //Здесь можно дописать функцию-коллбэк, которая будет выводить message ошибки в отдельное модальное окно
  .finally(() => {
    renderLoading(false, updateAvatarSubmitButton);
  });
}

export function editLike(cardData) {
  api.toggleLike({ cardId: cardData.id, isLiked: cardData.likes.includes(mainUserId) })
    .then(setLike)
    .catch(console.dir);
}

export function renderLoading(isLoading, submitButton, loadingText) {
  if (isLoading) {
    localStorage.setItem('buttonText', submitButton.textContent);
    submitButton.textContent = loadingText;
  } else {
    submitButton.textContent = localStorage.getItem('buttonText');
    localStorage.removeItem('buttonText');
  }
}

// export function handleError(error, errorText) {

// }

function initMainScreen() {
  profileEditButton.addEventListener('click', handleEditProfileClick);
  newPostAddButton.addEventListener('click', handleNewPostClick);
  profileAvatar.addEventListener('click', handleUpdateAvatarClick);
}

export function initApp() {
  loadInitialData();
  initMainScreen();
  initModals();
  enableFormValidation(formConfig);
}

//Здесь остаются такие функции, которые мы используем в нескольких местах (модулях)