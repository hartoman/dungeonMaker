export class GlobalState {
    constructor() {
        if (GlobalState.instance) {
            return GlobalState.instance;
        }

        this.state = {
            canvasWidth: 0,
            canvasHeight: 0,
            rows: 0,
            columns: 0,
            numberOfRooms:0
        };

        GlobalState.instance = this;
    }

    getVariable(variableName) {
        return this.state[variableName];
    }

    setVariable(variableName,value) {
        this.state[variableName] = value;
    }
}
