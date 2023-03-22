import { createNewPost } from './card.js';
import {
  photoGrid,
  initialPostsList,
  profileEditButton,
  newPostAddButton,
  profileAvatar,
  FormConfig,
} from './constants.js';
import { handleEditProfileClick,
  handleNewPostClick,
  handleUpdateAvatarClick,
  initModals,
} from './modal.js';
import { enableFormValidation } from './validate-forms.js';

export function addPost(title, link) {
  photoGrid.prepend(createNewPost(title, link));
}

function loadInitialPosts() {
  initialPostsList.forEach(function(item) {
    addPost(item.title, item.link);
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
  enableFormValidation(FormConfig);
}