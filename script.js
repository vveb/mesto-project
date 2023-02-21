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

function openPopup(popup, value0, value1) {
  popup.classList.add('popup_opened', 'popup_transition');
  if (popup.classList.contains('popup_edit-profile')) {
    const popupForm = popup.querySelector('.form');
    const popupInputs = popup.querySelectorAll('.form__item');
    popupInputs[0].value = value0.textContent;
    popupInputs[1].value = value1.textContent;
    popupForm.addEventListener('input', () => checkEmptyInputs(popup, popupInputs[0].value, true));
  } else if (popup.classList.contains('popup_new-post')) {
    const popupForm = popup.querySelector('.form');
    const popupInputs = popup.querySelectorAll('.form__item');
    const saveButton = popup.querySelector('.form__button');
    saveButton.disabled = true;
    saveButton.classList.add('form__button_disabled');
    popupInputs[0].value = null;
    popupInputs[1].value = null;
    popupForm.addEventListener('input', () => checkEmptyInputs(popup, popupInputs[0].value, popupInputs[1].value));
  } else {
    const image = popup.querySelector('.view-post__image');
    image.src = value1;
    image.alt = value0;
    const caption = popup.querySelector('.view-post__caption');
    caption.textContent = value0;
  }
}

function closePopup(popup) {
  popup.classList.remove('popup_opened');
    if (popup.classList.contains('popup_new-post', 'popup_edit-profile')) {
    const popupForm = popup.querySelector('.form');
    popupForm.removeEventListener('input', checkEmptyInputs);
    const saveButton = popup.querySelector('.form__button');
    saveButton.disabled = false;
    saveButton.classList.remove('form__button_disabled');
    if (popup.classList.contains('popup_new-post')) {
      const popupInputs = popup.querySelectorAll('.form__item');
      popupInputs[0].value = '';
      popupInputs[1].value = '';
    }
  }
}

function saveChangesPopup(evt, popup, textbox0, textbox1) {
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
  closePopup(popup);
}

function createNewPost(title, link) {
  const templatePhotoPost = document.querySelector('#template-photo-post').content;
  const photoPost = templatePhotoPost.querySelector('.photo-post').cloneNode(true);
  const photoPostImage = photoPost.querySelector('.photo-post__image');
  photoPostImage.src = link;
  photoPostImage.alt = title;
  photoPostImage.addEventListener('click', () => openPopup(popupPost, title, link));
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

const profile = document.querySelector('.profile');
const profileEditButton = profile.querySelector('.profile__edit-button');
const profileName = profile.querySelector('.profile__name');
const profileVocation = profile.querySelector('.profile__vocation');

const popupEditProfile = document.querySelector('.popup_edit-profile');
const editProfileCloseButton = popupEditProfile.querySelector('.popup__close-button');
const editProfileForm = popupEditProfile.querySelector('.form');

// const callback = () => openPopup(popupEditProfile);

profileEditButton.addEventListener('click', () => openPopup(popupEditProfile, profileName, profileVocation));
editProfileForm.addEventListener('submit', (evt) => saveChangesPopup(evt, popupEditProfile, profileName, profileVocation));
editProfileCloseButton.addEventListener('click', () => closePopup(popupEditProfile));

const addNewPostButton = document.querySelector('.profile__add-button')
const popupNewPost = document.querySelector('.popup_new-post');
const newPostCloseButton = popupNewPost.querySelector('.popup__close-button');
const newPostForm = popupNewPost.querySelector('.form');

addNewPostButton.addEventListener('click', () => openPopup(popupNewPost));
newPostCloseButton.addEventListener('click', () => closePopup(popupNewPost));
newPostForm.addEventListener('submit', (evt) => saveChangesPopup(evt, popupNewPost));

const popupPost = document.querySelector('.popup_post');
const postImageCloseButton = popupPost.querySelector('.popup__close-button');
postImageCloseButton.addEventListener('click', () => closePopup(popupPost));

loadInitialPosts();