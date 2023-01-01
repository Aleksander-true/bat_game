/* eslint-disable @typescript-eslint/lines-between-class-members */
import Player from './Player';
import Target from './Target';

export default class App {
  ctx: CanvasRenderingContext2D;
  canvasWidth: number;
  canvasHeight: number;
  player: Player;
  targets: Target[];
  bite: HTMLAudioElement;
  score: number;
  timeStart: number;

  constructor() {
    this.canvasWidth = 2000;
    this.canvasHeight = 1200;
    this.targets = [];
    this.player = new Player('player_img', this.canvasWidth, this.canvasHeight);
    this.createTargets(10);

    const canvas = document.createElement('canvas');
    canvas.id = 'canvas';
    canvas.width = this.canvasWidth;
    canvas.height = this.canvasHeight;
    document.body.append(canvas);
    this.ctx = canvas.getContext('2d') as CanvasRenderingContext2D;
    this.bite = new Audio('bite_1.ogg');
    this.score = 0;
    this.timeStart = Date.now();
  }

  start() {
    const animate = () => {
      this.ctx.clearRect(0, 0, this.canvasWidth, this.canvasHeight);
      this.player.draw(this.ctx);
      this.player.update(this.targets);

      this.targets.forEach((target, i) => {
        if (target.isCatched) {
          this.targets.splice(i, 1);
          this.bite.play();
          this.score++;
        } else {
          target.draw(this.ctx);
          target.update(this.player);
        }
      });

      this.ctx.font = '50px serif';
      this.ctx.fillStyle = 'yellow';
      this.ctx.fillText(`Мух съедено: ${this.score}`, 20, 60);
      this.ctx.fillText(`Мух осталось: ${this.targets.length}`, 20, 120);
      const currentTime = Date.now();
      if ((currentTime - this.timeStart) >= 8000) {
        this.timeStart = currentTime;
        this.createTargets(1);
      }
      if (!this.targets.length) {
        this.ctx.font = '120px serif';
        this.ctx.fillRect(0, (this.canvasHeight / 2) - 120, this.canvasWidth, 200);
        this.ctx.fillStyle = 'black';
        this.ctx.fillText('ВЫ ВЫГРАЛИ!', 600, this.canvasHeight / 2 + 30);
      } else {
        requestAnimationFrame(animate);
      }
    };

    animate();
  }

  createTargets(quntity:number) {
    for (let i = 0; i < quntity; i++) {
      this.targets.push(new Target('target_img', this.canvasWidth, this.canvasHeight));
    }
  }
}
