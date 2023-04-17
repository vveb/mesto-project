import { popups } from './constants.js';
import { openPopup } from './modal.js';


export default class Card {
  constructor({ name, link, owner, likes, _id }, cardTemplateSelector, mainUserId, { likeClickHandler, imageClickHandler }) {
    this._name = name;
    this._link = link;
    this._owner = owner._id;
    this._likes = likes.map((user) => user._id);
    this._id = _id;
    this._selector = cardTemplateSelector;
    this._mainUserId = mainUserId;
    this._likeClickHandler = likeClickHandler;
    this.setLikes = this.setLikes.bind(this);
    this._handleLikeClick = this._handleLikeClick.bind(this);
    this._imageClickHandler = imageClickHandler;
    this._handleCardImageClick = this._handleCardImageClick.bind(this);
  }

  _isLiked() {
    return this._likes.includes(this._mainUserId);
  }

  _createCardElement() {
    return document.querySelector(this._selector).content.querySelector('.photo-post').cloneNode(true);
  }

  _handleCardImageClick() {
    this._imageClickHandler({ title: this._name, link: this._link })
  }

  _renderLikes() {
    this._cardLikesCount.textContent = this._likes.length;
    if (this._isLiked()) {
      this._cardLikeButton.classList.add('photo-post__like-button_active');
    } else {
      this._cardLikeButton.classList.remove('photo-post__like-button_active');
    }
  }

  setLikes(likes) {
    this._likes = likes.map((user) => user._id);
    this._renderLikes();
  }

  _handleLikeClick() {
    this._likeClickHandler(this._id, this._isLiked(), this.setLikes);
  }
  
  _handleDeleteClick(evt) {
    const { id } = evt.target.closest('.photo-post');
    localStorage.setItem('cardIdToDelete', id);
    openPopup(popups.popupDeleteSubmit);
  }

  _setEventListeners() {
    this._cardImage.addEventListener('click', this._handleCardImageClick);
    this._cardLikeButton.addEventListener('click', this._handleLikeClick);
    this._deleteButton.addEventListener('click', (evt) => this._handleDeleteClick(evt));
  }
  
  createNewCard() {
    this._cardElement = this._createCardElement();
    this._cardElement.id = this._id; //Это надо убрать

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