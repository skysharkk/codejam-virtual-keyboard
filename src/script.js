// eslint-disable-next-line import/extensions
import Render from './render.js';

const render = new Render();

render.addTextArea();
render.createKey('EN');
render.addContent();

const textArea = document.querySelector('.text');

document.querySelectorAll('.key').forEach((value) => {
  if (!value.classList.contains('specialized_keys')) {
    value.addEventListener('click', () => {
      textArea.focus();
      textArea.setRangeText(value.innerText, textArea.selectionStart, textArea.selectionEnd, 'end');
    });
  }
});

document.querySelector('.caps_lock').addEventListener('click', function changeCapsLockStatus() {
  document.querySelectorAll('.letter').forEach((item) => {
    item.children[0].classList.toggle('hidden');
    item.children[1].classList.toggle('hidden');
  });
  this.classList.toggle('active');
});

document.querySelector('.shift_left').addEventListener('click', function changeCapsLockStatus() {
  document.querySelectorAll('.letter').forEach((item) => {
    item.children[0].classList.toggle('hidden');
    item.children[1].classList.toggle('hidden');
  });
  document.querySelectorAll('.shift').forEach((item) => {
    item.children[0].classList.toggle('hidden');
    item.children[1].classList.toggle('hidden');
  });
  this.classList.toggle('active');
});

document.querySelector('.backspace').addEventListener('click', () => {

});
