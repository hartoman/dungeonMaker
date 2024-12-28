// adds the HTMLCanvasElement for the Intellisense
/** @type {HTMLCanvasElement} */
import { GlobalState } from "./GlobalState.js";

export class CanvasController {
  constructor(id) {
    this.canvas = document.getElementById(id);
    this.ctx = this.canvas.getContext("2d");
    this.canvasBoundingBox = this.canvas.getBoundingClientRect();
    this.columnWidth = 0;
    this.rowHeight = 0;  
    this.rectWidth = 40;// TODO INITIALIZE based on viewport
    this.rectHeight = 40;
  }

  setupCanvas() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.canvas.width = this.canvas.clientWidth;
    this.canvas.height = this.canvas.clientHeight;
    const globalState = new GlobalState();
    globalState.setVariable("canvasWidth", this.canvas.width);
    globalState.setVariable("canvasHeight", this.canvas.height);
  }


  drawMaze(tiles) {
    console.log();
    const globalState = new GlobalState();
    const columnWidth = globalState.getVariable('canvasWidth') / globalState.getVariable('columns')
    const rowHeight = globalState.getVariable('canvasHeight') / globalState.getVariable('rows')
    this.ctx.fillStyle = "gray";
    this.ctx.lineWidth = 5;
    this.ctx.strokeStyle = "gray";

    // Define the rectangle's dimensions
    tiles.forEach((tile) => {
      this.paintTile(tile, columnWidth, rowHeight)
      
      const neighbors = tile.getConnectsTo();
  //    console.log(neighbors)
      neighbors.forEach(neighbor => {
        this.drawPath(tile,neighbor,columnWidth,rowHeight)
      })
    }); 
  }

  paintTile(tile, columnWidth, rowHeight) {
    const x = tile.getX()
      const y= tile.getY()
    this.ctx.fillStyle = "gray";
    this.ctx.fillRect(x * columnWidth,y * rowHeight, this.rectWidth, this.rectHeight);
    this.ctx.fillStyle = "limegreen";
    this.ctx.fillText(`${x},${y}`, x * columnWidth,y * rowHeight);
  }


  // sums up drawing a line
  drawPath(startTile, endTile,columnWidth,rowHeight) {

    
  let startX=startTile.getX()*columnWidth+this.rectWidth/2;
  let startY=startTile.getY()*rowHeight+this.rectHeight/2;
  let endX=endTile.getX()*columnWidth+this.rectWidth/2;
  let endY=endTile.getY()*rowHeight+this.rectHeight/2;
 
  // so that it does not affect gtid
  this.ctx.beginPath();
  this.ctx.moveTo(startX, startY);
  this.ctx.lineTo(endX, endY);
  this.ctx.stroke();
}

  setValue(canvasWidth, canvasHeight) {
    const globalState = new GlobalState();

  }
}
