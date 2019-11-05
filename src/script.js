// eslint-disable-next-line import/extensions
import Render from './render.js';

const render = new Render();

function saveLanguage() {
  if (!localStorage.lang) {
    localStorage.setItem('lang', 'EN');
  }
}

saveLanguage();

render.addTextArea();
render.createKey();
render.addContent();
render.setLanguage(localStorage.lang);

const textArea = document.querySelector('.text');

function changeLanguage() {
  if (localStorage.lang === 'EN') {
    localStorage.lang = 'RU';
    render.setLanguage(localStorage.lang);
  } else if (localStorage.lang === 'RU') {
    localStorage.lang = 'EN';
    render.setLanguage(localStorage.lang);
  }
}

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

function changeCursorPosition(start, end, text) {
  textArea.focus();
  textArea.value = text.slice(0, start) + text.slice(end, text.length);
  textArea.setRangeText('', start, start, 'end');
}

document.querySelectorAll('.key').forEach((value) => {
  if (!value.classList.contains('specialized_keys')) {
    value.addEventListener('click', () => addSymbol(value.innerText));
  }
});

document.querySelector('.caps_lock').addEventListener('click', function () {
  changeSymbol('.letter');
  this.classList.toggle('active');
});

document.querySelector('.shift_left').addEventListener('click', function () {
  const alt = document.querySelector('.alt_left');
  if (alt.classList.contains('active')) {
    changeLanguage();
    alt.classList.remove('active');
    if (document.querySelector('.caps_lock').classList.contains('active')) {
      changeSymbol('.letter');
      document.querySelector('.caps_lock').classList.add('active');
    }
  } else {
    changeSymbol('.letter');
    changeSymbol('.shift');
    this.classList.toggle('active');
  }
});

document.querySelector('.shift_right').addEventListener('click', function () {
  const alt = document.querySelector('.alt_right');
  if (alt.classList.contains('active')) {
    changeLanguage();
    alt.classList.remove('active');
    if (document.querySelector('.caps_lock').classList.contains('active')) {
      changeSymbol('.letter');
      document.querySelector('.caps_lock').classList.add('active');
    }
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
  changeCursorPosition(textArea.selectionStart - 1, textArea.selectionEnd, textArea.value);
});

document.querySelector('.del').addEventListener('click', () => {
  changeCursorPosition(textArea.selectionStart, textArea.selectionEnd + 1, textArea.value);
});

document.querySelector('.arrow_left').addEventListener('click', () => {
  changeCursorPosition(textArea.selectionStart - 1, textArea.selectionStart - 1, textArea.value);
});

document.querySelector('.arrow_right').addEventListener('click', () => {
  changeCursorPosition(textArea.selectionStart + 1, textArea.selectionStart + 1, textArea.value);
});

document.querySelector('.alt_left').addEventListener('click', function activeAlt() {
  this.classList.toggle('active');
});

document.querySelector('.alt_right').addEventListener('click', function activeAlt() {
  this.classList.toggle('active');
});

document.addEventListener('keydown', (event) => {
  const selector = `.${event.code}`;
  const key = document.querySelector(selector);
  if (key.classList.contains('ctrl_left') || key.classList.contains('ctrl_right')) {
    key.classList.add('active');
  } else if (!event.ctrlKey) {
    const altLeft = document.querySelector('.alt_left');
    const altRight = document.querySelector('.alt_right');
    if (!key.classList.contains('specialized_keys')) {
      event.preventDefault();
      addSymbol(key.innerText);
      key.classList.add('active');
    } else if (key.classList.contains('enter')) {
      event.preventDefault();
      addSymbol('\n');
      key.classList.add('active');
    } else if (key.classList.contains('tab')) {
      event.preventDefault();
      addSymbol('\t');
      key.classList.add('active');
    } else if (key.classList.contains('space')) {
      event.preventDefault();
      addSymbol(' ');
      key.classList.add('active');
    } else if (key.classList.contains('backspace')) {
      event.preventDefault();
      changeCursorPosition(textArea.selectionStart - 1, textArea.selectionEnd, textArea.value);
      key.classList.add('active');
    } else if (key.classList.contains('del')) {
      event.preventDefault();
      changeCursorPosition(textArea.selectionStart, textArea.selectionEnd + 1, textArea.value);
      key.classList.add('active');
    } else if (key.classList.contains('caps_lock') && !event.repeat) {
      changeSymbol('.letter');
      key.classList.toggle('active');
    } else if (key.classList.contains('alt_left') || key.classList.contains('alt_right')) {
      event.preventDefault();
      key.classList.add('active');
    } else if (key.classList.contains('arrow_left')) {
      event.preventDefault();
      const start = textArea.selectionStart - 1;
      const end = textArea.selectionEnd - 1;
      changeCursorPosition(start, end, textArea.value);
      key.classList.add('active');
    } else if (key.classList.contains('arrow_right')) {
      event.preventDefault();
      const start = textArea.selectionStart + 1;
      const end = textArea.selectionEnd + 1;
      changeCursorPosition(start, end, textArea.value);
      key.classList.add('active');
    } else if ((key.classList.contains('shift_left') || key.classList.contains('shift_right')) && !event.repeat) {
      if (event.altKey) {
        changeLanguage();
        key.classList.add('active');
        altLeft.classList.add('pressed');
        altRight.classList.add('pressed');
        if (document.querySelector('.caps_lock').classList.contains('active')) {
          changeSymbol('.letter');
          document.querySelector('.caps_lock').classList.add('active');
        }
      } else if (!event.altKey && !altLeft.classList.contains('active')) {
        changeSymbol('.letter');
        changeSymbol('.shift');
        key.classList.add('active');
      }
    }
  }
});

document.addEventListener('keyup', (event) => {
  const selector = `.${event.code}`;
  const key = document.querySelector(selector);
  if (key) {
    const altLeft = document.querySelector('.alt_left');
    const altRight = document.querySelector('.alt_right');
    if (!key.classList.contains('caps_lock')) {
      key.classList.remove('active');
    }
    if (key.classList.contains('shift_left') || key.classList.contains('shift_right')) {
      if ((!event.altKey && !altLeft.classList.contains('pressed')) || (!event.altKey && !altRight.classList.contains('pressed'))) {
        changeSymbol('.letter');
        changeSymbol('.shift');
      }
      altLeft.classList.remove('pressed');
    }
  }
});
