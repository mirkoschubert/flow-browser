const Screen = require('./screen');
const Config = require('./config');
const Commands = require('./commands');

class Bindings {
  constructor(ui) {
    this.cfg = new Config('bindings.yaml');
    this.bindings = this.cfg.all();
    this.cmd = new Commands(ui);
    console.log(this.bindings);

    this.setAllBindings();
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
    return bind;
  }

  setAllBindings() {
    for (let func in this.bindings) {
      Screen.key(this.bindings[func].keys, (ch, key) => {
        this.cmd.openCommand({
          function: func,
          command: this.bindings[func].command,
          args: func == 'select_tab' ? { num: key.full } : {},
          needsargs:
            typeof this.bindings[func].args !== 'undefined' &&
            func != 'select_tab'
              ? this.bindings[func].args
              : false,
          silent: typeof this.bindings[func].menu !== 'undefined'
        });
      });
    }
    // prompt binding
    Screen.key(':', () => {
      console.log('prompt opened.');
    });
  }
}

module.exports = Bindings;
