export {ItemRepository}

class ItemRepository {
    constructor() {
        this._compost = 0;
        this._forks = 0;
        this._boxes = 0;
        this._compostableTrash = [];
    }

    get compost() {
        return this._compost;
    }

    get forks() {
        return this._forks;
    }

    get boxes() {
        return this._boxes;
    }

    addCompost(value) {
        this._compost += value;
        console.info('[INFO] Compost added, total: ', this.compost);
    }

    removeCompost(value) {
        this._compost -= value;
        console.info('[INFO] Compost removed, total: ', this.compost);
    }

    addForks(value) {
        this._forks += value;
        console.info('[INFO] Forks added, total: ', this.forks);
    }

    removeForks(value) {
        this._forks -= value;
        console.info('[INFO] Forks removed, total: ', this.forks);
    }

    addBoxes(value) {
        this._boxes += value;
        console.info('[INFO] Boxes added, total: ', this.boxes);
    }

    removeBoxes(value) {
        this._boxes -= value;
        console.info('[INFO] Boxes removed, total: ', this.boxes);
    }

    getCompostableTrash(index) {
        return this._compostableTrash[index];
    }

    getCompostableTrashSize() {
        return this._compostableTrash.length;
    }

    addCompostableTrash(trash) {
        this._compostableTrash.push(trash);
        console.info('[INFO] Compostable trash added, total: ', this.getCompostableTrashSize());
    }

    removeCompostableTrash(trash) {
        this._compostableTrash.splice(0, 1);
        console.info('[INFO] Compostable trash removed, total: ', this.getCompostableTrashSize());
    }
}