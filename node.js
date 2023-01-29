let express = require('express');
let app = express();
let http = require('http').Server(app);
let https = require('https');

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

app.get('/app/:name', function(req, res){
    res.sendFile(__dirname + '/apps/' + req.params.name);
    });

app.get('/app/:name/:file', function(req, res){
    res.sendFile(__dirname + '/apps/' + req.params.name + '/' + req.params.file);
    });

app.get('/app/:name/:file/:file2', function(req, res){
    res.sendFile(__dirname + '/apps/' + req.params.name + '/' + req.params.file + '/' + req.params.file2);
    }
);

app.get('/app/:name/:file/:file2/:file3', function(req, res){
    res.sendFile(__dirname + '/apps/' + req.params.name + '/' + req.params.file + '/' + req.params.file2 + '/' + req.params.file3);
    }
);

app.get('/assets/:file', function(req, res){
    res.sendFile(__dirname + '/assets/' + req.params.file);
    }
);

app.get('/assets/:file/:file2', function(req, res){
    res.sendFile(__dirname + '/assets/' + req.params.file + '/' + req.params.file2);
    }
);


//start server
http.listen(80, function(){
    console.log('listening on *:80');
    }
);