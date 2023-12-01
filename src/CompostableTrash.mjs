import {Definitions as def} from "./Definitions.mjs";

export class CompostableTrash {
    /*
    composting time in number of tics needed to process
    Types:
    0 - rotten apple
    1 - rotten banana
    2 - rotten cabbage
     */
    constructor(type) {
        this._type = type;
    }

    get imgSrc() {
        return def.compostableTrash.type[this._type].IMG_SRC;
    }

    get compost_amount() {
        return def.compostableTrash.type[this._type].COMPOST_AMOUNT;
    }

    get composting_time() {
        return def.compostableTrash.type[this._type].COMPOSTING_TIME;
    }

}