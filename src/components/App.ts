/* eslint-disable @typescript-eslint/lines-between-class-members */
import Boom from './Boom';
import Player from './Player';
import scoreText from './scoreText';
import Target from './Target';
import winText from './winText';

export default class App {
  ctx: CanvasRenderingContext2D;
  canvasWidth: number;
  canvasHeight: number;
  player: Player;
  targets: Target[];
  bite: HTMLAudioElement;
  score: number;
  timeStart: number;
  booms: Boom[];

  constructor() {
    this.canvasWidth = 2000;
    this.canvasHeight = 1200;
    this.targets = [];
    this.booms = [];
    this.player = new Player('player_img', this.canvasWidth, this.canvasHeight);
    this.createTargets(10);

    const canvas = document.createElement('canvas');
    canvas.id = 'canvas';
    canvas.width = this.canvasWidth;
    canvas.height = this.canvasHeight;
    document.body.append(canvas);
    this.ctx = canvas.getContext('2d') as CanvasRenderingContext2D;
    this.bite = new Audio('bite_1.ogg');
    this.bite.load();
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
          this.bite.currentTime = 0;
          this.bite.play();
          this.addBoom(target);
          this.score++;
        } else {
          target.draw(this.ctx);
          target.update(this.player);
        }
      });

      this.booms.forEach((boom, i) => {
        if (boom.isFinish) {
          this.booms.splice(i, 1);
        } else {
          boom.draw(this.ctx);
          boom.update();
        }
      });

      scoreText(this.ctx, this.score, this.targets.length);
      const currentTime = Date.now();
      if ((currentTime - this.timeStart) >= 8000) {
        this.timeStart = currentTime;
        this.createTargets(1);
      }
      if (!this.targets.length) {
        winText(this.ctx, this.canvasWidth, this.canvasHeight);
      } else {
        requestAnimationFrame(animate);
      }
    };

    animate();
  }

  createTargets(quntity:number) {
    for (let i = 0; i < quntity; i++) {
      this.targets.push(new Target('enemy_fly.png', this.canvasWidth, this.canvasHeight, 6));
    }
  }

  addBoom(target:Target) {
    this.booms.push(new Boom('boom.png', this.canvasWidth, this.canvasHeight, 5, target));
  }
}
