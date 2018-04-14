const Blessed = require('blessed');
const Screen = require('./screen');
const app = Blessed.program();

const UI = require('./core/ui');

const Header = require('./widgets/header');
const Tabs = require('./widgets/tabs');
const WebView = require('./widgets/webview');
const Menu = require('./widgets/menu');
const Prompt = require('./widgets/prompt');

var ui = new UI();

//webview.focus();

/* Screen.key(':', () => {
  //prompt.focus();
  prompt
    .input()
    .then(res => {
      webview.setContent(res);
      webview.focus();
    })
    .catch(e => {
      console.error(e);
    });
});
 */
Screen.render();
