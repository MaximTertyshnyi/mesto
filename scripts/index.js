// Делаем выборку DOM элементов
const popupEditProfile = document.querySelector(".popup_type_edit")
const popupOpenButtonElementEdit = document.querySelector('.profile__edit-button')
const popupCloseButtonElementEdit = popupEditProfile.querySelector('.popup__close')

// Функция открытия попап
const openPopup = function (element) {
    element.classList.add('popup_opened');
}

// Функция заполнения попап value
const writePopup = function () {
    nameInput.value = nameElement.textContent;
    jobInput.value = descriptionElement.textContent;
}


// Функция закрытия попап
const closePopup = function (element) {
    element.classList.remove('popup_opened')
}

// //Клик по внешней области
// const closePopupByClickOnOverlay = function (event) {
//     if (event.target !== popupEditProfile) {
//         return
//     }

//     closePopup(popupEditProfile)
// }

// popupEditProfile.addEventListener('click', closePopupByClickOnOverlay)


popupOpenButtonElementEdit.addEventListener("click", function () {
    openPopup(popupEditProfile);
    writePopup();
})

popupCloseButtonElementEdit.addEventListener("click", function () {
    closePopup(popupEditProfile);
})

const nameElement = document.querySelector(".profile__title")
const descriptionElement = document.querySelector(".profile__subtitle")

//Редактирование имени и информации о себе
// Находим форму в DOM
const formElement = document.querySelector(".popup__form")
// Находим поля формы в DOM
const nameInput = formElement.querySelector(".popup__text_name")
const jobInput = formElement.querySelector(".popup__text_business")

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
}

formElement.addEventListener('submit', formEditSubmitHandler);


//Спринт 5___________________________________________________________________

//Массив каточек
const initialCards = [
    {
        name: 'Архыз',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    },
    {
        name: 'Челябинская область',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
        name: 'Иваново',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
        name: 'Камчатка',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
        name: 'Холмогорский район',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
        name: 'Байкал',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    }
];

//Обьявление переменных
const elementSection = document.querySelector(".elements");
const elementTemplate = document.querySelector(".element-template").content;

//Функция наполнения каточек
function createCard(name, link) {
    const elementCard = elementTemplate.querySelector('.element').cloneNode(true);
    elementCard.querySelector(".element__title").textContent = name;
    elementCard.querySelector(".element__ithem").src = link;
    setListeners(elementCard);
    return elementCard;
}


//Элементы карточки
function setListeners(element) {
    // Функция изменения активного лайка на карточке
    element.querySelector(".element__like-button").addEventListener("click", toggleLike);
    element.querySelector(".element__delite-button").addEventListener("click", deleteCard);
    const elementImg = element.querySelector(".element__ithem");
    elementImg.addEventListener("click", function () {
        openImagePopup(element)
    })
}

//Функция добавление карточек 
function renderCard() {
    initialCards.forEach((item) => {
        const elementCard = createCard(item.name, item.link);
        elementSection.prepend(elementCard);
    })
}

renderCard();

// Функция удаления карточек
function deleteCard(evt) {
    evt.target.closest(".element").remove();
}

// Открытие Popup с добавлением 
// Делаем выборку DOM элементов
const popupElementAdd = document.querySelector('.popup_type_add')
const popupOpenButtonElementAdd = document.querySelector('.profile__add-button')
const popupCloseButtonElementAdd = popupElementAdd.querySelector('.popup__close')
const popupSaveButtonElementAdd = popupElementAdd.querySelector(".popup__button-save")
const popupFormAdd = popupElementAdd.querySelector(".popup__form")


popupOpenButtonElementAdd.addEventListener("click", function () {
    openPopup(popupElementAdd);
})

popupCloseButtonElementAdd.addEventListener("click", function () {
    closePopup(popupElementAdd);
})


function addNewCard(evt) {
    evt.preventDefault();
    const name = popupElementAdd.querySelector(".popup__text_name");
    const link = popupElementAdd.querySelector(".popup__text_business");
    const elementCard = createCard(name.value, link.value);
    elementSection.prepend(elementCard);
    name.value = "";
    link.value = "";
    closePopup(popupElementAdd);
}

popupFormAdd.addEventListener("submit", addNewCard)


// Функция добавление активного лайка на карточку 
function toggleLike(evt) {
    evt.target.classList.toggle('element__like-button_active');
}


// //Клик по внешней области
// const closePopupByClickOnOverlayAdd = function (event) {
//     if (event.target !== popupElementAdd) {
//         return
//     }

//     closePopup(popupElementAdd)
// }

// popupElementAdd.addEventListener('click', closePopupByClickOnOverlayAdd)


//Выборка элементов попап с картинкой
const popupImg = document.querySelector(".popup_type_img")
const popupImgButtonClose = popupImg.querySelector(".popup__close")

function openImagePopup(element) {
    // передаем функцию открытия попап
    openPopup(popupImg)
    //Выборка элементов которые нужно открыть в  попап
    const elementImg = element.querySelector(".element__ithem")
    const elementTitle = element.querySelector(".element__title")
    //Выборка элементов внутри данного попап
    const popupElementImg = popupImg.querySelector(".popup__img")
    const popupElementTitleImg = popupImg.querySelector(".popup__title-img")
    // значения
    popupElementImg.src = elementImg.src
    popupElementTitleImg.textContent = elementTitle.textContent
}

popupImgButtonClose.addEventListener("click", function () {
    closePopup(popupImg);
});
