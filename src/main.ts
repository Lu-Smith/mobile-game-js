import './style.css';
import Game from './classGame';

window.addEventListener('load', function() {
  const canvas = document.getElementById('canvas1') as HTMLCanvasElement;
  if (canvas) {
    const ctx = canvas.getContext('2d');
    canvas.width = 720;
    canvas.height = 720;

    if(ctx) {
      const game = new Game(canvas, ctx);
      
      let lastTime = 0;
      
      function animate(timeStamp: number) {
        const deltaTime = timeStamp - lastTime;
        lastTime = timeStamp;
        ctx?.clearRect(0, 0, canvas.width, canvas.height);
        game.render(deltaTime);
        if (!game.gameOver) requestAnimationFrame(animate);
      }

      requestAnimationFrame(animate);
    }
  }
});
