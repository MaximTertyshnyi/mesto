import { Popup } from "./Popup.js";

export class PopupWithImage extends Popup {
    constructor(popupSelector) {
        super(popupSelector);
        this._link = this._popupElement.querySelector('.popup__img')
        this._name = this._popupElement.querySelector('.popup__title-img')
    }

    openPopup({ name, link }) {
        this._link.src = link;
        this._name.textContent = name;
        this._name.alt = name;
        super.openPopup()
    }
}


