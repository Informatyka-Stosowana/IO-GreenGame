export class ItemRepository {
    constructor() {
        this._compost = 0;
        this._forks = 0;
        this._boxes = 0;
        this._dynamite = 0;
        this._mousetraps = 0;
        this._compostableTrash = [];
    }

    get mousetraps() {
        return this._mousetraps;
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

    get compostableTrash() {
        return this._compostableTrash;
    }

    addCompost(value) {
        this._compost += value;
        document.getElementById('compost-amount-el').innerText = this._compost;
        console.info('[INFO] Compost added, total: ', this.compost);
    }

    removeCompost(value) {
        this._compost -= value;
        document.getElementById('compost-amount-el').innerText = this._compost;
        console.info('[INFO] Compost removed, total: ', this.compost);
    }

    addForks(value) {
        this._forks += value;
        document.getElementById('fork-amount-el').innerText = this._forks;
        console.info('[INFO] Forks added, total: ', this.forks);
    }

    removeForks(value) {
        this._forks -= value;
        document.getElementById('fork-amount-el').innerText = this._forks;
        console.info('[INFO] Forks removed, total: ', this.forks);
    }

    addBoxes(value) {
        this._boxes += value;
        document.getElementById('box-amount-el').innerText = this._boxes;
        console.info('[INFO] Boxes added, total: ', this.boxes);
    }

    removeBoxes(value) {
        this._boxes -= value;
        document.getElementById('box-amount-el').innerText = this._boxes;
        console.info('[INFO] Boxes removed, total: ', this.boxes);
    }

    addDynamite(value) {
        this._dynamite += value;
        document.getElementById('dynamite-amount-el').innerText = this._dynamite;
        console.info('[INFO] Dynamite added, total: ', this.dynamite);
    }

    removeDynamite(value) {
        this._dynamite -= value;
        document.getElementById('dynamite-amount-el').innerText = this._dynamite;
        console.info('[INFO] Dynamite removed, total: ', this.dynamite);
    }

    addMousetrap(value) {
        this._mousetraps += value;
        document.getElementById('mousetrap-amount-el').innerText = this._mousetraps;
        console.info('[INFO] Mousetrap added, total: ', this.dynamite);
    }

    removeMousetrap(value) {
        this._mousetraps -= value;
        document.getElementById('mousetrap-amount-el').innerText = this._mousetraps;
        console.info('[INFO] Mousetrap removed, total: ', this.dynamite);
    }

    addCompostableTrash(compostableTrashType) {
        this._compostableTrash.push(compostableTrashType);
        console.info('[INFO] Compostable trash added: ', compostableTrashType);
    }

    removeFirstCompostableTrash() {
        let temp = this._compostableTrash[0];
        this._compostableTrash.splice(0, 1);
        console.info('[INFO] Compostable trash removed: ', temp);
    }
}