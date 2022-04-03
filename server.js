var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);


app.use(express.static("."));
app.get('/', async function (req, res) {
    res.redirect('index.html');
});
server.listen(3000);


var buttonStart = false;
var buttonRestart = false;


var Sky = require('./Modules/Sky');
var Grass = require('./Modules/Grass');
var Human = require('./Modules/Human');
var Predator = require('./Modules/Predator');
var GrassEater = require('./Modules/GrassEater');


function startAllCode() {

    buttonRestart = true;
    buttonStart = true;
    matrix = createMatrix(30, 30);

    data = {
        matrix: matrix,
        weather: "Winter",
        grassInfo: 0,
        grassEaterInfo: 0,
        predatorInfo: 0,
        skyInfo: 0,
        humanInfo: 0
    }
    objectMatrix = createObjectsMatrix(matrix)

    setInterval(updateObjects, 1500);
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


function wheatherSwitcher() {

    if (data.weather == "Winter") {
        data.weather = "Spring";
    } else if (data.weather == "Spring") {
        data.weather = "Summer";
    } else if (data.weather == "Summer") {
        data.weather = "Autumn";
    } else if (data.weather == "Autumn") {
        data.weather = "Winter";
    }

    io.sockets.emit("All Data", data);
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


async function infoAllPersons() {
    let grassInfo = 0;
    let grassEaterInfo = 0;
    let predatorInfo = 0;
    let skyInfo = 0;
    let humanInfo = 0;

    for (let y = 0; y < matrix.length; y++) {
        for (let x = 0; x < matrix[y].length; x++) {
            if (matrix[y][x] == 1) {
                grassInfo++;
            } else if (matrix[y][x] == 2) {
                grassEaterInfo++;
            } else if (matrix[y][x] == 3) {
                predatorInfo++;
            } else if (matrix[y][x] == 4) {
                skyInfo++;
            } else if (matrix[y][x] == 5) {
                humanInfo++;
            }
        }
    }

    data.grassInfo = grassInfo;
    data.grassEaterInfo = grassEaterInfo;
    data.predatorInfo = predatorInfo;
    data.skyInfo = skyInfo;
    data.humanInfo = humanInfo;

    io.sockets.emit("All Data", data);
}


async function updateObjects() {
    for (let y = 0; y < objectMatrix.length; y++) {
        for (let x = 0; x < objectMatrix[y].length; x++) {
            const object = objectMatrix[y][x];
            if (object) {
                object.update();
            }
        }
    }

    data.matrix = matrix;
    infoAllPersons();
}


async function killAllPersons() {
    for (let y = 0; y < matrix.length; y++) {
        for (let x = 0; x < matrix[y].length; x++) {
            data.matrix[y][x] = 0;
            objectMatrix[y][x] = null;
        }
    }

    infoAllPersons();
}


io.on('connection', function (socket) {
    socket.on("kill", killAllPersons);
    socket.on("weather", wheatherSwitcher);
    socket.on("start", async function(){
        if(buttonStart == false){
            startAllCode();
        }
    });
    socket.on("restart", async function(){
        if(buttonStart == true){
            startAllCode();
        }
    })
});
