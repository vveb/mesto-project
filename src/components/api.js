import { endpointURLs } from './constants.js'

export default class Api {
  constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }

  _checkResponseOk(res) {
    if (res.ok) {
      return res.json();
    }
    return res.json().then((err) => {
      err.statusCode = res.status;
      return Promise.reject(err);
    });
  }

  _goFetch( { endpoint, data, method }) {
    const options = {
      headers: this._headers,
      method,
    }
    if (data) {
      options.method = method;
      options.body = JSON.stringify(data);
    }
    return fetch(this._baseUrl + endpoint, options).then(this._checkResponseOk);
  }

  getProfileData() {
    return this._goFetch({ endpoint: endpointURLs.profile, method: 'GET' });
  }

  loadCards() {
    return this._goFetch({ endpoint: endpointURLs.cards, method: 'GET' })
  }
  
  addNewCard(data) {
    return this._goFetch({ endpoint: endpointURLs.cards, data, method: 'POST' })
  }
  
  deleteCardData(cardId) {
    return this._goFetch({ endpoint: `${endpointURLs.cards}/${cardId}`, method: 'DELETE' })
  }
  
  editProfileInfo(data) {
    return this._goFetch({ endpoint: endpointURLs.profile, data, method: 'PATCH' })
  }
  
  editProfileAvatar(data) {
    return this._goFetch({ endpoint: endpointURLs.avatar, data, method: 'PATCH' })
  }
  
  toggleLike({ cardId, isLiked }) {
    return this._goFetch({ endpoint: `${endpointURLs.likes}/${cardId}`, method: isLiked ? 'DELETE' : 'PUT' })
  }
}