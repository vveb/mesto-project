function validateUrlString(value) {
    const expression = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi
    const regexp = new RegExp(expression);
    return regexp.test(value);
}

function checkEmptyInputs(popup, requiredValue0, requiredValue1) {
  const saveButton = popup.querySelector('.form__button');
  if (requiredValue0 && requiredValue1) {
    saveButton.disabled = false;
    saveButton.classList.remove('form__button_disabled');
  } else {
    saveButton.disabled = true;
    saveButton.classList.add('form__button_disabled');
  }
}

function popupOpen(popup, text0, text1) {
  popup.classList.add('popup_opened', 'popup_transition');
  const popupForm = popup.querySelector('.form');
  const popupInputs = popup.querySelectorAll('.form__item');
  if (popup.classList.contains('popup_edit-profile')) {
    popupInputs[0].value = text0.textContent;
    popupInputs[1].value = text1.textContent;
    popupForm.addEventListener('input', () => checkEmptyInputs(popup, popupInputs[0].value, true));
  } else if (popup.classList.contains('popup_new-post')) {
    const saveButton = popup.querySelector('.form__button');
    saveButton.disabled = true;
    saveButton.classList.add('form__button_disabled');
    popupInputs[0].value = null;
    popupInputs[1].value = null;
    popupForm.addEventListener('input', () => checkEmptyInputs(popup, popupInputs[0].value, popupInputs[1].value));
  } else {
    return;
  }
}

function popupClose(popup) {
  const popupForm = popup.querySelector('.form');
  popupForm.removeEventListener('input', checkEmptyInputs);
  popup.classList.remove('popup_opened');
  const saveButton = popup.querySelector('.form__button');
  saveButton.disabled = false;
  saveButton.classList.remove('form__button_disabled');
  if (popup.classList.contains('popup_new-post')) {
    const popupInputs = popup.querySelectorAll('.form__item');
    popupInputs[0].value = '';
    popupInputs[1].value = '';
  }
}

function popupSaveChanges(evt, popup, textbox0, textbox1) {
  evt.preventDefault();
  const popupInputs = popup.querySelectorAll('.form__item');
  if (popup.classList.contains('popup_edit-profile')) { 
    textbox0.textContent = popupInputs[0].value;
    textbox1.textContent = popupInputs[1].value;
  } else if (popup.classList.contains('popup_new-post')) {
    if (validateUrlString(popupInputs[1].value)) {
      addPost(popupInputs[0].value, popupInputs[1].value);
    } else {
      popupInputs[1].value = 'Неверная ссылка!';
      return;
    }
  }
  popupClose(popup);
}

function createNewPost(title, link) {
  const templatePhotoPost = document.querySelector('#template-photo-post').content;
  const photoPost = templatePhotoPost.querySelector('.photo-post').cloneNode(true);
  const photoPostImage = photoPost.querySelector('.photo-post__image');
  photoPostImage.src = link;
  photoPostImage.alt = title;
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
  document.querySelector('.photo-grid').prepend(createNewPost(title, link));
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
  
  for (let i = 0; i < initialPostsList.length; i++) {
    addPost(initialPostsList[i].title, initialPostsList[i].link);
  }
}
loadInitialPosts();

const profile = document.querySelector('.profile');
const profileEditButton = profile.querySelector('.profile__edit-button');
const profileName = profile.querySelector('.profile__name');
const profileVocation = profile.querySelector('.profile__vocation');

const popupEditProfile = document.querySelector('.popup_edit-profile');
const editProfileCloseButton = popupEditProfile.querySelector('.popup__close-button');
const editProfileForm = popupEditProfile.querySelector('.form');

// const callback = () => popupOpen(popupEditProfile);

profileEditButton.addEventListener('click', () => popupOpen(popupEditProfile, profileName, profileVocation));
editProfileForm.addEventListener('submit', (evt) => popupSaveChanges(evt, popupEditProfile, profileName, profileVocation));
editProfileCloseButton.addEventListener('click', () => popupClose(popupEditProfile));

const addNewPostButton = document.querySelector('.profile__add-button')
const popupNewPost = document.querySelector('.popup_new-post');
const newPostCloseButton = popupNewPost.querySelector('.popup__close-button');
const newPostForm = popupNewPost.querySelector('.form');

addNewPostButton.addEventListener('click', () => popupOpen(popupNewPost));
newPostCloseButton.addEventListener('click', () => popupClose(popupNewPost));
newPostForm.addEventListener('submit', (evt) => popupSaveChanges(evt, popupNewPost));