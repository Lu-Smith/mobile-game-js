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
        this.numberOfObstacles = 10;
        this.gravity = 0;
        this.speed = 0;

        this.resize(window.innerWidth, window.innerHeight);

        window.addEventListener('resize', (e: UIEvent) => {
            const target = e.currentTarget as Window;
            if (target) {
                this.resize(target.innerWidth, target.innerHeight);
            }
        }); 

        //mouse controls      
        this.canvas.addEventListener('mousedown', e => {
            this.player.flap();
        });  

        //mouse controls
         window.addEventListener('keydown', e => {
            if (e.key === ' ' || e.key === 'Enter') this.player.flap();
        });

        //mouse controls
        this.canvas.addEventListener('touchstart', e => {
            this.player.flap();
        });
    }
    resize(width: number, height: number) {
        this.canvas.width = width;
        this.canvas.height = height;
        this.context.fillStyle = 'blue';
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
    }
    render() {
        this.background.update();
        this.background.draw();
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
}