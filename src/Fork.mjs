import {Definitions as def} from "./Definitions.mjs";

export class Fork {
    // TODO add enemy list, add enemy hit sound

    constructor(objectRepository) {
        this._img = null;
        this._objectRepository = objectRepository;
        this._hitEnemies = [];
    }

    get img() {
        return this._img;
    }

    set img(value) {
        this._img = value;
        def.convertPixelsToViewPort(this._img);
    }

    update() {
        this._damageEnemies();
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

    _damageEnemies() {
        // Iterate all enemies
        for (let i = 0; i < this._objectRepository.enemies.length; i++) {

            // Check if enemy collides with fork
            if (def.checkCollision(this._img, this._objectRepository.enemies[i].img, 1)) {

                // Check if first enemy hit by fork
                if (this._hitEnemies.length === 0) {
                    this._hitEnemies.push(this._objectRepository.enemies[i])
                    this._objectRepository.enemies[i].removeHp(def.fork.DAMAGE);
                    let audio = new Audio(def.fork.damage_sound[Math.floor(Math.random() * 6)].SOUND_SRC);
                    audio.play();
                    setTimeout(() => {
                        audio.remove();
                        audio.srcObject = null;
                    }, 2000);
                } else {

                    // Check if enemy has been hit before
                    let enemyNeverHit = true;
                    for (let j = 0; j < this._hitEnemies.length; j++) {
                        if (this._objectRepository.enemies[i] === this._hitEnemies[j]) {
                            enemyNeverHit = false;
                            break;
                        }
                    }
                    if (enemyNeverHit) {
                        this._hitEnemies.push(this._objectRepository.enemies[i])
                        this._objectRepository.enemies[i].removeHp(def.fork.DAMAGE);
                        let audio = new Audio(def.fork.damage_sound[Math.floor(Math.random() * 6)].SOUND_SRC);
                        audio.play();
                        setTimeout(() => {
                            audio.remove();
                            audio.srcObject = null;
                        }, 2000);
                    }
                }
            }
        }
    }
}