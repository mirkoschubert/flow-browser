const Blessed = require('blessed');
const Screen = require('./screen');
const UIElements = require('./ui-elements');

class UI {
  constructor() {
    // Initialize all Widgets
    this.boxes = {};
    this.currentTab = 0;
    this.initBoxes();

    this.newTab('google.com'); // first Tab
    this.newTab('facebook.com');
  }

  initBoxes() {
    this.boxes.header = UIElements.header(Screen, 'FLOW BROWSER');
    this.boxes.tabs = UIElements.tabs(Screen);
    this.boxes.webviews = [];
    this.boxes.menu = UIElements.menu(Screen);
    this.boxes.prompt = UIElements.prompt(Screen);

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
    for (let key in commands) {
      content += `{white-fg}${key}{/white-fg}{#c0bfc0-fg}:${
        commands[key]
      }{/#c0bfc0-fg}  `;
    }
    this.boxes.menu.setContent(content);
    Screen.render();
  }

  // Sets a new Tab with a new buffer/ webview
  newTab(url) {
    if (this.currentTab > 0) this.boxes.webviews[this.currentTab - 1].hide();
    this.currentTab++;
    this.boxes.webviews.push(
      UIElements.webview(Screen, 'Tab ' + String(this.currentTab) + ' - ' + url)
    );
    this.boxes.tabs.addItem(url === '' ? 'blank' : url);
    this.boxes.tabs.select(this.currentTab - 1);
    Screen.render();
    console.log('Current Tab: ', this.currentTab);
  }

  switchTab(id) {
    this.boxes.webviews[this.currentTab - 1].hide();
    this.boxes.webviews[id].show();
    this.boxes.tabs.select(id);
    this.currentTab = id + 1;
    Screen.render();
  }

  // closes active tab and destroys the buffer instance
  closeTab(id) {
    console.log(this.boxes.tabs.options);
    this.boxes.tabs.removeItem(id);
  }
}

module.exports = UI;
