import { profileAvatar } from './constants.js';

function setProfileAvatar({ avatar }) {
  profileAvatar.style.backgroundImage = `url(${avatar})`;
}

export { setProfileAvatar };