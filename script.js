function validateURLString(value) {
    const expression = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi
    const regexp = new RegExp(expression);
    return regexp.test(value);
}

function checkEmptyInputs(requiredValue0, requiredValue1, submitButton) {
  if (requiredValue0 && requiredValue1) {
    submitButton.disabled = false;
    submitButton.classList.remove('form__submit_disabled');
  } else {
    submitButton.disabled = true;
    submitButton.classList.add('form__submit_disabled');
  }
}

function openPopup(popup) {
  popup.classList.add('popup_opened');
  if (!popup.classList.contains('popup_transition')) {
    popup.classList.add('popup_transition');
  }
}

function closePopup(popup) {
  popup.classList.remove('popup_opened');
}

function renderEditProfile(name, vocation) {
  editProfileInputName.value = name.textContent;
  editProfileInputVocation.value = vocation.textContent;
}

function renderNewPost() {
  newPostForm.reset();
  newPostSaveButton.disabled = true;
  newPostSaveButton.classList.add('form__submit_disabled');
}

function renderUpdateAvatar() {
  updateAvatarForm.reset();
  updateAvatarSaveButton.disabled = true;
  updateAvatarSaveButton.classList.add('form__submit_disabled');
}

function renderPost(title, link) {
  imagePost.alt = title;
  imagePost.src = link;
  captionPost.textContent = title;
}

function saveProfileInfo(evt, popup, name, vocation) {
  evt.preventDefault();
  name.textContent = editProfileInputName.value;
  vocation.textContent = editProfileInputVocation.value;
  closePopup(popup);
}

function saveNewPost(evt, popup) {
  evt.preventDefault();
  if (validateURLString(newPostInputLink.value)) {
    addPost(newPostInputTitle.value, newPostInputLink.value);
  } else {
    newPostInputLink.value = 'Неверная ссылка!';
    newPostSaveButton.disabled = true;
    newPostSaveButton.classList.add('form__submit_disabled');
    return;
  }
  closePopup(popup);
}

function saveAvatar(evt, popup) {
  evt.preventDefault();
  if (validateURLString(updateAvatarLink.value)) {
    profileAvatar.style.backgroundImage = `url(${updateAvatarLink.value})`;
  } else {
    updateAvatarLink.value = 'Неверная ссылка!';
    updateAvatarSaveButton.disabled = true;
    updateAvatarSaveButton.classList.add('form__submit_disabled');
    return;
  }
  closePopup(popup);
}

function createNewPost(title, link) {
  const photoPost = templatePhotoPost.querySelector('.photo-post').cloneNode(true);
  const photoPostImage = photoPost.querySelector('.photo-post__image');
  photoPostImage.src = link;
  photoPostImage.alt = title;
  photoPostImage.addEventListener('click', () => (openPopup(popupPost), renderPost(title, link)));
  photoPost.querySelector('.photo-post__title').textContent = title;
  photoPost.querySelector('.photo-post__like-button').addEventListener('click', function(evt) {
    evt.target.classList.toggle('photo-post__like-button_active');
  });
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
  const initialPostsList = [
    {
      title: 'Sacre Coeur',
      link: './images/sacre-coeur.jpg'
    },
    {
      title: 'Лувр',
      link: './images/louvre.jpg'
    },
    {
      title: 'Сена',
      link: './images/la-seine.jpg'
    },
    {
      title: 'Notre Dame',
      link: './images/notre-dame.jpg'
    },
    {
      title: 'Триумфальная арка',
      link: './images/arc-de-triomph.jpg'
    },
    {
      title: 'Эйфелева башня',
      link: './images/tour-eiffel.jpg'
    }
  ];
  
  initialPostsList.forEach(function(item) {
    addPost(item.title, item.link);
  });
}

// Page main elemets
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
const updateAvatarLink = updateAvatarForm.link;

// Buttons
const profileEditButton = document.querySelector('.profile__edit-button');
const profileEditSaveButton = popupEditProfile.querySelector('.form__submit')
const newPostAddButton = document.querySelector('.profile__add-button');
const newPostSaveButton = popupNewPost.querySelector('.form__submit');
// const closeButtons = document.querySelectorAll('.popup__close-button');
const updateAvatarSaveButton = popupUpdateAvatar.querySelector('.form__submit');

// Elements of popup Post
const imagePost = popupPost.querySelector('.view-post__image');
const captionPost = popupPost.querySelector('.view-post__caption');

// Event listeners for all Close popup buttons
// closeButtons.forEach((button) => {
//   const popup = button.closest('.popup');
//   button.addEventListener('click', () => closePopup(popup))
// });

// Event listener for closing popup by click on close-button or overlay
const allPopups = document.querySelectorAll('.popup');
allPopups.forEach((popup) => {
  popup.addEventListener('click', (evt) => {
    if (evt.target.classList.contains('popup__close-button') || evt.target.classList.contains('popup')) {
      closePopup(popup);
    }
  });
});

// Event listener for closing popup by press Escape-button
document.addEventListener('keydown', (evt) => {
  const openedPopup = document.querySelector('.popup_opened');
  if (evt.key === 'Escape' && openedPopup) {
    closePopup(openedPopup);
  }
});

// Event listeners for Edit profile
const profileName = document.querySelector('.profile__name');
const profileVocation = document.querySelector('.profile__vocation');
profileEditButton.addEventListener('click', () => (renderEditProfile(profileName, profileVocation), openPopup(popupEditProfile)));
editProfileForm.addEventListener('submit', (evt) => saveProfileInfo(evt, popupEditProfile, profileName, profileVocation));
editProfileForm.addEventListener('input', () => checkEmptyInputs(editProfileInputName.value, true, profileEditSaveButton));

// Event listeners for New Post
newPostAddButton.addEventListener('click', () => (renderNewPost(), openPopup(popupNewPost)));
newPostForm.addEventListener('submit', (evt) => saveNewPost(evt, popupNewPost));
newPostForm.addEventListener('input', () => checkEmptyInputs(newPostInputTitle.value, newPostInputLink.value, newPostSaveButton));

// Event listeners for Update Avatar
profileAvatar.addEventListener('click', () => (renderUpdateAvatar(), openPopup(popupUpdateAvatar)));
updateAvatarForm.addEventListener('submit', (evt) => saveAvatar(evt, popupUpdateAvatar));
updateAvatarForm.addEventListener('input', () => checkEmptyInputs(updateAvatarLink.value, true, updateAvatarSaveButton));

// Оставил для себя, чтобы не забыть, что callback-функцию можно убрать в отдельную переменную
// const callbackFunction = () => openPopup(popupEditProfile);

loadInitialPosts();