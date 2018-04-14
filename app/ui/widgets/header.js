const Blessed = require('blessed');
const Screen = require('../screen');

class Header {
  constructor() {
    this.header = Blessed.box({
      parent: Screen,
      top: 0,
      height: 1,
      width: '100%',
      align: 'center',
      padding: {
        left: 2,
        right: 2
      },
      style: {
        bg: '#2d74da',
        fg: '#fff',
        bold: true
      },
      content: 'FLOW BROWSER'
    });

    Screen.append(this.header);
  }

  focus() {
    this.header.focus();
  }
}

module.exports = Header;
