import Charge from '../src/assets/media/charge.mp3';
import Flap1 from '../src/assets/media/flap1.mp3';
import Flap2 from '../src/assets/media/flap2.mp3';
import Flap3 from '../src/assets/media/flap3.mp3';
import Flap4 from '../src/assets/media/flap4.mp3';
import Flap5 from '../src/assets/media/flap5.mp3';
import Win from '../src/assets/media/win.mp3';
import Lose from '../src/assets/media/lose.mp3';

export default class AudioControls {
    charge: HTMLAudioElement;
    flap1: HTMLAudioElement;
    flap2: HTMLAudioElement;
    flap3: HTMLAudioElement;
    flap4: HTMLAudioElement;
    flap5: HTMLAudioElement;
    flapSounds: HTMLAudioElement[]; 
    win: HTMLAudioElement;
    lose: HTMLAudioElement;
    createAudioElement: (src: string) => HTMLAudioElement;

    constructor() {
        this.createAudioElement = (src: string) => {
            const audio = document.createElement('audio');
            audio.src = src;
            return audio;
        };

        this.charge = this.createAudioElement(Charge);
        this.flap1 = this.createAudioElement(Flap1);
        this.flap2 = this.createAudioElement(Flap2);
        this.flap3 = this.createAudioElement(Flap3);
        this.flap4 = this.createAudioElement(Flap4);
        this.flap5 = this.createAudioElement(Flap5);
        this.win = this.createAudioElement(Win);
        this.lose = this.createAudioElement(Lose);
        this.flapSounds = [this.flap1, this.flap2, this.flap3, this.flap4, this.flap5];
    }
    play(sound: HTMLAudioElement ) {
        sound.currentTime = 0;
        sound.play();
    }
}