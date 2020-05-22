"use strict";

const ntwitter = require('ntwitter');
const credentials = require('./secrets.json');
const redis = require('redis');

const twitter = ntwitter(credentials);
const redisClient = redis.createClient();

const terms = ['covid', 'covid-19', 'covid19', 'quarentena', 
    'lockdown', 'cloroquina'];
const counts = {};

twitter.stream(
    'statuses/filter',
    {track: terms},
    stream => {
        stream.on('data', tweet => {
            terms.forEach(term => {
                if (tweet.text.indexOf(term) >= 0) {
                    redisClient.incr(term, (err, res) => {
                        if (err === null)
                            counts[term] = res;
                        else
                            console.log(`Failed to increment term ${term} count`);
                    });                    
                }
            });
        });
    }
);

module.exports = {
    counts: counts
}