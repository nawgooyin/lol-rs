const express = require('express');
const champions = express.Router();
const https = require('https');
const resource = require('../resource');
const properties = require('../properties');

champions.get('/lol/api/getChampionRotation', (req, res) => {
    res.set('Access-Control-Allow-Origin', '*');
    
    var getChampionRotation = https.get(`${resource.championRoationEndPoint}?${properties.apiKey}` , (resp) => {
        if(resp.statusCode !== 200) {
            res.status(400).send(`Status Code: ${resp.statusCode} \n Status Message: ${resp.statusMessage}`);
            return;
        }

        let rotationList = '';
        resp.on('data', (data) => {
            rotationList += data;
        }).on('end', () => {
            const result = JSON.parse(rotationList);
            res.send(result);
        });
    });

    getChampionRotation.end();
});

module.exports = champions;