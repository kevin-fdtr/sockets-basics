var socket = io();
var name = getQueryVariable('name') || 'Anonymous';
var room = getQueryVariable('room') || 'Main';

socket.on('connect', function() {
  console.log('connected to socket.io server');
});

socket.on('message', function(message) {
  var $message = jQuery('.messages');
  $message.append('<p><strong>' + message.name + ' ' + moment.utc(message.time).local().format('h:mm a') + ':</strong></p>');
  $message.append('<p>' + message.text + '</p>');
});

// Handles submitting of new message
var $form = jQuery('#message-form');

$form.on('submit', function (event) {
  event.preventDefault();

  var $message = $form.find('input[name=message]');

  socket.emit('message', {
    name: name,
    text: $message.val(),
    time: moment().valueOf()
  });

  $message.val('');
});
