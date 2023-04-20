export default class Card {
  constructor({ name, link, owner, likes, _id },
    cardTemplateSelector, mainUserId,
    { likeClickHandler, imageClickHandler },
    popupDeleteSubmit) {
    this._name = name;
    this._link = link;
    this._owner = owner._id;
    this._likes = likes.map((user) => user._id);
    this._id = _id;
    this._cardElement = document.querySelector(cardTemplateSelector).content.querySelector('.photo-post').cloneNode(true);
    this._cardImage = this._cardElement.querySelector('.photo-post__image');
    this._cardTitle = this._cardElement.querySelector('.photo-post__title');
    this._cardLikeButton = this._cardElement.querySelector('.photo-post__like-button');
    this._cardLikesCount = this._cardElement.querySelector('.photo-post__likes-count');
    this._deleteButton = this._cardElement.querySelector('.photo-post__delete-button');
    this._selector = cardTemplateSelector;
    this._mainUserId = mainUserId;
    this._likeClickHandler = likeClickHandler;
    this.setLikes = this.setLikes.bind(this);
    this._handleLikeClick = this._handleLikeClick.bind(this);
    this._imageClickHandler = imageClickHandler;
    this._handleCardImageClick = this._handleCardImageClick.bind(this);
    this._popupDeleteSubmit = popupDeleteSubmit;
    this._handleDeleteClick = this._handleDeleteClick.bind(this);
  }

  _isLiked() {
    return this._likes.includes(this._mainUserId);
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
  
  _handleDeleteClick() {
    sessionStorage.setItem('cardIdToDelete', this._id);
    this._popupDeleteSubmit.openPopup();
  }

  _setEventListeners() {
    this._cardImage.addEventListener('click', this._handleCardImageClick);
    this._cardLikeButton.addEventListener('click', this._handleLikeClick);
    this._deleteButton.addEventListener('click', this._handleDeleteClick);
  }
  
  createNewCard() {
    this._cardElement.id = this._id; //Это надо убрать
    this._cardImage.src = this._link;
    this._cardImage.alt = this._name;
    
    this._cardTitle.textContent = this._name;

    this._renderLikes();

    this._setEventListeners();

    if (this._owner !== this._mainUserId) this._deleteButton.remove();

    return this._cardElement;
  }

}