import {Plant} from "./Plant.mjs";
import {Box} from "./Box.mjs";
import {Fork} from "./Fork.mjs";

export {ShopManager}

class ShopManager {
    constructor(itemRepository, objectRepository) {
        this._itemRepository = itemRepository;
        this._objectRepository = objectRepository;

        this._thing = null;

        this._handleClick = this._handleClick.bind(this);
        this._clearCellHighlight = this._clearCellHighlight.bind(this);
        this._highlightCell = this._highlightCell.bind(this);

        this._handleShopClick = this._handleShopClick.bind(this);

        this._addShopEventListeners();
        this._isInBuyingMode = false;
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
        if (this._isInBuyingMode) {
            console.info('[INFO] Buying cancelled')
            this._isInBuyingMode = false;
            this._removeCellEventListeners();
            return;
        }
        this._isInBuyingMode = true;
        console.info('[INFO] Buying: ', event.target.id)

        if (event.target.id === "plant-1-shop-el") {
            this._thing = new Plant(1);
            if (this._itemRepository.compost < this._thing.price) {
                console.info('[INFO] Insufficient compost')
                this._isInBuyingMode = false;
                return;
            }
        }
        if (event.target.id === "plant-2-shop-el") {
            this._thing = new Plant(2);
            if (this._itemRepository.compost < this._thing.price) {
                console.info('[INFO] Insufficient compost')
                this._isInBuyingMode = false;
                return;
            }
        }
        if (event.target.id === "plant-3-shop-el") {
            this._thing = new Plant(3);
            if (this._itemRepository.compost < this._thing.price) {
                console.info('[INFO] Insufficient compost')
                this._isInBuyingMode = false;
                return;
            }
        }
        if (event.target.id === "plant-4-shop-el") {
            this._thing = new Plant(4);
            if (this._itemRepository.compost < this._thing.price) {
                console.info('[INFO] Insufficient compost')
                this._isInBuyingMode = false;
                return;
            }
        }
        if (event.target.id === "box-shop-el") {
            this._thing = new Box();
            if (this._itemRepository.boxes <= 0) {
                console.info('[INFO] Insufficient boxes')
                this._isInBuyingMode = false;
                return;
            }
        }
        if (event.target.id === "fork-shop-el") {
            this._thing = new Fork();
            if (this._itemRepository.forks <= 0) {
                console.info('[INFO] Insufficient forks')
                this._isInBuyingMode = false;
                return;
            }
        }

        this._addCellEventListeners();
    }

    _finalize(cell) {
        console.log('[INFO] Selected cell: [', cell.parentNode.rowIndex, ',', cell.cellIndex, ']');
        cell.style.backgroundColor = '';
        this._isInBuyingMode = false;
        this._removeCellEventListeners();
        this._addShopEventListeners();

        if (this._thing instanceof Plant) {
            this._itemRepository.removeCompost(this._thing.price);
            this._objectRepository.addPlant(this._thing);
        }
        if (this._thing instanceof Box) {
            this._itemRepository.removeBoxes(1);
            this._thing.cell = cell;
            this._thing.createImg();
            this._objectRepository.addBox(this._thing);
        }
        if (this._thing instanceof Fork) {
            this._itemRepository.removeForks(1);
            this._objectRepository.addFork(this._thing);
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
            cells[i].removeEventListener('click', this._handleClick);
        }
    }

    _highlightCell(event) {
        if (event.target.className === 'mouse-trap-td-element') return;
        if (event.target.className === 'enemy-td-element') return;
        if (event.target.childNodes.length !== 0 && !(this._thing instanceof Fork)) return;
        event.target.style.backgroundColor = 'yellow';
    }

    _clearCellHighlight(event) {
        if (event.target.className === 'mouse-trap-td-element') return;
        if (event.target.className === 'enemy-td-element') return;
        if (event.target.childNodes.length !== 0 && !(this._thing instanceof Fork)) return;
        event.target.style.backgroundColor = '';
    }

    _handleClick(event) {
        if (event.target.className === 'mouse-trap-td-element') return;
        if (event.target.className === 'enemy-td-element') return;
        if (event.target.childNodes.length !== 0 && !(this._thing instanceof Fork)) return;
        this._finalize(event.target);
    }
}
