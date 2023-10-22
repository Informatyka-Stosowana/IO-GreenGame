import {ItemRepository} from "./ItemRepository.mjs";
export {ComposterManager}
class ComposterManager {
    constructor(itemRepository) {
        this._itemRepository = itemRepository;
        this._processingProgress = 0;
        this._currentCompostableTrash = null;
    }

    _processTrash(trash) {
        if (this._itemRepository.getCompostableTrashSize() === 0) return;
        this._currentCompostableTrash = this._itemRepository.getCompostableTrash(0);

    }

    update() {
        if (!this._currentCompostableTrash) return;
        if (this._processingProgress < this._currentCompostableTrash.composting_time)
        {
            this._processingProgress += 1;
        }
        else this._processingProgress = 0;
    }
}