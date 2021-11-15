const obj = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button-save',
    inactiveButtonClass: 'popup__button-save_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__error_visible'
};

//Функция вызова ошибки
const showInputError = (formElement, inputElement, errorMessage) => {
    const errorElement = formElement.querySelector(`.popup__input-error_${inputElement.id}`);
    inputElement.classList.add(obj.inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(obj.errorClass);
};

//Функция скрытия ошибки
const hideInputError = (formElement, inputElement) => {
    const errorElement = formElement.querySelector(`.popup__input-error_${inputElement.id}`);
    inputElement.classList.add(obj.inputErrorClass);
    errorElement.textContent = '';
    errorElement.classList.remove(obj.errorClass);
};

const checkInputValidity = (formElement, inputElement) => {
    if (!inputElement.validity.valid) {
        showInputError(formElement, inputElement, inputElement.validationMessage);
    } else {
        hideInputError(formElement, inputElement);
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

const enableValidation = () => {
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








// function enableValidation() {
//     const formSelector = Array.from(document.querySelectorAll('.popup__form'))
//     formSelector.forEach(addListenersForm);
// };

// function addListenersForm(form) {
//     const inputSelector = Array.from(document.querySelectorAll('.popup__input'));

//     inputSelector.forEach(addListenersInput);

//     form.addEventListener('submit', (evt) => {
//         evt.preventDefault();
//     });
// }

// function addListenersInput(input) {
//     input.addEventListener('input', handleFieldValidation)
// }

// function handleFieldValidation(evt) {
//     console.log(evt.target);
// }