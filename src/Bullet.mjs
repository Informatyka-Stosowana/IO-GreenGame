import {Definitions as def} from "./Definitions.mjs";

export class Bullet {
    constructor(type, posX, posY, objectRepository) {
        this._type = type;
        this._objectRepository = objectRepository;
        this._img = null;
        this._createImg(posX, posY);
    }

    _createImg(posX, posY) {
        this._img = document.createElement("img");
        this._img.style.position = 'absolute';
        this._img.style.scale = '0.2';
        this._img.src = def.bullet.type[this._type].IMG_SRC;
        this._img.style.pointerEvents = 'none';
        this._img.className = 'bullet-0-img';
        this._img.style.left = posX + 'vw';
        this._img.style.top = posY + 'vh';
        this._img.style.margin = '0';

        def.convertPixelsToViewPort(this._img);

        this._img.style.left = parseFloat(this._img.style.left) + 3 + 'vw';
        this._img.style.top = parseFloat(this._img.style.top) - 2.2 + 'vh';

        document.body.appendChild(this._img);
    }

    update() {
        let collisionObj = this._checkCollision();
        if (collisionObj) {
            collisionObj.removeHp(def.bullet[this._type].DAMAGE);
            // If frozen bullet freeze enemy
            if (this._type === 1) null; // TODO freeze enemy
        }
        this._move();
    }

    _move() {
        let posX = parseFloat(this._img.style.left);
        console.log(posX);
        this._img.style.left = (posX + def.bullet.type[this._type].SPEED / 100) + 'vw';
        if (posX > 100) {
            this._objectRepository.removeBullet(this);
            document.body.removeChild(this._img);
        }
    }

    _checkCollision() {
        let array = this._objectRepository.enemies;
        for (let i = 0; i < array.length; i++) {
            if (def.checkCollision(this._img, array[i].img, 1)) return array[i];
        }
        return null;
    }
}