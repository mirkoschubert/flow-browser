const Blessed = require('blessed');
const Screen = require('./screen');

class UI {
  constructor() {
    // Initialize all Widgets
    this.boxes = this.initBoxes();
    for (let box in this.boxes) {
      Screen.append(this.boxes[box]);
    }
    Screen.render();
  }

  initBoxes() {
    let boxes = {};
    // Header
    boxes.header = Blessed.box({
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
    // Tabs
    boxes.tabs = Blessed.listbar({
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
        bg: '#25467a',
        item: {
          fg: '#eee',
          bg: '#25467a'
        },
        selected: {
          fg: '#fff',
          bg: '#1f57a4',
          bold: true
        }
      },
      items: {
        '1': 'blank'
      }
    });
    // Webview
    boxes.webview = Blessed.box({
      parent: Screen,
      top: 2,
      height: '100%-4',
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
    // Menu
    boxes.menu = Blessed.box({
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
    // Prompt
    boxes.prompt = Blessed.textbox({
      parent: Screen,
      bottom: 0,
      height: 1,
      width: '100%',
      tags: true,
      keys: true,
      padding: 0,
      style: {
        fg: '#fff',
        focus: {
          fg: '#ffffff'
        }
      }
    });

    return boxes;
  }

  setMenuCommands(commands) {
    let content = '';
    for (let key in commands) {
      content += `{white-fg}${key}{/white-fg}{#c0bfc0-fg}:${
        commands[key]
      }{/#c0bfc0-fg}  `;
    }
    this.boxes.menu.setContent(content);
    Screen.render();
  }

  // Sets a new Tab with a new buffer/ webview
  newTab() {}

  // closes a tab and destroys the buffer instance
  destroyTab(instance) {}
}

module.exports = UI;
