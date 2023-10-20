let MAIN_LOOP_INTERVAL = 1000; // speed of everything

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
        if (this._compost - value < 0) return false;
        this._compost -= value;
        return true;
    }

    addForks(value) {
        this._forks += value;
    }

    removeForks(value) {
        if (this._forks - value < 0) return false;
        this._forks -= value;
        return true;
    }

    addBoxes(value) {
        this._forks += value;
    }

    removeBoxes(value) {
        if (this._boxes - value < 0) return false;
        this._boxes -= value;
        return true;
    }

    getCompostableTrashSize(index) {
        return this._compostableTrash.length[index];
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

class GameManager {
    constructor() {
        this._updateGame = false;
        this._score = 0;

        // TODO delete
        this.testState = true;
        this.intervalId = undefined;
    }

    startGame() {
        this._updateGame = true;
        this.intervalId = setInterval(() => this.gameLoop(), MAIN_LOOP_INTERVAL);
    }

    // TODO delete
    test() {
        if (this.testState) {
            document.title = "1";
            console.log("1")
            this.testState = false;
        }
        else {
            document.title = "2";
            console.log("2")
            this.testState = true;
        }
    }

    gameLoop() {
        this.test();
    }

    stopTest() {
        clearInterval(this.intervalId);
    }
}

let gm = new GameManager();
gm.startGame();

document.getElementById('composter-el').onclick = () => gm.stopTest();