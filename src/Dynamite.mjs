import {Definitions as def} from "./Definitions.mjs";

export {Dynamite}

class Dynamite {
    constructor(objectRepository) {
        this._UUID = crypto.randomUUID();
        this._objectRepository = objectRepository;
        this._targetCell = null;
        this._delay = def.dynamite.EXPLOSION_DELAY;
    }

    set targetCell(cell) {
        this._targetCell = cell;
    }

    getUUID() {
        return this._UUID;
    }

    update() {
        if (this._delay > 0) {
            this._delay--;
            return;
        }
        // TODO add some animations
        this.destroy();
    }

    destroy() {
        let object = this._objectRepository.findCellObject(this._targetCell);
        if (object) object.removeHp(10_000);
        // TODO find and damage enemies
        console.log('Dynamite in Dynamite: ', this);
        this._objectRepository.removeDynamite(this);
    }
}