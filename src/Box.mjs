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
        // let img = document.createTextNode('BOX');
        img.src = './resources/box.png';
        img.className = 'box-img';
        this._cell.appendChild(img);
    }
}