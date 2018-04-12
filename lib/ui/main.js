var Screen = require('./screen');

var components = {
  menu: require('./widgets/menu').menuBar
};

for (var i in components) {
  Screen.append(components[i]);
}

components.menu.focus();

Screen.render();
