import Player from './player';
import Background from './background';
import Obstacle from './obstacle';

export default class Game {
    canvas: HTMLCanvasElement;
    context: CanvasRenderingContext2D;
    width: number;
    height: number;
    player: Player;
    obstacles: Obstacle[];
    numberOfObstacles: number;
    background: Background;
    baseHeight: number;
    ratio: number;
    gravity: number;
    speed: number;
    score: number;
    gameOver: boolean;
    timer: number;

    constructor(canvas: HTMLCanvasElement, context: CanvasRenderingContext2D) {
        this.canvas = canvas;
        this.context = context;
        this.width = this.canvas.width;
        this.height = this.canvas.height;
        this.baseHeight = 720;
        this.ratio = Number((this.height /this.baseHeight).toFixed(2));
        this.background = new Background(this);
        this.player = new Player(this);
        this.obstacles = [];
        this.numberOfObstacles = 1;
        this.gravity = 0; 
        this.speed = 0;
        this.score = 0;
        this.gameOver = false;
        this.timer = 0;
        

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

        //mouse controls
         window.addEventListener('keydown', e => {
            if (e.key === ' ' || e.key === 'Enter') this.player.flap();
        });

        //mouse controls
        this.canvas.addEventListener('touchstart', () => {
            this.player.flap();
        });
    }
    resize(width: number, height: number) {
        this.canvas.width = width;
        this.canvas.height = height;
        this.context.fillStyle = 'blue';
        this.context.textAlign = 'right';
        this.context.lineWidth = 3;
        this.context.strokeStyle = 'white';
        this.context.font = '15px Bungee';
        this.width = this.canvas.width;
        this.height = this.canvas.height;
        this.ratio = Number((this.height /this.baseHeight).toFixed(2));
        this.gravity = 0.15 * this.ratio;
        this.speed = 2 * this.ratio;
        this.background.resize();
        this.player.resize();
        this.createObstacles();
        this.obstacles.forEach(obstacle => {
            obstacle.resize();
        })
        this.score = 0;
        this.gameOver = false;
        this.timer = 0;

    }
    render(deltaTime: number) {
        if (!this.gameOver) this.timer += deltaTime;
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
    formatTimer() {
        return (this.timer * 0.001).toFixed(1);
    }
    drawStatusText() {
        this.context.save();
        this.context.fillText('Score: ' + this.score, this.width - 10, 30);
        this.context.textAlign = 'left';
        this.context.fillText('Timer: ' + this.formatTimer(), 10, 30); 
        if (this.gameOver) {
            this.context.textAlign = 'center';
            this.context.font = '30px Bungee';
            this.context.fillText('GameOver', this.width * 0.5, this.height * 0.5);
        }
        this.context.restore();
    }
}