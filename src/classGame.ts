import Player from './player';
import Background from './background';

export default class Game {
    canvas: HTMLCanvasElement;
    context: CanvasRenderingContext2D;
    width: number;
    height: number;
    player: Player;
    background: Background;
    baseHeight: number;
    ratio: number;
    gravity: number;

    constructor(canvas: HTMLCanvasElement, context: CanvasRenderingContext2D) {
        this.canvas = canvas;
        this.context = context;
        this.width = this.canvas.width;
        this.height = this.canvas.height;
        this.baseHeight = 720;
        this.ratio = Number((this.height /this.baseHeight).toFixed(2));
        this.background = new Background(this);
        this.player = new Player(this);
        this.gravity = 0;

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
        this.context.fillStyle = 'red';
        this.width = this.canvas.width;
        this.height = this.canvas.height;
        this.ratio = Number((this.height /this.baseHeight).toFixed(2));
        this.gravity = 0.15 * this.ratio;
        this.player.resize();
    }
    render() {
        this.background.update();
        this.background.draw();
        this.player.update();
        this.player.draw();
    }
}