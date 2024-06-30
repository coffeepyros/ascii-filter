// DOM
const canvas = document.querySelector("canvas");
const form = document.querySelector("form");
const file = document.querySelector("#file");

const ctx = canvas.getContext("2d");

// CANVAS CONFIG
const gridSize = 8;
const cWidth = 1080;
const cHeight = 1080;

// Each "dot" of the final image - representation of 8x8 pixel square in original image
class Pixel {
    constructor(x, y, char, color) {
        this.x = x;
        this.y = y;
        this.char = char;
        this.color = color;
    }
}

// Temporary to get the code working - after that use real image data
function devConstruct() {
    const chars = ["", ".", "+", "-", "/", "\\", "o", "O"]; // "█"
    const pixelArray = [];
    for (let y = 0; y < cHeight; y += gridSize) {
        for (let x = 0; x < cWidth; x += gridSize) {
            const rndCharIndex = Math.floor(Math.random() * chars.length);
            pixelArray.push(new Pixel(x, y, chars[rndCharIndex], "#fff"));
        }
    }
    console.log(pixelArray);
    return pixelArray;
}

// File Upload
let upload = null;

form.addEventListener("submit", (e) => {
    e.preventDefault();
    upload = document.createElement("img");
    upload.src = URL.createObjectURL(file.files[0]);
    form.append(upload);
});

// Draws canvas
function render(image) {
    ctx.fillStyle = "#000000";
    ctx.strokeStyle = "#333333";
    ctx.fillRect(0, 0, cWidth, cHeight);
    ctx.font = `${gridSize}px Arial`;
    ctx.textBaseline = "top";
    image.forEach((dot) => {
        ctx.fillStyle = dot.color;
        ctx.strokeRect(dot.x, dot.y, gridSize, gridSize);
        const text = ctx.measureText(dot.char);
        const textHeight =
            text.actualBoundingBoxAscent + text.actualBoundingBoxDescent;
        ctx.fillText(
            dot.char,
            dot.x + (gridSize - text.width) / 2,
            dot.y
            // dot.x + (gridSize - text.width) / 2,
            // dot.y + (gridSize - textHeight) / 2
        );
    });
    // ctx.drawImage(upload, 0, 0);
}

// Run Forest, Run!
const image = devConstruct();
render(image);

// file.
