var weatherSc = "Winter";
var matrixSc = [];
var socket = io();

let side = 10;
let grassInfoElement = document.getElementById('Grass');
let grassEaterInfoElement = document.getElementById('GrassEater');
let predatorInfoElement = document.getElementById('Predator');
let skyInfoElement = document.getElementById('Sky');
let humanInfoElement = document.getElementById('Human');
let canvasDirectorie = document.getElementById('canvas');


var winterColors = ['#137A37', '#778C76', '#584E1F', '#2F2F2C', '#E2451F'];
var springColors = ['#16F300', '#EAD41E', '#FF9E00', '#DAD1A9', '#FF5733'];
var summerColors = ['#09C500', '#FBFF08', '#FFB741', '#FEF3E1', '#0AEC88'];
var autumnColors = ['#FF6219', '#DE8D4D', '#9C4908', '#A19876', '#4D2B84'];
var backgroundColor = ['#FFFFFF', '#E1E177', '#09C2B7', '#D7B117']


function backgroundCanvas(weather) {

    if (weather == "Winter") {
        background('#FFFFFF');
    } else if (weather == "Spring") {
        background('#E1E177');
    } else if (weather == "Summer") {
        background('#09C2B7');
    } else if (weather == "Autumn") {
        background('#D7B117');
    }
}


socket.on("All Data", function (data) {
    weatherSc = data.weather;
    matrixSc = data.matrix;
    drawPersons(data)
});


function setup() {
    createCanvas(30 * side, 30 * side);
    backgroundCanvas(weatherSc);
}

function drawPersons(data) {
    var matrix = data.matrix;
    grassInfoElement.innerText = data.grassInfo;
    grassEaterInfoElement.innerText = data.grassEaterInfo
    predatorInfoElement.innerText = data.predatorInfo
    skyInfoElement.innerText = data.skyInfo
    humanInfoElement.innerText = data.humanInfo

    for (let y = 0; y < matrix.length; y++) {
        for (let x = 0; x < matrix[y].length; x++) {

            if (weatherSc == "Winter") {
                if (matrix[y][x] == 1) {
                    fill(winterColors[0]);
                } else if (matrix[y][x] == 2) {
                    fill(winterColors[1]);
                } else if (matrix[y][x] == 3) {
                    fill(winterColors[2]);
                } else if (matrix[y][x] == 4) {
                    fill(winterColors[3]);
                } else if (matrix[y][x] == 5) {
                    fill(winterColors[4]);
                } else {
                    fill(backgroundColor[0]);
                }
            }

            if (weatherSc == "Spring") {
                if (matrix[y][x] == 1) {
                    fill(springColors[0]);
                } else if (matrix[y][x] == 2) {
                    fill(springColors[1]);
                } else if (matrix[y][x] == 3) {
                    fill(springColors[2]);
                } else if (matrix[y][x] == 4) {
                    fill(springColors[3]);
                } else if (matrix[y][x] == 5) {
                    fill(springColors[4]);
                } else {
                    fill(backgroundColor[1]);
                }
            }

            if (weatherSc == "Summer") {
                if (matrix[y][x] == 1) {
                    fill(summerColors[0]);
                } else if (matrix[y][x] == 2) {
                    fill(summerColors[1]);
                } else if (matrix[y][x] == 3) {
                    fill(summerColors[2]);
                } else if (matrix[y][x] == 4) {
                    fill(summerColors[3]);
                } else if (matrix[y][x] == 5) {
                    fill(summerColors[4]);
                } else {
                    fill(backgroundColor[2]);
                }
            }

            if (weatherSc == "Autumn") {
                if (matrix[y][x] == 1) {
                    fill(autumnColors[0]);
                } else if (matrix[y][x] == 2) {
                    fill(autumnColors[1]);
                } else if (matrix[y][x] == 3) {
                    fill(autumnColors[2]);
                } else if (matrix[y][x] == 4) {
                    fill(autumnColors[3]);
                } else if (matrix[y][x] == 5) {
                    fill(autumnColors[4]);
                } else {
                    fill(backgroundColor[3]);
                }
            }

            rect(x * side, y * side, side, side);
        }
    }
}

async function kill() {
    socket.emit("kill");
}

async function weatherSwitcher() {
    socket.emit("weather");
}

async function startAllCode() {
    socket.emit("start");
}

async function restartAllCode() {
    socket.emit("restart");
}
