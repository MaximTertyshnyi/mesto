import { openPopup } from './utils.js'

export class Card {
    constructor(data, templateSelector) {
        this._name = data.name
        this._link = data.link
        this._templateSelector = templateSelector
    }


    _getTemplate() {
        const cardElement = document.querySelector('.element-template').content.firstElementChild.cloneNode(true);
        return cardElement;
    }

    _setListeners() {
        this._cardElement = this._getTemplate();
        this._cardElement.querySelector(".element__like-button").addEventListener("click", this._toggleLike);
        this._cardElement.querySelector(".element__delite-button").addEventListener("click", this._deleteCard);
        const popupImg = document.querySelector(".popup_type_img")
        const elementImg = this._cardElement.querySelector(".element__ithem")
        const elementTitle = this._cardElement.querySelector(".element__title")
        const popupElementImg = popupImg.querySelector(".popup__img")
        const popupElementTitleImg = popupImg.querySelector(".popup__title-img")

        elementImg.addEventListener("click", () => {
            openPopup(popupImg)
            // значения
            popupElementImg.src = elementImg.src
            popupElementImg.alt = elementImg.alt
            popupElementTitleImg.textContent = elementTitle.textContent
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
        this._setListeners();
        this._cardElement.querySelector(".element__ithem").src = this._link
        this._cardElement.querySelector(".element__title").textContent = this._name
        this._cardElement.querySelector(".element__ithem").alt = this._name
        return this._cardElement
    }
};