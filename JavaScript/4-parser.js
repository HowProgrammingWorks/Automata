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
      throw new Error(`Unexpected character after array end: ${char}`);
    case 'start':
      if (char !== '[') {
        throw new Error(`Unexpected character before array: ${char}`);
      }
      this.array = [];
      this.state = 'value';
      break;
    case 'value':
      if (char === ',' || char === ']') {
        const { value } = this;
        this.value = '';
        const item = parseFloat(value);
        if (Number.isNaN(item)) {
          throw new Error(`Can not parse value: ${value}`);
        }
        this.array.push(item);
        if (char === ']') this.state = 'end';
        break;
      }
      if (!(' .-0123456789').includes(char)) {
        throw new Error(`Unexpected character in value: ${char}`);
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
const array = parser.parse('[5, 7.1, -2, 194.5, 32]');
console.log({ array });
