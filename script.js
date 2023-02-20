function validateUrlString(value) {
    const expression = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi
    const regexp = new RegExp(expression);
    return regexp.test(value);
}

function checkEmptyInput(popup, requiredInput) {
  const saveButton = popup.querySelector('.form__button');
  if (!requiredInput.value) {
    saveButton.disabled = true;
    saveButton.classList.add('form__button_disabled');
  } else {
    saveButton.disabled = false;
    saveButton.classList.remove('form__button_disabled');
  }
}

function popupOpen(popup, text0, text1) {
  popup.classList.add('popup_opened', 'popup_transition');
  const popupForm = popup.querySelector('.form');
  let popupInputs = popup.querySelectorAll('.form__item');
  if (text0 !== undefined && text1 !== undefined) {
    popupInputs[0].value = text0.textContent;
    popupInputs[1].value = text1.textContent;
    popupForm.addEventListener('input', () => checkEmptyInput(popup, popupInputs[0]));
  } else {
    const saveButton = popup.querySelector('.form__button');
    saveButton.disabled = true;
    saveButton.classList.add('form__button_disabled');
    popupInputs[0] = null;
    popupInputs[1] = null;
    popupForm.addEventListener('input', () => checkEmptyInput(popup, popupInputs[0]));
    popupForm.addEventListener('input', () => checkEmptyInput(popup, popupInputs[1]));
  }
}

function popupClose(popup) {
  const popupForm = popup.querySelector('.form');
  popupForm.removeEventListener('input', checkEmptyInput);
  popup.classList.remove('popup_opened');
  const saveButton = popup.querySelector('.form__button');
  saveButton.disabled = false;
  saveButton.classList.remove('form__button_disabled');
  if (popup.classList.contains('popup__new-post')) {
    let popupInputs = popup.querySelectorAll('.form__item');
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
  } else if (popup.classList.contains('popup__new-post')) {
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
  return photoPost;
}

function addPost(title, link) {
  document.querySelector('.photo-grid').prepend(createNewPost(title, link));
}

function initialPosts() {
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
initialPosts();

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
const popupNewPost = document.querySelector('.popup__new-post');
const newPostCloseButton = popupNewPost.querySelector('.popup__close-button');
const newPostForm = popupNewPost.querySelector('.form');

addNewPostButton.addEventListener('click', () => popupOpen(popupNewPost));
newPostCloseButton.addEventListener('click', () => popupClose(popupNewPost));
newPostForm.addEventListener('submit', (evt) => popupSaveChanges(evt, popupNewPost));