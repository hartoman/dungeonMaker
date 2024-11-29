const distance = 2; // every other tile is a possible neighbor
let dungeonTiles = []; // only the tiles that are part of the dungeon
let allNeighbors = []; // frontier of available neighbors
const pathWidth = rowHeight / 10; // the thiccness of the drawn lines for paths

//we begin at the center of the map
let gridCenter = getTile(Math.floor(columns / 2), Math.floor(rows / 2), tiles);

// string direction: Orthogonal, Diagonal, All
 createPrimsMaze(gridCenter, 40,"Orthogonal");
// createPrimsMaze(gridCenter, 50,"Diagonal");
// createPrimsMaze(gridCenter, 50, "All");

// draw the dungeon
drawGraph(dungeonTiles);

/** Creates maze with reverse Prims algorithm
 *
 * @param {Tile} startingPoint : the starting tile of the maze
 * @param {Number} size : number of rooms
 * @param {String} axis : Orthogonal, Diagonal, All
 */
function createPrimsMaze(startingPoint, size, axis) {
  // add starting tile to the dungeon rooms array
  dungeonTiles.push(gridCenter);

  // get initial neighbors
  switch (axis) {
    case "Orthogonal":
      gridCenter.findOrthogonalNeighbors();
      break;
    case "Diagonal":
      gridCenter.findDiagonalNeighbors();
      break;
    case "All":
      gridCenter.findAllNeighborsInAllDirections();
      break;
  }
  allNeighbors = allNeighbors.concat(startingPoint.availableNeighbors);

  // start iteration here
  let currentTile = startingPoint;
  size--;

  // repeat until an end condition is satisfied
  while (allNeighbors != 0 && size > 0) {
    // get a random neighbor and remove from frontier
    let randomNeighbor = allNeighbors[Math.floor(Math.random() * allNeighbors.length)];
    let randomNeighorIndex = allNeighbors.indexOf(randomNeighbor);
    allNeighbors.splice(randomNeighorIndex, 1);

    //currentTile.connectToTile(randomNeighbor);
    dungeonTiles.push(randomNeighbor);

    // get the neighbors of the neighbor to the frontier
    switch (axis) {
      case "Orthogonal":
        randomNeighbor.findOrthogonalNeighbors();
        break;
      case "Diagonal":
        randomNeighbor.findDiagonalNeighbors();
        break;
      case "All":
        randomNeighbor.findAllNeighborsInAllDirections();
        break;
    }

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
      // change point of reference and reduce size counter
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
