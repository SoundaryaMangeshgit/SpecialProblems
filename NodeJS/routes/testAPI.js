// new comment 
// new comment 2
//new comment 3
const logger = require('morgan');
var express=require("express");
var router= express.Router();
var mysql = require('mysql');
const cors = require('cors');
var Twitter = require('twitter');
var app=express();
var tab=require('table');
var client = new Twitter({
  consumer_key: '',
  consumer_secret: '',
  access_token_key: '',
  access_token_secret: ''
});
var connect = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "password",
  database:'test1',
  charset : 'utf8mb4'
});

var all_tweets = [];
var all_tweets2=["hi","hello","how"];
var tweet_term="";
var params = {screen_name: 'SrBachchan'};



app.use(
  cors({
    origin: 'http://localhost:3000',  // temp changing http://localhost:3000
    credentials: true,
  })
);
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
var length_arr=all_tweets.length
 
var display_tweets=[];
// temp 
var Sentiment = require('sentiment');
var sentiment = new Sentiment();
//var result = sentiment.analyze('Cats are stupid.');
//console.dir(result); 
var final_score_val=0

var tabled_data_array=[]
app.get('/',display_tweets,function(req, res) {
  console.log('Inside Home Login');
  
  console.log('Unchanhed display tweets : ',display_tweets);
 
  for (j=0;j<display_tweets[0].length;j++)
  {
   // console.log("each tweet with pos  and tweet text",j,display_tweets[0][j].tweettext)
    tabled_data_array.push(display_tweets[0][j].tweettext)
    var sentiment_value=sentiment.analyze(display_tweets[0][j].tweettext)
   console.log("val and sentences",sentiment_value.score,display_tweets[0][j].tweettext)
    final_score_val=final_score_val+sentiment_value.score
  }
  var ans_score=final_score_val/display_tweets[0].length
  console.log("the total score of for a search term ",tweet_term,ans_score)
 // res.send(display_tweets); comment temp
 
  config = {  
    columns: { 
       
      0: { 
        width: 300  // Column 1 of width 20 
      } 
      
    } 
  }; 
 
 const formattedData=tabled_data_array.map((x)=>({x}));
//tabled_data_array=tabled_data_array.map((x)=>([x]));
//console.log(" data array table ", tabled_data_array);
console.log("formatted data to send next",formattedData)
// let table_data= tab.table(tabled_data_array,config);
 // console.log("table data formatted ",table_data);
 res.send(formattedData)
  //res.send(table_data)
});


app.post("/",function(req,res)
{

    
  const search_value = req.body.search_term;
  console.log("fghj");
  tweet_term=search_value;
  //all_tweets.push(search_value);
  console.log("twwet term");
  console.log(tweet_term);
  var check='%'+tweet_term+'%'
    connect.getConnection(function (err, connection) {
  var query1="SELECT * FROM test1.tweet_test_demo where tweettext LIKE "+ mysql.escape(check);
  
      // Executing the MySQL query (select all data from the 'users' table).
      connection.query(query1, function (error, results, fields) {
        // If some error occurs, we throw an error.
        if (error) throw error;
    
        display_tweets.push(results)
        res.send(JSON.stringify(results))
       
        
      });
    });

});   


module.exports=app;
//module.exports=router;
