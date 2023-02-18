const profile = document.querySelector('.profile');
const profileEditButton = profile.querySelector('.profile__edit-button');
const profileName = profile.querySelector('.profile__name');
const profileVocation = profile.querySelector('.profile__vocation');

const popupEditProfile = document.querySelector('.popup_edit-profile');
const editProfileCloseButton = popupEditProfile.querySelector('.popup__close-button');
const editProfileForm = popupEditProfile.querySelector('.form');


function popupOpen(popup, text0, text1) {
  popup.classList.add('popup_opened', 'popup_transition');
  const popupInputs = popup.querySelectorAll('.form__item');
  popupInputs[0].value = text0.textContent;
  popupInputs[1].value = text1.textContent;
  const popupForm = popup.querySelector('.form');
  popupForm.addEventListener('input', () => checkValidity(popup, popupInputs[0]));
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
}

function popupSaveChanges(evt, popup, textbox0, textbox1) {
  evt.preventDefault();
  if (popup.classList.contains('popup_edit-profile')) { 
    const popupInputs = popup.querySelectorAll('.form__item');
    textbox0.textContent = popupInputs[0].value;
    textbox1.textContent = popupInputs[1].value;
  }
  popupClose(popup);
}

// const callback = () => popupOpen(popupEditProfile);

profileEditButton.addEventListener('click', () => popupOpen(popupEditProfile, profileName, profileVocation));
editProfileForm.addEventListener('submit', (evt) => popupSaveChanges(evt, popupEditProfile, profileName, profileVocation));
editProfileCloseButton.addEventListener('click', () => popupClose(popupEditProfile));
