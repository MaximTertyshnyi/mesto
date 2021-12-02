export class FormValidator {
    constructor(config, formElement) {
        this._formElement = formElement;
        this._formSelector = config.formSelector;
        this._inputSelector = config.inputSelector
        this._submitButtonSelector = config.submitButtonSelector
        this._inactiveButtonClass = config.inactiveButtonClass
        this._inputErrorClass = config.inputErrorClass
        this._errorClass = config.errorClass
        this._inputList = Array.from(this._formElement.querySelectorAll(this._inputSelector));
        this._buttonElement = this._formElement.querySelector(this._submitButtonSelector);
    }

    //Функция вызова ошибки
    _showInputError = (inputElement, errorMessage) => {
        const errorElement = this._formElement.querySelector(`#${inputElement.name}-error`);
        inputElement.classList.add(this._inputErrorClass);
        errorElement.textContent = errorMessage;
        errorElement.classList.add(this._errorClass);
    };

    //Функция скрытия ошибки
    _hideInputError = (inputElement) => {
        const errorElement = this._formElement.querySelector(`#${inputElement.name}-error`);
        inputElement.classList.add(this._inputErrorClass);
        errorElement.textContent = '';
        inputElement.classList.remove(this._inputErrorClass);
        errorElement.classList.remove(this._errorClass);
    };

    _checkInputValidity = (inputElement) => {
        if (!inputElement.validity.valid) {
            this._showInputError(inputElement, inputElement.validationMessage);
        } else {
            this._hideInputError(inputElement);
        }
    };

    _hasInvalidInput = () => {
        return this._inputList.some((inputElement) => {
            return !inputElement.validity.valid;
        });
    };

    _toggleButtonState = () => {
        if (this._hasInvalidInput()) {
            this._buttonElement.disabled = true;
            this._buttonElement.classList.add(this._inactiveButtonClass);
        } else {
            this._buttonElement.disabled = false;
            this._buttonElement.classList.remove(this._inactiveButtonClass);
        };
    }

    _setEventListeners = () => {
        // чтобы проверить состояние кнопки в самом начале
        this._toggleButtonState();
        this._inputList.forEach((inputElement) => {
            inputElement.addEventListener('input', () => {
                this._checkInputValidity(inputElement);
                // чтобы проверять его при изменении любого из полей
                this._toggleButtonState();
            });
        });
    };

    enableValidation = () => {
        this._formElement.addEventListener('submit', (evt) => {
            // У каждой формы отменим стандартное поведение
            evt.preventDefault();
        });

        this._setEventListeners();
    };
}

