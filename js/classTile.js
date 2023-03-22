class Tile{
    constructor (x,y){
      this.x=x;
      this.y=y;
      this.tileColor="gray";
      this.centerX= this.x*columnWidth-1 + columnWidth/2;
      this.centerY= this.y*rowHeight-1 + rowHeight/2;
      }
      

  
      paintSquare(){
        ctx.fillStyle= this.tileColor;
        ctx.fillRect(this.x*columnWidth, this.y*rowHeight, columnWidth, rowHeight);

        // marks the center of the tile
        ctx.fillStyle= "red";
        ctx.fillRect(this.centerX, this.centerY, 2, 2);
      }
  
      printTile(){
        console.log(this.x,this.y)
      }
  }