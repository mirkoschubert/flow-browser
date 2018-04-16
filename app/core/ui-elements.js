const Blessed = require('blessed');

const header = (screen, title) => {
  return Blessed.box({
    parent: screen,
    top: 0,
    height: 1,
    width: '100%',
    align: 'center',
    padding: {
      left: 2,
      right: 2
    },
    style: {
      bg: '#2d74da',
      fg: '#fff',
      bold: true
    },
    content: title
  });
};

const tabs = screen => {
  return Blessed.listbar({
    parent: screen,
    top: 1,
    height: 1,
    width: '100%',
    padding: {
      left: 1,
      right: 1
    },
    keys: true,
    focusable: true,
    autoCommandKeys: true,
    style: {
      fg: '#eee',
      bg: '#25467a',
      item: {
        fg: '#eee',
        bg: '#25467a'
      },
      prefix: {
        fg: '#ff806c'
      },
      selected: {
        fg: '#fff',
        bg: '#1f57a4',
        bold: true
      }
    }
  });
};

const webview = (screen, content) => {
  return Blessed.box({
    parent: screen,
    top: 2,
    height: '100%-4',
    width: '100%',
    align: 'left',
    tags: true,
    keys: true,
    vi: true,
    scrollable: true,
    padding: {
      top: 1,
      bottom: 1,
      left: 2,
      right: 2
    },
    style: {
      bg: 'transparent',
      fg: '#fff',
      focus: {
        fg: '#fff'
      },
      scrollbars: {
        bg: '#2d74da'
      }
    },
    content: content
  });
};

const menu = screen => {
  return Blessed.box({
    parent: screen,
    bottom: 1,
    height: 1,
    width: '100%',
    tags: true,
    padding: {
      left: 2,
      right: 2
    },
    style: {
      bg: '#2d74da',
      fg: '#fff',
      bold: true
    }
  });
};

const prompt = screen => {
  return Blessed.textbox({
    parent: screen,
    bottom: 0,
    height: 1,
    width: '100%',
    tags: true,
    keys: true,
    padding: 0,
    style: {
      fg: '#fff',
      focus: {
        fg: '#ffffff'
      }
    }
  });
};

const message = screen => {
  return Blessed.text({
    parent: screen,
    bottom: 0,
    height: 1,
    width: '100%',
    tags: true,
    hidden: true,
    padding: {
      left: 2,
      right: 2
    },
    style: {
      fg: 'white',
      bold: true,
      focus: {
        fg: 'red',
        bg: 'transparent'
      }
    },
    content: 'MESSAGE'
  });
};

module.exports = { header, tabs, webview, menu, prompt, message };
