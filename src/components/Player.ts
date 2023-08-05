import InputHandler from './InputHandler';
// eslint-disable-next-line import/no-cycle
import Target from './Target';

/* eslint-disable @typescript-eslint/lines-between-class-members */

type Direction = {
  down: boolean;
  up: boolean;
  left: boolean;
  right: boolean;
};
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
  canvasElement: HTMLCanvasElement;
  scaleX: number;
  scaleY: number;
  shiftX: number;
  shiftY: number;

  constructor(imageId: string, context: CanvasRenderingContext2D) {
    this.canvasElement = context.canvas;
    this.gameWidth = context.canvas.width;
    this.gameHeight = context.canvas.height;
    this.width = this.gameWidth * 0.1;
    this.height = this.gameHeight * 0.1;
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
    const rect = this.canvasElement.getBoundingClientRect();
    this.scaleX = rect.width / this.gameWidth;
    this.scaleY = rect.height / this.gameHeight;
    this.shiftX = rect.left;
    this.shiftY = rect.top;
  }

  draw(context: CanvasRenderingContext2D): void {
    context.drawImage(
      this.image, this.frame * this.imageWidth, 0,
      this.imageWidth, this.imageHeight,
      this.x, this.y, this.width, this.height,
    );
  }

  getDirection():Direction {
    const { keys, isMouseControl, mouse } = this.input;

    const mouseX = (mouse.x - this.shiftX) / this.scaleX;
    const mouseY = (mouse.y - this.shiftY) / this.scaleY;
    const direction = {
      down: false, up: false, left: false, right: false,
    };
    if (isMouseControl) {
      direction.down = mouseY - (this.y + this.height / 2) > this.speed * 1.7;
      direction.up = (this.y + this.height / 2) - mouseY > this.speed;
      direction.left = (this.x + this.width / 2) - mouseX > this.speed;
      direction.right = mouseX - (this.x + this.width / 2) > this.speed;
    } else {
      direction.down = keys.has('ArrowDown');
      direction.up = keys.has('ArrowUp');
      direction.left = keys.has('ArrowLeft');
      direction.right = keys.has('ArrowRight');
    }
    console.log('mouseX', mouseX, 'mouseY', mouseY, 'direction', direction, 'Player', this.x, this.y);
    return direction;
  }

  update(targets: Target[]): void {
    const direction = this.getDirection();
    if (direction.down && this.y < this.gameHeight - this.height) {
      this.y += this.speed * 1.7;
      this.gameFrame--;
    }
    if (direction.up && this.y > 0) {
      this.y -= this.speed;
      this.gameFrame++;
    }
    if (direction.left && this.x >= 0) this.x -= this.speed;
    if (direction.right && this.x < this.gameWidth - this.width) this.x += this.speed;
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
