const os = require('os');
const path = require('path');
const fs = require('fs-extra');
const yaml = require('js-yaml');
const pkg = require('../../package.json');

class Config {
  constructor(file) {
    this.filename = file || '';
    this.dir = {};
    this.dir.local = path.join(__dirname, '../config/');
    this.dir.global = os.homedir() + '/.config/' + pkg.name + '/';

    fs.ensureFileSync(this.dir.global + this.filename);

    this.data = this.readConfig();
  }

  readConfig() {
    let data = {};
    try {
      data.local = yaml.safeLoad(
        fs.readFileSync(this.dir.local + this.filename)
      );
      data.global = yaml.safeLoad(
        fs.readFileSync(this.dir.global + this.filename)
      );
    } catch (e) {
      console.error(e);
      process.exit(0);
    }
    return data;
  }

  isGlobal(key) {
    return (
      typeof this.data.global !== 'undefined' &&
      typeof this.data.global[key] !== 'undefined'
    );
  }

  // Checks if a key exists in one of the config files
  has(key) {
    return this.isGlobal(key) || typeof this.data.local[key] !== undefined;
  }
  // Gets a key either from global or local config file
  get(key) {
    return this.isGlobal(key) ? this.data.global[key] : this.data.local[key];
  }

  // Gets all keys (from global or local)
  all() {
    let data = {};
    for (let key in this.data.local) {
      data[key] = this.isGlobal(key)
        ? this.data.global[key]
        : this.data.local[key];
    }
    return data;
  }

  // Writes a key to the global config file
  set(key, data) {}

  // Deletes a key from the global config file (and falls back to the default setting)
  delete(key) {}

  // Deletes all custom configurations from the global config file
  clear() {}
}

module.exports = Config;
