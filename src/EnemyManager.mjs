import {Enemy} from "./Enemy.mjs";
import {Definitions as def} from "./Definitions.mjs";


// TODO figure out wave control or some way of spawning enemies (difficulty increase with time)
export class EnemyManager {
    constructor(objectRepository) {
        this._objectRepositroy = objectRepository;

        this._weakEnemyDiv = def.enemyManager.AMBIENT_DIV;
    }

    update() {
        if (this._weakEnemyDiv > 0) {
            this._weakEnemyDiv--;

        } else {
            this.spawnEnemy();
            this._weakEnemyDiv = def.enemyManager.AMBIENT_DIV;
        }
    }

    spawnEnemy() {
        let newEnemy = new Enemy(1, this._objectRepositroy, Math.floor(Math.random() * 5));
        this._objectRepositroy.addEnemy(newEnemy);
    }
}