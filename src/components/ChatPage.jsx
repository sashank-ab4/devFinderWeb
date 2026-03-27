import { useEffect, useState, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { createSocketConnection } from "../utils/socket";
import { useSelector } from "react-redux";
import axios from "axios";
import { BASE_BACKEND_URL } from "../utils/mockData";
import { VscSend } from "react-icons/vsc";
import { MdKeyboardArrowLeft } from "react-icons/md";

export default function MessageFeed() {
  const { textingUserId } = useParams();
  const [messages, setMessages] = useState([]);
  const [chatterUser, setChatterUser] = useState(null);
  const [latestMessage, setLatestMessage] = useState("");
  const user = useSelector((store) => store.user);
  const userId = user?._id;
  const navigate = useNavigate();
  const endTextsRef = useRef(null);
  const socketRef = useRef(null);
  const fetchChatMessages = async () => {
    const chat = await axios.get(BASE_BACKEND_URL + "/chat/" + textingUserId, {
      withCredentials: true,
    });

    const chatTexts = chat?.data?.messages.map((msg) => {
      return {
        senderId: msg.senderId,
        text: msg.text,
        createdAt: msg.createdAt,
      };
    });
    setMessages(chatTexts);
  };

  const fetchChatterUser = async () => {
    const response = await axios.get(
      BASE_BACKEND_URL + "/user/" + textingUserId,
      { withCredentials: true },
    );

    setChatterUser(response?.data);
  };
  useEffect(() => {
    fetchChatMessages();
    fetchChatterUser();
  }, [textingUserId]);

  useEffect(() => {
    if (!userId) {
      return;
    }
    socketRef.current = createSocketConnection();
    // as page loads, the socket connection is made and this will emit the event : joinChat
    socketRef.current.emit("joinChat", {
      firstName: user.firstName,
      userId,
      textingUserId,
    });

    socketRef.current.on("messageReceived", (newMessage) => {
      setMessages((messages) => [...messages, newMessage]);
    });
    // clean up function
    return () => {
      socketRef.current.disconnect();
    };
  }, [userId, textingUserId]);

  const handleSendMessage = () => {
    if (!socketRef.current) return;
    socketRef.current.emit("sendMessage", {
      firstName: user.firstName,
      lastName: user.lastName,
      text: latestMessage,
      userId,
      textingUserId,
    });
    setLatestMessage("");
  };
  useEffect(() => {
    endTextsRef.current?.scrollIntoView({
      behavior: messages.length > 1 ? "smooth" : "auto",
    });
  }, [messages]);
  return (
    <>
      <div
        className="
      flex flex-col
      min-h-screen sm:h-[90vh]
      w-full sm:max-w-2xl
      mx-auto
      border sm:rounded-xl
      sm:mt-5
      shadow bg-base-100
    "
      >
        <div className="relative flex items-center p-2 sm:p-3 border-b">
          <button
            onClick={() => navigate(-1)}
            className="p-2 rounded-full hover:bg-gray-200 transition"
          >
            <MdKeyboardArrowLeft size={22} />
          </button>

          <h1 className="absolute left-1/2 -translate-x-1/2 font-semibold sm:font-bold tracking-wide text-sm sm:text-base">
            CHAT
          </h1>
        </div>

        <div className="flex items-center gap-2 sm:gap-3 p-2 sm:p-3 border-b bg-base-100">
          <div className="avatar">
            <div className="w-8 sm:w-10 rounded-full">
              <img
                src={
                  chatterUser?.photoUrl ??
                  "https://cdn-icons-png.flaticon.com/512/149/149071.png"
                }
                alt="Profile"
              />
            </div>
          </div>

          <div>
            <p className="font-semibold text-sm sm:text-base">
              {chatterUser?.firstName} {chatterUser?.lastName}
            </p>
            <p className="text-[10px] sm:text-xs text-gray-500">Active now</p>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-2 sm:p-4 space-y-2">
          {messages.map((msg) => {
            const isMe = user?._id === msg?.senderId?._id;

            return (
              <div
                key={msg?._id || msg?.createdAt}
                className={`chat ${isMe ? "chat-end" : "chat-start"}`}
              >
                <div className="chat-image avatar">
                  <div className="w-8 sm:w-10 rounded-full">
                    <img
                      src={
                        isMe
                          ? user?.photoUrl
                          : (msg?.senderId?.photoUrl ??
                            "https://cdn-icons-png.flaticon.com/512/149/149071.png")
                      }
                      alt="avatar"
                    />
                  </div>
                </div>
                <div className="chat-header text-[10px] sm:text-xs opacity-70">
                  {isMe ? "You" : msg?.senderId?.firstName}
                </div>
                <div className="chat-bubble text-sm sm:text-base">
                  {msg?.text}
                </div>

                <div className="text-[9px] sm:text-[10px] opacity-50 mt-1">
                  {msg?.createdAt &&
                    new Date(msg.createdAt).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                </div>
              </div>
            );
          })}

          <div ref={endTextsRef} />
        </div>

        <div className="p-2 sm:p-3 border-t flex gap-2">
          <input
            value={latestMessage}
            onChange={(e) => setLatestMessage(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") handleSendMessage();
            }}
            type="text"
            placeholder="Type a message..."
            className="input input-bordered w-full text-sm sm:text-base"
          />

          <button
            disabled={!latestMessage.trim()}
            onClick={handleSendMessage}
            className="btn btn-primary px-3 sm:px-4"
          >
            <VscSend size={20} />
          </button>
        </div>
      </div>
    </>
  );
}
