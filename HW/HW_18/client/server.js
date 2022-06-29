var http = require('http');
var static = require('node-static');
var file = new static.Server('.');   
let port = 6565;   

http.createServer(function(req, res){
    console.log('Inside')
    file.serve(req, res);
}).listen(port);

console.log(`Server running on port ${port}`);