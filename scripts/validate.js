const obj = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button-save',
    inactiveButtonClass: 'popup__button-save_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__error_visible'
};

//Функция вызова ошибки
const showInputError = (formElement, inputElement, errorMessage, obj) => {
    const errorElement = formElement.querySelector(`#${inputElement.name}-error`);
    inputElement.classList.add(obj.inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(obj.errorClass);
};

//Функция скрытия ошибки
const hideInputError = (formElement, inputElement, obj) => {
    const errorElement = formElement.querySelector(`#${inputElement.name}-error`);
    inputElement.classList.add(obj.inputErrorClass);
    errorElement.textContent = '';
    errorElement.classList.remove(obj.errorClass);
};

const checkInputValidity = (formElement, inputElement) => {
    if (!inputElement.validity.valid) {
        showInputError(formElement, inputElement, inputElement.validationMessage, obj);
    } else {
        hideInputError(formElement, inputElement, obj);
    }
};

const hasInvalidInput = (inputList) => {
    return inputList.some((inputElement) => {
        return !inputElement.validity.valid;
    });
};

const toggleButtonState = (inputList, buttonElement) => {
    if (hasInvalidInput(inputList)) {
        buttonElement.disabled = true;
        buttonElement.classList.add(obj.inactiveButtonClass);
    } else {
        buttonElement.disabled = false;
        buttonElement.classList.remove(obj.inactiveButtonClass);
    };
}

const setEventListeners = (formElement) => {
    const inputList = Array.from(formElement.querySelectorAll(obj.inputSelector));
    const buttonElement = formElement.querySelector(obj.submitButtonSelector);
    // чтобы проверить состояние кнопки в самом начале
    toggleButtonState(inputList, buttonElement);
    inputList.forEach((inputElement) => {
        inputElement.addEventListener('input', function () {
            checkInputValidity(formElement, inputElement);
            // чтобы проверять его при изменении любого из полей
            toggleButtonState(inputList, buttonElement);
        });
    });
};

const enableValidation = (obj) => {
    // Найдём все формы с указанным классом в DOM,
    // сделаем из них массив методом Array.from
    const formList = Array.from(document.querySelectorAll(obj.formSelector));
    // Переберём полученную коллекцию
    formList.forEach((formElement) => {
        formElement.addEventListener('submit', function (evt) {
            // У каждой формы отменим стандартное поведение
            evt.preventDefault();
        });

        setEventListeners(formElement);

    });
};

enableValidation(obj);