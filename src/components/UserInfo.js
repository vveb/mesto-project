export default class UserInfo {
  constructor({ userNameSelector, userAboutSelector, avatarSelector },
    setUserInfoHandler, getUserInfoHandler, editAvatarHandler) {
    this._name = document.querySelector(userNameSelector);
    this._about = document.querySelector(userAboutSelector);
    this._avatar = document.querySelector(avatarSelector);
    this._mainUserId = '';
    this._setUserInfoHandler = setUserInfoHandler;
    this._setUserInfoHandler = this._setUserInfoHandler.bind(this);
    this._editAvatarHandler = editAvatarHandler;
    this._getUserInfoHandler = getUserInfoHandler;
  }

  get mainUserId() {
    return this._mainUserId;
  }

  set mainUserId(id) {
    this._mainUserId = id;
  }

  get profileAvatar() {
    return this._avatar;
  }

  editProfileAvatarData(data) {
    return this._editAvatarHandler(data);
  }

  setProfileAvatar(link) {
    this._avatar.style.backgroundImage = `url(${link})`;
  }

  setUserInfo(data) {
    return this._setUserInfoHandler(data, this._name, this._about);
  }

  getUserInfo() {
    return this._getUserInfoHandler();
  }
}