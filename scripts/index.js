import { initialCards } from './data.js'
import { Card } from './Card.js'
import { FormValidator } from './FormValidator.js'
import { openPopup, closePopup } from './utils.js'

const obj = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button-save',
    inactiveButtonClass: 'popup__button-save_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__error_visible'
};

// Делаем выборку DOM элементов
const popupEditProfile = document.querySelector('.popup_type_edit')
const popupOpenButtonElementEdit = document.querySelector('.profile__edit-button')
const popupCloseButtonElementEdit = popupEditProfile.querySelector('.popup__button-close')
//Обьявление переменных
const elementSection = document.querySelector('.elements');
const elementTemplate = document.querySelector('.element-template').content;
const nameElement = document.querySelector('.profile__title')
const descriptionElement = document.querySelector('.profile__subtitle')
const profileValidator = new FormValidator(obj, popupEditProfile);
profileValidator.enableValidation();
//Редактирование имени и информации о себе
// Находим форму в DOM
const formProfileElement = popupEditProfile.querySelector('.popup__form')
// Находим поля формы в DOM
const nameInput = formProfileElement.querySelector('.popup__input_name')
const jobInput = formProfileElement.querySelector('.popup__input_business')
// Открытие Popup с добавлением 
// Делаем выборку DOM элементов
const popupElementAdd = document.querySelector('.popup_type_add')
const popupOpenButtonElementAdd = document.querySelector('.profile__add-button')
const popupCloseButtonElementAdd = popupElementAdd.querySelector('.popup__button-close')
const popupSaveButtonElementAdd = popupElementAdd.querySelector('.popup__button-save')
const popupFormAdd = popupElementAdd.querySelector('.popup__form')
const cardValidator = new FormValidator(obj, popupElementAdd)
cardValidator.enableValidation();
//Выборка элементов попап с картинкой
const popupImg = document.querySelector('.popup_type_img')
const popupImgButtonClose = popupImg.querySelector('.popup__button-close')

// Функция заполнения попап value
const writePopup = function () {
    nameInput.value = nameElement.textContent;
    jobInput.value = descriptionElement.textContent;
}

popupOpenButtonElementEdit.addEventListener('click', function () {
    openPopup(popupEditProfile);
    writePopup();
})

popupCloseButtonElementEdit.addEventListener('click', function () {
    closePopup(popupEditProfile);
})

// Обработчик «отправки» формы, хотя пока
// она никуда отправляться не будет
function formEditSubmitHandler(evt) {
    evt.preventDefault();
    // Получите значение полей jobInput и nameInput из свойства value
    const nameInputValue = nameInput.value;
    const jobInputValue = jobInput.value;
    // Выберите элементы, куда должны быть вставлены значения полей
    nameElement.textContent = nameInputValue;
    descriptionElement.textContent = jobInputValue;
    closePopup(popupEditProfile);
    // disabled для кнопки сохранить, при использовании
    popupSaveButtonElementAdd.disabled = true;
    popupSaveButtonElementAdd.classList.add('popup__button-save_disabled')
}

formProfileElement.addEventListener('submit', formEditSubmitHandler);

// Функция создания новой карточки
function makeCard(data, templateSelector) {
    const card = new Card(data, templateSelector);
    const cardItem = card.createCard();
    return cardItem;
};

//Функция добавление карточек 
function addInitialCards() {
    initialCards.forEach((item) => {
        elementSection.prepend(makeCard(item, elementTemplate))
    });
}

addInitialCards();


popupOpenButtonElementAdd.addEventListener('click', function () {
    openPopup(popupElementAdd);
})

popupCloseButtonElementAdd.addEventListener('click', function () {
    closePopup(popupElementAdd);
})


popupFormAdd.addEventListener('submit', function (evt) {
    evt.preventDefault();
    const name = popupElementAdd.querySelector('.popup__input_img-name');
    const link = popupElementAdd.querySelector('.popup__input_img-url');
    const item = {
        name: name.value,
        link: link.value,
    };
    elementSection.prepend(makeCard(item, elementTemplate));
    name.value = '';
    link.value = '';
    closePopup(popupElementAdd);
    popupSaveButtonElementAdd.disabled = true;
    popupSaveButtonElementAdd.classList.add('popup__button-save_disabled');
});

popupImgButtonClose.addEventListener('click', function () {
    closePopup(popupImg);
});
