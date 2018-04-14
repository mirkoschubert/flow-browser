const Blessed = require('blessed');
const app = Blessed.program();

const UI = require('./core/ui');
const Bindings = require('./core/bindings');

let ui = new UI();

ui.setMenuCommands({
  q: 'quit',
  o: 'open',
  t: 'new tab',
  x: 'close tab',
  '?': 'help'
});