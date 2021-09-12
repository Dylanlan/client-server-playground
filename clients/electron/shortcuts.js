const { globalShortcut } = require('electron');
const { refreshPage } = require('./buttons');

exports.setAllShortcuts = () => {
    globalShortcut.register('F5', refreshPage);
}