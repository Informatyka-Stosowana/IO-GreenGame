import {Plant} from "./Plant.mjs";
import {Box} from "./Box.mjs";
import {Fork} from "./Fork.mjs";

export {ShopManager}

class ShopManager {
    constructor(itemRepository, boardManager) {
        this._itemRepository = itemRepository;
        this._boardManager = boardManager;

        this._thing = null;

        this._handleClick = this._handleClick.bind(this);
        this._handleShopClick = this._handleShopClick.bind(this);

        this._addShopEventListeners();
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
        console.log('[INFO] Buying: ', event.target.id)
        if (event.target.id === "plant-1-shop-el") {
            this._thing = new Plant(1);
            if (this._itemRepository.compost < this._thing.price) {
                console.log('[INFO] Insufficient compost')
                return;
            }
        }
        if (event.target.id === "plant-2-shop-el") {
            this._thing = new Plant(2);
            if (this._itemRepository.compost < this._thing.price) {
                console.log('[INFO] Insufficient compost')
                return;
            }
        }
        if (event.target.id === "plant-3-shop-el") {
            this._thing = new Plant(3);
            if (this._itemRepository.compost < this._thing.price) {
                console.log('[INFO] Insufficient compost')
                return;
            }
        }
        if (event.target.id === "plant-4-shop-el") {
            this._thing = new Plant(4);
            if (this._itemRepository.compost < this._thing.price) {
                console.log('[INFO] Insufficient compost')
                return;
            }
        }
        if (event.target.id === "box-shop-el") {
            this._thing = new Box();
            if (this._itemRepository.boxes <= 0) {
                console.log('[INFO] Insufficient boxes')
                return;
            }
        }
        if (event.target.id === "fork-shop-el") {
            this._thing = new Fork();
            if (this._itemRepository.forks <= 0) {
                console.log('[INFO] Insufficient forks')
                return;
            }
        }

        this._removeShopEventListeners();
        this._addCellEventListeners();
    }

    _finalize(cell) {
        console.log('[INFO] Selected cell: [', cell.parentNode.rowIndex,',', cell.cellIndex,']');
        cell.style.backgroundColor = '';
        this._removeCellEventListeners();
        this._addShopEventListeners();

        if (this._thing instanceof Plant) {
            this._itemRepository.removeCompost(this._thing.price);
            console.log('[INFO] Compost left: ', this._itemRepository.compost)
        }
        if (this._thing instanceof Box) {
            this._itemRepository.removeBoxes(1);
            console.log('[INFO] Boxes left: ', this._itemRepository.boxes)
        }
        if (this._thing instanceof Fork) {
            this._itemRepository.removeForks(1);
            console.log('[INFO] Forks left: ', this._itemRepository.forks)
        }

        // TODO add thing to board manager
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
