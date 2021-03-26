console.log('Replier Bot Starting!')
var Twit = require('twit');
var config = require('./configTwit');
var T = new Twit(config);
var hashtags = ["#nft", "#nftcollector", "#nftartist", "#nftart", "#nfts"];

const myAccount = ''; //Ur account ID
var totalTweets = 1;

likeIt();
setInterval(likeIt,1000*900);
function likeIt(){
//Setting up a user stream
var stream = T.stream('statuses/filter', { track: hashtags });

stream.on('tweet', function (tweet) {
    const id = tweet.id_str;
    const text = tweet.text;

    const params = {
        in_reply_to_status_id: id,
        status : '',
        auto_populate_reply_metadata: true
    }

        console.log(tweet.text);
        T.post('statuses/retweet/:id', { id: id }, function (err, data, response) {
            console.log('Tweet Attempt');
            if(err)
            {
                console.log(err);
            }
            else
            {
                console.log('Tweet Sent!');
                if(totalTweets == 5) { stream.stop(); } else { totalTweets += 1; }
            }
        })
  })
}