const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const routers = require('./routes/summoner.js');

app.use(routers);

app.listen(port);