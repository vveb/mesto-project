function popupOpen(popup, text0, text1) {
  popup.classList.add('popup_opened', 'popup_transition');
  const popupForm = popup.querySelector('.form');
  let popupInputs = popup.querySelectorAll('.form__item');
  if (text0 !== undefined && text1 !== undefined) {
    popupInputs[0].value = text0.textContent;
    popupInputs[1].value = text1.textContent;
    popupForm.addEventListener('input', () => checkValidity(popup, popupInputs[0]));
  } else {
    const saveButton = popup.querySelector('.form__button');
    saveButton.disabled = true;
    saveButton.classList.add('form__button_disabled');
    popupInputs[0] = null;
    popupInputs[1] = null;
    popupForm.addEventListener('input', () => checkValidity(popup, popupInputs[0]));
    popupForm.addEventListener('input', () => checkValidity(popup, popupInputs[1]));
  }
  
}

function checkValidity(popup, requiredInput) {
  const saveButton = popup.querySelector('.form__button');
  if (!requiredInput.value) {
    saveButton.disabled = true;
    saveButton.classList.add('form__button_disabled');
  } else {
    saveButton.disabled = false;
    saveButton.classList.remove('form__button_disabled');
  }
}

function popupClose(popup) {
  const popupForm = popup.querySelector('.form');
  popupForm.removeEventListener('input', checkValidity);
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
    popupClose(popup);
    // addNewPost(popupInputs[0].value, popupInputs[1].value);
  }
  popupClose(popup);
}

// function addNewPost(title, link) {
//   console.log(title);
//   console.log(link);
//   const photoGrid = document.querySelector('.photo-grid');
//   const newPost = `
//   <article class="photo-post">
//     <img class="photo-post__image" src="${link}" alt="${title}">
//     <div class="photo-post__caption">
//       <h2 class="photo-post__title">${title}</h2>
//       <button class="photo-post__like-button" type="button" name="like" aria-label="Нравится"></button>
//     </div>
//   </article>`;
//   photoGrid.insertAdjacentHTML('afterbegin', newPost);
// }

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