import './style.css'
import { setupCounter } from './counter.ts'

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
    <canvas id="canvas1"></canvas>
`

setupCounter(document.querySelector<HTMLButtonElement>('#counter')!)
