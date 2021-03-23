




var mysql = require('mysql');

var Twitter = require('twitter');

var client = new Twitter({
  consumer_key: 'oDQbYFM5Y7nLcZg5VWqgJ0ZtA',
  consumer_secret: 'DBthO8NRjv0komdXpZOJyT31VEibi6GDu3FEljj5gKUtKj1GpI',
  access_token_key: '1336965417537994753-L7bxHSYY2gQng2UnbX49YHvmW4gO7U',
  access_token_secret: '65KuAa5sdioHZRa8IqYqkptwLcfmhE4fScou1YnyRxEnW'
});
var connect1 = mysql.createConnection({
  host: "localhost",
  
  
  user: "root",
  password: "password",
  database:'test1',
  charset : 'utf8mb4'

});



  
  var insert_R = 'select * from test1.tweet_test_demo2';
  
  

connect1.connect(function(err){

if(err) throw err;
connect1.query("SELECT * FROM test1.tweet_test_demo2", function(err,result,fields)
{
  if(err) throw err;
  console.log(result);
});



});