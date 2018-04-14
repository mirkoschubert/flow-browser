const quit = () => {
  process.exit(0);
};

const test = str => {
  console.log(str);
};

const open_url = url => {};

const open_new_tab = ui => {
  ui.newTab();
};

const open_help = ui => {
  ui.newTab(':help');
};

const close_active_tab = () => {};

const close_all_tabs = () => {};

module.exports = {
  quit: quit,
  test: test,
  open_url: open_url,
  open_new_tab: open_new_tab,
  open_help: open_help,
  close_active_tab: close_active_tab,
  close_all_tabs: close_all_tabs
};
