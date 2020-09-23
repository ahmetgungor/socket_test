const { Http2ServerRequest } = require('http2');

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




const hostname = '';
const port = 3001;
const out = getStreamSomehow();
const err = getStreamSomehow();
const myConsole = new console.Console(out, err);

server.listen(port, () => {
    console.log("Server running at http://"+hostname+":"+port+"/");
});