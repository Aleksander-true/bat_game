import InputHandler from './InputHandler';
// eslint-disable-next-line import/no-cycle
import Target from './Target';

/* eslint-disable @typescript-eslint/lines-between-class-members */
export default class Player {
  height: number;
  width: number;
  x: number;
  y: number;
  image: HTMLImageElement;
  frame: number;
  speed: number;
  gameWidth: number;
  gameHeight: number;
  input: InputHandler;
  framesNumber: number;
  imageWidth: number;
  imageHeight: number;
  animationSpeed: number;
  gameFrame: number;

  constructor(imageId: string, gameWidth: number, gameHeight: number) {
    this.gameWidth = gameWidth;
    this.gameHeight = gameHeight;
    this.width = gameWidth * 0.1;
    this.height = gameHeight * 0.1;
    this.x = this.gameWidth / 2 - this.width / 2;
    this.y = this.gameHeight / 2 - this.height / 2;
    this.image = document.getElementById(imageId) as HTMLImageElement;
    this.frame = 0;
    this.framesNumber = 6;
    this.imageWidth = 499 / this.framesNumber;
    this.imageHeight = 44;
    this.speed = 12;
    this.animationSpeed = 0.4;
    this.gameFrame = 0;
    this.input = new InputHandler();
  }

  draw(context: CanvasRenderingContext2D): void {
    context.drawImage(
      this.image, this.frame * this.imageWidth, 0,
      this.imageWidth, this.imageHeight,
      this.x, this.y, this.width, this.height,
    );
  }

  update(targets: Target[]): void {
    if (this.input.kyes.has('ArrowDown') && this.y < this.gameHeight - this.height) {
      this.y += this.speed;
      this.gameFrame--;
    }
    if (this.input.kyes.has('ArrowUp') && this.y > 0) {
      this.y -= this.speed;
      this.gameFrame++;
    }
    if (this.input.kyes.has('ArrowLeft') && this.x >= 0) this.x -= this.speed;
    if (this.input.kyes.has('ArrowRight') && this.x < this.gameWidth - this.width) this.x += this.speed;
    this.gameFrame += 2;
    this.frame = Math.floor(this.gameFrame * this.animationSpeed) % this.framesNumber;

    targets.forEach((target) => {
      const dx = target.x - this.x;
      const dy = target.y - this.y;

      const distance = Math.sqrt(dx ** 2 + dy ** 2);
      if (distance < target.height / 2 + this.height / 2) {
        target.isCatched = true;
      }
    });
  }
}
