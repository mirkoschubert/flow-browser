const Screen = require('./screen');

Screen.key(['C-c', 'q', 'Q'], () => {
  process.exit(0);
});

class Bindings {
  constructor() {
    this.bindings = this.setDefaultBindings();
  }

  setDefaultBindings() {}
}

module.exports = Bindings;
