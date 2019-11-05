export default class Render {
  constructor() {
    this.englishLayout = [
      '`', 1, 2, 3, 4, 5, 6, 7, 8, 9, 0, '-', '=', 'BACKSPACE',
      'TAB', 'q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p', '[', ']', 'DEL',
      'CapsLock', 'a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', ';', '&apos;', '&bsol;', 'ENTER',
      'SHIFT', 'z', 'x', 'c', 'v', 'b', 'n', 'm', ',', '.', '/', 'SHIFT R',
      'CTRL', 'ALT', 'SPACE', 'ALT R', 'CTR R', '&#9204;', '&#9205;',
    ];
    this.russianLayout = [
      'ё', 1, 2, 3, 4, 5, 6, 7, 8, 9, 0, '-', '=', 'BACKSPACE',
      'TAB', 'й', 'ц', 'у', 'к', 'е', 'н', 'г', 'ш', 'щ', 'з', 'х', 'ъ', 'DEL',
      'CapsLock', 'ф', 'ы', 'в', 'а', 'п', 'р', 'о', 'л', 'д', 'ж', 'э', '&bsol;', 'ENTER',
      'SHIFT', 'я', 'ч', 'с', 'м', 'и', 'т', 'ь', 'б', 'ю', '.', 'SHIFT R',
      'CTRL', 'ALT', 'SPACE', 'ALT R', 'CTR R', '&#9204;', '&#9205;',
    ];
    this.keyboardCode = ['Backquote', 'Digit1', 'Digit2', 'Digit3', 'Digit4', 'Digit5', 'Digit6', 'Digit7', 'Digit8', 'Digit9', 'Digit0', 'Minus', 'Equal', 'Backspace', 'Tab', 'KeyQ', 'KeyW', 'KeyE', 'KeyR', 'KeyT', 'KeyY', 'KeyU', 'KeyI', 'KeyO', 'KeyP', 'BracketLeft', 'BracketRight', 'Delete', 'CapsLock', 'KeyA', 'KeyS', 'KeyD', 'KeyF', 'KeyG', 'KeyH', 'KeyJ', 'KeyK', 'KeyL', 'Semicolon', 'Quote', 'Backslash', 'Enter', 'ShiftLeft', 'KeyZ', 'KeyX', 'KeyC', 'KeyV', 'KeyB', 'KeyN', 'KeyM', 'Comma', 'Period', 'Slash', 'ShiftRight', 'ControlLeft', 'AltLeft', 'Space', 'AltRight', 'ControlRight', 'ArrowLeft', 'ArrowRight'];
    this.specializedKeys = {
      BACKSPACE: 'backspace',
      TAB: 'tab',
      DEL: 'del',
      CapsLock: 'caps_lock',
      ENTER: 'enter',
      SHIFT: 'shift_left',
      'SHIFT R': 'shift_right',
      CTRL: 'ctrl_left',
      ALT: 'alt_left',
      'ALT R': 'alt_right',
      'CTR R': 'ctrl_right',
      SPACE: 'space',
      '&#9204;': 'arrow_left',
      '&#9205;': 'arrow_right',
    };
    this.shiftEnglishLayout = {
      '`': '~',
      1: '!',
      2: '@',
      3: '#',
      4: '$',
      5: '%',
      6: '^',
      7: '&',
      8: '*',
      9: '(',
      0: ')',
      '-': '_',
      '[': '{',
      ']': '}',
      ';': ':',
      '&apos;': '&quot;',
      '&bsol;': '&VerticalLine;',
      ',': '<',
      '.': '>',
      '/': '?',
    };
    this.shiftRussianLayout = {
      1: '!',
      2: '"',
      3: '№',
      4: ';',
      5: '%',
      6: ':',
      7: '?',
      8: '*',
      9: '(',
      0: ')',
      '-': '_',
      '&bsol;': '/',
      '.': ',',
    };
    this.textArea = document.createElement('textarea');
    this.container = document.createElement('div');
  }

  addTextArea() {
    this.textArea.rows = 20;
    this.textArea.cols = 80;
    this.textArea.classList.add('text');
    document.body.appendChild(this.textArea);
  }

  createKey() {
    this.englishLayout.forEach(() => {
      const key = document.createElement('button');
      key.classList.add('key');
      this.container.appendChild(key);
    });
  }

  setLanguage(languageLayout) {
    let lang;
    let shiftLayout;
    if (languageLayout === 'EN') {
      lang = this.englishLayout;
      shiftLayout = this.shiftEnglishLayout;
    } else if (languageLayout === 'RU') {
      lang = this.russianLayout;
      shiftLayout = this.shiftRussianLayout;
    }
    const keys = document.querySelectorAll('.key');
    keys.forEach((item, index) => {
      item.classList.add(this.keyboardCode[index]);
      if (lang[index] in this.specializedKeys) {
        item.classList.add('specialized_keys');
        item.classList.add(this.specializedKeys[lang[index]]);
      }
      if (lang[index] in shiftLayout) {
        item.classList.add('shift');
        item.classList.remove('letter');
        item.innerHTML = `<span>${lang[index]}</span>`;
        item.innerHTML += `<span class="hidden">${shiftLayout[lang[index]]}</span>`;
      } else if ((lang[index].length === 1 && lang[index].match(/[A-zА-я]/g)) || lang[index].match(/[Ё-ё]/g)) {
        item.classList.add('letter');
        item.classList.remove('shift');
        item.innerHTML = `<span>${lang[index]}</span>`;
        item.innerHTML += `<span class="hidden">${lang[index].toUpperCase()}</span>`;
      } else {
        item.innerHTML = `<span>${lang[index]}</span>`;
      }
    });
  }

  addContent() {
    this.container.classList.add('container');
    document.body.appendChild(this.container);
  }
}
