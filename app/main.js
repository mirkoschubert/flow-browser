const Blessed = require('blessed');
const Screen = require('./core/screen');
const app = Blessed.program();

const UI = require('./core/ui');
const Bindings = require('./core/bindings');

let ui = new UI();
let bindings = new Bindings();

ui.setMenuCommands(bindings.getMenuBindings());

Screen.key('t', () => {
  ui.newTab('');
});

Screen.key('x', () => {
  ui.closeTab();
});

Screen.key(['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'], (ch, key) => {
  ui.switchTab(key.full);
});
