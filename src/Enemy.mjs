import {Definitions as def} from "./Definitions.mjs";

export {Enemy}

class Enemy {
    constructor(type, objectRepository, row) {
        this._type = type;
        this._objectRepository = objectRepository;
        this._hp = def.enemy.type[this._type].HP;

        this._cell = document.getElementById('enemy-td-element-' + row);
        this._createImg();
    }

    get img() {
        return this._img;
    }

    // TODO figure out a way to define difficulty with multiplier/multipliers

    update() {
        let collisionObj = this._checkCollision();
        if (collisionObj) collisionObj.removeHp(def.enemy.type[this._type].DAMAGE);
        else this._move();
    }

    _checkCollision() {
        let array = this._objectRepository.boxes;
        for (let i = 0; i < array.length; i++) {
            if (def.checkCollision(this._img, array[i].img, 1)) return array[i];
        }
        // TODO uncomment when plants done
        // array = this._objectRepository.plants;
        // for (let i = 0; i < array.length; i++) {
        //     if (def.checkCollision(this._img, array[i].img)) return array[i];
        // }
        return null;
    }

    _move() {
        this._img.style.left = (parseFloat(this._img.style.left) - def.enemy.type[this._type].SPEED / 100) + 'vw';
        if (parseFloat(this._img.style.left) < -68) {
            // TODO activate mouse trap or end game
            this.removeHp(10_000) // temporary
        }
    }

    _createImg() {
        this._img = document.createElement("img");
        this._img.src = def.enemy.type[this._type].IMG_SRC;
        this._img.style.pointerEvents = 'none';
        this._img.className = 'enemy-0-img';
        this._img.style.left = 15 + 'vw';
        this._img.style.top = 1 + 'vw';
        this._img.style.margin = '0';

        this._cell.appendChild(this._img);
    }

    removeHp(value) {
        if (this._hp - value <= 0) {
            // TODO increase score
            this._objectRepository.removeEnemy(this);
            this._cell.removeChild(this._img);
            return;
        }
        this._hp -= value;
    }
}