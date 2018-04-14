const Screen = require('./screen');
const Config = require('./config');

Screen.key(['C-c', 'q', 'Q'], () => {
  process.exit(0);
});

class Bindings {
  constructor() {
    this.bindings = this.setDefaultBindings();
    this.cfg = new Config('bindings.yaml');
    console.log(this.cfg.all());
  }

  setDefaultBindings() {}
}

module.exports = Bindings;
