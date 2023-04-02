import { handleCardImageClick, handleDeleteClick } from './index.js'
import { templatePhotoPost } from './constants.js';

function renderLikes(card, likes) {
  const photoPostlikesCount = card.querySelector('.photo-post__likes-count');
  const photoPostLikeButton = card.querySelector('.photo-post__like-button');
  photoPostlikesCount.textContent = likes.length;
  if (likes.includes(card.userId)) {
    photoPostLikeButton.classList.add('photo-post__like-button_active');
  } else {
    photoPostLikeButton.classList.remove('photo-post__like-button_active');
  }
}

export function setLike(card) {
  const newCard = document.getElementById(card._id);
  newCard.likes = card.likes.map((user) => user._id);
  renderLikes(newCard, newCard.likes);
}

export function createNewPost({ name, link, owner, likes, _id }, mainUserId) {
  const photoPost = templatePhotoPost.querySelector('.photo-post').cloneNode(true);
  photoPost.id = _id;
  photoPost.userId = mainUserId;
  photoPost.ownerId = owner._id;
  photoPost.likes = likes.map((user) => user._id);
  const photoPostImage = photoPost.querySelector('.photo-post__image');
  photoPostImage.src = link;
  photoPostImage.alt = name;
  photoPostImage.addEventListener('click', handleCardImageClick);
  photoPost.querySelector('.photo-post__title').textContent = name;
  renderLikes(photoPost, photoPost.likes);
  const deleteButton = photoPost.querySelector('.photo-post__delete-button');
  if (photoPost.ownerId === photoPost.userId) {
    deleteButton.addEventListener('click', handleDeleteClick);
  } else {
    deleteButton.remove();
  }
  return photoPost;
}