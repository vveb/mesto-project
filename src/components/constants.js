const formConfig = {
  formSelector: '.form',
  inputSelector: '.form__input',
  submitButtonSelector: '.form__submit',
  inactiveButtonClass: 'form__submit_disabled',
  inputErrorClass: 'form__input_invalid',
  errorClass: 'form__input-error_active'
}

const photoGrid = document.querySelector('.photo-grid');
const editProfileForm = document.forms['edit-profile'];
const profileAvatar = document.querySelector('.profile__avatar');
const profileEditButton = document.querySelector('.profile__edit-button');
const newPostAddButton = document.querySelector('.profile__add-button');
const profileName = document.querySelector('.profile__name');
const profileVocation = document.querySelector('.profile__vocation');
const updateAvatarForm = document.forms['update-avatar'];

export { formConfig,
  photoGrid,
  editProfileForm,
  profileAvatar,
  profileEditButton,
  newPostAddButton,
  profileName,
  profileVocation,
  updateAvatarForm,
}