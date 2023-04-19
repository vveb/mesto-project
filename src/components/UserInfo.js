export default class UserInfo {
  constructor({ userNameSelector, userAboutSelector }, setUserInfoHandler, getUserInfoHandler) {
    this._name = document.querySelector(userNameSelector);
    this._about = document.querySelector(userAboutSelector);
    this._mainUserId = '';
    this._setUserInfoHandler = setUserInfoHandler;
    this._setUserInfoHandler = this._setUserInfoHandler.bind(this);
    this._getUserInfoHandler = getUserInfoHandler;
  }

  get mainUserId() {
    return this._mainUserId;
  }

  set mainUserId(id) {
    this._mainUserId = id;
  }

  setUserInfo(data) {
    return this._setUserInfoHandler(data, this._name, this._about);
  }

  getUserInfo() {
    return this._getUserInfoHandler();
  }
}