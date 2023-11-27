import {Definitions as def} from "./Definitions.mjs";

export class Bullet {
    constructor(type, plantCell, posX, posY, objectRepository) {
        this._type = type;
        this._objectRepository = objectRepository;
        this._img = null;
        this._createImg(plantCell, posX, posY);
    }

    _createImg(plantCell, posX, posY) {
        this._img = document.createElement("img");
        this._img.src = def.bullet[this._type].IMG_SRC;
        this._img.style.pointerEvents = 'none';
        this._img.className = 'bullet-0-img';
        this._img.style.left = posX + 'vw';
        this._img.style.top = posY + 'vh';
        this._img.style.margin = '0';

        plantCell.appendChild(this._img);
    }

    update() {
        let collisionObj = this._checkCollision();
        if (collisionObj) {
            collisionObj.removeHp(def.bullet[this._type].DAMAGE);
            // If frozen bullet freeze enemy
            if (this._type === 1) null; // TODO freeze enemy
        } else this._move();
    }

    _move() {
        this._img.style.left = (parseFloat(this._img.style.left) + def.bullet[this._type].SPEED / 100) + 'vw';
    }

    _checkCollision() {
        let array = this._objectRepository.enemies;
        for (let i = 0; i < array.length; i++) {
            if (def.checkCollision(this._img, array[i].img, 1)) return array[i];
        }
        return null;
    }
}