import { generatePipe, updatePipes, drawPipes, detectCollision, resetPipes } from "/pipes.js"
import { score, setScore } from "/gameInfo.js";
import { updateBackgrounds, drawBackgrounds, initBackground } from "/background.js";

const canvas = document.getElementById('canvas');
const ctx = canvas.getContext("2d");

const birdImage = document.getElementById('bird');

const wingSound = document.getElementById("wing");
wingSound.volume = 0.5;
const hitSound = document.getElementById('hit');
hitSound.volume = 0.5;

const WIDTH = canvas.width;
const HEIGHT = canvas.height;

const FPS = 30;

const BIRD_WIDTH = 39;
const BIRD_HEIGHT = BIRD_WIDTH / 1.4; 

const START_Y = 50;

let bx = WIDTH / 4;
let by = START_Y;
let vy = 0;
const JUMP = -20;

let gameOver = false;
let gameStarted = false;

let pipeSpawning;


const init = () => {
    ctx.font = "25px Arial";
    ctx.textAlign = "center";
    initBackground();
}

const gameLoop = () => {
    if (gameOver) { return; }
    if (!gameStarted) {
        showStart();
        return;
    }
    updateBackgrounds();
    update();
    draw();
}

const update = () => {
    vy += 2;
    by += vy;
    updatePipes();
    if (detectCollision(bx, by, BIRD_WIDTH, BIRD_HEIGHT) || outOfBounds()) {
        gameOver = true;
        setTimeout(restart, 2000);
    }
    outOfBounds();
}

const draw = () => {
    ctx.clearRect(0, 0, WIDTH, HEIGHT);
    drawBackgrounds();

    ctx.drawImage(birdImage, 35, 60, 290, 200, bx, by, BIRD_WIDTH, BIRD_HEIGHT);
    drawPipes();

    ctx.fillText(score, WIDTH / 2, 30);
}

const outOfBounds = () => {
    if (by < 0) {
        by = 0;
        vy = 0;
    }
    if (by > HEIGHT - BIRD_HEIGHT) {
        hitSound.play();
        return true;
    }
    return false;
}

const showStart = () => {
    draw();
    ctx.fillText("Press up arrow to start!", WIDTH / 2, HEIGHT / 2);
}

const gameStart = () => {
    setScore(0);
    generatePipe();
    pipeSpawning = setInterval(generatePipe, 1400);
}

const restart = () => {
    initBackground();
    clearInterval(pipeSpawning);
    resetPipes();
    by = START_Y;
    gameStarted = false;
    gameOver = false;
}
document.onkeydown = function(e) {
    if (e.key == "ArrowUp") {
        if (!gameStarted) {
            gameStarted = true;
            gameStart();
        }
        wingSound.currentTime = 0;
        wingSound.play();
        vy = JUMP;
    }
}
init();
gameLoop();

setInterval(gameLoop, 1000 / FPS);
