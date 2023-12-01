import {Definitions as def} from "./Definitions.mjs";
import {CompostableTrash} from "./CompostableTrash.mjs";

export class Trash {

    // TODO add all possible trash
    // Types:
    // 1 - box
    // 2 - Compostable trash 1
    // 3 - Compostable trash 2
    // 4 - Compostable trash 3

    constructor(type, posX, posY, itemRepository, objectRepository) {
        this._itemRepository = itemRepository;
        this._objectRepository = objectRepository;
        this._type = type;
        this._timeTillDisappear = def.trash.TIME_TILL_DISAPPEAR;
        this._img = document.createElement('img');

        switch (type) {
            case 1:
                this._img.src = def.box.IMG_SRC;
                this._img.style.width = '3vw';
                break;
            case 2:
                this._img.src = def.compostableTrash.type[0].IMG_SRC;
                this._img.style.width = '4vw';
                break;
            case 3:
                this._img.src = def.compostableTrash.type[1].IMG_SRC;
                this._img.style.width = '4vw';
                break;
            case 4:
                this._img.src = def.compostableTrash.type[2].IMG_SRC;
                this._img.style.width = '4vw';
                break;
        }

        this._img.style.left = posX + 'vw';
        this._img.style.top = posY + 'vh';
        this._img.style.position = 'absolute';
        this._img.style.height = 'auto';
        this._img.style.margin = '0';

        document.body.insertBefore(this._img, document.getElementById('garbage-truck-el'));

        this._collect = this._collect.bind(this);
        this._img.addEventListener('click', this._collect);
    }

    update() {
        if (this._timeTillDisappear > 0) {
            this._timeTillDisappear--;
            if (this._timeTillDisappear < def.trash.TIME_FADING)
                this._img.style.opacity = this._timeTillDisappear / def.trash.TIME_FADING + '';
        } else {
            this._selfDelete();
        }
        // TODO add animation?
    }

    _collect(event) {
        if (this._type === 1) this._itemRepository.addBoxes(1);
        if (this._type === 2) this._itemRepository.addCompostableTrash(new CompostableTrash(0));
        if (this._type === 3) this._itemRepository.addCompostableTrash(new CompostableTrash(1));
        if (this._type === 4) this._itemRepository.addCompostableTrash(new CompostableTrash(2));
        this._selfDelete()
    }

    _selfDelete() {
        this._objectRepository.removeTrash(this);
        document.body.removeChild(this._img);
    }
}