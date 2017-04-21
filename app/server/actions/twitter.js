var OAuth2 = require('OAuth').OAuth2;
var https = require('https');
var twitterConsumerKey = 'S1wLpMeV1QCKg5MB3rts7PsgS';
var twitterConsumerSecret = 'AVTceCPtSYrCXWsdXwk3cT7eI3SSdAu75B973mYqH1GvN8Ov54';
var oauth2 = new OAuth2(twitterConsumerKey, twitterConsumerSecret, 'https://api.twitter.com/', null, 'oauth2/token', null);
var tweets;

module.exports = {
  getTweets: function (res, tweetKeyword, tweetCount) {
    oauth2.getOAuthAccessToken('', {
        'grant_type': 'client_credentials'
    }, function (e, access_token) {
        // console.log("access_token", access_token);

        var options = {
            hostname: 'api.twitter.com',
            path: '/1.1/search/tweets.json?q=' + tweetKeyword + '&count=' + tweetCount,
            headers: {
                Authorization: 'Bearer ' + access_token
            }
        };

        https.get(options, function (result) {
            var buffer = '';
            result.setEncoding('utf8');
            result.on('data', function (data) {
                buffer += data;
            });
            result.on('end', function () {
                tweets = JSON.parse(buffer);
                res.send(tweets);
            });
        });
    });
  }
};
