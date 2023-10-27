import {Definitions as def} from "./Definitions.mjs";

export {Box}

class Box {
    constructor(objectRepository) {
        this._UUID = crypto.randomUUID();
        this._hp = 300;
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
        this._cell.setAttribute('objUUID', this._UUID);
    }

    get UUID() {
        return this._UUID;
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
            this._cell.removeAttribute('objUUID');
            return;
        }
        this._hp -= value;
    }
}