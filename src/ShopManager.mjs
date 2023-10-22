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
        this._handleShopClick = this._handleShopClick.bind(this);
    }

    _addShopEventListeners() {
        let shopCells = document.getElementsByClassName('shop-el');

        for (let i = 0; i < shopCells.length; i++) {
            // shopCells[i].addEventListener('mouseover', this._highlightCell);
            // shopCells[i].addEventListener('mouseout', this._clearCellHighlight);
            shopCells[i].addEventListener('click', this._handleShopClick);
        }
    }

    _removeShopEventListeners() {
        let shopCells = document.getElementsByClassName('shop-el');

        for (let i = 0; i < shopCells.length; i++) {
            // shopCells[i].addEventListener('mouseover', this._highlightCell);
            // shopCells[i].addEventListener('mouseout', this._clearCellHighlight);
            shopCells[i].removeEventListener('click', this._handleShopClick);
        }
    }

    _handleShopClick(event) {
        console.log(event.target.id)
        if (event.target.id === "plant-1-shop-el") this._index = 1;
        if (event.target.id === "plant-2-shop-el") this._index = 2;
        if (event.target.id === "plant-3-shop-el") this._index = 3;
        if (event.target.id === "plant-4-shop-el") this._index = 4;
        if (event.target.id === "plant-4-shop-el") this._index = 5;
        if (event.target.id === "plant-4-shop-el") this._index = 6;
        this._removeShopEventListeners();
        this._addCellEventListeners();
    }

    _finalize(cell) {
        console.log(cell);
        cell.style.backgroundColor = '';
        this._removeCellEventListeners();
        this._addShopEventListeners();

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

    _addCellEventListeners() {
        let table = document.getElementById('game-board-table-el');
        let cells = table.getElementsByTagName('td');

        for (let i = 0; i < cells.length; i++) {
            cells[i].addEventListener('mouseover', this._highlightCell);
            cells[i].addEventListener('mouseout', this._clearCellHighlight);
            cells[i].addEventListener('click', this._handleClick);
        }
    }

    _removeCellEventListeners() {
        let table = document.getElementById('game-board-table-el');
        let cells = table.getElementsByTagName('td');

        for (let i = 0; i < cells.length; i++) {
            cells[i].removeEventListener('mouseover', this._highlightCell);
            cells[i].removeEventListener('mouseout', this._clearCellHighlight);
            cells[i].removeEventListener('click',  this._handleClick);
        }
    }
    _highlightCell(event) {
        event.target.style.backgroundColor = 'yellow';
    }

    _clearCellHighlight(event) {
        event.target.style.backgroundColor = '';
    }

    _handleClick(event) {
        this._finalize(event.target)
    }
}
