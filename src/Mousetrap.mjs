import {Definitions as def} from "./Definitions.mjs";

export class Mousetrap {
    constructor(objectRepository) {
        this._objectRepository = objectRepository;
        this._cell = null;
        this._img = null;
    }

    get img() {
        return this._img;
    }

    get cell() {
        return this._cell;
    }

    set cell(cell) {
        this._cell = cell;
    }

    update() {
        if (this.damageEnemy()) {
            let audio = new Audio(def.mousetrap.SOUND_SRC);
            audio.play();
            setTimeout(() => {
                audio.remove();
                audio.srcObject = null;
            }, 2000);
            this.removeHp(1);
        }
    }

    damageEnemy() {
        for (let i = 0; i < this._objectRepository.enemies.length; i++) {
            if (def.checkCollision(this._img, this._objectRepository.enemies[i].img, 1)) {
                this._objectRepository.enemies[i].removeHp(def.mousetrap.DAMAGE);
                return true;
            }
        }
    }

    removeHp(value) {
        this._objectRepository.removeMousetrap(this);
        this._cell.removeChild(this._img);
    }

    createImg() {
        this._img = document.createElement("img");
        this._img.src = def.mousetrap.IMG_SRC;
        this._img.style.pointerEvents = 'none';
        this._img.className = 'board-mousetrap-img';

        this._cell.appendChild(this._img);
    }

}