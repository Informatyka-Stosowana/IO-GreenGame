import {Plant} from "./Plant.mjs";
import {Box} from "./Box.mjs";
import {Fork} from "./Fork.mjs";

export {ShopManager}

class ShopManager {
    constructor(itemRepository, boardManager) {
        this._itemRepository = itemRepository;
        this._boardManager = boardManager;
        this._index = undefined;
        this._handleClick = this._handleClick.bind(this);
    }

    buy(index) {
        this._index = index;
        this._addEventListeners();
    }

    _finalize(cell) {
        console.log(cell);
        cell.style.backgroundColor = '';
        this._removeEventListeners();
        let thing = undefined;

        switch (this._index) {
            case 1:
                thing = new Plant(1);
                if (this._itemRepository.compost < thing.price) return;
                // TODO add plant to BoardManager
                this._itemRepository.removeCompost(thing.price);
                break;
            case 2:
                thing = new Plant(2);
                if (this._itemRepository.compost < thing.price) return;
                // TODO add plant to BoardManager
                this._itemRepository.removeCompost(thing.price);
                break;
            case 3:
                thing = new Plant(3);
                if (this._itemRepository.compost < thing.price) return;
                // TODO add plant to BoardManager
                this._itemRepository.removeCompost(thing.price);
                break;
            case 4:
                thing = new Plant(4);
                if (this._itemRepository.compost < thing.price) return;
                // TODO add plant to BoardManager
                this._itemRepository.removeCompost(thing.price);
                break;
            case 5:
                if (this._itemRepository.boxes === 0) return;
                thing = new Box();
                // TODO add box to BoardManager
                this._itemRepository.removeBoxes(1);
                break;
            case 6:
                if (this._itemRepository.forks === 0) return;
                thing = new Fork();
                // TODO add fork to BoardManager
                this._itemRepository.removeForks(1);
                break;
        }
    }

    _addEventListeners() {
        let table = document.getElementById('game-board-table-el');
        let cells = table.getElementsByTagName('td');
        let shopManager = this;

        for (let i = 0; i < cells.length; i++) {
            cells[i].addEventListener('mouseover', this._highlightCell);
            cells[i].addEventListener('mouseout', this._clearHighlight);
            cells[i].addEventListener('click', this._handleClick);
        }
    }

    _removeEventListeners() {
        let table = document.getElementById('game-board-table-el');
        let cells = table.getElementsByTagName('td');
        let shopManager = this;

        for (let i = 0; i < cells.length; i++) {
            cells[i].removeEventListener('mouseover', this._highlightCell);
            cells[i].removeEventListener('mouseout', this._clearHighlight);
            cells[i].removeEventListener('click',  this._handleClick);
        }
    }
    _highlightCell(event) {
        event.target.style.backgroundColor = 'yellow';
    }

    _clearHighlight(event) {
        event.target.style.backgroundColor = '';
    }

    _handleClick(event) {
        this._finalize(event.target)
    }
}
