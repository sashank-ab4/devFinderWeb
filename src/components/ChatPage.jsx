import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { createSocketConnection } from "../utils/socket";
import { useSelector } from "react-redux";

export default function MessageFeed() {
  const { textingUserId } = useParams();
  const [messages, setMessages] = useState([]);
  const [latestMessage, setLatestMessage] = useState("");
  const user = useSelector((store) => store.user);
  const userId = user?._id;
  useEffect(() => {
    if (!userId) {
      return;
    }
    const socket = createSocketConnection();
    // as page loads, the socket connection is made and this will emit the event : joinChat
    socket.emit("joinChat", {
      firstName: user.firstName,
      userId,
      textingUserId,
    });

    socket.on("messageReceived", ({ firstName, text }) => {
      console.log(firstName + ": " + text);
      setMessages((messages) => [...messages, { firstName, text }]);
    });
    // clean up function
    return () => {
      socket.disconnect();
    };
  }, [userId, textingUserId]);

  const handleSendMessage = () => {
    const socket = createSocketConnection();
    socket.emit("sendMessage", {
      firstName: user.firstName,
      text: latestMessage,
      userId,
      textingUserId,
    });
    setLatestMessage("");
  };

  return (
    <>
      <div className="text-center p-3 border-b">
        <h1 className="font-bold tracking-wide">Chat</h1>
      </div>
      <div className="w-1/2 h-[80vh] border mt-0.5">
        {messages.map((msg, index) => {
          return (
            <div key={index}>
              <div className="chat chat-start">
                <div className="chat-image avatar">
                  <div className="w-10 rounded-full">
                    <img
                      alt="Tailwind CSS chat bubble component"
                      src="https://img.daisyui.com/images/profile/demo/kenobee@192.webp"
                    />
                  </div>
                </div>
                <div className="chat-header">
                  {msg.firstName}
                  <time className="text-xs opacity-50">12:45</time>
                </div>
                <div className="chat-bubble">{msg.text}</div>
                <div className="chat-footer opacity-50">Delivered</div>
              </div>
              <div className="chat chat-end">
                <div className="chat-image avatar">
                  <div className="w-10 rounded-full">
                    <img
                      alt="Tailwind CSS chat bubble component"
                      src="https://img.daisyui.com/images/profile/demo/anakeen@192.webp"
                    />
                  </div>
                </div>
                <div className="chat-header">
                  Anakin
                  <time className="text-xs opacity-50">12:46</time>
                </div>
                <div className="chat-bubble">I hate you!</div>
                <div className="chat-footer opacity-50">Seen at 12:46</div>
              </div>
            </div>
          );
        })}
      </div>
      <div>
        <input
          value={latestMessage}
          onChange={(e) => setLatestMessage(e.target.value)}
          type="text"
          className="border"
        />
        <button onClick={handleSendMessage}>Send</button>
      </div>
    </>
  );
}
