const http = require('http');
const async = require('async');
const path1 = process.argv[2];
const path2 = process.argv[3];

async.series({
  requestOne: function(cb){
    http.get(path1, function(res){
      var data = '';
      res.on('data', function(chunk){
        data += chunk.toString();
      });
      res.on('end', function(){
        cb(null, data);
      });
    })
  },
  requestTwo: function(cb){
    http.get(path2, function(res){
      var data = '';
      res.on('data', function(chunk){
        data += chunk.toString();
      });
      res.on('end', function(){
        cb(null, data);
      });
    })
  }
}, function(err, results){
    console.log(results);
  });
