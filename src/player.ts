import Game from './classGame';

export default class Player {
    game: Game;
    x: number;
    y: number;
    width: number;
    height: number;
    spriteWidth: number;
    spriteHeight: number;

    constructor(game: Game) {
        this.game =  game;
        this.x = 50;
        this.y = 60;
        this.spriteWidth = 200;
        this.spriteHeight = 200;
        this.width = 200;
        this.height = 200;
    }

    draw() {
        this.game.context.fillRect(this.x, this.y, this.width, this.height);
    }
    update() {
        // this.x++;
    } 
    resize() {
        this.width = this.spriteWidth * this.game.ratio;
        this.height = this.spriteHeight * this.game.ratio;
    }
}