export class Section {
    constructor({ items, renderer }, conteinerSelector) {
        this._renderer = renderer,
            this._renderItems = items,
            this._conteinerSelector = conteinerSelector
    }

    renderItems() {
        this._renderItems.forEach((item) => this._renderer(item));
    }

    addItem(element) {
        this._conteinerSelector.prepend(element)
    }
}