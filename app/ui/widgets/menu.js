var Blessed = require('blessed');
var Screen = require('../screen');

class Menu {
  constructor() {
    this.menuBar = Blessed.box({
      parent: Screen,
      bottom: 1,
      height: 1,
      width: '100%',
      tags: true,
      padding: {
        left: 2,
        right: 2
      },
      style: {
        bg: '#2d74da',
        fg: '#fff',
        bold: true
      }
    });

    Screen.append(this.menuBar);
    this.setCommands({
      q: 'quit',
      o: 'open',
      t: 'new tab',
      x: 'close tab',
      '?': 'help'
    });
  }

  setCommands(commands) {
    let content = '';
    for (let key in commands) {
      content += `{white-fg}${key}{/white-fg}{#c0bfc0-fg}:${
        commands[key]
      }{/#c0bfc0-fg}  `;
    }
    this.menuBar.setContent(content);
  }

  focus() {
    this.menuBar.focus();
  }
}

module.exports = Menu;
