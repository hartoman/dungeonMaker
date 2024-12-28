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
    let remainingTiles = Math.min(new GlobalState().getVariable("numberOfRooms"), this.initialGrid.length);
    const neighborFrontier = [];
  
    const gridCenter = this.getTile(Math.floor(columns / 2), Math.floor(rows / 2));
    let currentTile = gridCenter;
  
    // Get immediate neighbors of the starting tile as a starting neighbor frontier
    const initialNeighbors = this.findAvailableNeighbors(currentTile);
    initialNeighbors.forEach((neighbor) => {
      if (!neighborFrontier.includes(neighbor) && !tiles.includes(neighbor)) {
        neighborFrontier.push(neighbor);
      }
    });
  
    // Add starting tile to the dungeon rooms array
    tiles.push(gridCenter);
    remainingTiles--;
  
    while (remainingTiles > 0 && neighborFrontier.length !== 0) {

      // Pick a random neighbor from the frontier
      const randomFromFrontier = neighborFrontier[Math.floor(Math.random() * neighborFrontier.length)];
        
      // Add the selected neighbor to the tiles
      tiles.push(randomFromFrontier);
 
      // Get the immediate neighbors of the newly added tile
      const availableNeighbors = this.findAvailableNeighbors(randomFromFrontier);
      if (availableNeighbors.length) {
        availableNeighbors.forEach((neighbor) => {
          if (tiles.includes(neighbor)) {
            const tileController = new TileController(randomFromFrontier);
            // make sure that there is always at least one connection
            if (!randomFromFrontier.getConnectsTo().length) {
              tileController.connectToTile(neighbor);
            } else {
              
              if (Math.random()<new GlobalState().getVariable('loopChance'))
              tileController.connectToTile(neighbor);
            }
      
           
            }
          // Ensure we only add immediate neighbors that are not already in tiles or the frontier
          else if (!neighborFrontier.includes(neighbor)) {
            neighborFrontier.push(neighbor);
          }
        });
      }

      // Remove the selected neighbor from the frontier
      const randomNeighborIndex = neighborFrontier.indexOf(randomFromFrontier);
      neighborFrontier.splice(randomNeighborIndex, 1);
  
      // Update the current tile to the newly added tile
      currentTile = randomFromFrontier;
      remainingTiles--;
    }
  
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
    if (y < 0 || y > rows  || x < 0 || x > columns ) {
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
console.log(tiles.length);
    return tiles;
    
  }
}
