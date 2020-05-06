const express = require('express');
const summoners = express.Router();
const https = require('https');
const resource = require('../resource');
const properties = require('../properties');
const summoner = require('../service/summoner.service');

summoners.get('/lol/api/getSummonerInfo?:summonerName', (req, res) => {
    res.set('Access-Control-Allow-Origin', '*');

    var summonerName = req.query.summonerName;
    var server = req.query.server;

    summoner.getEncryptedUser(summonerName, server, (summoner) => {
        var getSummonerInfo = https.get(`${resource.https}${server}${resource.summonerInfoEndPoint}/${summoner.id}?${properties.apiKey}` , (resp) => {
            if(resp.statusCode !== 200) {
                res.status(400).send(`Status Code: ${resp.statusCode} \n Status Message: ${resp.statusMessage}`);
            }
    
            resp.on('data', (data) => {
                var summoner = JSON.parse(data);
                res.send(summoner);
            });
        });

        getSummonerInfo.end();
    });
});

summoners.get('/lol/api/getSummonerMatchHistory?:summonerName', (req, res) => { 
    res.set('Access-Control-Allow-Origin', '*');

    var summonerName = req.query.summonerName;
    var server = req.query.server;

    summoner.getEncryptedUser(summonerName, server, (summoner) => {
        var getMatchHistory = https.get(`${resource.https}${server}${resource.summonerMatchHistoryEndPoint}/${summoner.accountId}?${properties.apiKey}` , (resp) => {
            if(resp.statusCode !== 200) {
                res.status(400).send(`Status Code: ${resp.statusCode} \n Status Message: ${resp.statusMessage}`);
                return;
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

        getMatchHistory.end();
    });
});

summoners.get('/lol/api/getChampionMasteryList?:summonerName', (req, res) => {
    res.set('Access-Control-Allow-Origin', '*');

    var summonerName = req.query.summonerName;
    var server = req.query.server;

    summoner.getEncryptedUser(summonerName, server, (summoner) => {
        var getMasterList = https.get(`${resource.https}${server}${resource.summonerMasteryListEndPoint}/${summoner.id}?${properties.apiKey}` , (resp) => {
            if(resp.statusCode !== 200) {
                res.status(400).send(`Status Code: ${resp.statusCode} \n Status Message: ${resp.statusMessage}`);
                return;
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

        getMasterList.end();
    });
});

summoners.get('/lol/api/getSummonerScore?:summonerName', (req, res) => {
    res.set('Access-Control-Allow-Origin', '*');
    
    var summonerName = req.query.summonerName;
    var server = req.query.server;

    summoner.getEncryptedUser(summonerName, server, (summoner) => {
        var getSummonerScore = https.get(`${resource.https}${server}${resource.summonerScoreEndPoint}/${summoner.id}?${properties.apiKey}` , (resp) => {
            if(resp.statusCode !== 200) {
                res.status(400).send(`Status Code: ${resp.statusCode} \n Status Message: ${resp.statusMessage}`);
                return;
            }

            let result = '';
            resp.on('data', (data) => {
                result += JSON.parse(data);
            }).on('end', () => {
                res.send(result);
            });
        });

        getSummonerScore.end();
    });
});

module.exports = summoners;