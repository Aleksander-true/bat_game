/* eslint-disable @typescript-eslint/lines-between-class-members */
import Boom from './Boom';
import loseText from './loseText';
import { modal, Modal } from './modal/Modal';
import Player from './Player';
import scoreText from './scoreText';
import Target from './Target';
import timeText from './timeText';
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
  secondsForLevel: number;
  timeOfLastCreateTarget: number;
  modal: Modal;

  constructor() {
    this.modal = modal;
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
    this.timeOfLastCreateTarget = this.timeStart;
    this.secondsForLevel = 10;
  }

  start():void {
    this.animate();
  }

  animate():void {
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

    const currentTime = Date.now();
    scoreText(this.ctx, this.score, this.targets.length);
    const isTimeUp = timeText(this.ctx, this.secondsForLevel, this.timeStart, currentTime);
    if ((currentTime - this.timeOfLastCreateTarget) >= 8000) {
      this.timeOfLastCreateTarget = currentTime;
      this.createTargets(1);
    }
    if (this.targets.length && !isTimeUp) {
      requestAnimationFrame(this.animate.bind(this));
    } else if (isTimeUp) {
      loseText(this.ctx);
    } else {
      winText(this.ctx);
    }
  }

  createTargets(quantity:number):void {
    for (let i = 0; i < quantity; i++) {
      this.targets.push(new Target('enemy_fly.png', this.canvasWidth, this.canvasHeight, 6));
    }
  }

  addBoom(target:Target):void {
    this.booms.push(new Boom('boom.png', this.canvasWidth, this.canvasHeight, 5, target));
  }
}
