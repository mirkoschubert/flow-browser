const Blessed = require('blessed');
const Screen = require('../screen');

class Tabs {
  constructor() {
    this.tabs = Blessed.listbar({
      parent: Screen,
      top: 1,
      height: 1,
      width: '100%',
      padding: {
        left: 2,
        right: 2
      },
      keys: true,
      focusable: true,
      autoCommandKeys: true,
      style: {
        fg: '#eee',
        item: {
          fg: '#eee'
        },
        selected: {
          fg: '#fff',
          bold: true
        }
      },
      items: {
        '1': 'blank',
        '2': 'help'
      }
    });

    Screen.append(this.tabs);
  }

  item(id) {}
}

module.exports = Tabs;
