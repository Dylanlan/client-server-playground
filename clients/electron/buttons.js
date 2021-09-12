const electron = require('electron');

function setOnClicks() {
    const refreshButton = document.getElementById('refresh-button');
    if (refreshButton) {
        refreshButton.onclick = refreshPage;
    }
};

function refreshPage() {
    // TODO: refresh current page
    //electron.remote.getCurrentWindow().reload();
};

module.exports = {
    setOnClicks,
    refreshPage,
};
