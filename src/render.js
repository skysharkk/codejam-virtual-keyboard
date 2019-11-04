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

  createKey() {
    this.englishLayout.forEach((array) => {
      const lineContainer = document.createElement('div');
      lineContainer.classList.add('line_container');
      array.forEach(() => {
        const key = document.createElement('button');
        key.classList.add('key');
        lineContainer.appendChild(key);
      });
      this.container.appendChild(lineContainer);
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

    for (let i = 0, j = 0, k = 0; k < keys.length && i < lang.length; k += 1) {
      if (lang[i][j] in this.specializedKeys) {
        keys[k].classList.add('specialized_keys');
        keys[k].classList.add(this.specializedKeys[lang[i][j]]);
      }
      if (lang[i][j] in shiftLayout) {
        keys[k].classList.add('shift');
        keys[k].classList.remove('letter');
        keys[k].innerHTML = `<span>${lang[i][j]}</span>`;
        keys[k].innerHTML += `<span class="hidden">${shiftLayout[lang[i][j]]}</span>`;
        j += 1;
      } else if ((lang[i][j].length === 1 && lang[i][j].match(/[A-zА-я]/g)) || lang[i][j].match(/[Ё-ё]/g)) {
        keys[k].classList.add('letter');
        keys[k].innerHTML = `<span>${lang[i][j]}</span>`;
        keys[k].innerHTML += `<span class="hidden">${lang[i][j].toUpperCase()}</span>`;
        j += 1;
      } else {
        keys[k].innerHTML = `<span>${lang[i][j]}</span>`;
        j += 1;
      }
      if (j > lang[i].length - 1) {
        i += 1;
        j = 0;
      }
    }
  }

  addContent() {
    this.container.classList.add('container');
    document.body.appendChild(this.container);
  }
}
