var http = require('http');
var express = require('express');
var socket = require('socket.io');

var app = express();
var server = http.createServer(app);
var io = socket(server);

function get(req, result) {
    result.sendFile(__dirname + "/index.html");
}


app.get('/', get);
app.get('/hello', get);

server.listen('3000', function() {
    console.log("Le serveur est lancé");
});

io.on('connection', function(socket) {
    console.log('Quelqu\'un s\'est connecté');

    socket.on('chat-sended', function(name, text) {
        io.emit('chat-received', name, text);
    });
    socket.on('disconnect', function() {
        console.log('Deconnexion...')
    });

    socket.on('img', function(name, image) {
        io.emit('img', name, image);
    })
})