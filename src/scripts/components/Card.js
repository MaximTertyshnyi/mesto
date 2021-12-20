export class Card {
    constructor(data, templateSelector, operateCardClic) {
        this._name = data.name;
        this._link = data.link;
        this._templateSelector = templateSelector;
        this.operateCardClic = operateCardClic;
    }


    _getTemplate() {
        const cardElement = this._templateSelector.content.querySelector('.element').cloneNode(true);
        return cardElement;
    }


    _setEventListeners() {
        this._cardElement = this._getTemplate();
        this._cardElement.querySelector('.element__like-button').addEventListener('click', this._toggleLike);
        this._cardElement.querySelector('.element__delite-button').addEventListener('click', this._deleteCard);
        const elementImg = this._cardElement.querySelector('.element__ithem')
        elementImg.addEventListener('click', () => {
            this.operateCardClic();
        });
    }

    _toggleLike = (evt) => {
        evt.target.classList.toggle('element__like-button_active');
    }

    _deleteCard = () => {
        this._cardElement.remove();
    }

    createCard = () => {
        this._cardElement = this._getTemplate();
        this._setEventListeners();
        this._cardElement.querySelector('.element__ithem').src = this._link
        this._cardElement.querySelector('.element__title').textContent = this._name
        this._cardElement.querySelector('.element__ithem').alt = this._name
        return this._cardElement;
    };
};


