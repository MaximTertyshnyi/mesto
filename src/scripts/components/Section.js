export class Section {
    constructor({ renderer }, conteinerSelector) {
        this._renderer = renderer;
        this._conteinerSelector = conteinerSelector
    }

    renderItems(items) {
        items.forEach((item) => this._renderer(item));
    }

    addItem(element) {
        this._conteinerSelector.append(element)
    }
    addNewItem(element) {
        this._conteinerSelector.prepend(element);
    }
}