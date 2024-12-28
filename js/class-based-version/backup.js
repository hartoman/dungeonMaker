
import { TileController } from "./TileController.js";
import { Tile } from "./Tile.js";
import { Grid } from "./Grid.js";
import { GlobalState } from "./GlobalState.js";

export class MazeBuilder {
  constructor() {
    this.initialGrid = this.setUpTiles();
    //   console.log(this.initialGrid)
  }

  createPrimsMaze() {
    const rows = new GlobalState().getVariable("rows");
    const columns = new GlobalState().getVariable("columns");

    const tiles = [];
    let remainingTiles = Math.min(new GlobalState().getVariable("numberOfRooms"),this.initialGrid.length);
    const neighborFrontier = [];

    const gridCenter = this.getTile(Math.floor(columns / 2), Math.floor(rows / 2));
    let currentTile = gridCenter;
    console.log(currentTile)
    // add starting tile to the dungeon rooms array
    tiles.push(gridCenter);
    remainingTiles--;

    // get neighborFrontier of the first
    const initialNeighbors = this.findAvailableNeighbors(currentTile);

    initialNeighbors.forEach(neighbor => {
      if (!neighborFrontier.includes(neighbor) && !tiles.includes(neighbor)) { neighborFrontier.push(neighbor)}
    })


    while (remainingTiles > 0 && neighborFrontier.length!==0) {
     console.log(currentTile)
      // PICK random from the frontier
      const randomNeighbor = neighborFrontier[Math.floor(Math.random() * neighborFrontier.length)];

      // REMOVE FROM neighborFrontier
      const randomNeighorIndex = neighborFrontier.indexOf(randomNeighbor);
      neighborFrontier.splice(randomNeighorIndex, 1);
      
      // add to tiles
      const tileController = new TileController(currentTile);
      tileController.connectToTile(randomNeighbor);
      tiles.push(randomNeighbor);

      // get the new available neighbors
      const availableNeighbors = this.findAvailableNeighbors(currentTile);
      availableNeighbors.forEach(neighbor => {
        if (!neighborFrontier.includes(neighbor) && !tiles.includes(neighbor)) { neighborFrontier.push(neighbor) }
      })
      // add them to the frontier
   
      // change point of reference and reduce size counter
      currentTile = randomNeighbor;
      remainingTiles--;
    }
  //  console.log(tiles);
    return tiles;
  }

  // returns tile with selected coordinates from given array
  getTile(x, y) {
    const tileset = this.initialGrid;
    // Check if the coordinates are out of the grid
    if (this.isOutOfGrid(x, y)) {
      return null;
    }

    // Find and return the tile with the specified coordinates
    return tileset.find((tile) => tile.getX() === x && tile.getY() === y);
  }

  findAvailableNeighbors(tile) {
    const neighbors = {
      above: { x: tile.getX(), y: tile.getY() - 1 },
      below: { x: tile.getX(), y: tile.getY() + 1 },
      left: { x: tile.getX() - 1, y: tile.getY() },
      right: { x: tile.getX() + 1, y: tile.getY() },
    };

    const possibleNeighbors = [];
    const availableNeighbors = [];

    const aboveTile = this.getTile(neighbors.above.x, neighbors.above.y);
    const belowTile = this.getTile(neighbors.below.x, neighbors.below.y);
    const leftTile = this.getTile(neighbors.left.x, neighbors.left.y);
    const rightTile = this.getTile(neighbors.right.x, neighbors.right.y);

    possibleNeighbors.push(aboveTile);
    possibleNeighbors.push(belowTile);
    possibleNeighbors.push(leftTile);
    possibleNeighbors.push(rightTile);

    possibleNeighbors.forEach((neighbor) => {
      if (neighbor) {
        availableNeighbors.push(neighbor);
      }
    });
    return availableNeighbors;
  }

  // returns true if selected coordinates are out of grid
  isOutOfGrid(x, y) {
    const gs = new GlobalState();
    const rows = gs.getVariable("rows");
    const columns = gs.getVariable("columns");
    if (y < 1 || y > rows - 1 || x < 1 || x > columns - 1) {
      return true;
    }
    return false;
  }

  // initialize tiles array
  setUpTiles() {
    const globalState = new GlobalState();
    const rows = globalState.getVariable("rows");
    const columns = globalState.getVariable("columns");
    const tiles = [];
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
    return tiles;
    //console.log(tiles.length);
  }
}
