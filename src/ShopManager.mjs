import {Definitions as def} from "./Definitions.mjs";
import {Box} from "./Box.mjs";
import {Dynamite} from "./Dynamite.mjs";
import {Fork} from "./Fork.mjs";
import {Plant} from "./Plant.mjs";

export class ShopManager {
    constructor(itemRepository, objectRepository) {
        this._itemRepository = itemRepository;
        this._objectRepository = objectRepository;

        this._thing = null;

        this._handleCellClick = this._handleCellClick.bind(this);
        this._handleShopClick = this._handleShopClick.bind(this);
        this._handleCursorImg = this._handleCursorImg.bind(this);
        this._clearCursorImg = this._clearCursorImg.bind(this);

        this._addShopEventListeners();
        this._isInBuyingMode = false;
    }

    _handleShopClick(event) {
        let imgSrc = null;
        let image = document.createElement("img");

        if (this._isInBuyingMode) {
            console.info('[INFO] Buying cancelled')
            this._isInBuyingMode = false;
            this._removeCellEventListeners();
            this._clearCursorImg();
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
            this._thing = new Box(this._objectRepository);
            if (this._itemRepository.boxes <= 0) {
                console.info('[INFO] Insufficient boxes')
                this._isInBuyingMode = false;
                return;
            }
            image.style.width = '3vw';
            image.src = def.box.IMG_SRC;
        }
        if (event.target.id === "fork-shop-el") {
            this._thing = new Fork(this._objectRepository);
            if (this._itemRepository.forks <= 0) {
                console.info('[INFO] Insufficient forks')
                this._isInBuyingMode = false;
                return;
            }
            image.style.width = '5vw';
            image.src = def.fork.IMG_SRC;
        }
        if (event.target.id === "dynamite-shop-el") {
            this._thing = new Dynamite(this._objectRepository);
            if (this._itemRepository.dynamite <= 0) {
                console.info('[INFO] Insufficient dynamite')
                this._isInBuyingMode = false;
                return;
            }
            image.style.width = '3vw';
            image.src = def.dynamite.IMG_SRC;
        }

        image.id = 'cursor-image-el';
        image.style.height = 'auto';
        image.style.position = 'absolute';
        image.style.pointerEvents = 'none';
        image.style.left = event.clientX + "px";
        image.style.top = event.clientY + "px";
        image.style.transform = 'translate(-50%, -50%)';
        document.body.appendChild(image);

        document.addEventListener("mousemove", this._handleCursorImg);
        this._addCellEventListeners();
    }

    // TODO maybe move to a different class
    _clearCursorImg() {
        let image = document.getElementById('cursor-image-el');
        if (image) {
            image.parentNode.removeChild(image);
            document.removeEventListener("mousemove", this._handleCursorImg);
        }
    }

    // TODO maybe move to a different class
    _handleCursorImg(event) {
        let image = document.getElementById('cursor-image-el');
        image.style.left = event.clientX + "px";
        image.style.top = event.clientY + "px";
    }

    _addShopEventListeners() {
        let shopCells = document.getElementsByClassName('shop-el');

        for (let i = 0; i < shopCells.length; i++) {
            shopCells[i].addEventListener('click', this._handleShopClick);
        }
    }

    _removeShopEventListeners() {
        let shopCells = document.getElementsByClassName('shop-el');

        for (let i = 0; i < shopCells.length; i++) {
            shopCells[i].removeEventListener('click', this._handleShopClick);
        }
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
            let image = document.getElementById('cursor-image-el');
            image.removeAttribute('id');
            document.removeEventListener("mousemove", this._handleCursorImg);
            this._thing.img = image;

            this._itemRepository.removeForks(1);
            this._objectRepository.addFork(this._thing);
        }
        if (this._thing instanceof Dynamite) {
            let image = document.getElementById('cursor-image-el');
            image.removeAttribute('id');
            document.removeEventListener("mousemove", this._handleCursorImg);
            this._thing.img = image;

            this._itemRepository.removeDynamite(1);
            this._thing.targetCell = cell;
            this._objectRepository.addDynamite(this._thing);
        }

        this._clearCursorImg();
    }

    _addCellEventListeners() {
        let table = document.getElementById('game-board-table-el');
        let cells = table.getElementsByTagName('td');

        for (let i = 0; i < cells.length; i++) {
            cells[i].addEventListener('click', this._handleCellClick);
        }
    }

    _removeCellEventListeners() {
        let table = document.getElementById('game-board-table-el');
        let cells = table.getElementsByTagName('td');

        for (let i = 0; i < cells.length; i++) {
            cells[i].removeEventListener('click', this._handleCellClick);
        }
    }

    _checkCellClick(event) {
        if (event.target.className === 'mouse-trap-td-element') return false;
        if (event.target.className === 'enemy-td-element') return false;
        // Block ability to place stuff on top of different stuff, except for Fork and Dynamite
        if (event.target.childNodes.length !== 0 &&
            !((this._thing instanceof Fork) || (this._thing instanceof Dynamite))) return false;
        return true;
    }

    _handleCellClick(event) {
        if (this._checkCellClick(event)) this._finalize(event.target);
    }
}
