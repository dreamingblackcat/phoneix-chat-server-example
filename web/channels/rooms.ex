defmodule Chatter.Channels.RoomChannel do
	use Phoenix.Channel

	def join("rooms:", message, socket) do
		IO.puts "User just joined"
	  {:ok, socket}
	end

	# handles any other subtopic as the room ID, ie `"rooms:12"`, `"rooms:34"`
	def join("rooms:" <> room_id, message, socket) do
		IO.puts "Joined! To #{room_id}"
		broadcast socket, "user:entered", %{username: message["username"] || "Someone",room: room_id, message_text: "yeah"}
	  {:ok, socket}
	end

	def handle_in("new:message", %{"username" => username, "msg_body" => msg_body}, socket) do
		IO.puts "#{username} sends a #{msg_body}"
	  broadcast socket, "new:message", %{username: username, msg_body: msg_body}
	  {:ok, socket}
	end
end