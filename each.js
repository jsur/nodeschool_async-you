const http = require('http');
const async = require('async');
let temp = '';

async.each([process.argv[2], process.argv[3]], function(item, done){
  http.get(item, function(res){
    res.on('data', function(chunk){
      temp += chunk;
    });
    res.on('end', function(){
      return done();
    });
  });
}, function(err){
  if (err) console.log(err);
});
