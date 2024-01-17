import {Definitions as def} from "./Definitions.mjs";

export class Bullet {
    constructor(type, posX, posY, objectRepository) {
        this._objectRepository = objectRepository;
        this._type = type;
        this._img = null;
        this._createImg(posX, posY);
    }

    _createImg(posX, posY) {
        this._img = document.createElement("img");
        this._img.style.position = 'absolute';
        this._img.style.width = 1.5 + 'vw';
        this._img.src = def.bullet.type[this._type].IMG_SRC;
        this._img.style.pointerEvents = 'none';
        this._img.className = 'bullet-0-img';
        this._img.style.left = posX + 'vw';
        this._img.style.top = posY + 'vh';
        this._img.style.margin = '0';

        def.convertPixelsToViewPort(this._img);

        this._img.style.left = parseFloat(this._img.style.left) + 3 + 'vw';
        this._img.style.top = parseFloat(this._img.style.top) + 1 + 'vh';

        document.body.appendChild(this._img);
    }

    update() {
        let collisionObj = this._checkCollision();
        if (collisionObj) {
            collisionObj.removeHp(def.bullet.type[this._type].DAMAGE);

            // If poison bullet poison enemy
            if (this._type === 1) {
                collisionObj.poisonTicks = def.bullet.type[this._type].POISON_TIME;
            }

            // If frozen bullet freeze enemy
            if (this._type === 2) {
                collisionObj.frozenTicks = def.bullet.type[this._type].FREEZE_TIME;
            }

            // Play sound
            let audio = new Audio(def.bullet.type[this._type].HIT_SOUND_SRC);
            audio.play();
            setTimeout(() => {
                audio.remove();
                audio.srcObject = null;
            }, 2000);

            // Remove img & self from objRepo
            this._objectRepository.removeBullet(this);
            document.body.removeChild(this._img);
        }
        this._move();
    }

    _move() {
        let posX = parseFloat(this._img.style.left);
        this._img.style.left = (posX + def.bullet.type[this._type].SPEED / 100) + 'vw';
        if (posX > 100) {
            this._objectRepository.removeBullet(this);
            document.body.removeChild(this._img);
        }
    }

    _checkCollision() {
        for (let i = 0; i < this._objectRepository.enemies.length; i++) {
            if (def.checkCollision(this._img, this._objectRepository.enemies[i].img, 1)) {
                return this._objectRepository.enemies[i];
            }
        }
        return null;
    }
}