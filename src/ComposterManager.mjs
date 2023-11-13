export {ComposterManager}

class ComposterManager {
    _

    constructor(itemRepository) {
        this._itemRepository = itemRepository;
        this._updatesTillProcessed = null;
        this._currentCompostableTrash = null;
        this._compostableTrashCount = null;
    }

    update() {
        if (this._itemRepository.getCompostableTrashSize() !== this._compostableTrashCount) {
            this._compostableTrashCount = this._itemRepository.getCompostableTrashSize();
            this._updateQueue();
        }

        if (!this._currentCompostableTrash) {
            if (this._itemRepository.getCompostableTrashSize() === 0) return;
            this._currentCompostableTrash = this._itemRepository.getCompostableTrash(0);
            this._updatesTillProcessed = this._currentCompostableTrash.composting_time;
            console.info('[INFO] Processing: ', this._currentCompostableTrash);
            this._itemRepository.removeCompostableTrash(this._currentCompostableTrash);
        }

        if (this._updatesTillProcessed > 0) {
            this._updatesTillProcessed--;
        } else {
            this._itemRepository.addCompost(this._currentCompostableTrash.compost_amount);
            this._currentCompostableTrash = null;
        }
    }

    _updateQueue() {
        let queueEl = document.getElementById('composter-queue-el');
        let tdArray = queueEl.getElementsByTagName('td');

        // Remove previous images
        for (let i = 0; i < tdArray.length; i++) {
            tdArray[i].innerHTML = '';
        }

        for (let i = 0; i < tdArray.length; i++) {
            if (this._itemRepository.getCompostableTrashSize() === i) return;

            let img = document.createElement('img');
            img.src = this._itemRepository.getCompostableTrash(i).imgSrc;
            img.className = 'composter-queue-td-img';

            tdArray[i].appendChild(img);
        }
    }

    // TODO add fading current compostable trash
}