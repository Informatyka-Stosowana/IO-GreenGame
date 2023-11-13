export {ItemRepository}

class ItemRepository {
    constructor() {
        this._compost = 0;
        this._forks = 0;
        this._boxes = 0;
        this._dynamite = 0;
        this._compostableTrash = [];
    }

    get dynamite() {
        return this._dynamite;
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
        document.getElementById('compost-amount-el').innerText = 'compost amount: ' + this._compost;
        console.info('[INFO] Compost added, total: ', this.compost);
    }

    removeCompost(value) {
        this._compost -= value;
        document.getElementById('compost-amount-el').innerText = 'compost amount: ' + this._compost;
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

    addDynamite(value) {
        this._dynamite += value;
        console.info('[INFO] Dynamite added, total: ', this.dynamite);
    }

    removeDynamite(value) {
        this._dynamite -= value;
        console.info('[INFO] Dynamite removed, total: ', this.dynamite);
    }

    getCompostableTrash(index) {
        return this._compostableTrash[index];
    }

    getCompostableTrashSize() {
        return this._compostableTrash.length;
    }

    addCompostableTrash(compostableTrash) {
        this._compostableTrash.push(compostableTrash);
        console.info('[INFO] Compostable trash added: ', compostableTrash);
    }

    removeCompostableTrash() {
        let temp = this._compostableTrash[0];
        this._compostableTrash.splice(0, 1);
        console.info('[INFO] Compostable trash removed: ', temp);
    }
}