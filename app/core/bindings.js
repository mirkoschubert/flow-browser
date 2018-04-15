const Screen = require('./screen');
const Config = require('./config');
//const Func = require('./functions');

Screen.key(['C-c', 'q', 'Q'], () => {
  process.exit(0);
});

class Bindings {
  constructor() {
    this.cfg = new Config('bindings.yaml');
    console.log(this.cfg.all());

    //this.setall();
    //Func['test']('Hello, World!');
  }

  setall() {
    let bindings = this.cfg.all();
    for (let command in bindings) {
      Screen.key(bindings[command].keys, Func[command]);
    }
  }
}

module.exports = Bindings;
