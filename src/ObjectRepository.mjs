
export {ObjectRepository}
class ObjectRepository {
    constructor() {
        this._trash = [];
        this._enemies = [];
        this._plants = [];
        this._boxes = [];
        this._forks = [];
    }

    addTrash(trash) {
        this._trash.push(trash);
        console.info('[INFO] Trash added: ', trash);
    }

    removeTrash(trash) {
        for (let i = 0; i < this._trash.length; i++) {
            if (this._trash[i] === trash)
            {
                this._trash.splice(i, 1);
                console.info('[INFO] Trash removed: ', trash);
                return;
            }
        }
    }

    addEnemy(enemy) {
        this._enemies.push(enemy);
        console.info('[INFO] Enemy added: ', enemy);

    }

    removeEnemy(enemy) {
        for (let i = 0; i < this._enemies.length; i++) {
            if (this._enemies[i] === enemy)
            {
                this._enemies.splice(i, 1);
                console.info('[INFO] Enemy removed: ', enemy);
                return;
            }
        }
    }

    addPlant(plant) {
        this._plants.push(plant);
        console.info('[INFO] Plant added: ', plant);
    }

    removePlant(plant) {
        for (let i = 0; i < this._plants.length; i++) {
            if (this._plants[i] === plant)
            {
                this._plants.splice(i, 1);
                console.info('[INFO] Plant removed: ', plant);
                return;
            }
        }
    }

    addBox(box) {
        this._boxes.push(box);
        console.info('[INFO] Box added: ', box);
    }

    removeBox(box) {
        for (let i = 0; i < this._boxes.length; i++) {
            if (this._boxes[i] === box)
            {
                this._boxes.splice(i, 1);
                console.info('[INFO] Box removed: ', box);
                return;
            }
        }
    }

    addFork(fork) {
        this._forks.push(fork);
        console.info('[INFO] Fork added: ', fork);
    }

    removeFork(fork) {
        for (let i = 0; i < this._forks.length; i++) {
            if (this._forks[i] === fork)
            {
                this._forks.splice(i, 1);
                console.info('[INFO] Fork removed: ', fork);
                return;
            }
        }
    }

}