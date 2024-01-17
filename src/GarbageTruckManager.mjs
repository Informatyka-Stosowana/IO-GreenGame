import {Definitions as def} from "./Definitions.mjs";
import {Trash} from "./Trash.mjs";

export class GarbageTruckManager {
    constructor(itemRepository, objectRepository) {
        this._itemRepository = itemRepository;
        this._objectRepository = objectRepository;
        this._updatesTillSpawn = def.garbageTruck.TRASH_SPAWN_DIV;
        this._truckPosX = 100; // In vw
        this._truckSpeedX = -1; // In vw

        this._createImg();

        document.body.appendChild(this._img);

        this._trashSpawned = 0;
        this._spawnSpots = [];
        this._randomizeSpawnSpots();
    }

    update() {
        if (this._updatesTillSpawn > 0) {
            this._updatesTillSpawn--;
            return;
        }
        // truck movement and trash spawn
        this._img.style.left = this._truckPosX + 'vw';

        this._newTruckPosX();
        this._spawnTrash();

        // end truck movement condition
        if (this._truckPosX < -def.garbageTruck.IMG_OFFSET_X) {
            // Randomize time until next appearance
            this._updatesTillSpawn = def.garbageTruck.TRASH_SPAWN_DIV + Math.ceil(Math.random() * 500);

            this._truckPosX = 100;
            this._truckSpeedX = -1;

            this._trashSpawned = 0;
            this._randomizeSpawnSpots();
        }
    }

    _createImg() {
        this._img = document.createElement('img');
        this._img.id = 'garbage-truck-el';
        this._img.src = def.garbageTruck.IMG_SRC;
        this._img.style.pointerEvents = 'none';
        this._img.style.position = 'absolute';
        this._img.style.width = '30vw';
        this._img.style.height = '30vh';
        this._img.style.margin = '0';

        this._img.style.left = 100 + 'vw';
        this._img.style.top = '60vh';
    }

    _spawnTrash() {
        if (this._truckPosX > this._spawnSpots[this._trashSpawned] ||
            this._trashSpawned === this._spawnSpots.length) return;
        this._trashSpawned++;

        let type = Math.floor(Math.random() * 7);
        let trash = new Trash(type, this._truckPosX + 4, 69, this._itemRepository, this._objectRepository);

        this._objectRepository.addTrash(trash);
    }

    _newTruckPosX() {
        if (this._truckPosX > 90) this._truckSpeedX += 0.03;
        else if (this._truckPosX > 60) this._truckSpeedX += 0.0055;
        if (this._truckPosX < 20) this._truckSpeedX -= 0.005;
        if (this._truckPosX < 10) this._truckSpeedX -= 0.01;

        this._truckPosX += this._truckSpeedX;
    }

    _randomizeSpawnSpots() {
        this._spawnSpots = [];
        this._spawnSpots.push((60 + Math.floor(Math.random() * 20)))
        this._spawnSpots.push((40 + Math.floor(Math.random() * 20)))
        this._spawnSpots.push((20 + Math.floor(Math.random() * 20)))
    }
}