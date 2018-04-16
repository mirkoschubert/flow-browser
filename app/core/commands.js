class Commands {
  constructor(ui) {
    this.ui = ui;
  }

  openCommand(options) {
    options = typeof options === 'object' ? options : {};

    //console.log(options);
    if (Object.keys(options.args).length > 0) {
      this[options.function](options.args);
    } else {
      this[options.function]();
    }
  }

  test() {
    console.log('TEST');
  }

  quit() {
    process.exit(0);
  }

  open_new_tab() {
    //console.log('New tab opened.');
    this.ui.newTab();
  }

  close_active_tab() {
    //console.log('Active tab closed.');
    this.ui.closeTab();
  }

  close_all_tabs() {
    //console.log('All tabs closed.');
    this.ui.closeAllTabs();
  }

  select_tab(args) {
    //console.log('Switch to tab ', args.num);
    this.ui.switchTab(args.num);
  }

  help() {
    console.log('Help opened.');
  }
}

module.exports = Commands;
