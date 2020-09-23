const { Http2ServerRequest } = require('http2');
const request = require('request');
const axios = require('axios');
const app = require('express')();

const server = require('http').Server(app);

const io = require('socket.io').listen(server);
var jf = require('jsonfile'); 


app.get('/',(req,res)=>{
    res.sendFile(__dirname + '/index.html');
});
app.get('/test',(req,res)=>{
    res.sendFile(__dirname + '/index.html');
});
app.get('/json',(req,res)=>{
    res.sendFile(__dirname + '/json.json');
});




server.listen(3100,()=>{
    console.log("server başladı");
})
