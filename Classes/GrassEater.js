class GrassEater extends Mom{
    constructor(x, y, id, idMatrix, objectsMatrix){
        super(x, y, id, idMatrix, objectsMatrix)
        this.energy = 12
    }

    multiply() {
        const targetCell = this.chooseCell(0);
        const newCell = random(targetCell);

        if (this.energy >= 15 && newCell) {
            const newX = newCell[0];
            const newY = newCell[1];

            this.idMatrix[newY][newX] = this.id;

            const newGrassEater = new GrassEater(newX, newY, this.id, this.idMatrix, this.objectsMatrix);
            this.objectsMatrix[newY][newX] = newGrassEater;

            this.energy = 12;
        }
    }

    eat() {
        const targetCell = this.chooseCell(1);
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
        }else{
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