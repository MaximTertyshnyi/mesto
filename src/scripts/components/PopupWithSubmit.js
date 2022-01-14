import { Popup } from './Popup';

export class PopupWithSubmit extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
  }

  submit(submiter) {
    this._submiter = submiter;
  }

  setEventListeners() {
    super.setEventListeners();
    this._popupElement.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._submiter();
    });
  }
}