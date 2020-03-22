const resource = require('../resource');
const properties = require('../properties');
const https = require('https');

function getEncryptedUser(name, server, callback) {
    var getSummonerInfo = https.get(`${resource.https}${server}${resource.getSummonerIdEndPoint}/${name}?${properties.apiKey}` , (res) => {
        if(res.statusCode > 200) {
            res.send(`Status Code: ${res.statusCode} \n Status Message: ${res.statusMessage}`);
        }

        res.on('data', (data) => {
            var summoner = JSON.parse(data);
            summoner.revisionDate = new Date(summoner.revisionDate);
            return callback(summoner);
        });
    });

    getSummonerInfo.end();
}

module.exports = {getEncryptedUser : getEncryptedUser};