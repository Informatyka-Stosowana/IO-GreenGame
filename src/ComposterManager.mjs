import {Definitions as def} from "./Definitions.mjs";

export class ComposterManager {
    _

    constructor(itemRepository) {
        this._itemRepository = itemRepository;
        this._updatesTillProcessed = null;
        this._currentCompostableTrash = null;
        this._compostableTrashCount = null;
        this._composterEl = document.getElementById('composter-el');
    }

    update() {

        // Add next trash to process if empty
        if (this._currentCompostableTrash === null) {
            if (this._itemRepository.compostableTrash.length === 0) return;
            this._currentCompostableTrash = this._itemRepository.compostableTrash[0];
            this._updatesTillProcessed = def.compostableTrash[this._currentCompostableTrash].COMPOSTING_TIME;
            console.info('[INFO] Composting: ', this._currentCompostableTrash);
            this._itemRepository.removeFirstCompostableTrash();
        }

        // Update queue if count changed
        if (this._itemRepository.compostableTrash.length !== this._compostableTrashCount) {
            this._compostableTrashCount = this._itemRepository.compostableTrash.length;
            this._updateQueue();
        }

        // Finish processing check
        if (this._updatesTillProcessed > 0) {
            this._updatesTillProcessed--;
        } else {
            this._itemRepository.addCompost(def.compostableTrash[this._currentCompostableTrash].COMPOST_AMOUNT);
            this._currentCompostableTrash = null;
        }

        // Animation
        this._updateCompostingProgress();
    }

    _updateCompostingProgress() {
        if (this._currentCompostableTrash === null) {
            if (this._composterEl.childNodes.length !== 0) {
                this._composterEl.removeChild(document.getElementById('composter-el-img'));
            }
            return;
        }

        // Create img if none present
        if (this._composterEl.innerHTML === '') {
            let img = document.createElement('img');
            img.src = def.compostableTrash[this._currentCompostableTrash].IMG_SRC;
            img.id = 'composter-el-img';
            this._composterEl.appendChild(img);
        }

        let img = document.getElementById('composter-el-img');
        img.style.scale = (this._updatesTillProcessed /
            def.compostableTrash[this._currentCompostableTrash].COMPOSTING_TIME) + '';
    }

    _updateQueue() {
        let queueEl = document.getElementById('composter-queue-el');
        let tdArray = queueEl.getElementsByTagName('td');

        // Remove previous images
        for (let i = 0; i < tdArray.length; i++) {
            tdArray[i].innerHTML = '';
        }

        for (let i = 0; i < tdArray.length; i++) {
            if (i === this._itemRepository.compostableTrash.length) return;

            let img = document.createElement('img');
            img.src = def.compostableTrash[this._itemRepository.compostableTrash[i]].IMG_SRC;
            img.className = 'composter-queue-td-img';

            tdArray[i].appendChild(img);
        }
    }
}