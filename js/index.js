const distance = 2;
let dungeonTiles=[];    // only the tiles that are part of the dungeon

//we begin at the center of the map
let gridCenter = getTile(Math.floor(columns / 2), Math.floor(rows / 2), tiles);
gridCenter.paintSquare();

dungeonTiles.push(gridCenter);
gridCenter.findAvailableNeighbors();

// TODO
createGraph(gridCenter);
drawGraph(dungeonTiles);


//TODO
function createGraph(startingPoint) {
  let x = startingPoint.position.x;
  let y = startingPoint.position.y;
  if (!isOutOfGrid(x, y - distance)) {
    newTile =getTile(x, y - distance, tiles);
    startingPoint.connectToTile(newTile);
    dungeonTiles.push(newTile);
  }
}



function drawGraph(tilearray){

    tilearray.forEach(tile => {
        console.log(tile.availableNeighbors);
            });
}