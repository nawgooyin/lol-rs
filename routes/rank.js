const express = require('express');
const ranks = express.Router();
const https = require('https');
const resource = require('../resource');
const properties = require('../properties');

ranks.get('/lol/api/getChallengerList?:queue', (req, res) => {
   res.set('Access-Control-Allow-Origin', '*');
   
   var queue = req.query.queue;
   var server = req.query.server;
   
   var getChallengerList = https.get(`${resource.https}${server}${resource.challengerListEndPoint}/${queue}?${properties.apiKey}` , (resp) => {
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

  getChallengerList.end();
});

module.exports = ranks;