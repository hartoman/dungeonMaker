// adds the HTMLCanvasElement for the Intellisense
/** @type {HTMLCanvasElement} */

// defines canvas
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const canvasBoundingBox = canvas.getBoundingClientRect();

// game state paused
let isPaused = true;

// SETUP CODE STARTS
setupCanvas();

// normalizes the canvas pixels to the actual on-screen dimensions
function setupCanvas() {
  let width = canvas.clientWidth;
  let height = canvas.clientHeight;
  canvas.width = width;
  canvas.height = height;
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}

// animates the canvas context if the game state is not paused
function animate() {
  if (!isPaused) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    updateAll();
  }
  window.requestAnimationFrame(animate);
}

// updates the position of all sprites on screen
function updateAll() {
  player.update();
}

