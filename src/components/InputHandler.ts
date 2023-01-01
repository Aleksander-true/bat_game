export default class InputHandler {
  kyes: Set<string>;

  constructor() {
    this.kyes = new Set();
    document.addEventListener('keydown', (e) => {
      if (
        e.key === 'ArrowDown'
        || e.key === 'ArrowUp'
        || e.key === 'ArrowLeft'
        || e.key === 'ArrowRight'
      ) {
        this.kyes.add(e.key);
      }
    });

    document.addEventListener('keyup', (e) => {
      if (
        e.key === 'ArrowDown'
        || e.key === 'ArrowUp'
        || e.key === 'ArrowLeft'
        || e.key === 'ArrowRight'
      ) {
        this.kyes.delete(e.key);
      }
    });
  }
}
