class Human{
    constructor(x, y, id, idMatrix, objectsMatrix) {
        this.x = x;
        this.y = y;
        this.id = id;
        this.idMatrix = idMatrix;
        this.objectsMatrix = objectsMatrix;
        this.energy = 8;
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

    multiply() {
        const targetCell = this.chooseCell(0);
        const newCell = random(targetCell);

        if (this.energy >= 12 && newCell) {
            const newX = newCell[0];
            const newY = newCell[1];

            this.idMatrix[newY][newX] = this.id;

            const newPredator = new Predator(newX, newY, this.id, this.idMatrix, this.objectsMatrix);
            this.objectsMatrix[newY][newX] = newPredator;

            this.energy = 8;
        }
    }

    move() {
        const targetCell = this.chooseCell(0);
        const newCell = random(targetCell);
        const newGrass = new Grass(this.x, this.y, 1, this.idMatrix, this.objectsMatrix, true); 

        if (this.energy > 0 && newCell) {
            let newX = newCell[0];
            let newY = newCell[1];

            this.idMatrix[newY][newX] = this.id;
            this.idMatrix[this.y][this.x] = 1;

            this.objectsMatrix[newY][newX] = this;
            this.objectsMatrix[this.y][this.x] = newGrass;

            this.x = newX;
            this.y = newY;

            this.energy--;
        }
        this.die();
    }

    eat() {
        const targetCell = this.chooseCell(2);
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

            this.energy++;

            this.multiply()
        } else {
            this.move();
        }
    }

    die() {
        if (this.energy <= 0) {
            this.idMatrix[this.y][this.x] = 0;
            this.objectsMatrix[this.y][this.x] = null;
        }
    }

    update() {
        this.eat();
    }
}