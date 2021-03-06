export class Card {
    constructor(
        { data, operateCardClic, handleLikeClickActive, handleLikeClickDeactive, handleDeleteClick },
        templateSelector,
        userId
    ) {
        this._name = data.name;
        this._link = data.link;
        this._likes = data.likes;
        this._likesCounter = data.likes.length;
        this._templateSelector = templateSelector;
        this.operateCardClic = operateCardClic;
        this.handleLikeClickActive = handleLikeClickActive;
        this.handleLikeClickDeactive = handleLikeClickDeactive;
        this.handleDeleteClick = handleDeleteClick;
        this._userId = userId;
        this._ownerId = data.owner._id;
        this._id = data._id;
    }


    _getTemplate() {
        const cardElement = this._templateSelector
            .content.querySelector('.element')
            .cloneNode(true);
        return cardElement;
    }

    _setEventListeners() {
        this._likeButton = this._cardElement.querySelector('.element__like-button');
        this._likeButton.addEventListener('click', (evt) => {
            this._handleLikeClick(evt);
        });
        this._cardItem.addEventListener('click', () => {
            this.operateCardClic();
        });
        if (this._userId === this._ownerId) {
            this._cardElement.querySelector('.element__delite-button').addEventListener('click', this.handleDeleteClick);
        }
    }

    _addLikes(userId) {
        this._likes.forEach((like) => {
            if (like._id === userId) {
                this._likeButton.classList.add('element__like-button_active');
            }
        });
    }

    handleDeleteCard = () => {
        this._cardElement.remove();
        this._cardElement = '';
    }

    countLikes = (currentLikes) => {
        // const elementLikeButton = this._cardElement.querySelector('.element__like-button');
        this._elementCardLikes.textContent = currentLikes;
        if (this._likeButton.classList.contains('element__like-button_active')) {
            this._likeButton.classList.remove('element__like-button_active');
        } else {
            this._likeButton.classList.add('element__like-button_active');
        }
    };

    _handleLikeClick(evt) {
        if (evt.target.classList.contains('element__like-button_active')) {
            this.handleLikeClickDeactive(this._id, this.countLikes);
        } else {
            this.handleLikeClickActive(this._id, this.countLikes);
        }
    }

    createCard = () => {
        this._cardElement = this._getTemplate();
        this._elementCardLikes = this._cardElement.querySelector('.element__like-counter');
        this._cardItem = this._cardElement.querySelector('.element__ithem');
        this._setEventListeners();
        this._cardItem.src = this._link
        this._cardElement.querySelector('.element__title').textContent = this._name
        this._cardItem.alt = this._name
        this._elementCardLikes.textContent = this._likesCounter;
        this._addLikes(this._userId);
        this._removeDeleteButton(this._userId);
        return this._cardElement;
    };

    _removeDeleteButton(userId) {
        if (this._ownerId !== userId) {
            this._cardElement.querySelector('.element__delite-button').style.display = 'none';
        }
    }
};

