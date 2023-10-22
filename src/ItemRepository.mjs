export {ItemRepository}
class ItemRepository {
    constructor() {
        this._compost = 0;
        this._forks = 0;
        this._boxes = 0;
        this._compostableTrash = [];
    }

    addCompost(value) {
        this._compost += value;
    }

    removeCompost(value) {
        this._compost -= value;
    }

    get compost() {
        return this._compost;
    }

    addForks(value) {
        this._forks += value;
    }

    removeForks(value) {
        this._forks -= value;
    }

    get forks() {
        return this._forks;
    }

    addBoxes(value) {
        this._forks += value;
    }

    removeBoxes(value) {
        this._boxes -= value;
    }

    get boxes() {
        return this._boxes;
    }

    getCompostableTrash(index) {
        return this._compostableTrash.length[index];
    }

    getCompostableTrashSize() {
        return this._compostableTrash.length;
    }

    addCompostableTrash(trash) {
        this._compostableTrash.push(trash);
    }

    removeCompostableTrash(trash) {
        for (let i = 0; i < this._compostableTrash.length; i++) {
            if (trash === this._compostableTrash[i]) {
                this._compostableTrash.splice(i, 1);
            }
        }
    }
}