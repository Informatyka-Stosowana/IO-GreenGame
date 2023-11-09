import {Enemy} from "./Enemy.mjs";


// TODO figure out wave control or some way of spawning enemies (difficulty increase with time)
export class EnemyManager {
    constructor(objectRepository) {
        this._objectRepositroy = objectRepository;

        this._enemyExist = false;
    }

    update() {
        if (this._enemyExist) return;
        this._enemyExist = true;
        let newEnemy = new Enemy(1, this._objectRepositroy, Math.floor(Math.random() * 5));
        this._objectRepositroy.addEnemy(newEnemy);
    }

    spawnEnemies() {

    }
}