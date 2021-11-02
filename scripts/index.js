// Делаем выборку DOM элементов
const popupOpenButtonElement = document.querySelector('.profile__edit-button')
const popupElement = document.querySelector('.popup')
const popupCloseButtonElement = popupElement.querySelector('.popup__close')
const popupElementEdit = document.querySelector(".popup_type_edit")

const togglePopupVisibility = function (element) {
    element.classList.toggle('popup_opened')
}

const openPopup = function (element) {
    element.classList.add('popup_opened')
    nameInput.value = nameElement.textContent;
    jobInput.value = descriptionElement.textContent;
}

const closePopup = function (element) {
    element.classList.remove('popup_opened')
}

//Клик по внешней области
const closePopupByClickOnOverlay = function (event) {
    console.log(event.target, event.currentTarget)
    if (event.target !== popupElementEdit) {
        return
    }

    closePopup(popupElementEdit)
}

popupElementEdit.addEventListener('click', closePopupByClickOnOverlay)


popupOpenButtonElement.addEventListener("click", function () {
    openPopup(popupElementEdit);
})

popupCloseButtonElement.addEventListener("click", function () {
    closePopup(popupElementEdit);
})


let nameElement = document.querySelector(".profile__title")
let descriptionElement = document.querySelector(".profile__subtitle")

//Редактирование имени и информации о себе
// Находим форму в DOM
let formElement = document.querySelector(".popup__form")
// Находим поля формы в DOM
let nameInput = formElement.querySelector(".popup__text_name")
let jobInput = formElement.querySelector(".popup__text_business")

// Обработчик «отправки» формы, хотя пока
// она никуда отправляться не будет
function formSubmitHandler(evt) {
    evt.preventDefault();
    // Получите значение полей jobInput и nameInput из свойства value
    let nameInputValue = nameInput.value;
    let jobInputValue = jobInput.value;
    // Выберите элементы, куда должны быть вставлены значения полей
    nameElement.textContent = nameInputValue;
    descriptionElement.textContent = jobInputValue;
    closePopup(popupElementEdit);
}

formElement.addEventListener('submit', formSubmitHandler);


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
function iventCard(name, link) {
    let elementCard = elementTemplate.querySelector('.element').cloneNode(true);
    elementCard.querySelector(".element__title").textContent = name;
    elementCard.querySelector(".element__ithem").src = link;
    setListeners(elementCard);
    return elementCard;
}

//Элементы карточки
function setListeners(element) {
    // Функция изменения активного лайка на карточке
    element.querySelector(".element__like-button").addEventListener("click", addingLike);
    element.querySelector(".element__delite-button").addEventListener("click", addingDeliteCard);
    const elementImg = element.querySelector(".element__ithem");
    elementImg.addEventListener("click", function () {
        addingPopupImg(element)
    })
}

//Функция добавление карточек 
function submitCard() {
    initialCards.forEach((item) => {
        const elmntCard = iventCard(item.name, item.link);
        elementSection.prepend(elmntCard);
    })
}

submitCard();

// Функция удаления карточек
function addingDeliteCard(evt) {
    evt.target.closest(".element").remove();
}

// Открытие Popup с добавлением 
// Делаем выборку DOM элементов
const popupElementAdd = document.querySelector('.popup_type_add')
const popupOpenButtonElementAdd = document.querySelector('.profile__add-button')
const popupCloseButtonElementAdd = popupElementAdd.querySelector('.popup__close')
const popupSaveButtonElementAdd = popupElementAdd.querySelector(".popup__button-save")


popupOpenButtonElementAdd.addEventListener("click", function () {
    openPopup(popupElementAdd);
})

popupCloseButtonElementAdd.addEventListener("click", function () {
    closePopup(popupElementAdd);
})


popupSaveButtonElementAdd.addEventListener("click", function (evt) {
    evt.preventDefault();
    const name = popupElementAdd.querySelector(".popup__text_name");
    const link = popupElementAdd.querySelector(".popup__text_business");
    const elmntCard = iventCard(name.value, link.value);
    elementSection.prepend(elmntCard);
    name.value = "";
    link.value = "";
    closePopup(popupElementAdd);
})

// Функция добавление активного лайка на карточку 
function addingLike(evt) {
    evt.target.classList.toggle('element__like-button_active');
}


//Клик по внешней области
const closePopupByClickOnOverlayAdd = function (event) {
    console.log(event.target, event.currentTarget)
    if (event.target !== popupElementAdd) {
        return
    }

    closePopup(popupElementAdd)
}

popupElementAdd.addEventListener('click', closePopupByClickOnOverlayAdd)


//Выборка элементов попап с картинкой
const popupImg = document.querySelector(".popup_type_img")
const popupImgButtonClose = popupImg.querySelector(".popup__close")

function addingPopupImg(element) {
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
