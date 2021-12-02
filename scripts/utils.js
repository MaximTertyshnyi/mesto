export const openPopup = (element) => {
    element.classList.add('popup_opened');
    element.addEventListener('mousedown', closePopupByClickOnOverlay)
    document.addEventListener('keydown', closePopupByClickOnEsc)
};

// Функция закрытия попап
export const closePopup = (element) => {
    element.classList.remove('popup_opened')
    //убираем слушатель, чтобы он не дублировался каждый раз
    element.removeEventListener('mousedown', closePopupByClickOnOverlay)
    document.removeEventListener('keydown', closePopupByClickOnEsc)
}

//Клик по внешней области
export const closePopupByClickOnOverlay = (evt) => {
    const popupElement = document.querySelector('.popup_opened')
    if (evt.target === popupElement) {
        closePopup(popupElement);
    }
};

//Клик по Escape
export const closePopupByClickOnEsc = (evt) => {
    if (evt.key === 'Escape') {
        const popupElement = document.querySelector('.popup_opened')
        closePopup(popupElement);
    }
};