const Blessed = require('blessed');
const Screen = require('./core/screen');
const app = Blessed.program();

const UI = require('./core/ui');
const Bindings = require('./core/bindings');

let ui = new UI();
let bindings = new Bindings(ui);

ui.setMenuCommands(bindings.getMenuBindings());

// debug keys
Screen.on('keypress', (ch, key) => {
  //console.log(key);
});
