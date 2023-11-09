import {Definitions as def} from "./Definitions.mjs";

export {Enemy}

class Enemy {
    constructor(type, objectRepository, row) {
        this._objectRepository = objectRepository;
        this._cell = document.getElementById('enemy-td-element-' + row);

        this.createImg();
    }

    // TODO figure out a way to define difficulty with multiplier/multipliers

    update() {
        let collisionObj = this._objectRepository.checkCollision(this._img);
        if (collisionObj) collisionObj.removeHp(def.enemy_1.DAMAGE);
        else this._move();
    }

    _move() {
        this._img.style.left = (parseFloat(this._img.style.left) - def.enemy_1.SPEED / 100) + 'vw';
    }

    createImg() {
        this._img = document.createElement("img");
        this._img.src = def.enemy_1.IMG_SRC;
        this._img.style.pointerEvents = 'none';
        this._img.className = 'enemy-1-img';
        this._img.style.left = 8 + 'vw';
        this._img.style.top = 1 + 'vw';
        this._img.style.margin = '0';

        this._cell.appendChild(this._img);
    }
}