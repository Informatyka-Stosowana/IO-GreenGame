import {Definitions as def} from "./Definitions.mjs";

export {Dynamite}

class Dynamite {
    constructor(objectRepository) {
        this._UUID = crypto.randomUUID();
        this._objectRepository = objectRepository;
        this._targetCell = null;
        this._delay = def.dynamite.EXPLOSION_DELAY;
        this._img = null;
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
        // TODO add some animations
        this._destroy();
    }

    _destroy() {
        let object = this._objectRepository.findCellObject(this._targetCell);
        if (object) object.removeHp(10_000);
        this._damageEnemies();

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

}