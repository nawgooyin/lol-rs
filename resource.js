const https = 'https://';
const getSummonerIdEndPoint = '.api.riotgames.com/lol/summoner/v4/summoners/by-name';
const getSummonerInfoEndPoint = '.api.riotgames.com/lol/league/v4/entries/by-summoner';
const getSummonerMatchHistoryEndPoint = '.api.riotgames.com/lol/match/v4/matchlists/by-account';
const getSummonerMasteryListEndPoint = '.api.riotgames.com/lol/champion-mastery/v4/champion-masteries/by-summoner';
const getSummonerScoreEndPoint = '.api.riotgames.com/lol/champion-mastery/v4/scores/by-summoner'

module.exports = {https: https,
                  getSummonerIdEndPoint: getSummonerIdEndPoint,
                  getSummonerInfoEndPoint: getSummonerInfoEndPoint,
                  getSummonerMatchHistoryEndPoint: getSummonerMatchHistoryEndPoint,
                  getSummonerMasteryListEndPoint: getSummonerMasteryListEndPoint,
                  getSummonerScoreEndPoint: getSummonerScoreEndPoint
};