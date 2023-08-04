/* eslint-disable @typescript-eslint/lines-between-class-members */
export class Modal {
  overlay: HTMLDivElement;
  modal: HTMLDivElement;

  constructor() {
    this.modal = document.createElement('div');
    this.modal.classList.add('modal_window');

    this.overlay = document.createElement('div');
    this.overlay.classList.add('modal_overlay', 'close');

    this.overlay.append(this.modal);
    document.body.append(this.overlay);
  }

  put(element: HTMLElement):void {
    this.modal.innerHTML = '';
    this.modal.append(element);
    this.overlay.classList.remove('close');
  }

  close():void {
    this.overlay.classList.add('close');
  }
}

export const modal = new Modal();
