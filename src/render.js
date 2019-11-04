export default class Render {
  constructor() {
    this.englishLayout = [
      ['`', 1, 2, 3, 4, 5, 6, 7, 8, 9, 0, '-', '=', 'BACKSPACE'],
      ['TAB', 'q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p', '[', ']', 'DEL'],
      ['CapsLock', 'a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', ';', '&apos;', '&bsol;', 'ENTER'],
      ['SHIFT', 'z', 'x', 'c', 'v', 'b', 'n', 'm', ',', '.', '/', 'SHIFT R'],
      ['CTRL', 'ALT', 'SPACE', 'ALT R', 'CTR R', '&#9204;', '&#9205;'],
    ];
    this.russianLayout = [
      ['ё', 1, 2, 3, 4, 5, 6, 7, 8, 9, 0, '-', '=', 'BACKSPACE'],
      ['TAB', 'й', 'ц', 'у', 'к', 'е', 'н', 'г', 'ш', 'щ', 'з', 'х', 'ъ', 'DEL'],
      ['CapsLock', 'ф', 'ы', 'в', 'а', 'п', 'р', 'о', 'л', 'д', 'ж', 'э', '&bsol;', 'ENTER'],
      ['SHIFT', 'я', 'ч', 'с', 'м', 'и', 'т', 'ь', 'б', 'ю', '.', 'SHIFT R'],
      ['CTRL', 'ALT', 'SPACE', 'ALT R', 'CTR R', '&#9204;', '&#9205;'],
    ];
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

  createKey(languageLayout) {
    let lang;
    let shiftLayout;
    if (languageLayout === 'EN') {
      lang = this.englishLayout;
      shiftLayout = this.shiftEnglishLayout;
    } else if (languageLayout === 'RU') {
      lang = this.russianLayout;
      shiftLayout = this.shiftRussianLayout;
    }
    lang.forEach((array) => {
      const lineContainer = document.createElement('div');
      lineContainer.classList.add('line_container');
      array.forEach((item) => {
        const key = document.createElement('button');
        key.classList.add('key');
        if (item in this.specializedKeys) {
          key.classList.add('specialized_keys');
          key.classList.add(this.specializedKeys[item]);
        }
        if (item in shiftLayout) {
          key.classList.add('shift');
          key.innerHTML = `<span>${item}</span>`;
          key.innerHTML += `<span class="hidden">${shiftLayout[item]}</span>`;
        } else if ((item.length === 1 && item.match(/[A-zА-я]/g)) || item.match(/[Ё-ё]/g)) {
          key.classList.add('letter');
          key.innerHTML = `<span>${item}</span>`;
          key.innerHTML += `<span class="hidden">${item.toUpperCase()}</span>`;
        } else {
          key.innerHTML = `<span>${item}</span>`;
        }
        lineContainer.appendChild(key);
      });
      this.container.appendChild(lineContainer);
    });
  }

  addContent() {
    this.container.classList.add('container');
    document.body.appendChild(this.container);
  }
}
