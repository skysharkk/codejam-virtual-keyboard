// eslint-disable-next-line import/extensions
import Render from './render.js';

const render = new Render();
const textArea = document.querySelector('.text');

render.addTextArea();
render.createKey('EN');
render.addContent();

document.querySelectorAll('.key').forEach((value) => {
  if (!value.classList.contains('specialized_keys')) {
    value.addEventListener('click', () => {
      textArea.focus();
      textArea.setRangeText(value.innerText, textArea.selectionStart, textArea.selectionEnd, 'end');
    });
  }
});
