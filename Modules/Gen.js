var random = require('./random')

module.exports = class Gen {
    constructor(x, y, id, idMatrix, objectsMatrix) {
        this.x = x;
        this.y = y;
        this.id = id;
        this.idMatrix = idMatrix;
        this.objectsMatrix = objectsMatrix;
        this.directions = [
            [this.x - 1, this.y - 1],
            [this.x, this.y - 1],
            [this.x + 1, this.y - 1],
            [this.x - 1, this.y],
            [this.x + 1, this.y],
            [this.x - 1, this.y + 1],
            [this.x, this.y + 1],
            [this.x + 1, this.y + 1]
        ];
    }

    updateCordinates() {
        this.directions = [
            [this.x - 1, this.y - 1],
            [this.x, this.y - 1],
            [this.x + 1, this.y - 1],
            [this.x - 1, this.y],
            [this.x + 1, this.y],
            [this.x - 1, this.y + 1],
            [this.x, this.y + 1],
            [this.x + 1, this.y + 1]
        ];
    }

    chooseCell(characterId) {
        this.updateCordinates();
        const found = [];
        for (let i = 0; i < this.directions.length; i++) {
            const x = this.directions[i][0];
            const y = this.directions[i][1];
            if (x >= 0 && x < this.idMatrix[0].length && y >= 0 && y < this.idMatrix.length) {
                if (this.idMatrix[y][x] == characterId) {
                    found.push(this.directions[i])
                }
            }
        }
        return found;
    }

    move() {
        const targetCell = this.chooseCell(0);
        const newCell = random(targetCell);

        if (this.energy > 0 && newCell) {
            const newX = newCell[0];
            const newY = newCell[1];

            this.idMatrix[newY][newX] = this.id;
            this.idMatrix[this.y][this.x] = 0;

            this.objectsMatrix[newY][newX] = this;
            this.objectsMatrix[this.y][this.x] = null;

            this.x = newX;
            this.y = newY;

            this.energy--;
        }
        this.die();
    }
}