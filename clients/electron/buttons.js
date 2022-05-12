const electron = require('electron');

function setOnClicks() {
    const refreshButton = document.getElementById('refresh-button');
    if (refreshButton) {
        refreshButton.onclick = refreshPage;
    }

    const exitButton = document.getElementById('exit-button');
    if (exitButton) {
        exitButton.onclick = exit;
    }

    const minimizeButton = document.getElementById('minimize-button');
    if (minimizeButton) {
        minimizeButton.onclick = minimize;
    }

    const maximizeButton = document.getElementById('maximize-button');
    if (maximizeButton) {
        maximizeButton.onclick = toggleMaximize;
    }
};

function refreshPage() {
    const remote = electron.remote;
    if (remote) {
        remote.getCurrentWindow().reload();
    }
};

function minimize() {
    const remote = electron.remote;
    if (remote) {
        remote.getCurrentWindow().minimize();
    }
};

function toggleMaximize(event) {
    const remote = electron.remote;
    const button = event.srcElement
    if (remote && button) {
        const window = remote.getCurrentWindow();
        if (!window.isMaximized()) {
            window.maximize();
        } else {
            window.unmaximize();
        }
    }
};

function exit() {
    const remote = electron.remote;
    if (remote) {
        remote.getCurrentWindow().close();
    }
};

module.exports = {
    setOnClicks,
    refreshPage,
};
