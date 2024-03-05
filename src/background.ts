import Game from './classGame';

class Background {
    game: Game;
    image: CanvasImageSource;
    width: number;
    height: number;
    
    constructor(game: Game) {
        this.game = game;
        this.image = document.getElementById('background') as CanvasImageSource;
        this.width = 2400;
        this.height = 720;
    }
}