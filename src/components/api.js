import { requestHeaders, endpointURLs } from './constants.js'

function checkResponseOk (res) {
  if (res.ok) {
    return res.json();
  }
  return res.json().then((err) => {
    err.statusCode = res.status;
    return Promise.reject(err);
  });
}

function goFetch({ endpoint, data, method}) {
  const options = {
    headers: requestHeaders,
    method,
  }
  if (data) {
    options.method = method;
    options.body = JSON.stringify(data);
  }
  return fetch(endpoint, options).then(checkResponseOk);
}

function getProfileData() {
  return goFetch({ endpoint: endpointURLs.profile, method: 'GET' })
}

function loadCards() {
  return goFetch({ endpoint: endpointURLs.cards, method: 'GET' })
}

function addNewCard(data) {
  return goFetch({ endpoint: endpointURLs.cards, data, method: 'POST' })
}

function deleteCardData(cardId) {
  return goFetch({ endpoint: `${endpointURLs.cards}/${cardId}`, method: 'DELETE' })
}

function editProfileInfo(data) {
  return goFetch({ endpoint: endpointURLs.profile, data, method: 'PATCH' })
}

function editProfileAvatar(data) {
  return goFetch({ endpoint: endpointURLs.avatar, data, method: 'PATCH' })
}

function toggleLike({ cardId, isLiked }) {
  return goFetch({ endpoint: `${endpointURLs.likes}/${cardId}`, method: isLiked ? 'DELETE' : 'PUT' })
}

export const api = {
  getProfileData,
  loadCards,
  editProfileInfo,
  editProfileAvatar,
  addNewCard,
  deleteCardData,
  toggleLike,
}
