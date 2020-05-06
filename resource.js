const https = 'https://';
const summonerIdEndPoint = '.api.riotgames.com/lol/summoner/v4/summoners/by-name';
const summonerInfoEndPoint = '.api.riotgames.com/lol/league/v4/entries/by-summoner';
const summonerMatchHistoryEndPoint = '.api.riotgames.com/lol/match/v4/matchlists/by-account';
const summonerMasteryListEndPoint = '.api.riotgames.com/lol/champion-mastery/v4/champion-masteries/by-summoner';
const summonerScoreEndPoint = '.api.riotgames.com/lol/champion-mastery/v4/scores/by-summoner'
const championRoationEndPoint = 'https://na1.api.riotgames.com/lol/platform/v3/champion-rotations';
const challengerListEndPoint = '.api.riotgames.com/lol/league/v4/challengerleagues/by-queue'
const matchEndPoint = '.api.riotgames.com/lol/match/v4/matches';

module.exports = {https: https,
                  summonerIdEndPoint: summonerIdEndPoint,
                  summonerInfoEndPoint: summonerInfoEndPoint,
                  summonerMatchHistoryEndPoint: summonerMatchHistoryEndPoint,
                  summonerMasteryListEndPoint: summonerMasteryListEndPoint,
                  summonerScoreEndPoint: summonerScoreEndPoint,
                  championRoationEndPoint: championRoationEndPoint,
                  challengerListEndPoint: challengerListEndPoint,
                  matchEndPoint: matchEndPoint
};