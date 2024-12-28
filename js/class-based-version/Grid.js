import { GlobalState } from "./GlobalState.js";
import { MazeBuilder } from "./MazeBuilder.js";

export class Grid {
  constructor() {
    this.rows = setRowsFromGS();
    this.columns = calcColumns(this.rows);
    const mb = new MazeBuilder()
  //  console.log('eeeegrid');
    this.tiles = mb.createPrimsMaze();
  }

  getRows() {
    return this.rows;
  }
  getColumns() {
    return this.columns;
  }

  // returns tile with selected coordinates from given array
  static getTile(grid, x, y) {
    // Check if the coordinates are out of the grid
    if (isOutOfGrid(x, y, grid)) {
      return null; // or undefined, depending on your preference
    }

    // Find and return the tile with the specified coordinates
    return grid.getTiles().find((item) => item.x === x && item.y === y);
  }

  // Function to check if the coordinates are out of the grid
  static isOutOfGrid(x, y, grid) {
    return y < 1 || y > grid.rows - 1 || x < 1 || x > grid.columns - 1;
  }

  // Assuming getTiles is defined in the grid class
  getTiles() {
    return this.tiles;
  }

  setTiles(tiles) {
    this.tiles = tiles;
  }
}

// calculates the columns so that they are proportional to the rows
function calcColumns(rows) {
  const globalState = new GlobalState();
  const width = globalState.getVariable("canvasWidth");
  const height = globalState.getVariable("canvasHeight");
  let ratio = width / height;
  const columns = Math.floor(rows * ratio);
  // console.log(width, height);
  globalState.setVariable("columns", columns);
  return columns;
}

function setRowsFromGS() {
  const globalState = new GlobalState();
  return globalState.getVariable("rows");
}
