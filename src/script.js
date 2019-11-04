// eslint-disable-next-line import/extensions
import Render from './render.js';

const render = new Render();

function saveLanguage() {
  if (!localStorage.lang) {
    localStorage.setItem('lang', 'EN');
  }
}

function changeLanguage() {
  if (localStorage.lang === 'EN') {
    localStorage.lang = 'RU';
    render.setLanguage(localStorage.lang);
  } else if (localStorage.lang === 'RU') {
    localStorage.lang = 'EN';
    render.setLanguage(localStorage.lang);
  }
}

saveLanguage();

render.addTextArea();
render.createKey();
render.addContent();
render.setLanguage(localStorage.lang);

const textArea = document.querySelector('.text');

function changeSymbol(classElement) {
  document.querySelectorAll(classElement).forEach((item) => {
    item.children[0].classList.toggle('hidden');
    item.children[1].classList.toggle('hidden');
  });
}

function addSymbol(value) {
  textArea.focus();
  textArea.setRangeText(value, textArea.selectionStart, textArea.selectionEnd, 'end');
}

function getCursorPosition(start, end, text) {
  textArea.focus();
  textArea.value = text.slice(0, start) + text.slice(end, text.length);
  textArea.setRangeText('', start, start, 'end');
}


document.querySelectorAll('.key').forEach((value) => {
  if (!value.classList.contains('specialized_keys')) {
    value.addEventListener('click', () => addSymbol(value.innerText));
  }
});

document.querySelector('.caps_lock').addEventListener('click', function changeCapsState() {
  changeSymbol('.letter');
  this.classList.toggle('active');
});

document.querySelector('.shift_left').addEventListener('click', function changeShiftState() {
  const altLeft = document.querySelector('.alt_left');
  if (altLeft.classList.contains('active')) {
    changeLanguage();
    altLeft.classList.remove('active');
  } else {
    changeSymbol('.letter');
    changeSymbol('.shift');
    this.classList.toggle('active');
  }
});

document.querySelector('.shift_right').addEventListener('click', function changeShiftState() {
  const altRight = document.querySelector('.alt_right');
  if (altRight.classList.contains('active')) {
    changeLanguage();
    altRight.classList.remove('active');
  } else {
    changeSymbol('.letter');
    changeSymbol('.shift');
    this.classList.toggle('active');
  }
});

document.querySelector('.enter').addEventListener('click', () => addSymbol('\n'));

document.querySelector('.tab').addEventListener('click', () => addSymbol('\t'));

document.querySelector('.space').addEventListener('click', () => addSymbol(' '));

document.querySelector('.backspace').addEventListener('click', () => {
  const text = textArea.value;
  const start = textArea.selectionStart - 1;
  const end = textArea.selectionStart;
  getCursorPosition(start, end, text);
});

document.querySelector('.del').addEventListener('click', () => {
  const text = textArea.value;
  const start = textArea.selectionStart;
  const end = textArea.selectionStart + 1;
  getCursorPosition(start, end, text);
});


document.querySelector('.arrow_left').addEventListener('click', () => {
  const text = textArea.value;
  const start = textArea.selectionStart - 1;
  const end = textArea.selectionStart - 1;
  getCursorPosition(start, end, text);
});

document.querySelector('.arrow_right').addEventListener('click', () => {
  const text = textArea.value;
  const start = textArea.selectionStart + 1;
  const end = textArea.selectionStart + 1;
  getCursorPosition(start, end, text);
});

document.querySelector('.alt_left').addEventListener('click', function activeShift() {
  this.classList.toggle('active');
});

document.querySelector('.alt_right').addEventListener('click', function activeShift() {
  this.classList.toggle('active');
});
