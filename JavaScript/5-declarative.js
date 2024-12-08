'use strict';

class ArrayLiteralParser {
  constructor(meta) {
    this.state = 'start';
    this.meta = meta;
  }

  feed(char) {
    const cases = this.meta[this.state];
    for (const [key, to] of Object.entries(cases)) {
      if (key.includes(char)) {
        if (typeof to === 'string') throw Error(to);
        to(this, char);
        return;
      }
      if (key === '') throw Error(to);
    }
  }

  parse(string) {
    for (const char of string) this.feed(char);
    return this.result;
  }
}

// Usage

const parser = new ArrayLiteralParser({
  start: {
    '[': (target) => {
      target.result = [];
      target.value = '';
      target.state = 'value';
    },
    '': 'Unexpected character before array',
  },
  value: {
    ' .-0123456789': (target, char) => {
      target.value += char;
    },
    ',]': (target, char) => {
      const value = parseFloat(target.value);
      target.result.push(value);
      target.value = '';
      if (char === ']') target.state = 'end';
    },
    '': 'Unexpected character in value',
  },
  end: {
    '': 'Unexpected character after array',
  },
});

const array = parser.parse('[5, 7.1, -2, 194.5, 32]');
console.log({ array });
