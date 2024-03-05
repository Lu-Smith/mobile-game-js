import Game from './classGame';

export default class Obstacle {
    game: Game;
    spriteWidth: number;
    spriteHeigth: number;
    scaledWidth: number;
    scaledHeigth: number;
    x: number;
    y: number;
    speedY = 2;

    constructor(game: Game, x: number) {
        this.game = game;
        this.spriteWidth = 120;
        this.spriteHeigth = 120;
        this.scaledWidth = this.spriteWidth * this.game.ratio;
        this.scaledHeigth = this.spriteHeigth * this.game.ratio;
        this.x = x;
        this.y = Math.random() * (this.game.height - this.scaledHeigth);
        this.speedY = Math.random() < 0.5  ? -1 * this.game.ratio : 1 * this.game.ratio;
    }
    update() {
        this.x -= this.game.speed;
        this.y += this.speedY;
        if (this.y <= 0 || this.y >= this.game.height - this.scaledHeigth) {
            this.speedY *= -1;
        }
    } 
    draw(){
        this.game.context.fillRect(this.x, this.y, this.scaledWidth, this.scaledHeigth);
    }
    resize(){
        this.scaledWidth = this.spriteWidth * this.game.ratio;
        this.scaledHeigth = this.spriteHeigth * this.game.ratio;
    }
}