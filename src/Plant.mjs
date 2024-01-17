import {Definitions as def} from "./Definitions.mjs";
import {Bullet} from "./Bullet.mjs";

export class Plant {
    constructor(type, objectRepository) {
        this._type = type;
        this._cell = null;
        this._img = null;
        this._objectRepository = objectRepository;
        this._hp = def.plant.type[this._type].HP;
        this._attackDiv = 0;
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

    get type() {
        return this._type;
    }

    createImage() {
        this._img = document.createElement('img');
        this._img.src = def.plant.type[this._type].IMG_SRC;
        this._img.style.pointerEvents = 'none';
        this._img.className = 'board-plant-img';

        this._cell.appendChild(this._img);
    }

    removeHp(value) {
        if (this._hp - value <= 0) {
            this._objectRepository.removePlant(this);
            this._cell.removeChild(this._img);
            return;
        }
        this._hp -= value;
    }

    update() {
        if (this._attackDiv < def.plant.type[this._type].ATTACK_SPEED_DIV) {
            // Attack cool down
            this._attackDiv++;
        } else {
            if (this._cell.parentElement.getElementsByClassName('enemy-td-element')[0].children.length !== 0) {
                this._attack();
                this._attackDiv = 0;
            }
        }
    }

    _attack() {
        // Enemies can appear on top of each other so only the first one should be damaged
        let position = def.getPos(this._img, 1);
        let bullet = new Bullet(this._type, position.left,
            position.top, this._objectRepository)
        this._objectRepository.addBullet(bullet);
    }
}