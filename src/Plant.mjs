export {Plant}

class Plant {
    constructor(type) {
        this._type = type;

        if (type === 1) {
            this._price = 20
            this._hp = 200;
            this._damage = 30;
        }
        if (type === 2) {
            this._price = 20
            this._hp = 200;
            this._damage = 30;
        }
        if (type === 3) {
            this._price = 20
            this._hp = 200;
            this._damage = 30;
        }
        if (type === 4) {
            this._price = 20
            this._hp = 200;
            this._damage = 30;
        }
    }

    get price() {
        return this._price;
    }

    update() {

    }

    _attack() {
        // TODO implement attack - spawn bullet behaviour
        // Enemies can appear on top of each other so only the first one should be damaged

    }
}