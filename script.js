function validateURLString(value) {
    const expression = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi
    const regexp = new RegExp(expression);
    return regexp.test(value);
}

function checkEmptyInputs(requiredValue0, requiredValue1, submitButton) {
  if (requiredValue0 && requiredValue1) {
    submitButton.disabled = false;
    submitButton.classList.remove('form__button_disabled');
  } else {
    submitButton.disabled = true;
    submitButton.classList.add('form__button_disabled');
  }
}

function openPopupEditProfile(popup, name, vocation) {
  popup.classList.add('popup_opened', 'popup_transition');
  editProfileInputName.value = name.textContent;
  editProfileInputVocation.value = vocation.textContent;
}

function openPopupNewPost(popup) {
  popup.classList.add('popup_opened', 'popup_transition');
  newPostForm.reset();
  newPostSaveButton.disabled = true;
  newPostSaveButton.classList.add('form__button_disabled');
}

function openPopupPost(popup, title, link) {
  popup.classList.add('popup_opened', 'popup_transition');
  imagePost.alt = title;
  imagePost.src = link;
  captionPost.textContent = title;
}

function closePopup(popup) {
  popup.classList.remove('popup_opened');
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
    newPostSaveButton.classList.add('form__button_disabled');
    return;
  }
  closePopup(popup);
}

function createNewPost(title, link) {
  const photoPost = templatePhotoPost.querySelector('.photo-post').cloneNode(true);
  const photoPostImage = photoPost.querySelector('.photo-post__image');
  photoPostImage.src = link;
  photoPostImage.alt = title;
  photoPostImage.addEventListener('click', () => openPopupPost(popupPost, title, link));
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
  
  for (let i = 0; i < initialPostsList.length; i++) {
    addPost(initialPostsList[i].title, initialPostsList[i].link);
  }
}

// Page main elemets
const photoGrid = document.querySelector('.photo-grid');
const templatePhotoPost = document.querySelector('#template-photo-post').content;

// Popups
const popupEditProfile = document.querySelector('.popup_edit-profile');
const popupNewPost = document.querySelector('.popup_new-post');
const popupPost = document.querySelector('.popup_post');

// Forms
const editProfileForm = popupEditProfile.querySelector('.form');
const editProfileInputName = editProfileForm.querySelector('.form__item_el_name');
const editProfileInputVocation = editProfileForm.querySelector('.form__item_el_vocation');

const newPostForm = popupNewPost.querySelector('.form');
const newPostInputTitle = newPostForm.querySelector('.form__item_el_title');
const newPostInputLink = newPostForm.querySelector('.form__item_el_link');

// Buttons
const profileEditButton = document.querySelector('.profile__edit-button');
const profileEditSaveButton = popupEditProfile.querySelector('.form__button')
const newPostAddButton = document.querySelector('.profile__add-button');
const newPostSaveButton = popupNewPost.querySelector('.form__button');
const closeButtons = document.querySelectorAll('.popup__close-button');

// Event listeners for all Close popup buttons
closeButtons.forEach((button) => {
  const popup = button.closest('.popup');
  button.addEventListener('click', () => closePopup(popup))
});

// Event listeners for Edit profile
const profileName = document.querySelector('.profile__name');
const profileVocation = document.querySelector('.profile__vocation');
profileEditButton.addEventListener('click', () => openPopupEditProfile(popupEditProfile, profileName, profileVocation));
editProfileForm.addEventListener('submit', (evt) => saveProfileInfo(evt, popupEditProfile, profileName, profileVocation));
// Дорогой ревьюер, в прошлой итерации Вы указали на недопустимость навешивания слушателя валидации при каждом открытии формы
// В моем коде такие обработчики удалялись при вызове функции closePopup, чтобы не допустить коллизий и неэффективного использования памяти
// Но Вы также указали, что удаление нужно делать (!)правильно(!).
// Понимаю возможность неверности использовавшегося ранее подхода, но валидацию оставить хотелось бы, если можно, поэтому повесил ее один раз тут и ниже.
// Если нельзя, уберу на следующей итерации.
// Это не вопрос и не просьба о помощи, так что, надеюсь, все корректно и законно =)
editProfileForm.addEventListener('input', () => checkEmptyInputs(editProfileInputName.value, true, profileEditSaveButton));

// Event listeners for New Post
newPostAddButton.addEventListener('click', () => openPopupNewPost(popupNewPost));
newPostForm.addEventListener('submit', (evt) => saveNewPost(evt, popupNewPost));
newPostForm.addEventListener('input', () => checkEmptyInputs(newPostInputTitle.value, newPostInputLink.value, newPostSaveButton));

// Elements of popup Post
const imagePost = popupPost.querySelector('.view-post__image');
const captionPost = popupPost.querySelector('.view-post__caption');

// Оставил для себя, чтобы не забыть, что callback-функцию можно убрать в отдельную переменную
// const callbackFunction = () => openPopup(popupEditProfile);

loadInitialPosts();