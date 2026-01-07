var http = require("http")
var fs = require ("fs")

var onRequestHandler= function (request, response){
    var pathName= "./"+request.url 
    fs.readFile(pathName, (err, data)=>{
        if(err){
            console.log("something has wrong");
            console.log(err)
            response.writeHead(404, {"content-Type":"text/html"});
        }
        else{
            response.writeHead(200, {"content-Type":"text/html"});
            response.write(data.toString());
        }
        response.end();
    });
}

var Server = http.createServer(onRequestHandler)
Server.listen(5000)
console.log("server is listening on port number 5000")