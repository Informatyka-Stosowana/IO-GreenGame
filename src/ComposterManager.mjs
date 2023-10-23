export {ComposterManager}

class ComposterManager {
    constructor(itemRepository) {
        this._itemRepository = itemRepository;
        this._processingProgress = 0;
        this._currentCompostableTrash = null;

        this._composterElement = document.getElementById('composter-el');
        this._composterElement.addEventListener('click', () => this._processTrash());
    }

    _processTrash() {
        if (this._currentCompostableTrash) {
            console.info('[INFO] Trash is being currently processed');
            return;
        }
        if (this._itemRepository.getCompostableTrashSize() === 0) {
            console.info('[INFO] No trash to process');
            return;
        }
        this._currentCompostableTrash = this._itemRepository.getCompostableTrash(0);
        this._itemRepository.removeCompostableTrash(this._currentCompostableTrash);

        console.info('[INFO] Composting started, composting time: ', this._currentCompostableTrash.composting_time);
    }

    update() {
        if (!this._currentCompostableTrash) return;
        if (this._processingProgress < this._currentCompostableTrash.composting_time) {
            this._processingProgress += 1;
        } else {
            this._processingProgress = 0;
            this._itemRepository.addCompost(this._currentCompostableTrash.compost_amount);
            this._currentCompostableTrash = null;
        }
    }
}