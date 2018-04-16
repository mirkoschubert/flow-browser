const Screen = require('./screen');
const Config = require('./config');
const Commands = require('./commands');
//const Func = require('./functions');

Screen.key(['C-c', 'q', 'Q'], () => {
  process.exit(0);
});

class Bindings {
  constructor() {
    this.cfg = new Config('bindings.yaml');
    this.bindings = this.cfg.all();
    this.cmd = new Commands();
    console.log(this.bindings);

    //this.setall();
    //Func['test']('Hello, World!');
  }

  // returns a sorted array of binding objects
  getMenuBindings() {
    let bind = [];
    // sort by weight
    for (let cmd in this.bindings) {
      if (typeof this.bindings[cmd].menu !== 'undefined') {
        bind[this.bindings[cmd].menu.weight - 1] = this.bindings[cmd];
      }
    }
    console.log(bind);
    return bind;
  }

  setall() {
    let bindings = this.cfg.all();
    for (let command in bindings) {
    }
  }
}

module.exports = Bindings;
