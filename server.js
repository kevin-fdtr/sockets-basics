var PORT = process.env.PORT || 3000;
var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var moment = require('moment');

app.use(express.static(__dirname + '/public'));

io.on('connection', function(socket) {
  console.log('user connected via socket.io');

  socket.on('message', function(message) {
    console.log('message received ' + moment(message.time).format('h:m:ss a') + ': ' + message.text);
    message.time = moment.valueOf();
    io.emit('message', message);
  });

  socket.emit('message', {
    text: 'Welcome to the chat application',
    time: moment.valueOf()
  });
});

http.listen(PORT, function() {
  console.log('server started');
});
