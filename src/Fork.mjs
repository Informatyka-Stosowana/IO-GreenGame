import {Definitions as def} from "./Definitions.mjs";

export class Fork {
    damage

    constructor(objectRepository) {
        this._img = null;
        this._objectRepository = objectRepository;
    }

    get img() {
        return this._img;
    }

    set img(value) {
        this._img = value;
        def.convertPixelsToVw(this._img);
    }

    update() {
        let collidingEnemies = this._checkCollision();
        if (collidingEnemies.length !== 0) {
            for (let i = 0; i < collidingEnemies.length; i++) {
                collidingEnemies[i].removeHp(def.fork.DAMAGE);
            }
        }
        this._move();
    }

    _move() {
        let posX = parseFloat(this._img.style.left);
        this._img.style.left = (posX + def.fork.SPEED / 100) + 'vw';
        if (posX > 100) {
            this._objectRepository.removeFork(this);
            document.body.removeChild(this._img);
        }
    }

    _checkCollision() {
        let array = this._objectRepository.enemies;
        let collidingEnemies = [];
        for (let i = 0; i < array.length; i++) {
            if (def.checkCollision(this._img, array[i].img, 1)) collidingEnemies.push(array[i]);
        }
        return collidingEnemies;
    }
}