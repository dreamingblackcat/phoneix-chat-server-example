$(function() {
	$messages = $('#messages');
	$body = $("#msg_body");
	$username = $("#username")
	var socket = new Phoenix.Socket("/ws");

	socket.join("rooms:", {"username": "JJ"},function(chan){
		chan.on("user:entered",function(message){
			$messages.append("<br/>(" +message["username"] +") has joined to" + message["room"]);
		});

		chan.on("new:message",function(msg){
			$messages.append("<br/>(" +msg["username"] +") said: " + msg["msg_body"]);
			var height = $messages[0].scrollHeight - $messages.height();
			$messages[0].scrollTop = height;
		});

		$body.off("keypress").on("keypress",function(e){
			if(e.keyCode == 13){
				chan.send("new:message",{
					username: $username.val(),
					msg_body: $body.val()
				});
				$body.val("");
			}
		})
	});
});