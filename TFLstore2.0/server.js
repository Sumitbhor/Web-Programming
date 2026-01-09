var express = require('express');
var path = require('path');
var credentials = require('./data/credentials.json');
var customers = require('./data/customers.json');
var flowers = require('./data/flowers.json');
var app = express();
app.use(express.static(path.join(__dirname,'public')));
app.use(express.urlencoded({extended: true}));
app.use(express.json());

app.get("/", (request, response)=>{
    response.sendFile(__dirname+ "index.html");
})
app.get("/api/flowers",(request, response)=>{
    response.send(flowers)
})

app.get("/api/flowers/:id",(request, response)=>{
    let id = request.params.id;
    var flower = flowers.find(x=> x.id == id);
    response.send(flower);
})

app.get("/api/customers",(request, response)=>{
    response.send(customers)
})

app.get("/api/customers/:id",(request, response)=>{
    let id = request.params.id;
    var customer = customers.find(x=> x.id == id);
    response.send(customer);
})

app.post("/api/register",(request,response)=>{
    var newCustomer = request.body;
    var newCredential =[
        {
            "username" : newCustomer.username, 
            "password": newCustomer.password
        }
    ]
    
    var cust={
       "id" : newCustomer.id,
       "firstname":newCustomer.firstname,
       "lastname":newCustomer.lastname,
       "email":newCustomer.email,
       "contactnumber":newCustomer.contactnumber,
       "city":newCustomer.city
    }
     customers.push(cust);
     credentials.push(newCredential);
    response.send({"message":"registration successful"});
})

app.post("/api/login",(request,response)=>{
    let User= request.body;
    let theUser = credentials.find(x=> x.username == User.username && x.password == User.password);
    response.send(User);
    if(theUser!== undefined){
        response.send({"message":"login successful"});
        console.log(theUser);
    }
    else{
        response.send({"message":"invalid username or password"});
        console.log(theUser);
    }
})

app.delete("/api/flowers/:id",(request, response)=>{
    let id = request.params.id ;
    let remainingFlowers= flowers.filter(f=>f.id!==id);
    flowers= remainingFlowers;
})

app.post("/api/flowers", (request,response)=>{
    let newFlower= request.body ;
    flowers.push(newFlower);
    response.send("New Flower is inserted to collection");
})

app.delete("/api/flowers/:id", (request, response)=>{
    let id = request.params.id;
    let remainingFlowers= flowers.filter(f=>f.id != id);
    let newFlower= remainingFlowers ;
    response.send("flowers is removed from collection ")
})
app.listen(5000);
console.log("server is listening on port number 5000");