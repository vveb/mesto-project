import { createNewPost } from './card.js';
import {
  photoGrid,
  profileEditButton,
  newPostAddButton,
  profileAvatar,
  formConfig,
} from './constants.js';
import { handleEditProfileClick,
  handleNewPostClick,
  handleUpdateAvatarClick,
  initModals,
} from './modal.js';
import { enableFormValidation } from './validate-forms.js';
import initialPostsList from './initial-posts.js';

export function addPost(data) {
  photoGrid.prepend(createNewPost(data));
}

function loadInitialPosts() {
  initialPostsList.forEach(function(item) {
    addPost(item);
  });
}

function initMainScreen() {
  profileEditButton.addEventListener('click', handleEditProfileClick);
  newPostAddButton.addEventListener('click', handleNewPostClick);
  profileAvatar.addEventListener('click', handleUpdateAvatarClick);
}

export function initApp() {
  loadInitialPosts();
  initMainScreen();
  initModals();
  enableFormValidation(formConfig);
}