var twitterActions = require('../actions/twitter');

module.exports = function(app, db) {
  app.get('/gettweets', (req, res) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

    var tweetKeyword = req.query.tweetKeyword;
    var tweetCount = req.query.count;
    twitterActions.getTweets(res, tweetKeyword, tweetCount);
  });
};
