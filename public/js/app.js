var socket = io();
//var moment = require('moment.js');

socket.on('connect', function() {
  console.log('connected to socket.io server');
});

socket.on('message', function(message) {
  jQuery('.messages').append('<p><strong>' + moment.utc(message.time).local().format('h:mm:ss a') + ':</strong> ' + message.text + '</p>');
});

// Handles submitting of new message
var $form = jQuery('#message-form');

$form.on('submit', function (event) {
  event.preventDefault();

  var $message = $form.find('input[name=message]');

  socket.emit('message', {
    text: $message.val(),
    time: moment().valueOf()
  });

  $message.val('');
});
