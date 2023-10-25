import {Definitions as def} from "./Definitions.mjs";

export {Trash}

class Trash {

    // Types:
    // 1 - box

    constructor(type, posX, posY, itemRepository, objectRepository) {
        this._itemRepository = itemRepository;
        this._objectRepository = objectRepository;
        this._type = type;
        this._posX = posX;
        this._posY = posY;
        this._img = document.createElement('img');

        if (type === 1) {
            this._img.src = def.box.IMG_SRC;
            this._img.style.left = posX + 'vw';
            this._img.style.top = posY + 'vh';
            this._img.style.position = 'absolute';
            this._img.style.width = '4vw';
            this._img.style.height = 'auto';
            this._img.style.margin = '0';
        }

        document.body.appendChild(this._img);

        this._collect = this._collect.bind(this);
        this._img.addEventListener('click', this._collect);
    }

    update() {
        // TODO add animation
    }

    _collect(event) {
        if (this._type === 1) this._itemRepository.addBoxes(1);
        this._objectRepository.removeTrash(this);
        document.body.removeChild(this._img);
    }

}