import {Definitions as def} from "./Definitions.mjs";

export class Trash {

    // Types:
    // 0 - Box
    // 1 - Compostable trash 1
    // 2 - Compostable trash 2
    // 3 - Compostable trash 3
    // 4 - Dynamite
    // 5 - Fork

    constructor(type, posX, posY, itemRepository, objectRepository) {
        this._itemRepository = itemRepository;
        this._objectRepository = objectRepository;
        this._type = type;
        this._timeTillDisappear = def.trash.TIME_TILL_DISAPPEAR;
        this._img = document.createElement('img');

        switch (type) {
            case 0:
                this._img.src = def.box.IMG_SRC;
                this._img.style.width = '3vw';
                break;
            case 1:
                this._img.src = def.compostableTrash[0].IMG_SRC;
                this._img.style.width = '4vw';
                break;
            case 2:
                this._img.src = def.compostableTrash[1].IMG_SRC;
                this._img.style.width = '4vw';
                break;
            case 3:
                this._img.src = def.compostableTrash[2].IMG_SRC;
                this._img.style.width = '4vw';
                break;
            case 4:
                this._img.src = def.dynamite.IMG_SRC;
                this._img.style.width = '3vw';
                break;
            case 5:
                this._img.src = def.fork.IMG_SRC;
                this._img.style.width = '4vw';
                break;
            case 6:
                this._img.src = def.mousetrap.IMG_SRC;
                this._img.style.width = '5vw';
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
    }

    _collect(event) {
        if (this._type === 0) this._itemRepository.addBoxes(1);
        if (this._type === 1) this._itemRepository.addCompostableTrash(0);
        if (this._type === 2) this._itemRepository.addCompostableTrash(1);
        if (this._type === 3) this._itemRepository.addCompostableTrash(2);
        if (this._type === 4) this._itemRepository.addDynamite(1)
        if (this._type === 5) this._itemRepository.addForks(1);
        if (this._type === 6) this._itemRepository.addMousetrap(1);
        this._selfDelete()
    }

    _selfDelete() {
        this._objectRepository.removeTrash(this);
        document.body.removeChild(this._img);
    }
}