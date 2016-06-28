var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

// connection event is triggered when the io() is called
// on the client side
io.on('connection', function(socket){
  console.log('a user connected');
  // disconnect event is triggered when the user closes
  // the browser tab, for example
  socket.on('disconnect', function() {
    console.log('user disconnected');
  });

  // listen for chat messages
  socket.on('chat message', function(msg){
    io.emit('chat message', msg);
  });
});

http.listen(3000, function(){
  console.log('listening on *:3000');
});
