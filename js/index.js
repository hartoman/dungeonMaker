let rows = 11;  // for symmetry give odd number
let columns;
let columnWidth;
let rowHeight;
let width = canvas.width;
let height = canvas.height;

// setup important variables based on num rows
calcColumns();
drawGrid("white");

//we begin at the center of the map
let start = new Tile(Math.floor(columns/2),Math.floor(rows/2));
start.printTile();
start.paintSquare();



// calculates the columns so that they are proportional to the rows
function calcColumns() {
  let ratio = width / height;
  columns = Math.floor(rows * ratio);
  columnWidth = width / columns;
  rowHeight = height / rows;
}

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
  ctx.setLineDash([]);
  ctx.lineWidth = 1;
  ctx.stroke();
}

