import { profileAvatar,
  profileName,
  profileVocation,
} from './constants.js';

function getProfileData() {
  return { name: profileName.textContent, about: profileVocation.textContent };
}

function setProfileData({ name, about }) {
  profileName.textContent = name;
  profileVocation.textContent = about;
}

function setProfileAvatar({ avatar }) {
  profileAvatar.style.backgroundImage = `url(${avatar})`;
}

export { setProfileData, getProfileData, setProfileAvatar };

