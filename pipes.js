import { updateScore } from "./gameInfo.js";

const canvas = document.getElementById('canvas');
const ctx = canvas.getContext("2d");

const pipeImage = document.getElementById('pipe');

const pointSound = document.getElementById("point");
pointSound.volume = 0.5;
const hitSound = document.getElementById('hit');
hitSound.volume = 0.5;

const WIDTH = canvas.width;
const HEIGHT = canvas.height;

const PIPE_WIDTH = 80;
const PIPE_HEIGHT = 300;
const PIPE_SPACING = 450;

let pipes = [];

export const resetPipes = () => {
    pipes = [];
}

export const generatePipe = (gameOn) => {
    console.log("Generate");
    const MIN_Y = -250;
    const MAX_Y = -15;

    const rng_y = Math.floor(Math.random() * (MAX_Y - MIN_Y)) - (2*MAX_Y-MIN_Y);
    const newPipe = {
        x: WIDTH,
        y_top: rng_y, 
        beaten: false
    };
    pipes.push(newPipe);
}

export const drawPipes = () => {
    for (const pipe of pipes) {
        ctx.save();
        ctx.translate(pipe.x + PIPE_WIDTH / 2, pipe.y_top + PIPE_SPACING + PIPE_HEIGHT / 2);
        ctx.rotate(Math.PI); // Rotate 180 degrees
        ctx.drawImage(pipeImage, 287, 35, 247, 1505, -PIPE_WIDTH / 2, -PIPE_HEIGHT / 2, PIPE_WIDTH, PIPE_HEIGHT);
        ctx.restore();
        ctx.drawImage(pipeImage, 287, 35, 247, 1505, pipe.x, pipe.y_top, PIPE_WIDTH, PIPE_HEIGHT);
    }
}

export const updatePipes = () => {
    for (const pipe of pipes) {
        pipe.x -= 7;
        if (pipe.x + PIPE_WIDTH < 0) {
            pipes.shift();
        }
    }
}

export const passedPipe = (x, y, pipe) => {
    if (x > pipe.x + (PIPE_WIDTH / 2) && !pipe.beaten) {
        pipe.beaten = true;
        updateScore(1);
        pointSound.play();
    }
}

export const detectCollision = (bx, by, w, h) => {
    for (const pipe of pipes) {
        passedPipe(bx, by, pipe);
        if (isPointTouching(bx, by, pipe) || isPointTouching(bx+w, by+h, pipe)) {
            hitSound.play();
            return true;
        }
    }
    return false;
}

export const isPointTouching = (x, y, pipe) => {
    if ((x > pipe.x && x < pipe.x + PIPE_WIDTH)) {
        console.log("in range");
        const touchingTop = (y < pipe.y_top + PIPE_HEIGHT);
        const touchingBottom = (y > pipe.y_top + PIPE_SPACING);
        return touchingTop || touchingBottom;
    }
    return false;
}