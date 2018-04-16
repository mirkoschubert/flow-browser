const Blessed = require('blessed');
const Screen = require('./screen');
const UIElements = require('./ui-elements');

class UI {
  constructor() {
    // Initialize all Widgets
    this.boxes = {};
    this.currentTab = 0;
    this.initBoxes();

    console.log('test');

    this.newTab(); // first Tab
  }

  initBoxes() {
    this.boxes.header = UIElements.header(Screen, 'FLOW BROWSER');
    this.boxes.tabs = UIElements.tabs(Screen);
    this.boxes.webviews = [];
    this.boxes.menu = UIElements.menu(Screen);
    this.boxes.prompt = UIElements.prompt(Screen);
    this.boxes.message = UIElements.message(Screen);

    for (let box in this.boxes) {
      if (box !== 'webviews') {
        Screen.append(this.boxes[box]);
      } else
        for (let wv in this.boxes[box].webviews) {
          Screen.append(this.boxes[box].webviews[wv]);
        }
    }
    Screen.render();
  }

  setMenuCommands(commands) {
    let content = '';
    for (let i in commands) {
      // take the first key
      let key =
        typeof commands[i].keys === 'object'
          ? commands[i].keys[0]
          : commands[i].keys;
      let cmd = commands[i].menu.name;
      content += `{white-fg}${key}{/white-fg}{#c0bfc0-fg}:${cmd}{/#c0bfc0-fg}  `;
    }
    this.boxes.menu.setContent(content);
    Screen.render();
  }

  setTabContent(content, id) {
    content = content || 'Nothing found.';
    id = id || this.currentTab;

    if (typeof this.boxes.webviews[id - 1] !== 'undefined') {
      this.boxes.webviews[id - 1].setContent(content);
      Screen.render();
    } else {
      this.message('Tab ' + id + ' not found.', 'error');
    }
  }

  // Sets a new Tab with a new buffer/ webview
  newTab(url) {
    if (this.boxes.webviews.length < 9) {
      if (this.currentTab > 0) this.boxes.webviews[this.currentTab - 1].hide();
      this.boxes.webviews.push(
        UIElements.webview(
          Screen,
          'Tab ' + String(this.boxes.webviews.length + 1) + ' - ' + url
        )
      );
      this.currentTab = this.boxes.webviews.length;
      this.boxes.tabs.addItem(
        typeof url === 'undefined' || url === '' ? 'blank' : url
      );
      this.boxes.tabs.select(this.currentTab);
      Screen.render();
    }
  }

  switchTab(id) {
    if (id <= this.boxes.webviews.length) {
      this.boxes.webviews[this.currentTab - 1].hide();
      this.boxes.webviews[id - 1].show();
      this.currentTab = id;
      Screen.render();
    }
  }

  // closes active tab and destroys the buffer instance
  closeTab(id) {
    id =
      typeof id !== 'undefined' || (id < 1 && id <= this.boxes.webviews.length)
        ? id
        : this.currentTab;
    if (this.boxes.webviews.length > 1) {
      // Delete Webview and Tab
      this.boxes.webviews[id - 1].destroy();
      this.boxes.webviews.splice(id - 1, 1);
      this.boxes.tabs.removeItem(this.boxes.tabs.items[id - 1]);
      // Fix the Prefix numbers of all tabs above
      for (var i = id - 1; i < this.boxes.tabs.items.length; i++) {
        this.boxes.tabs.items[i].data.cmd.prefix = i + 1;
        let t = Blessed.generateTags(
          this.boxes.tabs.style.prefix || { fg: 'lightblack' }
        );
        this.boxes.tabs.items[i].content =
          t.open +
          this.boxes.tabs.items[i].data.cmd.prefix +
          t.close +
          ':' +
          this.boxes.tabs.items[i].data.cmd.text;
      }
      // Show the Tab next to the last
      this.currentTab =
        this.currentTab == 1 ? this.currentTab : this.currentTab - 1;
      this.boxes.webviews[this.currentTab - 1].show();

      Screen.render();
    }
  }

  closeAllTabs() {
    for (let i = this.boxes.webviews.length; i > 0; i--) {
      this.closeTab(i);
    }
  }

  // shows the log in the prompt line
  message(content, type) {
    content = content || '';
    type = type || 'message';

    switch (type) {
      case 'ok':
        this.boxes.message.style.fg = 'lightgreen';
        break;
      case 'warning':
        this.boxes.message.style.fg = 'lightyellow';
        break;
      case 'error':
        this.boxes.message.style.fg = 'lightred';
        break;

      default:
        this.boxes.message.style.fg = 'white';
        break;
    }

    this.boxes.message.setContent(content);
    this.boxes.message.show();
    Screen.render();
    /* setTimeout(() => {
      this.boxes.message.hide();
      Screen.render();
    }, 10000); */
  }
}

module.exports = UI;
