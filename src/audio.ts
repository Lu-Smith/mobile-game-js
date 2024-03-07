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

    constructor() {
        this.charge = new Audio("/src/assets/sounds/charge.mp3");
        this.flap1 = document.getElementById('flap1') as HTMLAudioElement ;
        this.flap2 = document.getElementById('flap2') as HTMLAudioElement ;
        this.flap3 = document.getElementById('flap3') as HTMLAudioElement ;
        this.flap4 = document.getElementById('flap4') as HTMLAudioElement ;
        this.flap5 = document.getElementById('flap5') as HTMLAudioElement ;
        this.flapSounds = [this.flap1, this.flap2, this.flap3, this.flap4, this.flap5];
        this.win = document.getElementById('win') as HTMLAudioElement ;
        this.lose = document.getElementById('lose') as HTMLAudioElement ;
    }
    play(sound: HTMLAudioElement ) {
        sound.currentTime = 0;
        sound.play();
    }
}