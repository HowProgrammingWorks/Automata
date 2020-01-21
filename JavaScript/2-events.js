'use strict';

const TIME_STEP = 500;

const STATE_INIT = 0;
const STATE_WORK = 1;
const STATE_FIN = 2;
const STATE_EXIT = 3;

let state = STATE_INIT;

process.on('SIGINT', () => state = STATE_FIN);

const timer = setInterval(step, TIME_STEP);

function step() {
  switch (state) {
  case STATE_INIT:
    console.log('initialization');
    state = STATE_WORK;
    break;
  case STATE_WORK:
    process.stdout.write('.');
    break;
  case STATE_FIN:
    console.log('\nfinalization');
    state = STATE_EXIT;
    break;
  case STATE_EXIT:
    console.log('exit');
    clearInterval(timer);
  }
}
