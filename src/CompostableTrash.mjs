

class CompostableTrash {
    /*
    composting time in number of tics needed to process
    Types:
    1 - rotten tomato
    2 - rotten apple
    3 - destroyed plant
     */
    constructor(type) {
        this._type = type;
        switch (type) {
            case 1:
                this._compost_amount = 5;
                this._composting_time = 100;
                break;
            case 2:
                this.compost_amount = 10;
                this.composting_time = 150;
                break;
            case 3:
                this._compost_amount = 15;
                this._composting_time = 200;
                break;
        }
    }

    get type() {
        return this._type;
    }

    get compost_amount() {
        return this._compost_amount;
    }

    get composting_time() {
        return this._composting_time;
    }

}