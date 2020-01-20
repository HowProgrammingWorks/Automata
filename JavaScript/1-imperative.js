'use strict';

process.stdin.setRawMode(true);

const STATE_INIT = 0;
const STATE_WORK = 1;
const STATE_FIN = 2;
const STATE_EXIT = 3;

let state = STATE_INIT;

(async () => {
  for await (const chunk of process.stdin) {
    console.log({ chunk });
    switch (state) {
    case STATE_INIT:
      console.log('initialization');
      state = STATE_WORK;
      break;
    case STATE_WORK:
      console.log('working');
      state = STATE_FIN;
      break;
    case STATE_FIN:
      console.log('finalization');
      state = STATE_EXIT;
      break;
    case STATE_EXIT:
      console.log('exit');
      process.exit(0);
    }
  }
})();
