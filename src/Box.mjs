import {Definitions as def} from "./Definitions.mjs";

export class Box {
    constructor(objectRepository) {
        this._hp = def.box.HP;
        this._objectRepository = objectRepository;
        this._cell = null;
        this._img = null;
    }

    get img() {
        return this._img;
    }

    get cell() {
        return this._cell;
    }

    set cell(cell) {
        this._cell = cell;
    }

    createImg() {
        this._img = document.createElement("img");
        this._img.src = def.box.IMG_SRC;
        this._img.style.pointerEvents = 'none';
        this._img.className = 'board-box-img';

        this._cell.appendChild(this._img);
    }

    removeHp(value) {
        if (this._hp - value <= 0) {
            this._objectRepository.removeBox(this);
            this._cell.removeChild(this._img);
            return;
        }
        this._hp -= value;
    }
}