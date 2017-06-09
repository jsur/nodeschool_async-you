const http = require('http');
const async = require('async');

async.map([process.argv[2], process.argv[3]], function(url, done){
  let data = '';
  http.get(url, function(res){
    res.on('data', function(chunk){
      data += chunk.toString();
    });
    res.on('end', function(){
      return done(null, data);
    });
  });
},
function done(err, results) {
  if (err) return console.log(err); //returns an array
  console.log(results);
});
