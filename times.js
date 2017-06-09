const http = require('http');
const async = require('async');
const postroute = '/user/create';
const getroute = '/users';
const url = 'http://' + process.argv[2] + ':' + process.argv[3] + getroute;

async.series({
  post: function(done) {
    const opts = {
      hostname: process.argv[2],
      port: process.argv[3],
      path: postroute,
      method: 'POST'
    }
    async.times(5, function(n){
      const postData = JSON.stringify({"user_id": (n + 1)});
      const req = http.request(opts, function(res) {
      let data = '';
        res.on('data', function(chunk){/*not necessary*/});
        res.on('end', function(){/*not necessary*/});
      });
      req.write(postData);
      req.end();
    });
    done(null, null);
  },
  get: function(done) {
    http.get(url, function(res){
      var data = '';
      res.on('data', function(chunk){
        data += chunk.toString();
      });
      res.on('end', function(){
        done(null, data);
      });
    })
  }
},
function(err, results) {
  if (err) return err;
  console.log(results.get);
});
