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
        this.y = 0;
        this.spriteWidth = 200;
        this.spriteHeight = 200;
        this.width = 0;
        this.height = 0;
        this.speedY = 0;
    }
    draw() {
        this.game.context.fillRect(this.x, this.y, this.width, this.height);
    }
    update() {
        this.y += this.speedY;
        if (!this.isTouchingBottom()) {
            this.speedY += this.game.gravity;
        }

        if (this.isTouchingBottom()) {
            this.y = this.game.height - this.height;
        }
    } 
    resize() {
        this.width = this.spriteWidth * this.game.ratio;
        this.height = this.spriteHeight * this.game.ratio;
        this.y = this.game.height * 0.5 - this.height * 0.5;
        this.speedY = -4 * this.game.ratio;
    }
    isTouchingBottom() {
        return this.y >= this.game.height - this.height;
    }
}