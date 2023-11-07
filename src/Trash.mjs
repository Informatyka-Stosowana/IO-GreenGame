import {Definitions as def} from "./Definitions.mjs";
import {CompostableTrash} from "./CompostableTrash.mjs";

export {Trash}

class Trash {

    // Types:
    // 1 - box
    // 2 -

    constructor(type, posX, posY, itemRepository, objectRepository) {
        this._itemRepository = itemRepository;
        this._objectRepository = objectRepository;
        this._type = type;
        this._posX = posX;
        this._posY = posY;
        this._img = document.createElement('img');

        switch (type) {
            case 1:
                this._img.src = def.box.IMG_SRC;
                break;
            case 2:
                // this._img.src = def.box.IMG_SRC;
                this._img.style.backgroundColor = "#FF0000"; // Temporary
                break;
            case 3:
                // this._img.src = def.box.IMG_SRC;
                this._img.style.backgroundColor = "#FF00FF"; // Temporary
                break;
            case 4:
                // this._img.src = def.box.IMG_SRC;
                this._img.style.backgroundColor = "#6500FF"; // Temporary
                break;
        }

        this._img.style.left = posX + 'vw';
        this._img.style.top = posY + 'vh';
        this._img.style.position = 'absolute';
        this._img.style.width = '4vw';
        this._img.style.height = '6vh'; // TODO change to auto after adding images
        this._img.style.margin = '0';

        document.body.insertBefore(this._img, document.getElementById('garbage-truck-el'));

        this._collect = this._collect.bind(this);
        this._img.addEventListener('click', this._collect);
    }

    update() {
        // TODO add animation
    }

    _collect(event) {
        if (this._type === 1) this._itemRepository.addBoxes(1);
        if (this._type === 2) this._itemRepository.addCompostableTrash(new CompostableTrash(1));
        if (this._type === 3) this._itemRepository.addCompostableTrash(new CompostableTrash(2));
        if (this._type === 4) this._itemRepository.addCompostableTrash(new CompostableTrash(3));
        this._objectRepository.removeTrash(this);
        document.body.removeChild(this._img);
    }
}