import Game from './classGame';

export default class Background {
    game: Game;
    image: CanvasImageSource;
    width: number;
    height: number;
    x: number;
    
    constructor(game: Game) {
        this.game = game;
        this.image = document.getElementById('background') as CanvasImageSource;
        this.width = 2400;
        this.height = this.game.baseHeight;
        this.x = 0;
    }
    update(){

    }
    draw(){
        this.game.context.drawImage(this.image, this.x, 0);
    }
}