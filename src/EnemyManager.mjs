import {Enemy} from "./Enemy.mjs";
import {Definitions as def} from "./Definitions.mjs";


// TODO figure out wave control or some way of spawning enemies (difficulty increase with time)
export class EnemyManager {
    constructor(objectRepository) {
        this._objectRepositroy = objectRepository;

        this._weakEnemyDivIncDiv = 0;
        this._weakEnemyDiv = def.enemyManager.AMBIENT_DIV;

        this._weakEnemyCount = def.enemyManager.WEAK_ENEMY_COUNT;
        this._strongEnemyCount = def.enemyManager.STRONG_ENEMY_COUNT;

        this._roundNo = 0;
        this._waveEnemySpawnDiv = def.enemyManager.WAVE_ENEMY_SPAWN_DIV;
        this._waveDiv = def.enemyManager.WAVE_DIV;
    }

    update() {
        // Wave info
        if (this._waveDiv % 100 === 0) {
            document.getElementById('wave-info-el').innerText = 'Next wave in ' + this._waveDiv / 100 + ' s';
        }

        // TODO finish waves, more time between, better scaling
        // Wave spawn
        if (this._waveDiv > 0) {
            this._waveDiv--;
        } else {
            // Things that happen once per wave
            if (this._waveDiv === 0) {
                this._roundNo++;

                // Decrease time between weak enemy spawn
                if (this._weakEnemyDivIncDiv < 950) {
                    this._weakEnemyDivIncDiv += 50;
                }
                this._waveDiv--;
            }

            // TODO stronk snail after round 3
            // TODO very stronk snail after round 6
            // Spawn delay
            if (this._waveEnemySpawnDiv > 0) {
                this._waveEnemySpawnDiv--;
            } else {
                // Spawn weak enemies
                if (this._weakEnemyCount > 0) {
                    this._weakEnemyCount--;
                    this.spawnRandomWeakEnemy();
                }
                // Spawn strong enemies
                if (this._strongEnemyCount > 0) {
                    this._strongEnemyCount--;
                    this.spawnRandomStrongEnemy();
                }

                this._waveEnemySpawnDiv = def.enemyManager.WAVE_ENEMY_SPAWN_DIV;
            }

            // End of the wave
            if (this._weakEnemyCount === 0 && this._strongEnemyCount === 0) {
                this._weakEnemyCount = def.enemyManager.WEAK_ENEMY_COUNT + this._roundNo * 2;
                this._strongEnemyCount = def.enemyManager.STRONG_ENEMY_COUNT + this._roundNo;
                this._waveDiv = def.enemyManager.WAVE_DIV;
            }
        }

        // Ambient enemy spawn
        if (this._weakEnemyDiv > 0) {
            this._weakEnemyDiv--;

        } else {
            this.spawnRandomWeakEnemy();
            this._weakEnemyDiv = def.enemyManager.AMBIENT_DIV - this._weakEnemyDivIncDiv;
        }
    }

    spawnRandomWeakEnemy() {
        let newEnemy = new Enemy(Math.floor(Math.random() * 2), this._objectRepositroy, Math.floor(Math.random() * 5));
        this._objectRepositroy.addEnemy(newEnemy);
    }

    spawnRandomStrongEnemy() {
        let newEnemy = new Enemy(Math.floor(Math.random() * 2) + 2, this._objectRepositroy, Math.floor(Math.random() * 5));
        this._objectRepositroy.addEnemy(newEnemy);
    }
}