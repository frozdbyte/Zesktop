let express = require('express');
let app = express();
let http = require('http').Server(app);
let https = require('https');
let filewall = require('./scripts/file-wall.js');
let appwall = require('./scripts/app-wall.js');



app.get('/', function(req, res){
    res.sendFile(__dirname + '/index.html');
    }
);

app.get('/desktop', function(req, res){
    res.sendFile(__dirname + '/desktop.html');
    }
);

app.get('/apps', function(req, res){
    res.sendFile(__dirname + '/apps.json');
    });



app.use("/assets", express.static('assets'));

app.use("/files", filewall, express.static('files'));

app.use("/app", express.static('apps'));



//start server
http.listen(80, function(){
    console.log('listening on *:80');
    }
);