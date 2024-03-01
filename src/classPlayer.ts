export default class Player {
    game;
    x: number;
    y: number;
    width: number;
    height: number;
    constructor(game) {
        this.game =  game;
        this.x = 0;
        this.y = 0;
        this.width = 100;
        this.height = 100;
    }
}