const Blessed = require('blessed');
const Screen = require('../screen');

class WebView {
  constructor() {
    this.view = Blessed.box({
      parent: Screen,
      top: 1,
      height: '100%-3',
      width: '100%',
      align: 'left',
      tags: true,
      keys: true,
      vi: true,
      scrollable: true,
      padding: {
        top: 1,
        bottom: 1,
        left: 2,
        right: 2
      },
      border: {
        type: 'line',
        fg: '#ccc'
      },
      style: {
        bg: 'transparent',
        fg: '#fff',
        focus: {
          fg: '#fff'
        },
        scrollbars: {
          bg: '#2d74da'
        }
      },
      content: 'Testtext'
    });

    Screen.append(this.view);
  }

  focus() {
    this.view.focus();
  }

  setContent(content) {
    this.view.setContent(content);
  }
}

module.exports = WebView;
