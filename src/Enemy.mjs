import {Definitions as def} from "./Definitions.mjs";

export class Enemy {
    constructor(type, objectRepository, row) {
        this._type = type;
        this._objectRepository = objectRepository;
        this._hp = def.enemy.type[this._type].HP;
        this._frozenTicks = 0;
        this._poisonTicks = 0;
        this._speedModifier = 1;

        this._cell = document.getElementById('enemy-td-element-' + row);
        this._createImg();
    }

    get hp() {
        return this._hp;
    }

    set hp(value) {
        this._hp = value;
    }

    set speedModifier(value) {
        this._speedModifier = value;
    }

    set frozenTicks(value) {
        this._frozenTicks = value;
    }

    set poisonTicks(value) {
        this._poisonTicks = value;
    }

    get img() {
        return this._img;
    }

    // TODO figure out a way to define difficulty with multiplier/multipliers

    update() {

        if (this._frozenTicks > 0 && this._poisonTicks > 0) {
            this._poisonTicks--;
            this._frozenTicks--;
            this.img.className = def.enemy.type[this._type].CLASS_NAME + ' blue-purple-img';
        } else if (this._frozenTicks > 0) {
            this._frozenTicks--;
            this.img.className = def.enemy.type[this._type].CLASS_NAME + ' blue-img';
        } else if (this._poisonTicks > 0) {
            this._poisonTicks--;
            this.removeHp(def.bullet.type[1].POISON_DMG);
            this.img.className = def.enemy.type[this._type].CLASS_NAME + ' purple-img';
        } else {
            this.img.className = def.enemy.type[this._type].CLASS_NAME;
        }

        let collisionObj = this._checkCollision();
        if (collisionObj) {
            collisionObj.removeHp(def.enemy.type[this._type].DAMAGE);
        } else this._move();
    }

    _checkCollision() {
        // Check collision with boxes
        let array = this._objectRepository.boxes;
        for (let i = 0; i < array.length; i++) {
            if (def.checkCollision(this._img, array[i].img, 1)) return array[i];
        }
        // Check collision with plants
        array = this._objectRepository.plants;
        for (let i = 0; i < array.length; i++) {
            if (def.checkCollision(this._img, array[i].img, 1)) return array[i];
        }
        return null;
    }

    _move() {
        let posX = parseFloat(this._img.style.left);
        let move = (def.enemy.type[this._type].SPEED * this._speedModifier) / 100;
        if (this._frozenTicks > 0) move /= 3;

        this._img.style.left = (posX - move) + 'vw';
        if (posX < -68) {
            def.game.ALIVE = false;
        }
    }

    _createImg() {
        this._img = document.createElement("img");
        this._img.src = def.enemy.type[this._type].IMG_SRC;
        this._img.style.pointerEvents = 'none';
        this._img.className = def.enemy.type[this._type].CLASS_NAME;
        this._img.style.left = 15 + 'vw';
        this._img.style.top = 1 + 'vw';
        this._img.style.margin = '0';

        this._cell.appendChild(this._img);
    }

    removeHp(value) {
        if (this._hp - value <= 0) {
            def.game.SCORE += def.enemy.type[this._type].SCORE_INC;
            this._objectRepository.removeEnemy(this);
            this._cell.removeChild(this._img);
            return;
        }
        this._hp -= value;
    }
}