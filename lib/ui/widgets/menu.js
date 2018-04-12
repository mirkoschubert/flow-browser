var Blessed = require('blessed');
var Screen = require('../screen');

var menuBar = Blessed.listbar({
  top: 0,
  height: 3,
  width: '100%',
  keys: true,
  vi: true,
  commands: {
    Test: 'test'
  },
  border: {
    type: 'line'
  },
  style: {
    border: {
      fg: '#333'
    },
    selected: {
      fg: '#ff9347'
    },
    focus: {
      border: {
        fg: '#ff9347'
      }
    }
  },
  autoCommandKeys: true
});

module.exports = {
  menuBar: menuBar
};
