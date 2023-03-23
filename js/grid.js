const rows = 11; // for symmetry give odd number
let columns;
let columnWidth;
let rowHeight;
let width = canvas.width;
let height = canvas.height;
let tiles = [];
const color = "gray";

// setup important variables based on num rows
calcColumns();
// draws empty grid
//drawGrid("white");
// creates empty tiles
setUpTiles();

// calculates the columns so that they are proportional to the rows
function calcColumns() {
  let ratio = width / height;
  columns = Math.floor(rows * ratio);
  columnWidth = width / columns;
  rowHeight = height / rows;
}

// draws grid on canvas
function drawGrid(gridColor) {
  // prepares the rows and columns
  for (let i = 0; i < rows; i++) {
    ctx.moveTo(0, i * rowHeight);
    ctx.lineTo(width, i * rowHeight);
  }
  for (let i = 0; i < columns; i++) {
    ctx.moveTo(i * columnWidth, 0);
    ctx.lineTo(i * columnWidth, height);
  }

  // actually draws the lines
  ctx.strokeStyle = `${gridColor}`;
  ctx.lineWidth = 1;
  ctx.stroke();
}

// initialize tiles array
function setUpTiles() {
  tiles = [];
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < columns; j++) {
      tiles.push(
        new Tile({
          position: {
            x: j,
            y: i,
          },
        })
      );
    }
  }
  //console.log(tiles.length);
}

// returns tile with selected coordinates from given array
function getTile(x, y, tilearray) {
  if (!isOutOfGrid(x, y)) {
    return tilearray.find((item) => item.position.x === x && item.position.y === y);
  }
}

// returns true if selected coordinates are out of grid
function isOutOfGrid(x, y) {
  if ((y < 0) || (y > rows-1) || (x < 0) || (x > columns)) {
    return true;
  }
  return false;
}
