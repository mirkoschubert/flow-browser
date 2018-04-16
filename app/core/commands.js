const Content = require('./content');
const Config = require('./config');

class Commands {
  constructor(ui) {
    this.ui = ui;
    this.bindings = new Config('bindings.yaml').all();
    this.content = new Content(ui);
  }

  openCommand(options) {
    options = typeof options === 'object' ? options : {};

    //console.log(options);
    if (Object.keys(options.args).length > 0) {
      this[options.function](options.args);
    } else {
      this[options.function]();
    }
  }

  parseCommandString(str) {
    let options = {};
    let hasargs = str.trim().split(' ');
    let cmd = hasargs.shift();

    if (cmd.charAt(0) !== ':') return new Error('Parse Error: No command found');

    let func = this.getCommandFunction(cmd);
    let needsargs = this.needsArgs(func[0]);

    options.function = func[0];
    options.command = cmd;
    options.args = {};
    options.needsargs = [];
    for (let i in needsargs) {
      if (typeof hasargs[i] !== 'undefined') {
        options.args[needsargs[i]] = hasargs[i];
      } else {
        options.needsargs.push(needsargs[i]);
      }
    }
    return options;
  }

  getCommandFunction(cmd) {
    let f = [];
    for (let func in this.bindings) {
      if (this.bindings[func].command === cmd) f.push(func);
    }
    return f;
  }

  needsArgs(func) {
    let out = [];
    if (typeof this.bindings[func].args !== 'undefined') {
      if (typeof this.bindings[func].args === 'object') {
        out = this.bindings[func].args;
      } else {
        out.push(this.bindings[func].args);
      }
    }
    return out;
  }

  test(args) {
    this.ui.message('This is a simple test.' + args);
  }

  quit() {
    process.exit(0);
  }

  open_url(args) {
    this.ui.message(args.url + ' is open.', 'ok');
    this.ui.setTabContent(args.url);
  }

  open_new_tab(args) {
    if (typeof args === 'undefined') {
      this.ui.newTab();
      this.ui.message('New tab opened.', 'warning');
    } else {
      this.ui.newTab(args.url);
      this.ui.message('New Tab: ' + args.url, 'ok');
    }
  }

  close_active_tab() {
    this.ui.message('Active tab closed.', 'ok');
    this.ui.closeTab();
  }

  close_all_tabs() {
    this.ui.message('All tabs closed.', 'ok');
    this.ui.closeAllTabs();
  }

  select_tab(args) {
    this.ui.message('Switch to tab ' + args.num);
    this.ui.switchTab(args.num);
  }

  help() {
    this.ui.message('Help opened.', 'ok');
    let id = this.ui.newTab(':help');
    this.ui.setTabContent(this.content.getInternalPage(':help'), id);
  }
}

module.exports = Commands;
