import Game from './classGame';

export default class Obstacle {
    game: Game;
    spriteWidth: number;
    spriteHeigth: number;
    scaledWidth: number;
    scaledHeigth: number;
    x: number;
    y: number;
    speedY: number;
    markedForDeletion: boolean;
    collisionX: number;
    collisionY: number;
    collisionRadius: number;
    image: CanvasImageSource;
    frameX: number;

    constructor(game: Game, x: number) {
        this.game = game;
        this.spriteWidth = 120;
        this.spriteHeigth = 120;
        this.scaledWidth = this.spriteWidth * this.game.ratio;
        this.scaledHeigth = this.spriteHeigth * this.game.ratio;
        this.x = x;
        this.y = Math.random() * (this.game.height - this.scaledHeigth);
        this.collisionX = 0;
        this.collisionY = 0;
        this.collisionRadius = this.scaledWidth * 0.5;
        this.speedY = Math.random() < 0.5  ? -1 * this.game.ratio : 1 * this.game.ratio;
        this.markedForDeletion = false;
        this.image = document.getElementById('smallGears') as CanvasImageSource;
        this.frameX = Math.floor(Math.random() * 4);
    }
    update() {
        this.x -= this.game.speed;
        this.y += this.speedY;
        this.collisionX = this.x + this.scaledWidth * 0.5;
        this.collisionY = this.y + this.scaledHeigth * 0.5;
        if (!this.game.gameOver) {
            if (this.y <= 0 || this.y >= this.game.height - this.scaledHeigth) {
                this.speedY *= -1;
            }
        } else {   
            this.speedY += 0.1;   
        }        
        if (this.isOffScreen()) {
            this.markedForDeletion = true;
            this.game.obstacles = this.game.obstacles.filter(obstacle => !obstacle.markedForDeletion);
            this.game.score++;
            if (this.game.obstacles.length <= 0) {
                this.game.triggerGameOver();
            }  
        }

        if (this.game.checkCollision(this, this.game.player)) {
            this.game.player.collided = true;
            this.game.player.stopCharge();  
            this.game.triggerGameOver();
        } 
    } 
    draw(){
        this.game.context.drawImage(this.image, this.frameX * this.spriteWidth , 0, this.spriteWidth, this.spriteHeigth, this.x, this.y, this.scaledWidth, this.scaledHeigth);
        if (this.game.debug) {
            this.game.context.beginPath();
            this.game.context.arc(this.collisionX, this.collisionY, 
                this.collisionRadius, 0, Math.PI * 2);
            this.game.context.stroke();
        }
    }
    resize(){
        this.scaledWidth = this.spriteWidth * this.game.ratio;
        this.scaledHeigth = this.spriteHeigth * this.game.ratio;
        this.collisionRadius = this.scaledWidth * 0.4;
    }
    isOffScreen() {
        return this.x < -this.scaledWidth || this.y > this.game.height;
    }
}