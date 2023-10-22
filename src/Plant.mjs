export {Plant}

class Plant {
    constructor(type) {
        this._type = type;
        switch (type) {
            case 1:
                this._price = 20
                this._healthPoints = 200;
                this._attackPower = 30;
                break;
            case 2:
                this._price = 20
                this._healthPoints = 200;
                this._attackPower = 30;
                break;
            case 3:
                this._price = 20
                this._healthPoints = 200;
                this._attackPower = 30;
                break;
            case 4:
                this._price = 20
                this._healthPoints = 200;
                this._attackPower = 30;
                break;
        }
    }

    get type() {
        return this._type;
    }

    get price() {
        return this._price;
    }

    get healthPoints() {
        return this._healthPoints;
    }

    get attackPower() {
        return this._attackPower;
    }
}