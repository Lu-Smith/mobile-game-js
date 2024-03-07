import Game from './classGame';

export default class Player {
    game: Game;
    x: number;
    y: number;
    width: number;
    height: number;
    spriteWidth: number;
    spriteHeight: number;
    speedY: number;
    flapSpeed: number;
    collisionX: number;
    collisionY: number;
    collisionRadius: number;
    collided: boolean;
    energy: number;
    maxEnergy: number;
    minEnergy: number;
    charging: boolean;
    barSize: number;
    image: CanvasImageSource;
    frameY: number;

    constructor(game: Game) {
        this.game =  game;
        this.x = 20;
        this.y = 0;
        this.spriteWidth = 200;
        this.spriteHeight = 200;
        this.width = 0;
        this.height = 0;
        this.speedY = 0;
        this.flapSpeed = 0;
        this.collisionX = 0;
        this.collisionY = 0;
        this.collisionRadius = 0;
        this.collided = false;
        this.energy = 30;
        this.maxEnergy = this.energy * 2;
        this.minEnergy = 15;
        this.charging = false;
        this.barSize = 0;
        this.image = document.getElementById('player_fish') as CanvasImageSource;
        this.frameY = 0;
    }
    update() {
        this.handleEnergy();
        if (this.speedY >= 0) this.wingsUp();
        this.y += this.speedY;
        this.collisionY = this.y + this.height * 0.5;
        if (!this.isTouchingBottom() && !this.charging) {
            this.speedY += this.game.gravity;
        } else {
            this.speedY = 0;    
        }

        if (this.isTouchingBottom()) {
            this.y = this.game.height - this.height;
            this.wingsIdle();
        }
    } 
    draw() {
        this.game.context.drawImage(this.image, 0, this.frameY * this.spriteHeight, this.spriteWidth, this.spriteHeight, this.x, this.y, this.width, this.height);
        if (this.game.debug) {
            this.game.context.beginPath();
            this.game.context.arc(this.collisionX, this.collisionY, 
                this.collisionRadius, 0, Math.PI * 2);
            this.game.context.stroke();
        }
    }
    resize() {
        this.width = this.spriteWidth * this.game.ratio;
        this.height = this.spriteHeight * this.game.ratio;
        this.y = this.game.height * 0.5 - this.height * 0.5;
        this.speedY = -8 * this.game.ratio;
        this.flapSpeed = 5 * this.game.ratio;
        this.collisionRadius = this.width * 0.3;  
        this.collisionX = this.x + this.width * 0.5;
        this.collided = false;
        this.barSize = Math.floor(5 * this.game.ratio);
        this.frameY = 0;
        this.charging = false;
    }
    startCharge() {
        this.charging = true;
        this.game.speed = this.game.maxSpeed;
        this.wingsCharge();
    }
    stopCharge() {
        this.charging = false;
        this.game.speed = this.game.minSpeed;
        this.wingsIdle();
    }
    wingsIdle() {
        this.frameY = 0;
    }
    wingsDown() {
        if (!this.charging ) this.frameY = 1;
    }
    wingsUp() {
        if (!this.charging ) this.frameY = 2;
    }
    wingsCharge() {
        this.frameY = 3;
    }
    isTouchingTop() {
        return this.y <= 100;
    }
    isTouchingBottom() {
        return this.y >= this.game.height - this.height;
    }
    handleEnergy() {
        if (this.game.eventUpdate) {
            if (this.energy < this.maxEnergy) {
                this.energy +=  1;
            }
            if (this.charging) {
                this.energy -= 4           ;     
                if (this.energy <= 0) {
                    this.energy = 0;
                    this.stopCharge();  
                }
            }
        }
    } 
    flap() {          
        this.stopCharge();
        if(!this.isTouchingTop()) {
            this.speedY = -this.flapSpeed;
            this.wingsDown();          
        }
      
    }
}