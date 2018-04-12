#!/usr/bin/env node --harmony

const pkg = require('./package.json');
const app = require('commander');
const blessed = require('blessed');
const configstore = require('configstore');

const cfg = new configstore(pkg.name, {});

app.version(pkg.version);

app
  .command('init')
  .description('Initializes the project')
  .action(() => {
    console.log('Initializing');
  });

app.parse(process.argv);
if (app.args.length === 0) {
  require('./lib/main');
}
