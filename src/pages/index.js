import './index.css'
import { initialCards } from '../scripts/data.js'
import { Section } from '../scripts/components/Section.js'
import { PopupWithImage } from '../scripts/components/PopupWithImage.js'
import { PopupWithForm } from '../scripts/components/PopupWithForm.js'
import { UserInfo } from '../scripts/components/UserInfo.js'
import { Card } from '../scripts/components/Card.js'
import { FormValidator } from '../scripts/components/FormValidator.js'

export const obj = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button-save',
    inactiveButtonClass: 'popup__button-save_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__error_visible'
};

const elementSection = document.querySelector('.elements');
const popupEditProfile = '.popup_type_edit'
const nameElement = document.querySelector('.profile__title')
const descriptionElement = document.querySelector('.profile__subtitle')
const elementTemplate = document.querySelector('.element-template');
// const popupCloseButtonElementEdit = popupEditProfile.querySelector('.popup__button-close')
const popupOpenButtonElementEdit = document.querySelector('.profile__edit-button')
const popupElementAdd = '.popup_type_add'
const popupOpenButtonElementAdd = document.querySelector('.profile__add-button')
const popupEdit = document.forms['user-profile']
const popupAdd = document.forms['user-add']
const inputName = document.querySelector('.popup__input_name')
const inputBusiness = document.querySelector('.popup__input_business')


const userInfo = new UserInfo({ userName: nameElement, userDescription: descriptionElement });

const profileValidator = new FormValidator(obj, popupEdit);
profileValidator.enableValidation();

popupOpenButtonElementEdit.addEventListener('click', function () {
    popupEditFormProfile.openPopup();
    const profileTextElement = userInfo.getUserInfo();
    inputName.value = profileTextElement.name
    inputBusiness.value = profileTextElement.description;
})

const popupImgClass = new PopupWithImage('.popup_type_img');
popupImgClass.setEventListeners();

// Функция создания новой карточки
function makeCard(data, templateSelector) {
    const card = new Card(data, templateSelector, () => {
        popupImgClass.openPopup(data);
    }).createCard();
    return card;
};

const addInitialCards = new Section({
    items: initialCards,
    renderer: (item) => {
        const card = makeCard(item, elementTemplate);
        addInitialCards.addItem(card);
    },
}, elementSection)

addInitialCards.renderItems();



const cardValidator = new FormValidator(obj, popupAdd)
cardValidator.enableValidation();

popupOpenButtonElementAdd.addEventListener('click', function () {
    PopupFormAdd.openPopup();
})


const popupEditFormProfile = new PopupWithForm(popupEditProfile, (values) => {
    userInfo.setUserInfo(values);
})
popupEditFormProfile.setEventListeners();



const PopupFormAdd = new PopupWithForm(popupElementAdd, (item) => {
    const card = makeCard(item, elementTemplate);
    addInitialCards.addItem(card);
});
PopupFormAdd.setEventListeners();

const popupFormImg = new PopupWithForm(".popup_type_img")
popupFormImg.setEventListeners();


// function handleSubmit(evt, value) {
//     evt.preventDefault();
//     // Получите значение полей jobInput и nameInput из свойства value
//     const nameInputValue = nameInput.value;
//     const jobInputValue = jobInput.value;
//     // Выберите элементы, куда должны быть вставлены значения полей
//     nameElement.textContent = nameInputValue;
//     descriptionElement.textContent = jobInputValue;
//     closePopup(popupEditProfile);
//     // disabled для кнопки сохранить, при использовании
//     popupSaveButtonElementAdd.disabled = true;
//     popupSaveButtonElementAdd.classList.add('popup__button-save_disabled')
// }




// //Функция добавление карточек 
// // function addInitialCards() {
// //     initialCards.forEach((item) => {
// //         elementSection.prepend(makeCard(item, elementTemplate))
// //     });
// // }

// // addInitialCards();


// //Обьявление переменных

// //Редактирование имени и информации о себе
// // Находим форму в DOM
// const formProfileElement = popupEditProfile.querySelector('.popup__form')
// // Находим поля формы в DOM
// const nameInput = formProfileElement.querySelector('.popup__input_name')
// const jobInput = formProfileElement.querySelector('.popup__input_business')
// // Открытие Popup с добавлением 
// // Делаем выборку DOM элементов
// const popupCloseButtonElementAdd = popupElementAdd.querySelector('.popup__button-close')
// const popupSaveButtonElementAdd = popupElementAdd.querySelector('.popup__button-save')
// const popupFormAdd = document.querySelector('.popup__form')
// //Выборка элементов попап с картинкой

// const popupImgButtonClose = popupImg.querySelector('.popup__button-close')

// // Функция заполнения попап value
// const writePopup = function () {
//     nameInput.value = nameElement.textContent;
//     jobInput.value = descriptionElement.textContent;
// }



// popupCloseButtonElementEdit.addEventListener('click', function () {
//     closePopup(popupEditProfile);
// })

// // Обработчик «отправки» формы, хотя пока
// // она никуда отправляться не будет
// function formEditSubmitHandler(evt) {
//     evt.preventDefault();
//     // Получите значение полей jobInput и nameInput из свойства value
//     const nameInputValue = nameInput.value;
//     const jobInputValue = jobInput.value;
//     // Выберите элементы, куда должны быть вставлены значения полей
//     nameElement.textContent = nameInputValue;
//     descriptionElement.textContent = jobInputValue;
//     closePopup(popupEditProfile);
//     // disabled для кнопки сохранить, при использовании
//     popupSaveButtonElementAdd.disabled = true;
//     popupSaveButtonElementAdd.classList.add('popup__button-save_disabled')
// }

// formProfileElement.addEventListener('submit', formEditSubmitHandler);




// popupCloseButtonElementAdd.addEventListener('click', function () {
//     closePopup(popupElementAdd);
// })


// popupFormAdd.addEventListener('submit', function (evt) {
//     evt.preventDefault();
//     const name = popupElementAdd.querySelector('.popup__input_img-name');
//     const link = popupElementAdd.querySelector('.popup__input_img-url');
//     const item = {
//         name: name.value,
//         link: link.value,
//     };
//     elementSection.prepend(makeCard(item, elementTemplate));
//     name.value = '';
//     link.value = '';
//     closePopup(popupElementAdd);
//     popupSaveButtonElementAdd.disabled = true;
//     popupSaveButtonElementAdd.classList.add('popup__button-save_disabled');
// });

// popupImgButtonClose.addEventListener('click', function () {
//     closePopup(popupImg);
// });
