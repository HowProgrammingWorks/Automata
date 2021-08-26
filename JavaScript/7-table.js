'use strict';

class StateMachine {
  constructor(meta) {
    this.state = 'S0';
    this.meta = meta;
  }

  feed(char) {
    const { state, meta } = this;
    const node = meta[state];
    const next = node[char];
    if (!next) throw Error(`Unexpected char "${char}" at state ${state}`);
    console.log(`${char}: ${state} --> ${next}`);
    this.state = next;
  }

  input(string) {
    for (const char of string) this.feed(char);
  }
}

// Usage

const sm = new StateMachine({
  S0: { A: 'S1', B: 'S2', C: 'S1' },
  S1: { A: 'S0', C: 'S4' },
  S2: { B: 'S0', C: 'S3' },
  S3: { A: 'S2', B: 'S4', C: 'S0' },
  S4: {},
});

sm.input('AABCB');
