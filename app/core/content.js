const Blessed = require('blessed');
const Config = require('./config');

class Content {
  constructor(ui) {
    this.ui = ui;
    this.cfg = {};
    this.cfg.bindings = new Config('bindings.yaml').all();
  }

  getInternalPage(cmd) {
    return cmd.charAt(0) == ':'
      ? this['_' + cmd.substr(1)]()
      : this['_' + cmd]();
  }

  // internal blank page
  _blank() {
    let output = '';
    output +=
      '{bold}Welcome to the {blue-fg}FLOW BROWSER{/blue-fg}!{/bold}\n\n';
    output +=
      'To open a website please press {green-fg}o{/green-fg} and type the url in the prompt.\n';
    output +=
      'You can also use the command {green-fg}:open [url]{/green-fg} in the prompt. To open the command prompt simply press the {green-fg}:{/green-fg} key.\n\n';
    output += 'Have fun using the FLOW BROWSER!';

    return Blessed.parseTags(output);
  }

  // internal help page
  _help() {
    let output =
      '{bold}This is the {blue-fg}HELP{/blue-fg} document!{/bold}\n\n';

    for (let func in this.cfg.bindings) {
      if (typeof this.cfg.bindings[func].keys === 'object') {
        for (let key in this.cfg.bindings[func].keys) {
          output += '{bold}{green-fg}';
          output += this.cfg.bindings[func].keys[key];
          output += '\t\t\t';
          output +=
            this.cfg.bindings[func].command == ':tab'
              ? this.cfg.bindings[func].command +
                ' ' +
                this.cfg.bindings[func].keys[key]
              : this.cfg.bindings[func].command;
          output += '{/green-fg}{/bold}\t\t\t';
          output += this.cfg.bindings[func].description;
          output += '\n';
        }
      } else {
        output += '{bold}{green-fg}';
        output += this.cfg.bindings[func].keys;
        output += '\t\t\t';
        output += this.cfg.bindings[func].command;
        output += '{/green-fg}{/bold}\t\t\t';
        output += this.cfg.bindings[func].description;
        output += '\n';
      }
    }
    return output;
  }
}

module.exports = Content;
