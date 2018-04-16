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
    this.ui.message('This is a simple test.');
  }

  quit() {
    process.exit(0);
  }

  open_url() {
    this.ui.message('Nothing to open!', 'error');
    this.ui.setTabContent('Update in Tab 2', 2);
  }

  open_new_tab() {
    this.ui.message('New tab opened.', 'warning');
    this.ui.newTab();
  }

  close_active_tab() {
    this.ui.message('Active tab closed.', 'ok');
    this.ui.closeTab();
  }

  close_all_tabs() {
    this.ui.message('All tabs closed.', 'ok');
    this.ui.closeAllTabs();
  }

  select_tab(args) {
    this.ui.message('Switch to tab ' + args.num);
    this.ui.switchTab(args.num);
  }

  help() {
    this.ui.message('Help opened.', 'ok');
  }
}

module.exports = Commands;
