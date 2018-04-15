#!/usr/bin/env node --harmony

const pkg = require('./package.json');
const cli = require('commander');
const configstore = require('configstore');

const cfg = new configstore(pkg.name, {});

cli.version(pkg.version);

cli
  .command('test')
  .description('Shortcut for testing')
  .action(() => {
    console.log('testing...\n');
    require('./app/test');
  });

cli.parse(process.argv);
if (cli.args.length === 0) {
  require('./app/main');
}
