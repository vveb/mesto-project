import { popups, imagePost, captionPost, api } from './constants.js';
import { openPopup } from './modal.js'
import { handleError } from './utils.js';


export default class Card {
  constructor({ name, link, owner, likes, _id }, cardTemplateSelector) {
    this._name = name;
    this._link = link;
    this._owner = owner._id;
    this._likes = likes.map((user) => user._id);
    this._id = _id;
    this._selector = cardTemplateSelector;
  }

  _createCardElement() {
    return document.querySelector(this._selector).content.querySelector('.photo-post').cloneNode(true);
  }

  _handleCardImageClick(evt) {
    imagePost.alt = evt.target.alt;
    imagePost.src = evt.target.src;
    captionPost.textContent = evt.target.alt;
    openPopup(popups.popupPost);
  }

  _renderLikes() {
    this._cardLikesCount.textContent = this._likes.length;
    if (this._likes.includes(this._mainUserId)) {
      this._cardLikeButton.classList.add('photo-post__like-button_active');
    } else {
      this._cardLikeButton.classList.remove('photo-post__like-button_active');
    }
  }

  _setLikes(card) {
    this._likes = card.likes.map((user) => user._id);
    this._renderLikes();
  }

  _handleLikeClick() {
    api.toggleLike({ cardId: this._id, isLiked: this._likes.includes(this._mainUserId) })
      .then((card) => {
        this._setLikes(card);
      })
      .catch(handleError);
  }
  
  _handleDeleteClick(evt) {
    const { id } = evt.target.closest('.photo-post');
    localStorage.setItem('cardIdToDelete', id);
    openPopup(popups.popupDeleteSubmit);
  }

  _setEventListeners() {
    this._cardImage.addEventListener('click', (evt) => this._handleCardImageClick(evt));
    this._cardLikeButton.addEventListener('click', () => this._handleLikeClick());
    this._deleteButton.addEventListener('click', (evt) => this._handleDeleteClick(evt));
  }
  
  createNewCard(mainUserId) {
    this._mainUserId = mainUserId;
    this._cardElement = this._createCardElement();
    this._cardElement.id = this._id;

    this._cardImage = this._cardElement.querySelector('.photo-post__image');
    this._cardImage.src = this._link;
    this._cardImage.alt = this._name;
    
    
    this._cardElement.querySelector('.photo-post__title').textContent = this._name;
    
    this._cardLikeButton = this._cardElement.querySelector('.photo-post__like-button');
    this._cardLikesCount = this._cardElement.querySelector('.photo-post__likes-count');
    this._renderLikes();

    this._deleteButton = this._cardElement.querySelector('.photo-post__delete-button');

    this._setEventListeners();

    if (this._owner !== this._mainUserId) this._deleteButton.remove();

    return this._cardElement;
  }

}