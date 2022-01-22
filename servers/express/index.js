// Simple express server
const express = require('express');
const app = express();

// initialize express server
function init() {
    app.listen(3000, () => {
        console.log('listening on port 3000');
    });

    // setup routes
    app.get('/', (req, res) => {
        res.send('hello world');
    });

    // setup user route
    app.get('/user', (req, res) => {
        res.send('user');
    });
}

init();
