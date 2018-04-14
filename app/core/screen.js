var Blessed = require('blessed');

var Screen = Blessed.screen({
  title: 'flow',
  smartCSR: true
});

module.exports = Screen;
