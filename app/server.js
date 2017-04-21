const express = require('express');
const app = express();
const port = 3000;
require('./server/routes/routes')(app, {});

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.listen(port, () => {
  console.log('Backend server is live on port ' + port);
});
