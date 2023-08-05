import createDialog from './Dialog';

type Fn = ()=>void;
export function yesNoDialog(text:string, yesCallback:Fn, noCallback:Fn): HTMLElement {
  const yesBtn: DialogBtn = { text: 'Продолжить', callback: yesCallback, type: 'yes' };
  const noBtn: DialogBtn = { text: 'Выйти', callback: noCallback, type: 'no' };
  const dialog = createDialog(text, noBtn, yesBtn);
  return dialog;
}
