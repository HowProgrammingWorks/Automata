'use strict';

const TIME_STEP = 500;

class StateMachine {
  constructor() {
    this.state = StateMachine.STATE.INIT;
    this.timer = setInterval(() => {
      switch (this.state) {
        case StateMachine.STATE.INIT:
          console.log('initialization');
          this.state = StateMachine.STATE.WORK;
          break;
        case StateMachine.STATE.WORK:
          process.stdout.write('.');
          break;
        case StateMachine.STATE.FIN:
          console.log('\nfinalization');
          this.state = StateMachine.STATE.EXIT;
          break;
        case StateMachine.STATE.EXIT:
          console.log('exit');
          clearInterval(this.timer);
      }
    }, TIME_STEP);
  }
}

StateMachine.STATE = {
  INIT: 0,
  WORK: 1,
  FIN: 2,
  EXIT: 3,
};

const sm = new StateMachine();
process.on('SIGINT', () => {
  sm.state = StateMachine.STATE.FIN;
});
