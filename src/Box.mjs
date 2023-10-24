import {Definitions as def} from "./Definitions.mjs";

export {Box}

class Box {
    constructor(cell) {
        this._hp = 300;
        this._cell = null;
    }

    set cell(cell) {
        this._cell = cell;
    }

    createImg() {
        let img = document.createElement("img");
        img.src = def.box.IMG_SRC;
        img.style.pointerEvents = 'none';
        img.className = 'board-box-img';

        this._cell.appendChild(img);
    }
}