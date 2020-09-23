const { Http2ServerRequest } = require('http2');
const request = require('request');
const axios = require('axios');
const app = require('express')();
const server = require('http').Server(app);
const io = require('socket.io').listen(server);
var jf = require('jsonfile'); 
var fs = require('fs'); 
var url = 'https://1xbetasia.mobi/LiveFeed/Get1x2_VZip?count=1000&lng=tr&mode=4&country=190&partner=7&getEmpty=true';
var url2 = 'https://1xbetasia.mobi/LineFeed/Get1x2_VZip?count=100&lng=tr&tf=1500000&tz=3&antisports=198&mode=4&country=190&partner=57&getEmpty=true';
var cacheFile = 'json.json';
var connectedSockets = [];
let liveMatches = [];
let soonMatches = [];

io.sockets.on('connection', function(socket) {
    socket.emit('event', liveMatches);
    socket.emit('event2', soonMatches);
});

const getLiveMatches = () => {
    axios.get(url)
      .then(function (response) {
        liveMatches = [];
        let matches = response.data.Value;
        matches.map((item, idx) => {
            if(matches[idx]["VI"]) {
                liveMatches.push({
                    home: {
                        name: matches[idx]["O1E"] ? matches[idx]["O1E"] : null,
                        logo: matches[idx]["O1IMG"] ? `https://v2l.cdnsfree.com/sfiles/logo_teams/${matches[idx]["O1IMG"][0]}` : null
                    },
                    away: {
                        name: matches[idx]["O2E"] ? matches[idx]["O2E"] : null,
                        logo: matches[idx]["O2IMG"] ? `https://v2l.cdnsfree.com/sfiles/logo_teams/${matches[idx]["O2IMG"][0]}` : null
                    },                
                    category: matches[idx]["SE"] ? matches[idx]["SE"] : null,
            time: matches[idx]["S"] ? matches[idx]["S"] : null,
            type: matches[idx]["L"] ? matches[idx]["L"] : null,
                    tvUrl: matches[idx]["VI"] ? `https://edge5.xmediaget.com/hls-live/xmlive/_definst_/${matches[idx]["VI"]}/${matches[idx]["VI"]}.m3u8?whence=2` : null
                });                
            }
        });
        io.sockets.emit('event', liveMatches);
      })
      .catch(function (error) {
        console.log(error);
      });
}

const getSoonMatches = () => {
    axios.get(url2)
      .then(function (response) {
        soonMatches = [];
        let matches = response.data.Value;
        matches.map((item, idx) => {
            soonMatches.push({
                home: {
                    name: matches[idx]["O1E"] ? matches[idx]["O1E"] : null,
                    logo: matches[idx]["O1IMG"] ? `https://v2l.cdnsfree.com/sfiles/logo_teams/${matches[idx]["O1IMG"][0]}` : null
                },
                away: {
                    name: matches[idx]["O2E"] ? matches[idx]["O2E"] : null,
                    logo: matches[idx]["O2IMG"] ? `https://v2l.cdnsfree.com/sfiles/logo_teams/${matches[idx]["O2IMG"][0]}` : null
                },                
                category: matches[idx]["SE"] ? matches[idx]["SE"] : null,
        time: matches[idx]["S"] ? matches[idx]["S"] : null,
        type: matches[idx]["L"] ? matches[idx]["L"] : null,
                tvUrl: matches[idx]["VI"] ? `https://edge5.xmediaget.com/hls-live/xmlive/_definst_/${matches[idx]["VI"]}/${matches[idx]["VI"]}.m3u8?whence=2` : null
            });                
        });
        io.sockets.emit('event2', soonMatches);
      })
      .catch(function (error) {
        console.log(error);
      });
}


setInterval(() => {
getLiveMatches();
getSoonMatches();
}, 60000 * 10);


/*function datagetir()
{
    request.get(url).on('response',function(res){
        body = '';
        res.on('data',(data)=>{
            body+=data;
        });        
        res.on('end', function() {
            fs.writeFileSync(cacheFile, JSON.stringify(body));
            setInterval(() => {
                datagetir();
            }, 300000); 
        });
    })
}
datagetir();*/
/*
io.sockets.on('connection', function(socket) {
    console.log('CONNECTED')
    fs.readFile(cacheFile, "utf8", function(err,data) {
        socket.emit('data', JSON.parse(data));
    });
    fs.watch(cacheFile, function(event, filename) {
        if(event == 'change') {
            fs.readFile(cacheFile, "utf8", function(err,data) {
                socket.emit('data', JSON.parse(data));
            });
        }
    });
});*/

app.get('/',(req,res)=>{
    res.sendFile(__dirname + '/index.html');
});

app.get('/json.json',(req,res)=>{
    res.sendFile(__dirname + '/json.json');
});




server.listen(60000,()=>{
    console.log("server başladı");
getLiveMatches();
getSoonMatches();
})
