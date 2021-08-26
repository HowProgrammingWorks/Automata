'use strict';

class LiteralParser {
  constructor(meta) {
    this.state = 'start';
    this.meta = meta;
  }

  feed(char) {
    const cases = this.meta[this.state];
    for (const [key, to] of Object.entries(cases)) {
      if (key.includes(char)) {
        if (typeof to === 'string') throw Error(to);
        const step = to(this, char);
        Object.assign(this, step);
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

const parser = new LiteralParser({
  start: {
    '[': () => ({
      result: [],
      value: '',
      state: 'value',
    }),
    '': 'Unexpected character before array',
  },
  value: {
    ' .-0123456789': (target, char) => ({
      ...target,
      value: target.value + char,
    }),
    ',]': (target) => ({
      result: target.result.concat([parseFloat(target.value)]),
      value: '',
      state: 'value',
    }),
    '': 'Unexpected character in value',
  },
  end: {
    '': 'Unexpected character after array',
  },
});

const array = parser.parse('[5, 7.1, -2, 194.5, 32]');
console.log({ array });
