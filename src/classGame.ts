import Player from './player';

export default class Game {
    canvas: HTMLCanvasElement;
    context: CanvasRenderingContext2D;
    width: number;
    height: number;
    player: Player;

    constructor(canvas: HTMLCanvasElement, context: CanvasRenderingContext2D) {
        this.canvas = canvas;
        this.context = context;
        this.width = this.canvas.width;
        this.height = this.canvas.height;
        this.player = new Player(this);

        this.resize(window.innerWidth, window.innerHeight);

        window.addEventListener('resize', e => {
            console.log(e.currentTarget.innerWidth);
            this.resize(e.currentTarget.innerWidth, e.currentTarget.innerHeight)       
        })
    }
    resize(width: number, height: number) {
        this.canvas.width = width;
        this.canvas.height = height;
        this.context.fillStyle = 'red';
        this.width = this.canvas.width;
        this.height = this.canvas.height;
    }
    render() {
        this.player.update();
        this.player.draw();
    }
}