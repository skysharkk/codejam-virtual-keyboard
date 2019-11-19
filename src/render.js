export default class Render {
  constructor(data) {
    this.englishLayout = data.englishLayout;
    this.russianLayout = data.russianLayout;
    this.keyboardCode = data.keyboardCode;
    this.specializedKeys = data.specializedKeys;
    this.shiftEnglishLayout = data.shiftEnglishLayout;
    this.shiftRussianLayout = data.shiftRussianLayout;
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
    const arrayKeys = [];
    this.englishLayout.forEach(() => {
      const key = document.createElement('button');
      key.classList.add('key');
      arrayKeys.push(key);
    });
    this.container.append(...arrayKeys);
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
        item.innerHTML = `<span>${lang[index]}</span><span class="hidden">${shiftLayout[lang[index]]}</span>`;
      } else if ((lang[index].length === 1 && lang[index].match(/[A-zА-я]/g)) || lang[index].match(/[Ё-ё]/g)) {
        item.classList.add('letter');
        item.classList.remove('shift');
        item.innerHTML = `<span>${lang[index]}</span><span class="hidden">${lang[index].toUpperCase()}</span>`;
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
