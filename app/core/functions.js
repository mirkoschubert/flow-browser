const quit = () => {
  process.exit(0);
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

export default [
  quit,
  open_url,
  open_new_tab,
  open_help,
  close_active_tab,
  close_all_tabs
];
