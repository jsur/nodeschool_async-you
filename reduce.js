const http = require('http');
const async = require('async');
const url = process.argv[2] + '?number=';
let num = 0;

async.reduce(['one', 'two', 'three'], 0, function(memo, item, callback){
  http.get(url + item, function(res){
    let data = '';
    res.on('data', function(chunk){
      data += chunk.toString();
    });
    res.on('end', function(){
      num = num + new Number(data);
      callback(null, num);
    });
  });
}, function(err, result) {
  console.log(result);
});
