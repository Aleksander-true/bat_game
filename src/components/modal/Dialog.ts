import { createButton } from '../Buttons/Button';

export default function createDialog(text: string, ...btns: DialogBtn[]): HTMLElement {
  const dialog = document.createElement('div');
  dialog.classList.add('modal_dialog');
  dialog.innerHTML = `<div class="dialog_text">${text}<div>`;

  btns.forEach((btn) => {
    const button = createButton(btn);
    console.log('button', button.onclick);
    dialog.append(button);
  });
  return dialog;
}
