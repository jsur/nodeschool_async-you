const http = require('http');
const async = require('async');
const fs = require('fs');
const path = process.argv[2];

async.waterfall([

  function(cb){
    fs.readFile(path, 'utf8', function(err, url){
      if(err) return err;
      cb(null, url);
    });
  },
  function(url, cb){
    var data = '';
    http.get(url, function(res){
      res.on('data', function(chunk){
        data += chunk.toString();
      });
      res.on('end', function(){
        cb(null, data);
      });
    }).on('error', function(err) {
      cb(err);
    });
  }
], function(err, result){
  if (err) return console.error(err);
  console.log(result);
});
