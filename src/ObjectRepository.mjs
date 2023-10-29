export {ObjectRepository}

class ObjectRepository {
    constructor() {
        this._trash = [];
        this._enemies = [];
        this._plants = [];
        this._boxes = [];
        this._forks = [];
        this._dynamite = [];
    }

    update() {
        this._updateArray(this._trash);
        this._updateArray(this._enemies);
        this._updateArray(this._plants);
        // this._updateArray(this._boxes);
        this._updateArray(this._forks);
        this._updateArray(this._dynamite);
    }

    _updateArray(array) {
        for (let i = 0; i < array.length; i++) {
            array[i].update();
        }
    }

    findCellObject(cell) {
        let searchArray = function (array) {
            for (let i = 0; i < array.length; i++) {
                if (array[i].cell.getAttribute('objuuid') === cell.getAttribute('objuuid')) {
                    return array[i];
                }
            }
            return null;
        }

        // TODO uncomment
        let object = null;
        // object = searchArray(this._plants);
        // if (object) return object;
        object = searchArray(this._boxes);
        if (object) return object;
    }

    addTrash(trash) {
        this._trash.push(trash);
        console.info('[INFO] Trash added: ', trash);
    }

    removeTrash(trash) {
        for (let i = 0; i < this._trash.length; i++) {
            if (this._trash[i].UUID === trash.UUID) {
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
            if (this._enemies[i].UUID === enemy.UUID) {
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
            if (this._plants[i].UUID === plant.UUID) {
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
            if (this._boxes[i].UUID === box.UUID) {
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
            if (this._forks[i].UUID === fork.UUID) {
                this._forks.splice(i, 1);
                console.info('[INFO] Fork removed: ', fork);
                return;
            }
        }
    }

    addDynamite(dynamite) {
        this._dynamite.push(dynamite);
        console.info('[INFO] Dynamite added: ', dynamite);
    }

    removeDynamite(dynamite) {
        for (let i = 0; i < this._dynamite.length; i++) {
            if (this._dynamite[i].getUUID === dynamite.getUUID) {
                this._dynamite.splice(i, 1);
                console.info('[INFO] Dynamite removed: ', dynamite);
                return;
            }
        }
    }
}