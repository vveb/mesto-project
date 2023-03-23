import { openPost } from './modal.js';

const templatePhotoPost = document.querySelector('#template-photo-post').content;

function handleCardImageClick(evt) {
  openPost({ title: evt.target.alt, link: evt.target.src });
}

function handleLikeClick(evt) {
  evt.target.classList.toggle('photo-post__like-button_active');
}

export function createNewPost({ name, link }) {
  const photoPost = templatePhotoPost.querySelector('.photo-post').cloneNode(true);
  const photoPostImage = photoPost.querySelector('.photo-post__image');
  photoPostImage.src = link;
  photoPostImage.alt = name;
  photoPostImage.addEventListener('click', handleCardImageClick);
  photoPost.querySelector('.photo-post__title').textContent = name;
  photoPost.querySelector('.photo-post__like-button').addEventListener('click', handleLikeClick);
  const deleteButton = photoPost.querySelector('.photo-post__delete-button');
    deleteButton.addEventListener('click', function() {
    deleteButton.closest('.photo-post').remove();
  });
  return photoPost;
}
