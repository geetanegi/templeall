const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();

app.use(bodyParser.json());

app.use('*/static', express.static(path.join(__dirname, '/build/static')));

app.get([/\/manifest.json/g, '/manifest.json'].reverse(), (req, res) => {
    res.sendFile(path.resolve(__dirname, './build/manifest.json'));
});

app.get(
    [/\/service-worker.js/g, '/service-worker.js'].reverse(),
    (req, res) => {
        res.sendFile(path.resolve(__dirname, './build/service-worker.js'));
    }
);

app.get([/\/health$/g, '/health'].reverse(), (request, response) => {
    response.status(200).send({
        status: 'ok',
    });
});

app.get('/favicon.ico', (req, res) => {
    res.sendFile(path.resolve(__dirname, './build/favicon.ico'));
});

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '/build/index.html'));
    return;
});

app.listen(8080, '0.0.0.0', () => {
    console.log(' listening on this port *:8080');
});
