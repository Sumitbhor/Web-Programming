var fs = require ('fs');
var fileName = "./data/info.txt";

var onFileRead = function(err, data){
    console.log("data from File available ");
    console.log(data.toString());

    
};

fs.readFile(fileName, onFileRead); 