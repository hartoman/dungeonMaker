class Tile {
  constructor({ position }) {
    this.position = position;
    this.tileColor = color;
    this.centerX = this.position.x * columnWidth - 1 + columnWidth / 2;
    this.centerY = this.position.y * rowHeight - 1 + rowHeight / 2;
    this.connectsTo=[];
    this.availableNeighbors=[];
  }

  paintSquare() {
    ctx.fillStyle = this.tileColor;
    ctx.fillRect(this.position.x * columnWidth, this.position.y * rowHeight, columnWidth, rowHeight);
    
    // marks the center of the tile
    //ctx.fillStyle = "red";
    //ctx.fillRect(this.centerX, this.centerY, 2, 2);
  }

  printTile() {
    console.log(this.position.x, this.position.y);
  }

  // connects two tiles of the grid
  connectToTile(destination){
    // updates the lists of connected neighbors for both tiles
    this.connectsTo.push(destination)
    destination.connectsTo.push(this)
    // creates list of available neighbors for newly connected tile
    destination.findAvailableNeighbors();
    // removes newly connected from available neighbors
    let neighborIndex = this.availableNeighbors.indexOf(destination);
    this.availableNeighbors.splice(neighborIndex,1);


   /* TODO: MAY REMOVE IF NO PROBLEMS
   this.availableNeighbors = this.availableNeighbors.filter(function( tile ) {
      return tile !== destination;
  });
    */

    // draws new tile and the path representing the connection
    drawPath(this,destination,color)
  }
  
  // finds available neighbors on the X-Y axis
 findAvailableNeighbors() {
  let x = this.position.x;
  let y = this.position.y;
  let neighbors = [];

  // check north
  let possibleX = x;
  let possibleY = y - distance;
  let possibleNeighbor;
  if (!isOutOfGrid(possibleX, possibleY)) {
    possibleNeighbor = getTile(possibleX, possibleY, tiles);
    if (!this.connectsTo.includes(possibleNeighbor)) {
      neighbors.push(possibleNeighbor);
    }
  }

  // check south
  possibleX = x;
  possibleY = y + distance;
  if (!isOutOfGrid(possibleX, possibleY)) {
    possibleNeighbor = getTile(possibleX, possibleY, tiles);
    if (!this.connectsTo.includes(possibleNeighbor)) {
      neighbors.push(possibleNeighbor);
    }
  }

  // check west
  possibleX = x - distance;
  possibleY = y;
  if (!isOutOfGrid(possibleX, possibleY)) {
    possibleNeighbor = getTile(possibleX, possibleY, tiles);
    if (!this.connectsTo.includes(possibleNeighbor)) {
      neighbors.push(possibleNeighbor);
    }
  }

  // check east
  possibleX = x + distance;
  possibleY = y;
  if (!isOutOfGrid(possibleX, possibleY)) {
    possibleNeighbor = getTile(possibleX, possibleY, tiles);
    if (!this.connectsTo.includes(possibleNeighbor)) {
      neighbors.push(possibleNeighbor);
    }
  }
  this.availableNeighbors = neighbors;
}
}

// sums up drawing a line
function drawPath(startTile,endTile, color) {
  let startX=startTile.centerX;
  let startY=startTile.centerY;
  let endX=endTile.centerX;
  let endY=endTile.centerY;
  ctx.strokeStyle = color;
  // so that it does not affect gtid
  ctx.beginPath();
  ctx.lineWidth=10;
  ctx.moveTo(startX, startY);
  ctx.lineTo(endX, endY);
  ctx.stroke();
}

