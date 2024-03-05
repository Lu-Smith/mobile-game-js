import Game from './classGame';

export default class Obstacle {
    game: Game;
    spriteWidth: number;
    spriteHeigth: number;
    scaledWidth: number;
    scaledHeigth: number;
    x: number;
    y: number;

    constructor(game: Game, x: number) {
        this.game = game;
        this.spriteWidth = 120;
        this.spriteHeigth = 120;
        this.scaledWidth = this.spriteWidth * this.game.ratio;
        this.scaledHeigth = this.spriteHeigth * this.game.ratio;
        this.x = x;
        this.y = this.game.height * 0.5 - this.scaledHeigth;
    }
    update() {
        this.x -= this.game.speed;
    } 
    draw(){
        this.game.context.fillRect(this.x, this.y, this.scaledWidth, this.scaledHeigth);
    }
    resize(){
        this.scaledWidth = this.spriteWidth * this.game.ratio;
        this.scaledHeigth = this.spriteHeigth * this.game.ratio;
    }
}