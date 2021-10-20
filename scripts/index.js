// Делаем выборку DOM элементов
const popupOpenButtonElement = document.querySelector('.profile__edit-button')
const popupElement = document.querySelector('.popup')
const popupCloseButtonElement = popupElement.querySelector('.popup__close')

const togglePopupVisibility = function () {
    popupElement.classList.toggle('popup_opened')
}

const openPopup = function () {
    popupElement.classList.add('popup_opened')
    nameInput.value = nameElement.textContent;
    jobInput.value = descriptionElement.textContent;
}

const closePopup = function () {
    popupElement.classList.remove('popup_opened')
}

const closePopupByClickOnOverlay = function (event) {
    console.log(event.target, event.currentTarget)
    if (event.target !== event.currentTarget) {
        return
    }

    closePopup()
}

popupOpenButtonElement.addEventListener('click', openPopup)
popupCloseButtonElement.addEventListener('click', closePopup)
popupElement.addEventListener('click', closePopupByClickOnOverlay)

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
    closePopup();
}

formElement.addEventListener('submit', formSubmitHandler);