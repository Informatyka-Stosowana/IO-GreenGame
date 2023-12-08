import {Definitions as def} from "./Definitions.mjs";

export class Dynamite {
    constructor(objectRepository) {
        this._objectRepository = objectRepository;
        this._targetCell = null;
        this._delay = def.dynamite.EXPLOSION_DELAY;
        this._img = null;
        this._animationFrame = 0;
        this._animationDelay = def.dynamite.EXPLOSION_ANIMATION[0].ANIMATION_DELAY;
        this._animationImg = null;
    }

    set img(value) {
        this._img = value;
    }

    set targetCell(cell) {
        this._targetCell = cell;
    }

    update() {
        if (this._delay > 0) {
            this._delay--;
            return;
        }
        this._explosionAnimation();
    }

    _destroy() {
        let object = this._objectRepository.findCellObject(this._targetCell);
        if (object) object.removeHp(10_000);

        this._img.parentNode.removeChild(this._img);
        this._objectRepository.removeDynamite(this);
    }

    _damageEnemies() {
        let enemiesToDamage = [];
        for (let i = 0; i < this._objectRepository.enemies.length; i++) {
            if (def.checkCollision(this._img, this._objectRepository.enemies[i].img, def.dynamite.EXPLOSION_RADIUS)) {
                enemiesToDamage.push(this._objectRepository.enemies[i]);
            }
        }
        for (let i = 0; i < enemiesToDamage.length; i++) {
            enemiesToDamage[i].removeHp(def.dynamite.EXPLOSION_DAMAGE);
        }
    }

    _explosionAnimation() {

        if (this._animationDelay > 0) {
            this._animationDelay--;
            return;
        }
        if (this._animationFrame !== 0) {
            document.body.removeChild(document.getElementById('explosion-img-el'));
        }
        if (this._animationFrame === 3) {
            this._damageEnemies();
        }
        if (this._animationFrame === def.dynamite.EXPLOSION_ANIMATION.length) {
            this._destroy();
            return;
        }

        this._animationImg = document.createElement('img');
        this._animationImg.src = def.dynamite.EXPLOSION_ANIMATION[this._animationFrame].IMG_SRC;
        this._animationImg.id = 'explosion-img-el';
        this._animationImg.style.position = 'absolute';
        this._animationImg.style.transform = 'translate(-50%, -50%)';
        this._animationImg.style.width = 7 + 'vw';
        this._animationImg.style.left = this._img.style.left;
        this._animationImg.style.top = this._img.style.top;
        document.body.appendChild(this._animationImg);

        this._animationDelay = def.dynamite.EXPLOSION_ANIMATION[this._animationFrame].ANIMATION_DELAY;
        this._animationFrame++;
    }

}