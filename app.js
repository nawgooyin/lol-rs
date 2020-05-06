const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const summoners = require('./routes/summoner.js');
const champions = require('./routes/champion.js');
const ranks = require('./routes/rank.js');
const matches = require('./routes/match.js');

app.use(summoners);
app.use(champions);
app.use(ranks);
app.use(matches);

app.listen(port);