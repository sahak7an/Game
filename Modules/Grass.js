var Gen = require('./Gen')
var random = require('./random')

module.exports = class Grass extends Gen{
    constructor(x, y, id, idMatrix, objectsMatrix, canMultiply){
        super(x, y, id, idMatrix, objectsMatrix);
        this.canMultiply = canMultiply;
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