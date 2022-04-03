var Gen = require('./Gen')

module.exports = class Sky extends Gen{
    constructor(x, y, id, idMatrix, objectsMatrix){
        super(x, y, id, idMatrix, objectsMatrix)
        this.energy = 4
    }

    move() {
        super.move()
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