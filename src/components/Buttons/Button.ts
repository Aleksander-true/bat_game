export function createButton({ text, callback, type = '' }: DialogBtn):HTMLButtonElement {
  const button = document.createElement('button');
  button.classList.add('button', type);
  button.textContent = text;
  button.onclick = callback;
  return button;
}
