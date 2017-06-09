const http = require('http');
const async = require('async');
const url = process.argv[2];

let count = 0;
let results = [];

async.whilst(
  function() { return !results.includes('meerkat'); },
  function(callback) {
    http.get(url, function(res){
      var data = '';
      res.on('data', function(chunk){
        data += chunk.toString();
        results.push(data.trim());
      });
      res.on('end', function(){
        count++;
        callback(null, count);
      });
    });
  },
  function(err, count) {
    console.log(count);
  }
)
