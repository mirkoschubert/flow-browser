const Blessed = require('blessed');
const Screen = require('./screen');
const Cliui = require('cliui');
const Config = require('./config');

class Content {
  constructor(ui) {
    this.ui = ui;
    this.cfg = {};
    this.cfg.bindings = new Config('bindings.yaml').all();
  }

  getInternalPage(cmd) {
    return cmd.charAt(0) == ':' ? this['_' + cmd.substr(1)]() : this['_' + cmd]();
  }

  // internal blank page
  _blank() {
    let output = '';
    output += '{bold}Welcome to the {blue-fg}FLOW BROWSER{/blue-fg}!{/bold}\n\n';
    output += 'To open a website please press {green-fg}o{/green-fg} and type the url in the prompt.\n';
    output +=
      'You can also use the command {green-fg}:open [url]{/green-fg} in the prompt. To open the command prompt simply press the {green-fg}:{/green-fg} key.\n\n';
    output += 'Have fun using the FLOW BROWSER!';

    return Blessed.parseTags(output);
  }

  // internal help page
  _help() {
    let cliui = new Cliui({ width: Screen.width, wrap: true });
    cliui.div(`{bold}This is the {blue-fg}HELP{/blue-fg} document!{/bold}\n\n`);
    cliui.div(
      { text: Blessed.parseTags(`{bold}Key{/bold}`), width: 10 },
      { text: Blessed.parseTags(`{bold}Command{/bold}`), width: 15 },
      { text: Blessed.parseTags(`{bold}Arguments{/bold}`), width: 15 },
      { text: Blessed.parseTags(`{bold}Description{/bold}`) }
    );
    for (let func in this.cfg.bindings) {
      if (typeof this.cfg.bindings[func].keys === 'object') {
        for (let key in this.cfg.bindings[func].keys) {
          let k = this.cfg.bindings[func].keys[key];
          let c = this.cfg.bindings[func].command;
          let a = typeof this.cfg.bindings[func].args !== 'undefined' ? '[' + this.cfg.bindings[func].args + ']' : '';
          let d = this.cfg.bindings[func].description;
          cliui.div(
            { text: Blessed.parseTags(`{bold}{green-fg}${k}{/green-fg}{/bold}`), width: 10 },
            { text: Blessed.parseTags(`{yellow-fg}${c}{/yellow-fg}`), width: 15 },
            { text: Blessed.parseTags(`{yellow-fg}${a}{/yellow-fg}`), width: 15 },
            { text: Blessed.parseTags(`${d}`) }
          );
        }
      } else {
        let k = this.cfg.bindings[func].keys;
        let c = this.cfg.bindings[func].command;
        let a = typeof this.cfg.bindings[func].args !== 'undefined' ? '[' + this.cfg.bindings[func].args + ']' : '';
        let d = this.cfg.bindings[func].description;
        cliui.div(
          { text: Blessed.parseTags(`{bold}{green-fg}${k}{/green-fg}{/bold}`), width: 10 },
          { text: Blessed.parseTags(`{yellow-fg}${c}{/yellow-fg}`), width: 15 },
          { text: Blessed.parseTags(`{yellow-fg}${a}{/yellow-fg}`), width: 15 },
          { text: Blessed.parseTags(`${d}`) }
        );
      }
    }
    return cliui.toString();
  }
}

module.exports = Content;
