import { profileAvatar,
  editProfileForm,
  profileName,
  profileVocation,
  updateAvatarForm,
} from './constants.js';

const editProfileInputName = editProfileForm.name;
const editProfileInputVocation = editProfileForm.vocation;
const updateAvatarLink = updateAvatarForm.elements['input-avatar-link'];

function setProfileData() {
  profileName.textContent = editProfileInputName.value;
  profileVocation.textContent = editProfileInputVocation.value;
}

function setProfileInputs() {
  editProfileInputName.value = profileName.textContent;
  editProfileInputVocation.value = profileVocation.textContent;
}

function setAvatarByLink() {
  profileAvatar.style.backgroundImage = `url(${updateAvatarLink.value})`;
}

export { setProfileData, setProfileInputs, setAvatarByLink };

