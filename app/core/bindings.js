const Blessed = require('blessed');
const Screen = require('./screen');
const Config = require('./config');
const Commands = require('./commands');

class Bindings {
  constructor(ui) {
    this.ui = ui;
    this.cfg = new Config('bindings.yaml');
    this.bindings = this.cfg.all();
    this.cmd = new Commands(ui);
    //console.log(this.bindings);

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
        let options = {};
        options.function = func;
        options.command = this.bindings[func].command;
        options.args = func == 'select_tab' ? { num: key.full } : {};
        options.needsargs =
          typeof this.bindings[func].args !== 'undefined' && func != 'select_tab' ? this.bindings[func].args : [];
        options.silent = typeof this.bindings[func].menu !== 'undefined';
        this.cmd.openCommand(options);
      });
    }
    // prompt binding
    Screen.key(':', () => {
      this.ui
        .prompt()
        .then(val => {
          let options = this.cmd.parseCommandString(val);
          //console.log(options);
          this.cmd.openCommand(options);
        })
        .catch(e => {
          console.error(e);
        });
    });
  }
}

module.exports = Bindings;
