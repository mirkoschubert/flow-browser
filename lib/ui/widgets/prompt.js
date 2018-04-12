const Blessed = require('blessed');
const Screen = require('../screen');

class Prompt {
  constructor() {
    this.prompt = Blessed.textbox({
      parent: Screen,
      bottom: 0,
      height: 1,
      width: '100%',
      tags: true,
      keys: true,
      vi: true,
      //hidden: true,
      padding: 0,
      style: {
        fg: '#fff',
        focus: {
          fg: '#ffffff'
          //bg: '#131313'
        }
      }
    });

    Screen.append(this.prompt);
  }

  focus() {
    this.prompt.focus();
  }

  input() {
    //this.prompt.show();
    this.prompt.focus();
    return new Promise((resolve, reject) => {
      this.prompt.setValue(':');
      this.prompt.readInput((err, val) => {
        if (!err) {
          this.prompt.setValue('');
          resolve(val);
        } else {
          reject(err);
        }
      });
    });
  }
}

module.exports = Prompt;
