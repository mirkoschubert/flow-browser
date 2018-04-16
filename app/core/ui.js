const Blessed = require('blessed');
const URL = require('url');
const Screen = require('./screen');
const UIElements = require('./ui-elements');
const Content = require('./content');

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

  /**
   * Set the key bindings for the menu
   * @param {Array} commands
   */
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

  /**
   * Sets a new content for a specific tab
   * @param {string} content
   * @param {int} id
   */
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

  /**
   * Sets a new tab with title and content
   * @param {string} url
   * @returns {int} id of new current tab
   */
  newTab(url) {
    if (this.boxes.webviews.length < 9) {
      if (this.currentTab > 0) this.boxes.webviews[this.currentTab - 1].hide();
      // prepare title & content
      let title,
        content = '';
      if (typeof url !== 'undefined' || url === '') {
        title =
          url.charAt(0) == ':'
            ? (title = url.substr(1))
            : (title = new URL(url).hostname);
        content = '{red-fg}' + url + '{/red-fg}';
      } else {
        title = 'blank';
        let ct = new Content(this);
        content = ct.getInternalPage(':blank');
      }

      this.boxes.webviews.push(UIElements.webview(Screen, content));
      this.currentTab = this.boxes.webviews.length;
      this.boxes.tabs.addItem(title);
      this.boxes.tabs.select(this.currentTab);
      this.boxes.webviews[this.currentTab - 1].focus();
      Screen.render();
    } else {
      this.message('You only can use 9 Tabs!', 'warning');
    }
    return this.currentTab;
  }

  /**
   * Switches to the Tab with the given id
   * @param {int} id
   */
  switchTab(id) {
    if (id <= this.boxes.webviews.length) {
      this.boxes.webviews[this.currentTab - 1].hide();
      this.boxes.webviews[id - 1].show();
      this.currentTab = id;
      Screen.render();
    }
  }

  /**
   * Closes the current or specified Tab and destroys the buffer instance
   * @param {int} id
   */
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

  /**
   * Closes all Tabs (it keeps one open)
   */
  closeAllTabs() {
    for (let i = this.boxes.webviews.length; i > 0; i--) {
      this.closeTab(i);
    }
  }

  prompt(command) {
    if (!this.boxes.message.hidden) this.boxes.message.hide();
    this.boxes.prompt.setValue(
      typeof command !== 'undefined' && command.charAt(0) == ':'
        ? command + ' '
        : ':'
    );
    this.boxes.prompt.show();
    this.boxes.prompt.focus();
    return new Promise((resolve, reject) => {
      this.boxes.prompt.readInput((err, val) => {
        if (err) {
          reject(err);
        }
        this.boxes.prompt.setContent('');
        this.boxes.prompt.hide();
        this.boxes.webviews[this.currentTab - 1].focus();
        resolve(val);
      });
    });
  }

  /**
   * Show the log in the prompt line
   * @param {string} content
   * @param {string} type [message, ok, warning, error]
   */
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
  }
}

module.exports = UI;
