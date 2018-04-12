const Blessed = require('blessed');
const Screen = require('./screen');
const app = Blessed.program();

const Header = require('./widgets/header');
const WebView = require('./widgets/webview');
const Menu = require('./widgets/menu');
const Prompt = require('./widgets/prompt');

var header = new Header();
var webview = new WebView();
var menu = new Menu();
var prompt = new Prompt();

webview.focus();

Screen.key(':', () => {
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

Screen.render();
