var Gen = require('./Gen')
var random = require('./random')

module.exports = class Predator extends Gen{
    constructor(x, y, id, idMatrix, objectsMatrix){
        super(x, y, id, idMatrix, objectsMatrix)
        this.energy = 8
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