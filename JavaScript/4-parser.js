'use strict';

class ArrayLiteralParser {
  constructor() {
    this.array = null;
    this.state = 'start';
    this.value = '';
  }

  feed(char) {
    switch (this.state) {
    case 'end':
      throw new Error('Unexpected character after array end');
    case 'start':
      if (char !== '[') {
        throw new Error('Unexpected character after array end');
      }
      this.array = [];
      this.state = 'value';
      break;
    case 'value':
      if (char === ',' || char === ']') {
        const value = parseInt(this.value, 10);
        this.array.push(value);
        this.value = '';
        if (char === ']') this.state = 'end';
        break;
      }
      this.value += char;
    }
  }

  parse(string) {
    for (const char of string) {
      this.feed(char);
    }
    return this.array;
  }
}

// Usage

const parser = new ArrayLiteralParser();
const array = parser.parse('[52, 7, 194, 32]');
console.log({ array });
