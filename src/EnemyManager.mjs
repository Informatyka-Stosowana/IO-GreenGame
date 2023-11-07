import {Enemy} from "./Enemy.mjs";

export class EnemyManager {
    constructor(objectRepository) {
        this._objectRepositroy = objectRepository;

        this._enemyExist = false;
    }

    update() {
        if (!this._enemyExist) return;
        this._enemyExist = true;
        let newEnemy = new Enemy(1);
        this._objectRepositroy.addEnemy(newEnemy);
    }

    spawnEnemies() {

    }
}