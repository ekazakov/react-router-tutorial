import React from 'react';
import { renderToString } from 'react-dom/server';
import { match, RouterContext } from 'react-router';
import routes from './modules/routes';

var express = require('express');
var path = require('path');
var compression = require('compression');

var app = express();

app.use(compression());
app.use(express.static(path.join(__dirname, 'public'), {index: false}));

function renderPage(appHtml) {
    return `
        <!doctype html public="storage">
        <html>
        <meta charset="utf-8"/>
        <title>My Firest React Router Project</title>
        <link rel="stylesheet" href="/index.css">
        <div id="app">${appHtml}</div>
        <script src="/bundle.js"></script>
    `;
}

app.get('*', (req, res) => {
    match({routes, location: req.url}, (err, redirect, props) => {
        if (err) {
            res.status(500).send(err.message)
        } else if (redirect) {
            res.redirect(redirect.pathname + redirect.search)
        } else if (props) {
            // hey we made it!
            const appHtml = renderToString(<RouterContext {...props}/>);
            res.send(renderPage(appHtml))
        } else {
            res.status(404).send('Not Found')
        }
    });
});

var PORT = process.env.PORT || 8080;

app.listen(PORT, function () {
    console.log('Production Express server running at localhost:' + PORT);
});