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
    minSpeed: number;
    maxSpeed: number;
    eventTimer: number;
    eventInterval: number;
    eventUpdate: boolean;
    touchStartX: number;
    swipeDistance: number;
    debug: boolean;

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
        this.numberOfObstacles = 5;
        this.gravity = 0; 
        this.speed = 0;
        this.score = 0;
        this.gameOver = false;
        this.timer = 0;
        this.message1 = '';
        this.message2 = '';
        this.minSpeed = 0;
        this.maxSpeed = 0;
        this.eventTimer = 0;
        this.eventInterval = 150;
        this.eventUpdate = false;
        this.touchStartX = 0;
        this.swipeDistance = 50;
        this.debug = false;
        
        this.resize(window.innerWidth, window.innerHeight);

        window.addEventListener('resize', (e: UIEvent) => {
            const target = e.currentTarget as Window;
            if (target) {
                this.resize(target.innerWidth, target.innerHeight);
            }
        }); 

        //mouse controls      
        this.canvas.addEventListener('mousedown', () => {
            this.player.flap();
        });           

        this.canvas.addEventListener('mouseup', () => {          
            this.player.wingsUp();
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

        //mouse controls
        this.canvas.addEventListener('touchstart', e => {
            this.player.flap();
            this.touchStartX = e.changedTouches[0].pageX;
        });

        this.canvas.addEventListener('touchmove', e => {
            if (e.changedTouches[0].pageX - this.touchStartX > this.swipeDistance) {
                this.player.startCharge();
            }
        })
    }
    resize(width: number, height: number) {
        this.canvas.width = width;
        this.canvas.height = height;
        // this.context.fillStyle = 'blue';
        this.context.textAlign = 'right';
        this.context.lineWidth = 3;
        this.context.strokeStyle = 'white';
        this.context.font = '15px Bungee';
        this.width = this.canvas.width;
        this.height = this.canvas.height;
        this.ratio = Number((this.height /this.baseHeight).toFixed(2));

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
    drawStatusText() {   
        this.context.save();  
        this.context.fillText('Score: ' + this.score, this.width - 10, 30);
        this.context.textAlign = 'left';
        this.context.fillText('Timer: ' + this.formatTimer(), 10, 30); 
        if (this.gameOver) {
            if (this.player.collided) {
                this.message1 = 'Getting rusty?';
                this.message2 = 'Collision time ' +  this.formatTimer() + ' seconds!' ;
            } else if (this.obstacles.length <= 0) {
                this.message1 = 'Nailed it!';
                this.message2 = 'Can you do it faster than ' +  this.formatTimer() + ' seconds?';
            }
            this.context.textAlign = 'center';
            this.context.font = '30px Bungee';
            this.context.fillText(this.message1, this.width * 0.5, this.height * 0.5 - 40);
            this.context.font = '15px Bungee';
            this.context.fillText(this.message2, this.width * 0.5, this.height * 0.5 - 20);
            this.context.fillText('Press "R" to try again!', this.width * 0.5, this.height * 0.5);
        }
        if (this.player.energy <= this.player.minEnergy) this.context.fillStyle = 'red';
        else if (this.player.energy >= this.player.maxEnergy - 5) this.context.fillStyle = 'green';
        for (let i = 0; i < this.player.energy; i++) {
            this.context.fillRect(10, this.height - 20 - this.player.barSize * i, 4 * this.player.barSize, this.player.barSize);
        } 
        this.context.restore();
    }
}