const express = require('express');
const routers = express.Router();
const https = require('https');
const resource = require('../resource');
const summoner = require('../service/summoner.service');

routers.get('/lol/api/getSummonerInfo?:summonerName', (req, res) => {
    var summonerName = req.query.summonerName;

    summoner.getEncryptedUser(summonerName, (summoner) => {
        var getSummonerInfo = https.get(`${resource.getSummonerInfoEndPoint}/${summoner.id}?${resource.apiKey}` , (resp) => {
            if(resp.statusCode !== 200) {
                res.send(`Status Code: ${resp.statusCode} \n Status Message: ${resp.statusMessage}`);
            }
    
            resp.on('data', (data) => {
                var summoner = JSON.parse(data);
                res.send(summoner);
            });
        });

        getSummonerInfo.end();
    });
});

module.exports = routers;