export class TileController{
    constructor (tile) {
        this.tile = tile;
    }

    connectToTile(targetTile) {
        this.tile.addConnectsTo(targetTile)
        targetTile.addConnectsTo(this.tile)
 
    }
    
}