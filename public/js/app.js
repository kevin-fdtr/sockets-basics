var socket = io();
var name = getQueryVariable('name') || 'Anonymous';
var room = getQueryVariable('room') || 'Main';

jQuery('.room-title').text(room);

socket.on('connect', function() {
  console.log('connected to socket.io server');
  socket.emit('joinRoom', {
    name: name,
    room: room
  });
});

socket.on('message', function(message) {
  var $messages = jQuery('.messages');
  var $message = jQuery('<li class="list-group-item"></li>')
  $message.append('<p><strong>' + message.name + ' ' + moment.utc(message.time).local().format('h:mm a') + ':</strong></p>');
  $message.append('<p>' + message.text + '</p>');
  $messages.append($message);
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
