const background = document.getElementById('background');
let backgrounds = [];

const canvas = document.getElementById('canvas');
const ctx = canvas.getContext("2d");


const WIDTH = canvas.width;
const HEIGHT = canvas.height;

export const initBackground = () => {
    backgrounds = [0, WIDTH];
    drawBackgrounds();
}

export const generateBackground = () => {
    backgrounds.push(WIDTH);
} 

export const updateBackgrounds = () => {
    for (let i = 0; i < backgrounds.length; i++) {
        backgrounds[i] -= 1;
        if (backgrounds[i] == 0) {
            generateBackground();
        }
        if (backgrounds[i] <= -WIDTH) {
            backgrounds.shift()
        }
    }
}

export const drawBackgrounds = () => {
    for (const pos of backgrounds) {
        ctx.drawImage(background, pos, 0, WIDTH, HEIGHT);
    }
}