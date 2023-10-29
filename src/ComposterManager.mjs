export {ComposterManager}

class ComposterManager {
    constructor(itemRepository) {
        this._itemRepository = itemRepository;
        this._updatesTillProcessed = null;
        this._currentCompostableTrash = null;

        this._composterElement = document.getElementById('composter-el');
        // this._composterElement.addEventListener('click', () => this._processTrash());
    }

    _processTrash() {
        // if (this._currentCompostableTrash) {
        //     console.info('[INFO] Trash is being currently processed');
        //     return;
        // }
        // if (this._itemRepository.getCompostableTrashSize() === 0) {
        //     console.info('[INFO] No trash to process');
        //     return;
        // }
        // this._currentCompostableTrash = this._itemRepository.getCompostableTrash(0);
        // this._updatesTillProcessed = this._currentCompostableTrash.composting_time;
        // this._itemRepository.removeCompostableTrash(this._currentCompostableTrash);

        console.info('[INFO] Composting started, composting time: ', this._currentCompostableTrash.composting_time);
    }

    update() {
        if (!this._currentCompostableTrash) {
            if (this._itemRepository.getCompostableTrashSize() === 0) return;
            this._currentCompostableTrash = this._itemRepository.getCompostableTrash(0);
            this._updatesTillProcessed = this._currentCompostableTrash.composting_time;
            console.info('Processing: ', this._currentCompostableTrash);
            this._itemRepository.removeCompostableTrash(this._currentCompostableTrash);
        }
        if (this._updatesTillProcessed > 0) {
            this._updatesTillProcessed--;
        } else {
            this._itemRepository.addCompost(this._currentCompostableTrash.compost_amount);
            this._currentCompostableTrash = null;
        }
    }
}