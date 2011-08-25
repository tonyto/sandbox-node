$(document).ready(function() {
	console.log('ready!!!!!!!!')

	now.receiveMessage = function(name, message) {
		$('#message').append('<br>' + name + ': ' + message);
	};

	$('#send-button').bind('click', function() {
		now.sendMessage($('#text-input').val());
		$('#text-input').val('');
		$('#text-input').focus();
	});

	now.name = prompt("what's your name?");
});
