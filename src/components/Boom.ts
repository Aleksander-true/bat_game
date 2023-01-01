import Creachure from './Creachure';
import Target from './Target';

export default class Boom extends Creachure {
  isFinish: boolean;

  constructor(imageSrc: string, gameWidth: number, gameHeight: number, framesNumber: number, target: Target) {
    super(imageSrc, gameWidth, gameHeight, framesNumber);
    this.x = target.x;
    this.y = target.y;
    this.isFinish = false;
  }

  update() {
    if (this.isFinish) return;
    if (this.frame <= this.framesNumber) {
      this.frame = Math.floor(this.gameFrame * this.animationSpeed);
      this.gameFrame++;
    } else {
      this.isFinish = true;
    }
  }
}
