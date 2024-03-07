export default class AudioControls {
    charge: HTMLAudioElement 

    constructor() {
        this.charge = document.getElementById('charge') as HTMLAudioElement ;
    }
    play(sound: HTMLAudioElement ) {
        sound.currentTime = 0;
        sound.play();
    }
}