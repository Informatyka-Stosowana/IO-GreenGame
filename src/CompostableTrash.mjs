export {CompostableTrash}
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
                this._composting_time = 500;
                break;
            case 2:
                this._compost_amount = 15;
                this._composting_time = 1000;
                break;
            case 3:
                this._compost_amount = 25;
                this._composting_time = 2000;
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