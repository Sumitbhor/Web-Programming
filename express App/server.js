var express = require("express");
var path = require("path");
var app = express(); //get global object
                     //global object contains http server 
var staticFolder= express.static(path.join(__dirname, "public"));
// expres framework configuration 
app.use(staticFolder);
// Express Framework setting handler 
// mapping incomming request to callback function 
app.get("/", (request,response)=>{
    response.sendFile(__dirname+ "/index.html");
});
app.listen(5000);
console.log("Express web application is listening on port number 5000");

