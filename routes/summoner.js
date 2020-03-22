const express = require('express');
const routers = express.Router();
const https = require('https');
const resource = require('../resource');
const properties = require('../properties');
const summoner = require('../service/summoner.service');
const champions = require('../assets/champions.json');

routers.get('/lol/api/getSummonerInfo?:summonerName', (req, res) => {
    var summonerName = req.query.summonerName;
    var server = req.query.server;

    summoner.getEncryptedUser(summonerName, server, (summoner) => {
        var getSummonerInfo = https.get(`${resource.https}${server}${resource.getSummonerInfoEndPoint}/${summoner.id}?${properties.apiKey}` , (resp) => {
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

routers.get('/lol/api/getSummonerMatchHistory?:summonerName', (req, res) => { 
    var summonerName = req.query.summonerName;
    var server = req.query.server;

    summoner.getEncryptedUser(summonerName, server, (summoner) => {
        var getSummonerInfo = https.get(`${resource.https}${server}${resource.getSummonerMatchHistoryEndPoint}/${summoner.accountId}?${properties.apiKey}` , (resp) => {
            if(resp.statusCode !== 200) {
                res.send(`Status Code: ${resp.statusCode} \n Status Message: ${resp.statusMessage}`);
            }
    
            let historyList = '';
            resp.on('data', (data) => {
                historyList += data;
            }).on('end', () => {
                const result = JSON.parse(historyList);
                
                for(i = 0; i < result.matches.length; i++) {
                    result.matches[i].timestamp = new Date(result.matches[i].timestamp);
                }

                res.send(result);
            });;
        });

        getSummonerInfo.end();
    });
});

routers.get('/lol/api/getChampionMasteryList?:summonerName', (req, res) => {
    var summonerName = req.query.summonerName;
    var server = req.query.server;

    summoner.getEncryptedUser(summonerName, server, (summoner) => {
        var getSummonerInfo = https.get(`${resource.https}${server}${resource.getSummonerMasteryListEndPoint}/${summoner.id}?${properties.apiKey}` , (resp) => {
            if(resp.statusCode !== 200) {
                res.send(`Status Code: ${resp.statusCode} \n Status Message: ${resp.statusMessage}`);
            }

            let masterylist = '';
            resp.on('data', (data) => {
                masterylist += data;
            }).on('end', () => {
                const result = JSON.parse(masterylist);

                for(i = 0; i < result.length; i++) {
                    result[i].lastPlayTime = new Date(result[i].lastPlayTime);
                }

                res.send(result);
            });
        });

        getSummonerInfo.end();
    });
});

module.exports = routers;