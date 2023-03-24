

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
    destination.findOrthogonalNeighbors();
    // removes newly connected from available neighbors
    let neighborIndex = this.availableNeighbors.indexOf(destination);
    this.availableNeighbors.splice(neighborIndex,1);
    // draws new tile and the path representing the connection
    drawPath(this,destination,color)
  }
  
  // finds available neighbors on the X-Y axis
 findOrthogonalNeighbors() {
  let x = this.position.x;
  let y = this.position.y;

  // check north
  checkInDirection(this,x,y - distance);
 // check south
  checkInDirection(this,x,y + distance);
 // check west
  checkInDirection(this,x - distance,y);
 // check east
  checkInDirection(this,x + distance,y);
}

 // finds available neighbors on the diagonals
 findDiagonalNeighbors() {
  let x = this.position.x;
  let y = this.position.y;

  // check north-west
  checkInDirection(this,x - distance,y- distance);
  // check south-east
  checkInDirection(this,x + distance,y+ distance);
  // check south+west
  checkInDirection(this,x - distance,y+ distance);
  // check north-east
  checkInDirection(this,x + distance,y- distance);

}

 // finds available neighbors in all directions
 findAllNeighborsInAllDirections() {
  let x = this.position.x;
  let y = this.position.y;

    // check north
    checkInDirection(this,x,y - distance);
    // check south
     checkInDirection(this,x,y + distance);
    // check west
     checkInDirection(this,x - distance,y);
    // check east
     checkInDirection(this,x + distance,y);
     // check north-west
  checkInDirection(this,x - distance,y- distance);
  // check south-east
  checkInDirection(this,x + distance,y+ distance);
  // check south+west
  checkInDirection(this,x - distance,y+ distance);
  // check north-east
  checkInDirection(this,x + distance,y- distance);
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
  ctx.lineWidth=pathWidth;
  ctx.moveTo(startX, startY);
  ctx.lineTo(endX, endY);
  ctx.stroke();
}


function checkInDirection(currentTile,possibleX,possibleY){
  if (!isOutOfGrid(possibleX, possibleY)) {
    let possibleNeighbor = getTile(possibleX, possibleY, tiles);
    if (!currentTile.connectsTo.includes(possibleNeighbor)) {
      currentTile.availableNeighbors.push(possibleNeighbor);
    }
  }
}