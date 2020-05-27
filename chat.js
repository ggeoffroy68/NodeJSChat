let express = require('express');
let http = require('http');
let app = express();
let server = http.createServer(app);

//STEP 3
let io = require('socket.io')(server);


app.get('/', (req, res) => {
    //STEP 1
    //res.send('<h1>Hello world</h1>');

    //STEP 2
    res.sendFile(__dirname + '/index.html')
});

//STEP 3
io.on('connection', (socket) => {
    console.log('Un nouveau Tek0 !');
    //STEP 4
    socket.on('disconnect', () => {
        console.log("Un Tek5 s'en va !");
    });
    //STEP 5
    socket.on('chat message', (msg) => {
        console.log('Message: ' + msg);
        //STEP 6
        //socket.broadcast.emit('chat message', msg);
        io.emit('chat message', msg);
      });
});

server.listen(3000, () => {
    console.log('Server listen on: 3000');
});