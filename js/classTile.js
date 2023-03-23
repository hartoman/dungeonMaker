class Tile {
  constructor({ position }) {
    this.position = position;
    this.tileColor = "gray";
    this.centerX = this.position.x * columnWidth - 1 + columnWidth / 2;
    this.centerY = this.position.y * rowHeight - 1 + rowHeight / 2;
  }

  paintSquare() {
    ctx.fillStyle = this.tileColor;
    ctx.fillRect(this.position.x * columnWidth, this.position.y * rowHeight, columnWidth, rowHeight);

    // marks the center of the tile
    ctx.fillStyle = "red";
    ctx.fillRect(this.centerX, this.centerY, 2, 2);
  }

  printTile() {
    console.log(this.position.x, this.position.y);
  }
}

function setUpTiles() {
  tiles = [];
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
  //console.log(tiles.length);
}

function assignTile(x, y, tilearray) {
  return tilearray.find((item) => item.position.x === x && item.position.y === y);
}
