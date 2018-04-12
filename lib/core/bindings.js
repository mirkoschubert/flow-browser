var Screen = require('../ui/screen');

Screen.key(['C-c', 'q', 'Q'], () => {
  process.exit(0);
});
