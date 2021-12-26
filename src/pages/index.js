import './index.css'
import { initialCards } from '../scripts/utils/data.js'
import { Section } from '../scripts/components/Section.js'
import { PopupWithImage } from '../scripts/components/PopupWithImage.js'
import { PopupWithForm } from '../scripts/components/PopupWithForm.js'
import { UserInfo } from '../scripts/components/UserInfo.js'
import { Card } from '../scripts/components/Card.js'
import { FormValidator } from '../scripts/components/FormValidator.js'
import {
    elementSection, popupEditProfile, nameElement,
    descriptionElement, elementTemplate, popupOpenButtonElementEdit,
    popupElementAdd, popupOpenButtonElementAdd, popupEdit, popupAdd, inputName, inputBusiness
} from '../scripts/utils/constants.js'

export const obj = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button-save',
    inactiveButtonClass: 'popup__button-save_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__error_visible'
};

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
    cardValidator.resetValidation();
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