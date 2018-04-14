const fs = require('fs-extra');
const pkg = require('../../package.json');

class Config {
  constructor(file) {
    this.file = file || '';
  }
}
