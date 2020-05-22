"use strict";

const path = require('path');
const express = require('express');
const tweetCounts = require('./tweet_counter.js');

let app = express();

app.listen(3000, () => {
    console.log('Server listening at port 3000');
});

app.use('/', express.static(path.join(__dirname, 'static')));
app.use('/lib/jquery', express.static(
    path.join(__dirname, 'node_modules', 'jquery', 'dist')));
app.use('/lib/handlebars', express.static(
    path.join(__dirname, 'node_modules', 'handlebars', 'dist')));

app.get('/counts', (req, res) => {
    res.json(tweetCounts.counts);
});