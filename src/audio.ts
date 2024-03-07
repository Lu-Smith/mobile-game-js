export default class AudioControls {
    charge: HTMLAudioElement;
    flap1: HTMLAudioElement;

    constructor() {
        this.charge = document.getElementById('charge') as HTMLAudioElement ;
        this.flap1 = document.getElementById('flap1') as HTMLAudioElement ;
    }
    play(sound: HTMLAudioElement ) {
        sound.currentTime = 0;
        sound.play();
    }
}