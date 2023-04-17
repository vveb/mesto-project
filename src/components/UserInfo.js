import { api } from './constants.js'
import { handleError } from './utils.js';

export default class UserInfo {
  constructor({ userNameSelector, userAboutSelector }) {
    this._name = document.querySelector(userNameSelector);
    this._about = document.querySelector(userAboutSelector);
    this._mainUserId = '';
  }

  get mainUserId() {
    return this._mainUserId;
  }

  set mainUserId(id) {
    this._mainUserId = id;
  }

  setUserInfo(data) {
    return api.editProfileInfo(data)
      .then((data) => {
        this._name.textContent = data.name;
        this._about.textContent = data.about;
      })
      .catch(handleError);
  }

  getUserInfo() {
    return api.getProfileData();
  }
}