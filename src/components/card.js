import { handleCardImageClick, handleDeleteClick, editLike } from './index.js'
import { templatePhotoPost } from './constants.js';

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
  const photoPostLikeButton = photoPost.querySelector('.photo-post__like-button');
  const photoPostlikesCount = photoPost.querySelector('.photo-post__likes-count');
  function renderLikes() {
    photoPostlikesCount.textContent = photoPost.likes.length;
    if (photoPost.likes.includes(photoPost.userId)) {
      photoPostLikeButton.classList.add('photo-post__like-button_active');
    } else {
      photoPostLikeButton.classList.remove('photo-post__like-button_active');
    }
  }
  function setLikes(card) {
    photoPost.likes = card.likes.map((user) => user._id);
    renderLikes();
  }
  function handleLikeClick() {
    editLike(photoPost, setLikes);
  }
  photoPostLikeButton.addEventListener('click', handleLikeClick);
  renderLikes();
  const deleteButton = photoPost.querySelector('.photo-post__delete-button');
  if (photoPost.ownerId === photoPost.userId) {
    deleteButton.addEventListener('click', handleDeleteClick);
  } else {
    deleteButton.remove();
  }
  return photoPost;
}