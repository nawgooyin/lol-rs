const https = 'https://';
const getSummonerIdEndPoint = '.api.riotgames.com/tft/summoner/v1/summoners/by-name';
const getSummonerInfoEndPoint = '.api.riotgames.com/lol/league/v4/entries/by-summoner';
const getSummonerMatchHistoryEndPoint = '.api.riotgames.com/lol/match/v4/matchlists/by-account';
const getSummonerMasteryListEndPoint = '.api.riotgames.com/lol/champion-mastery/v4/champion-masteries/by-summoner';

module.exports = {https: https,
                  getSummonerIdEndPoint: getSummonerIdEndPoint,
                  getSummonerInfoEndPoint: getSummonerInfoEndPoint,
                  getSummonerMatchHistoryEndPoint: getSummonerMatchHistoryEndPoint,
                  getSummonerMasteryListEndPoint: getSummonerMasteryListEndPoint
};