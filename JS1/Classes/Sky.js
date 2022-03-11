class Sky {
    constructor(x, y, id, idMatrix, objectsMatrix) {
        this.x = x;
        this.y = y;
        this.id = id;
        this.idMatrix = idMatrix;
        this.objectsMatrix = objectsMatrix;
        this.energy = 4;
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
        } else {
            this.die();
        }

        const grassMultiply = this.chooseCell(1);

        if (grassMultiply.length > 0) {
            for (let i = 0; i < grassMultiply.length; i++) {
                const grassX = grassMultiply[i][0];
                const grassY = grassMultiply[i][1];

                this.objectsMatrix[grassY][grassX].canMultiply = true;
            }
        }
    }

    die() {
        if (this.energy <= 0) {
            this.updateCordinates();
            
            for (let i = 0; i < this.directions.length; i++) {
                const killCoordinates = this.directions[i];
                const killX = killCoordinates[0];
                const killY = killCoordinates[1];
                if (killX >= 0 && killX < this.idMatrix[0].length && killY >= 0 && killY < this.idMatrix.length) {
                    this.idMatrix[killY][killX] = 0;
                    this.objectsMatrix[killY][killX] = null;
                }
            }

            this.idMatrix[this.y][this.x] = 0;
            this.objectsMatrix[this.y][this.x] = null;
        }
    }

    update() {
        this.move();
    }
}