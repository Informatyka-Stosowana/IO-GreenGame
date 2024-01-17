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
        this._width = 5;
    }

    update() {
        // Wave info
        // document.getElementById('wave-info-el').innerText = 'Next wave in ' + this._waveDiv / 100 + ' s';

        let bar = document.getElementById('progress-bar-el');
        if (this._width >= 100) {
            if (this._waveDiv > 0) {
                bar.style.width = '5%';
                this._width = 5;
            }
        } else {
            this._width += (95 / 9000);
            bar.style.width = this._width + '%';
        }

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

            // Spawn delay
            if (this._waveEnemySpawnDiv > 0) {
                this._waveEnemySpawnDiv--;
            } else {
                // Spawn weak enemies
                if (this._weakEnemyCount > 0) {
                    this._weakEnemyCount--;
                    this._spawnRandomWeakEnemy();
                }
                // Spawn strong enemies
                if (this._strongEnemyCount > 0) {
                    this._strongEnemyCount--;
                    this._spawnRandomStrongEnemy();
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
            this._spawnRandomWeakEnemy();
            this._weakEnemyDiv = def.enemyManager.AMBIENT_DIV - this._weakEnemyDivIncDiv;
        }
    }

    _spawnRandomWeakEnemy() {
        let newEnemy = new Enemy(Math.floor(Math.random() * 2), this._objectRepositroy, Math.floor(Math.random() * 5));
        this._objectRepositroy.addEnemy(newEnemy);
    }

    _spawnRandomStrongEnemy() {
        let newEnemy = new Enemy(Math.floor(Math.random() * 2) + 2, this._objectRepositroy, Math.floor(Math.random() * 5));
        // Random super strong enemy
        if (Math.floor(Math.random() * 20) < def.game.DIFFICULTY) {
            newEnemy.hp = newEnemy.hp * 2;
            newEnemy.speedModifier = 3;
        }
        this._objectRepositroy.addEnemy(newEnemy);
    }
}