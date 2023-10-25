import {Definitions as def} from "./Definitions.mjs";

export {GarbageTruckManager}

class GarbageTruckManager {
    constructor(itemRepository) {
        this._itemRepository = itemRepository;
        this._updatesTillSpawn = def.garbageTruck.TRASH_SPAWN_DIV;
        this._truckPosX = 100; // In vw
        this._truckSpeedX = -1; // In vw

        this._img = document.createElement('img');
        this._img.src = def.garbageTruck.IMG_SRC;
        this._img.style.backgroundColor = "#FFFF00"; // Temporary
        this._img.style.pointerEvents = 'none';
        this._img.style.position = 'absolute';
        this._img.style.width = '20vw';
        this._img.style.height = '20vh';
        this._img.style.margin = '0';

        this._img.style.left = 100 + 'vw';
        this._img.style.top = '69vh';

        document.body.appendChild(this._img);
    }

    update() {
        if (this._updatesTillSpawn > 0) {
            this._updatesTillSpawn--;
            return;
        }
        // truck movement and spawning
        this._img.style.left = this._truckPosX + 'vw';
        this._newTruckPosX();

        // end truck movement condition
        if (this._truckPosX < -def.garbageTruck.IMG_OFFSET_X) {
            this._truckPosX = 100;
            this._updatesTillSpawn = def.garbageTruck.TRASH_SPAWN_DIV;
            this._truckSpeedX = -1;
        }
    }

    _newTruckPosX() {
        // TODO come up with better, smoother truck's speed control, maybe request animation frame

        // console.log('Truck speed: ', this._truckSpeedX);
        // console.log('Truck pos x: ', this._truckPosX);

        if (this._truckPosX > 90) this._truckSpeedX += 0.03;
        else if (this._truckPosX > 60) this._truckSpeedX += 0.0055;
        if (this._truckPosX < 20) this._truckSpeedX -= 0.005;
        if (this._truckPosX < 10) this._truckSpeedX -= 0.01;

        this._truckPosX += this._truckSpeedX;
    }
}