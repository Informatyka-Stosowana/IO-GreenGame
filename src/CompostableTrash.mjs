import {Definitions as def} from "./Definitions.mjs";

export {CompostableTrash}

class CompostableTrash {
    /*
    composting time in number of tics needed to process
    Types:
    1 - rotten apple
    2 - rotten banana
    3 - rotten cabbage
     */
    constructor(type) {
        this._type = type;
        switch (type) {
            case 1:
                this._compost_amount = 5;
                this._composting_time = 500;
                this._imgSrc = def.compostableTrash.type1.IMG_SRC;
                break;
            case 2:
                this._compost_amount = 15;
                this._composting_time = 1000;
                this._imgSrc = def.compostableTrash.type2.IMG_SRC;
                break;
            case 3:
                this._compost_amount = 25;
                this._composting_time = 2000;
                this._imgSrc = def.compostableTrash.type3.IMG_SRC;
                break;
        }
    }

    get imgSrc() {
        return this._imgSrc;
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