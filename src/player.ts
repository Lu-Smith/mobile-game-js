import Game from './classGame';

export default class Player {
    game: Game;
    x: number;
    y: number;
    width: number;
    height: number;

    constructor(game: Game) {
        this.game =  game;
        this.x = 30;
        this.y = 60;
        this.width = 100;
        this.height = 100;
    }

    draw() {
        this.game.context.fillRect(this.x, this.y, this.width, this.height);
        console.log(this.game.context.fillRect(this.x, this.y, this.width, this.height));
    }
}