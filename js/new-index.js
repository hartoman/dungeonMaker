import { CanvasController } from "./class-based-version/CanvasController.js";
import { Maze } from "./class-based-version/Maze.js";
import {GlobalState} from "./class-based-version/GlobalState.js"


const NUM_ROOMS =36;
const NUM_ROWS = 6;
const LOOP_CHANCE = 0.25; // chance that extra rooms loop, if set to 0 then the maze is in a tree, if 1 then all rooms connect

const globalState = new GlobalState();
const canvasController = new CanvasController('canvas');
initGlobalState();
startCanvas(); 

console.log(globalState)

const maze = new Maze();

// console.log(maze.getGrid().getTiles())
canvasController.drawMaze(maze.getGrid().getTiles());


window.onload = function() {

};
  
function startCanvas() {
    canvasController.setupCanvas();

}

function initGlobalState() {
    globalState.setVariable('numberOfRooms',NUM_ROOMS);
    globalState.setVariable('rows', NUM_ROWS);
    globalState.setVariable('loopChance', LOOP_CHANCE);
}