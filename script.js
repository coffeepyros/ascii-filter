// DOM
const canvas = document.querySelector("canvas");
const file = document.querySelector("file");

const ctx = canvas.getContext("2d");

// CANVAS CONFIG
const gridSize = 8;
const cWidth = 1080;
const cHeight = 1080;

class Pixel {
    constructor(x, y, char, color) {
        this.x = x;
        this.y = y;
        this.char = char;
        this.color = color;
    }
}

function devConstruct() {
    const chars = ["", ".", "+", "*", "|", "_", "/", "\\", "o", "O"]; // "█"
    const pixelArray = [];
    for (let x = 0; x < cWidth; x += gridSize) {
        for (let y = 0; y < cHeight; y += gridSize) {
            const rndCharIndex = Math.floor(Math.random() * chars.length);
            pixelArray.push(new Pixel(x, y, chars[rndCharIndex], "#ffffff"));
        }
    }
    return pixelArray;
}

function render(image) {
    ctx.fillStyle = "#000000";
    ctx.fillRect(0, 0, cWidth, cHeight);
    ctx.font = "8px Arial";
    // ctx.textAlign = "center";
    image.forEach((dot) => {
        ctx.fillStyle = dot.color;
        const text = ctx.measureText(dot.char);
        ctx.fillText(dot.char, dot.x + (gridSize - text.width) / 2, dot.y);
    });
}

const image = devConstruct();
render(image);

// file.
