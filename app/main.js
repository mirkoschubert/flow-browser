const Blessed = require('blessed');
const Screen = require('./core/screen');
const app = Blessed.program();

const UI = require('./core/ui');
const Bindings = require('./core/bindings');

let ui = new UI();
let bindings = new Bindings();

Screen.key('t', () => {
  ui.newTab('');
});

Screen.key('x', () => {
  ui.closeTab(1);
});

ui.setMenuCommands({
  q: 'quit',
  o: 'open',
  t: 'new tab',
  x: 'close tab',
  '?': 'help'
});
