class Grass {
    constructor(x, y, id, idMatrix, objectsMatrix, canMultiply) {
        this.x = x;
        this.y = y;
        this.canMultiply = canMultiply;
        this.id = id;
        this.idMatrix = idMatrix;
        this.objectsMatrix = objectsMatrix;
        this.energy = 0;
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

    multiply() {
        this.energy++;

        const targetCell = this.chooseCell(0);
        const newCell = random(targetCell);

        if (this.energy >= 4 && newCell && this.canMultiply == true) {
            const newX = newCell[0];
            const newY = newCell[1];

            this.idMatrix[newY][newX] = this.id;

            const newGrass = new Grass(newX, newY, this.id, this.idMatrix, this.objectsMatrix, false);
            this.objectsMatrix[newY][newX] = newGrass;

            this.energy = 0;
        }
    }

    update() {
        this.multiply();
    }
}