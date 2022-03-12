const matrix = createMatrix(50, 50);
const objectMatrix = createObjectsMatrix(matrix);

let side = 10;

function setup() {
    createCanvas(matrix[0].length * side, matrix.length * side);
    background("grey");
    frameRate(5);
}

function draw() {
    drawGrass();
    updateObjects();
}

function createObjectsMatrix(matrix) {
    const newObjectsMatrix = [];
    for (let y = 0; y < matrix.length; y++) {
        newObjectsMatrix[y] = [];
        for (let x = 0; x < matrix[y].length; x++) {
            if (matrix[y][x] == 1) {
                const newGrass = new Grass(x, y, 1, matrix, newObjectsMatrix, false);
                newObjectsMatrix[y][x] = newGrass;
            } else if (matrix[y][x] == 2) {
                const newGrassEater = new GrassEater(x, y, 2, matrix, newObjectsMatrix);
                newObjectsMatrix[y][x] = newGrassEater;
            } else if (matrix[y][x] == 3) {
                const newPredator = new Predator(x, y, 3, matrix, newObjectsMatrix);
                newObjectsMatrix[y][x] = newPredator;
            } else if (matrix[y][x] == 4) {
                const newSky = new Sky(x, y, 4, matrix, newObjectsMatrix);
                newObjectsMatrix[y][x] = newSky;
            } else if (matrix[y][x] == 5) {
                const newHuman = new Human(x, y, 5, matrix, newObjectsMatrix);
                newObjectsMatrix[y][x] = newHuman
            }
            else {
                newObjectsMatrix[y][x] = null;
            }
        }
    }

    return newObjectsMatrix;
}

function drawGrass() {
    for (let y = 0; y < matrix.length; y++) {
        for (let x = 0; x < matrix[y].length; x++) {
            if (matrix[y][x] == 1) {
                fill("green");
            } else if (matrix[y][x] == 2) {
                fill('yellow');
            } else if (matrix[y][x] == 3) {
                fill('black');
            } else if (matrix[y][x] == 4) {
                fill('blue');
            } else if (matrix[y][x] == 5) {
                fill('red');
            } else {
                fill("grey");
            }


            rect(x * side, y * side, side, side);
        }
    }
}

function updateObjects() {
    for (let y = 0; y < objectMatrix.length; y++) {
        for (let x = 0; x < objectMatrix[y].length; x++) {
            const object = objectMatrix[y][x];
            if (object) {
                object.update();
            }
        }
    }
}

function createMatrix(horizontalLength, verticalLength) {
    const newMatrix = [];

    for (let y = 0; y < verticalLength; y++) {
        newMatrix[y] = [];
        for (let x = 0; x < horizontalLength; x++) {
            const randomSectionCursor = Math.random() * 100;

            if (randomSectionCursor < 40) {
                newMatrix[y][x] = 1;
            } else if (randomSectionCursor < 50) {
                newMatrix[y][x] = 2;
            } else if (randomSectionCursor < 55) {
                newMatrix[y][x] = 3;
            } else if (randomSectionCursor < 57) {
                newMatrix[y][x] = 4;
            } else if (randomSectionCursor < 62) {
                newMatrix[y][x] = 5;
            } else {
                newMatrix[y][x] = 0;
            }
        }
    }

    return newMatrix;
}