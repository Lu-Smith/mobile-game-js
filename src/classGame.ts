import Player from './player';
import Background from './background';
import Obstacle from './obstacle';
import AudioControls from './audio';

interface Collidable {
    collisionX: number;
    collisionY: number;
    collisionRadius: number;
}

export default class Game {
    canvas: HTMLCanvasElement;
    context: CanvasRenderingContext2D;
    width: number;
    height: number;
    player: Player;
    obstacles: Obstacle[];
    sound: AudioControls;
    numberOfObstacles: number;
    background: Background;
    baseHeight: number;
    ratio: number;
    gravity: number;
    speed: number;
    score: number;
    gameOver: boolean;
    timer: number;
    message1: string;
    message2: string;
    smallFont: number;
    largeFont: number;
    minSpeed: number;
    maxSpeed: number;
    eventTimer: number;
    eventInterval: number;
    eventUpdate: boolean;
    touchStartX: number;
    swipeDistance: number;
    debug: boolean;
    bottomMargin: number;

    constructor(canvas: HTMLCanvasElement, context: CanvasRenderingContext2D) {
        this.canvas = canvas;
        this.context = context;
        this.width = this.canvas.width;
        this.height = this.canvas.height;
        this.baseHeight = 720;
        this.ratio = Number((this.height /this.baseHeight).toFixed(2));
        this.background = new Background(this);
        this.player = new Player(this);
        this.sound = new AudioControls();
        this.obstacles = [];
        this.numberOfObstacles = 30;
        this.gravity = 0; 
        this.speed = 0;
        this.score = 0;
        this.gameOver = false;
        this.bottomMargin = 0;
        this.timer = 0;
        this.message1 = '';
        this.message2 = '';
        this.smallFont = 20 * this.ratio;
        this.largeFont = 45 * this.ratio;
        this.minSpeed = 0;
        this.maxSpeed = 0;
        this.eventTimer = 0;
        this.eventInterval = 150;
        this.eventUpdate = false;
        this.touchStartX = 0;
        this.swipeDistance = 50;
        this.debug = false;
        
        this.resize(window.innerWidth, window.innerHeight);

        window.addEventListener('resize', e => {
            const target = e.currentTarget as Window;
            if (target) {
                this.resize(target.innerWidth, target.innerHeight);
            }
        }); 

        //mouse controls      
        this.canvas.addEventListener('mousedown', () => {
            this.player.flap();
            if (this.gameOver) this.resize(window.innerWidth, window.innerHeight);
        });           

        this.canvas.addEventListener('mouseup', () => {          
            setTimeout(() => {
                this.player.wingsUp();
            }, 50)
        }); 

        //mouse controls
         window.addEventListener('keydown', e => {
            if (e.key === ' ' || e.key === 'Enter') this.player.flap();
            if (e.key === 'Shift' || e.key.toLowerCase() === 'c') this.player.startCharge();  
            if (e.key.toLowerCase() === 'r') this.resize(window.innerWidth, window.innerHeight);
            if (e.key.toLowerCase() === 'd') this.debug = !this.debug;                 
        });

        window.addEventListener('keyup', () => {
            this.player.wingsUp();              
        });

        //touch controls
        this.canvas.addEventListener('touchstart', e => {
            this.player.flap();
            this.touchStartX = e.changedTouches[0].pageX;
        });

        this.canvas.addEventListener('touchmove', e => {
           e.preventDefault();
        })

        this.canvas.addEventListener('touchend', e => {
            if (!this.gameOver) {
                if (e.changedTouches[0].pageX - this.touchStartX > this.swipeDistance) {
                    this.player.startCharge();
                } else {
                    this.player.flap();
                }
            } else {
                this.resize(window.innerWidth, window.innerHeight);
            }
   
        });
    }
    resize(width: number, height: number) {
        this.canvas.width = width;
        this.canvas.height = height;
        this.context.textAlign = 'right';
        this.context.lineWidth = 1;
        this.context.strokeStyle = 'white';
     
        this.width = this.canvas.width;
        this.height = this.canvas.height;
        this.ratio = Number((this.height /this.baseHeight).toFixed(2));
        this.bottomMargin = Math.floor(50 * this.ratio);
        this.smallFont = Math.ceil(20 * this.ratio);
        this.largeFont = Math.ceil(45 * this.ratio);
        this.context.font = this.smallFont + 'px Bungee';
        this.gravity = 0.15 * this.ratio;
        this.speed = 2 * this.ratio;
        this.minSpeed = this.speed;
        this.maxSpeed = this.speed * 5;
        this.background.resize();
        this.player.resize();
        this.createObstacles();
        this.obstacles.forEach(obstacle => {
            obstacle.resize();
        })
        this.score = 0;
        this.gameOver = false;
        this.timer = 0;
        this.sound = this.sound;

    }
    render(deltaTime: number) {
        if (!this.gameOver) this.timer += deltaTime;
        this.handlePeriodicEvents(deltaTime);
        this.background.update();
        this.background.draw();
        this.drawStatusText();
        this.player.update();
        this.player.draw();
        this.obstacles.forEach(obstacle => {
            obstacle.update();
            obstacle.draw();
        })      
    }
    createObstacles() {
        this.obstacles = [];
        const firstX = this.baseHeight * this.ratio;
        const obstacleSpacing = 600 * this.ratio;
        for (let i = 0; i < this.numberOfObstacles; i++) {
            this.obstacles.push(new Obstacle(this, (firstX + i * obstacleSpacing)));
        }

    }
    checkCollision(a: Collidable, b: Collidable) {
        const dx = a.collisionX - b.collisionX;
        const dy = a.collisionY - b.collisionY;
        const distance = Math.hypot(dx, dy);
        const sumOfRadiuses = a.collisionRadius + b.collisionRadius;
        return distance <= sumOfRadiuses;
    }
    formatTimer() {
        return (this.timer * 0.001).toFixed(1);
    }
    handlePeriodicEvents(deltaTime: number) {
        if (this.eventTimer < this.eventInterval) {
            this.eventTimer += deltaTime;
            this.eventUpdate = false;
        } else {
            this.eventTimer = this.eventTimer % this.eventInterval;
            this.eventUpdate = true;
        }
    }
    triggerGameOver() {
        if (!this.gameOver) { 
            this.gameOver = true; 
            if (this.obstacles.length <= 0 ) { 
                this.sound.play(this.sound.win);
                this.message1 = 'Nailed it!';
                this.message2 = 'Can you do it faster than ' +  this.formatTimer() + ' seconds?';
            } else {   
                this.sound.play(this.sound.lose);
                this.message1 = 'Getting rusty?';
                this.message2 = 'Collision time ' +  this.formatTimer() + ' seconds!';
            }
        }
    }
    drawStatusText() {   
        this.context.save();  
        this.context.fillStyle = '#680747';
        this.context.fillText('Score: ' + this.score, this.width - this.smallFont, this.largeFont);
        this.context.textAlign = 'left';
        this.context.fillStyle = '#113f67';
        this.context.fillText('Timer: ' + this.formatTimer(), this.smallFont, this.largeFont); 
        if (this.gameOver) {
            this.context.textAlign = 'center';
            this.context.fillStyle = '#222831      ';
            this.context.font = this.largeFont + 'px Bungee';
            this.context.fillText(this.message1, this.width * 0.5, this.height * 0.5 - this.largeFont, this.width - 20);
            this.context.font = this.smallFont + 'px Bungee';
            this.context.fillText(this.message2, this.width * 0.5, this.height * 0.5 - this.smallFont, this.width - 40);
            this.context.fillText('Press "R" or tap to try again!', this.width * 0.5, this.height * 0.5, this.width - 40);
           
        }
        if (this.player.energy <= this.player.minEnergy) this.context.fillStyle = 'red';
        else if (this.player.energy >= this.player.maxEnergy - 5) this.context.fillStyle = 'green';
        for (let i = 0; i < this.player.energy; i++) {
            this.context.fillRect(10, this.height - 20 - this.player.barSize * i, 4 * this.player.barSize, this.player.barSize);
        } 
        this.context.restore();
    }
}