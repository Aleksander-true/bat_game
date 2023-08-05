/* eslint-disable @typescript-eslint/lines-between-class-members */
export default class InputHandler {
  keys: Set<string>;
  isMouseControl: boolean;
  mouse: { x: number, y: number };

  constructor() {
    this.keys = new Set();
    this.isMouseControl = false;
    document.addEventListener('keydown', (e) => {
      if (
        e.key === 'ArrowDown'
        || e.key === 'ArrowUp'
        || e.key === 'ArrowLeft'
        || e.key === 'ArrowRight'
      ) {
        this.isMouseControl = false;
        this.keys.add(e.key);
      }
    });

    document.addEventListener('keyup', (e) => {
      if (
        e.key === 'ArrowDown'
        || e.key === 'ArrowUp'
        || e.key === 'ArrowLeft'
        || e.key === 'ArrowRight'
      ) {
        this.keys.delete(e.key);
      }
    });

    document.addEventListener('click', (e) => {
      const target = e.target as HTMLElement;
      if (target && target.id === 'canvas') {
        this.isMouseControl = true;
      }
    });
    this.mouse = { x: 0, y: 0 };
    document.addEventListener('mousemove', (e) => {
      this.mouse.x = e.clientX;
      this.mouse.y = e.clientY;
    });
  }
}
