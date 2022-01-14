import './index.css'
import { Section } from '../scripts/components/Section.js'
import { PopupWithImage } from '../scripts/components/PopupWithImage.js'
import { PopupWithForm } from '../scripts/components/PopupWithForm.js'
import { UserInfo } from '../scripts/components/UserInfo.js'
import { Card } from '../scripts/components/Card.js'
import { FormValidator } from '../scripts/components/FormValidator.js'
import {
    elementSection, popupEditProfile, nameElement,
    descriptionElement, elementTemplate, popupOpenButtonElementEdit,
    popupElementAdd, popupOpenButtonElementAdd, popupEdit, popupAdd, popupAvatar, inputName, inputBusiness, popupFormAvatar, popupCardDelete, avatarElementFormProfile, popupButtonAvatarEdit
} from '../scripts/utils/constants.js'
import { Api } from '../scripts/components/Api'
import { PopupWithSubmit } from '../scripts/components/PopupWithSubmit';
import { renderLoad } from '../scripts/utils/renderLoad.js';

export const obj = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button-save',
    inactiveButtonClass: 'popup__button-save_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__error_visible'
};
const userInfo = new UserInfo({ userName: nameElement, userDescription: descriptionElement, avatar: avatarElementFormProfile });

const profileValidator = new FormValidator(obj, popupEdit);
profileValidator.enableValidation();

//сохранение id 
let userId;

//api
const api = new Api({
    url: 'https://nomoreparties.co/v1/cohort-33/',
    headers: {
        authorization: '3d4f0a21-bd6c-486b-9469-94ae61cb738c',
        'content-type': 'application/json',
    },
});

//загружаем данные пользователя
const profileData = api.getProfileData();

//загружаем данные карточки
const cardsData = api.getCardsData();

popupOpenButtonElementEdit.addEventListener('click', function () {
    popupEditFormProfile.openPopup();
    const profileTextElement = userInfo.getUserInfo();
    inputName.value = profileTextElement.name
    inputBusiness.value = profileTextElement.description;
})

const popupImgClass = new PopupWithImage('.popup_type_img');
popupImgClass.setEventListeners();

const popupWithSubmitClass = new PopupWithSubmit(popupCardDelete);
popupWithSubmitClass.setEventListeners();

// Функция создания новой карточки
function makeCard(data, templateSelector) {
    const card = new Card(
        {
            data,
            operateCardClic: () => {
                //Открытия popup кликом на картинку
                popupImgClass.openPopup(data);
            },
            handleLikeClickActive,
            handleLikeClickDeactive,
            handleDeleteClick: () => {
                //Удаление карточки
                popupWithSubmitClass.openPopup();
                popupWithSubmitClass.submit(() => {
                    api
                        .deleteCard(data._id)
                        .then(() => {
                            card.handleDeleteCard();
                            popupWithSubmitClass.closePopup();
                        })
                        .catch((err) => {
                            alert(`Возникла ошибка: ${err}`);
                        });
                });
            },
        },
        templateSelector,
        userId
    )
    return card.createCard();;
};

const addInitialCards = new Section(
    {
        renderer: (item) => {
            const card = makeCard(item, elementTemplate, userId);
            addInitialCards.addItem(card);
        },
    }, elementSection);

// addInitialCards.renderItems();

//Записываем в переменную id чтобы определить like на карточках
Promise.all([cardsData, profileData]).then((res) => {
    userId = res[1]._id;
    //Заполним профиль пользователя данными пришедшими из API
    profileData
        .then((data) => {
            userInfo.setUserInfo({ profilename: data.name, description: data.about, avatar: data.avatar });
        })
        .catch((err) => {
            alert(`Возникла ошибка: ${err}`);
        });
    cardsData
        .then((data) => {
            addInitialCards.renderItems(data);
            return addInitialCards;
        })
        .catch((err) => {
            alert(`Возникла ошибка: ${err}`);
        });
});


const cardValidator = new FormValidator(obj, popupAdd)
cardValidator.enableValidation();

popupOpenButtonElementAdd.addEventListener('click', function () {
    PopupFormAdd.openPopup();
    cardValidator.resetValidation();
})

const handleLikeClickActive = (id, renderLikes) => {
    api
        .putCardLikes(id)
        .then((res) => {
            renderLikes(res.likes.length);
        })
        .catch((err) => {
            alert(`Возникла ошибка: ${err}`);
        });
};

const handleLikeClickDeactive = (id, renderLikes) => {
    api
        .deleteCardLikes(id)
        .then((res) => {
            renderLikes(res.likes.length);
        })
        .catch((err) => {
            alert(`Возникла ошибка: ${err}`);
        });
};




const popupEditFormProfile = new PopupWithForm(popupEditProfile, (values) => {
    renderLoad(popupEditProfile, true);
    api
        .editProfile(values.profilename, values.description)
        .then((res) => {
            userInfo.setUserInfo({ profilename: res.name, description: res.about, avatar: res.avatar });
            popupEditFormProfile.closePopup();
        })
        .catch((err) => {
            alert(`Возникла ошибка: ${err}`);
        })
        .finally(() => {
            renderLoad(popupEditProfile, false);
        });
})
popupEditFormProfile.setEventListeners();



const PopupFormAdd = new PopupWithForm(popupElementAdd, (item) => {
    renderLoad(popupElementAdd, true);
    api
        .addNewCard(item.name, item.link)
        .then((res) => {
            const card = makeCard(res, elementTemplate);
            addInitialCards.addItem(card);
            PopupFormAdd.closePopup();
        })
        .catch((err) => {
            alert(`Возникла ошибка: ${err}`);
        })
        .finally(() => {
            renderLoad(popupElementAdd, false);
        });
});
PopupFormAdd.setEventListeners();

const avatarValidator = new FormValidator(obj, popupAvatar);
avatarValidator.enableValidation();

const popupFormAvatarClass = new PopupWithForm(popupFormAvatar, (values) => {
    renderLoad(popupFormAvatar, true);
    api
        .editAvatar(values.link)
        .then((res) => {
            userInfo.setUserInfo({ profilename: res.name, userDescription: res.about, avatar: res.avatar });
            popupFormAvatarClass.closePopup();
        })
        .catch((err) => {
            alert(`Возникла ошибка: ${err}`);
        })
        .finally(() => {
            renderLoad(popupFormAvatar, false);
        });
});

popupFormAvatarClass.setEventListeners();

popupButtonAvatarEdit.addEventListener('click', function () {
    avatarValidator.resetValidation();
    popupFormAvatarClass.openPopup();
});
