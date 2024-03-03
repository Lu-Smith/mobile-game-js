import Game from './classGame';

export default class Player {
    game: Game;
    x: number;
    y: number;
    width: number;
    height: number;
    spriteWidth: number;
    spriteHeight: number;
    speedY = 0;

    constructor(game: Game) {
        this.game =  game;
        this.x = 50;
        this.y = 60;
        this.spriteWidth = 200;
        this.spriteHeight = 200;
        this.width = 200;
        this.height = 200;
        this.speedY = 0;
    }
    draw() {
        this.game.context.fillRect(this.x, this.y, this.width, this.height);
    }
    update() {
        this.y += this.speedY;
        if (this.y < this.game.height - this.height) {
            this.speedY += this.game.gravity;
        }

        if (this.y >= this.game.height - this.height) {
            this.y = this.game.height - this.height;
        }
    } 
    resize() {
        this.width = this.spriteWidth * this.game.ratio;
        this.height = this.spriteHeight * this.game.ratio;
    }
}