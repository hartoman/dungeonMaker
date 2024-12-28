export class Tile{
    constructor ({position}) {
        this.x = position.x;
        this.y = position.y;
        this.connectsTo=[];
    }

    getX() { return this.x; }
    getY() { return this.y; }
    getConnectsTo() { return this.connectsTo; }
    addConnectsTo(tile) { this.connectsTo.push(tile); }
}