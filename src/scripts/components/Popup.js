export class Popup {
    constructor(popupSelector) {
        this._popupElement = document.querySelector(popupSelector);
    }


    openPopup() {
        this._popupElement.classList.add('popup_opened');
        this._popupElement.addEventListener('mousedown', this._handleClickOnOverlayClose)
        document.addEventListener('keydown', this._handleEscClose)
    }

    closePopup() {
        this._popupElement.classList.remove('popup_opened')
        this._popupElement.removeEventListener('mousedown', this._handleClickOnOverlayClose)
        document.removeEventListener('keydown', this._handleEscClose)
    }

    _handleEscClose = (evt) => {
        if (evt.key === 'Escape') {
            const popupElement = document.querySelector('.popup_opened')
            this.closePopup(popupElement);
        }
    }

    _handleClickOnOverlayClose = (evt) => {
        const popupElement = document.querySelector('.popup_opened')
        if (evt.target === popupElement) {
            this.closePopup();
        }
    }

    setEventListeners() {
        const popupButtonClose = this._popupElement.querySelector('.popup__button-close');
        popupButtonClose.addEventListener('click', () => {
            this.closePopup()
        });
    }
}


