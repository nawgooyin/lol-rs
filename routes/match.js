const express = require('express');
const matches = express.Router();
const https = require('https');
const resource = require('../resource');
const properties = require('../properties');

matches.get('/lol/api/getMatch?:matchId', (req, res) => {
   res.set('Access-Control-Allow-Origin', '*');
   
   var matchId = req.query.matchId;
   var server = req.query.server;

   var getMatch = https.get(`${resource.https}${server}${resource.matchEndPoint}/${matchId}?${properties.apiKey}` , (resp) => {
      if(resp.statusCode !== 200) {
          res.status(400).send(`Status Code: ${resp.statusCode} \n Status Message: ${resp.statusMessage}`);
          return;
      }

      let result = '';
      resp.on('data', (data) => {
          result += data;
      }).on('end', () => {
         result = JSON.parse(result);
         res.send(result);
      });
  });

  getMatch.end();
});

module.exports = matches;