import { Grid } from "./Grid.js";
import { Tile } from "./Tile.js"
export class Maze{
    constructor () {
     //   console.log('maze');
        this.grid = new Grid()
    }

    getGrid() { return this.grid; }
}