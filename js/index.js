const distance = 2; // every other tile is a possible neighbor
let dungeonTiles = []; // only the tiles that are part of the dungeon
let allNeighbors = []; // frontier of available neighbors

//we begin at the center of the map
let gridCenter = getTile(Math.floor(columns / 2), Math.floor(rows / 2), tiles);

//createPrimsMaze(gridCenter, 25);
createDiagonalMaze(gridCenter, 25)

// draw the dungeon
drawGraph(dungeonTiles);

// creates maze on the X-Z axis
function createPrimsMaze(startingPoint, size) {
  dungeonTiles.push(gridCenter);
  gridCenter.findAvailableNeighbors();
  allNeighbors = allNeighbors.concat(startingPoint.availableNeighbors);
  let currentTile = startingPoint;
  size--;

  while (allNeighbors != 0 && size > 0) {
    // get a random neighbor and remove from frontier
    let randomNeighbor = allNeighbors[Math.floor(Math.random() * allNeighbors.length)];
    let randomNeighorIndex = allNeighbors.indexOf(randomNeighbor);
    allNeighbors.splice(randomNeighorIndex, 1);

    //currentTile.connectToTile(randomNeighbor);
    dungeonTiles.push(randomNeighbor);

    // get the neighbors of the neighbor to the frontier
    randomNeighbor.findAvailableNeighbors();

    // if there are available neighbors
    if (randomNeighbor.availableNeighbors.length > 0) {
      randomNeighbor.availableNeighbors.forEach((neighbor) => {
        if (dungeonTiles.includes(neighbor)) {
          randomNeighbor.connectToTile(neighbor);
        }
      });

      // add them to the frontier if they are not already part of it, or of the dungeon
      randomNeighbor.availableNeighbors.forEach((neighbor) => {
        if (!allNeighbors.includes(neighbor) && !dungeonTiles.includes(neighbor)) {
          allNeighbors.push(neighbor);
        }
      });
      currentTile = randomNeighbor;
      size--;
    }
  }
}

// draws the rooms of the graph
function drawGraph(tilearray) {
  tilearray.forEach((tile) => {
    tile.paintSquare();
  });
}


// creates maze on the Diagonal axis
function createDiagonalMaze(startingPoint, size) {
  dungeonTiles.push(gridCenter);
  gridCenter.findDiagonalNeighbors();
  allNeighbors = allNeighbors.concat(startingPoint.availableNeighbors);
  let currentTile = startingPoint;
  size--;

  while (allNeighbors != 0 && size > 0) {
    // get a random neighbor and remove from frontier
    let randomNeighbor = allNeighbors[Math.floor(Math.random() * allNeighbors.length)];
    let randomNeighorIndex = allNeighbors.indexOf(randomNeighbor);
    allNeighbors.splice(randomNeighorIndex, 1);

    //currentTile.connectToTile(randomNeighbor);
    dungeonTiles.push(randomNeighbor);

    // get the neighbors of the neighbor to the frontier
    randomNeighbor.findDiagonalNeighbors();

    // if there are available neighbors
    if (randomNeighbor.availableNeighbors.length > 0) {
      randomNeighbor.availableNeighbors.forEach((neighbor) => {
        if (dungeonTiles.includes(neighbor)) {
          randomNeighbor.connectToTile(neighbor);
        }
      });

      // add them to the frontier if they are not already part of it, or of the dungeon
      randomNeighbor.availableNeighbors.forEach((neighbor) => {
        if (!allNeighbors.includes(neighbor) && !dungeonTiles.includes(neighbor)) {
          allNeighbors.push(neighbor);
        }
      });
      currentTile = randomNeighbor;
      size--;
    }
  }
}