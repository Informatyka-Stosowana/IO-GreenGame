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
        img.src = './resources/box.png';
        img.className = 'box-img';
        img.style.pointerEvents = 'none';
        this._cell.appendChild(img);
    }
}