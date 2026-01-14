import React, { useEffect, useRef, useState } from "react";
import { getMessageApi, messageSeenAPI, sendMessageApi } from "../Services/allApi";
import { socket } from "../Services/socket";
import moment from "moment";

const ChatContainer = ({ userSelected, selecteduser }) => {
  const [text, setText] = useState("");
  const [token, setToken] = useState("");
  const [image, setImage] = useState("");
  const [loggedInUserIds, setloggedInUserId] = useState(null);
  const [preview, setPreview] = useState("");
  const [loading, setLoading] = useState(true);
  const [allChats, setAllCHats] = useState([]);
  const [onlineUsers, setOnlineUsers] = useState([]);

  const bottomRef = useRef(null);

  /* ================= SOCKET CONNECT ================= */
  useEffect(() => {
    if (!loggedInUserIds?._id) return;

    const handleConnect = () => {
      socket.emit("userOnline", loggedInUserIds._id);
    };

    socket.on("connect", handleConnect);
    return () => socket.off("connect", handleConnect);
  }, [loggedInUserIds]);

  /* ================= ONLINE USERS ================= */
  useEffect(() => {
    socket.on("onlineUsers", setOnlineUsers);
    return () => socket.off("onlineUsers");
  }, []);

  const isUserOnline =
    !!selecteduser?._id &&
    onlineUsers.includes(String(selecteduser._id));

  /* ================= AUTO SCROLL ================= */
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [allChats]);

  /* ================= RECEIVE MESSAGE ================= */
  useEffect(() => {
    const handler = (newMessage) => {
      setAllCHats((prev) =>
        prev.some((m) => m._id === newMessage._id)
          ? prev
          : [...prev, newMessage]
      );
    };

    socket.on("receiveMessage", handler);
    return () => socket.off("receiveMessage", handler);
  }, []);

  /* ================= REAL-TIME SEEN ================= */
  useEffect(() => {
    if (!loggedInUserIds?._id) return;

    const handleSeen = ({ senderId, receiverId }) => {
      if (String(senderId) !== String(loggedInUserIds._id)) return;

      setAllCHats((prev) =>
        prev.map((msg) =>
          String(msg.senderId) === String(senderId) &&
          String(msg.receiverId) === String(receiverId)
            ? { ...msg, status: "seen" }
            : msg
        )
      );
    };

    socket.on("messagesSeen", handleSeen);
    return () => socket.off("messagesSeen", handleSeen);
  }, [loggedInUserIds]);

  /* ================= AUTH ================= */
  useEffect(() => {
    const storedToken = sessionStorage.getItem("token");
    const user = JSON.parse(sessionStorage.getItem("user"));
    setloggedInUserId(user);
    if (storedToken) setToken(storedToken);
  }, []);

  /* ================= FETCH MESSAGES ================= */
  useEffect(() => {
    if (token && selecteduser?._id) {
      getALlMessages();
    }
  }, [selecteduser, token]);

  /* ================= MARK SEEN AFTER LOAD ================= */
  useEffect(() => {
    if (allChats.length && selecteduser?._id) {
      markSeen();
    }
  }, [allChats]);

  /* ================= IMAGE PREVIEW ================= */
  const handilePreview = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setImage(file);
    setPreview(URL.createObjectURL(file));
  };

  /* ================= SEND MESSAGE ================= */
  const handileSendMessage = async () => {
    if (!token || (!text && !image)) return;

    const reqHeaders = { Authorization: `Bearer ${token}` };
    const reqBody = new FormData();

    reqBody.append("text", text);
    reqBody.append("receiverId", selecteduser._id);
    if (image) reqBody.append("image", image);

    const result = await sendMessageApi(reqBody, reqHeaders);

    if (result.status === 201) {
      socket.emit("sendMessage", result.data.message);
      setAllCHats((prev) => [...prev, result.data.message]);
      setText("");
      setImage("");
      setPreview("");
    }
  };

  /* ================= GET ALL ================= */
  const getALlMessages = async () => {
    setLoading(true);
    const reqHeaders = { Authorization: `Bearer ${token}` };
    const result = await getMessageApi(selecteduser._id, reqHeaders);

    if (result.status === 200) {
      setAllCHats(result.data.message);
      setLoading(false);
    }
  };

  /* ================= MARK SEEN ================= */
  const markSeen = async () => {
    const reqHeaders = { Authorization: `Bearer ${token}` };
    await messageSeenAPI(selecteduser._id, reqHeaders);
  };

  return (
    <>
      {userSelected ? (
        <main className="flex-1 flex flex-col bg-[#0b0f1a] backdrop-blur-xl">

          {/* ================= Chat Header ================= */}
          <div className="p-4 border-b border-white/20 flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-400 to-purple-400 flex items-center justify-center">
              <img
                className="w-[30px] h-[30px] rounded-full object-cover border border-white/30"
                src={
                  selecteduser.profilepic === ""
                    ? "https://wallpapers.com/images/hd/cool-profile-picture-87h46gcobjl5e4xu.jpg"
                    : selecteduser.profilepic
                }
                alt="profile"
              />
            </div>
            <div>
              <p className="text-white font-semibold">{selecteduser.username}</p>
              <p
                className={`text-sm ${
                  isUserOnline ? "text-green-400" : "text-white/50"
                }`}
              >
                {isUserOnline ? "Online" : "Offline"}
              </p>
            </div>
          </div>

          {/* ================= Messages ================= */}
          {loading ? (
            <div className="flex items-center gap-2 p-4">
              <span className="h-2 w-2 bg-gray-400 rounded-full animate-bounce"></span>
              <span className="h-2 w-2 bg-gray-400 rounded-full animate-bounce [animation-delay:0.2s]"></span>
              <span className="h-2 w-2 bg-gray-400 rounded-full animate-bounce [animation-delay:0.4s]"></span>
            </div>
          ) : (
            <div className="flex-1 p-4 space-y-6 overflow-y-auto chat-container">
              {allChats.map((item) => {
                const isSender =
                  String(item.senderId) === String(loggedInUserIds?._id);

                return (
                  <div
                    key={item._id}
                    className={`flex items-end gap-3 ${
                      isSender ? "justify-end" : "justify-start"
                    }`}
                  >
                    {!isSender && (
                      <img
                        className="w-8 h-8 rounded-full border border-white/20"
                        src={
                          selecteduser.profilepic === ""
                            ? "https://i.pravatar.cc/150?img=5"
                            : selecteduser.profilepic
                        }
                        alt="receiver"
                      />
                    )}

                    <div className={`max-w-xs ${isSender ? "text-right" : ""}`}>
                      {item.text && (
                        <div
                          className={`px-4 py-2 rounded-2xl text-white ${
                            isSender
                              ? "bg-gradient-to-r from-blue-500 to-purple-500 rounded-br-sm"
                              : "bg-white/20 rounded-bl-sm"
                          }`}
                        >
                          {item.text}
                        </div>
                      )}

                      {item.image && (
                        <img
                          src={item.image}
                          alt="chat"
                          className="mt-1 max-w-xs rounded-2xl border border-white/20"
                        />
                      )}

                      <span className="text-white/50 text-xs mt-1 block">
                        {moment(item.createdAt).format("hh:mm A")}
                      </span>

                      {isSender && (
                        <span className="text-xs text-white/40 ml-2">
                          {item.status === "seen"
                            ? "✔✔ Seen"
                            : item.status === "delivered"
                            ? "✔✔ Delivered"
                            : "✔ Sent"}
                        </span>
                      )}
                    </div>

                    {isSender && (
                      <img
                        className="w-8 h-8 rounded-full border border-white/20"
                        src={
                          sessionStorage.getItem("profilepic") ||
                          "https://i.pravatar.cc/150?img=3"
                        }
                        alt="sender"
                      />
                    )}
                  </div>
                );
              })}
              <div ref={bottomRef}></div>
            </div>
          )}

          {/* ================= Message Input ================= */}
          <div className="p-4 border-t border-white/20 flex items-center gap-3">
            {preview && (
              <div className="relative mb-2">
                <img
                  src={preview}
                  className="max-w-xs rounded-xl border border-white/20"
                  alt="preview"
                />
                <button
                  onClick={() => {
                    setPreview("");
                    setImage("");
                  }}
                  className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 text-xs"
                >
                  ✕
                </button>
              </div>
            )}

            <label className="cursor-pointer text-white/70 hover:text-white transition">
              📎
              <input
                type="file"
                accept="image/*"
                hidden
                onChange={handilePreview}
              />
            </label>

            <input
              type="text"
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Type a message..."
              className="flex-1 px-4 py-2 rounded-xl bg-white/20 text-white placeholder-white/60 outline-none border border-white/20 focus:border-blue-400 focus:ring-2 focus:ring-blue-500/30"
            />

            <button
              onClick={handileSendMessage}
              className="px-5 py-2 rounded-xl bg-gradient-to-r from-blue-500 to-purple-500 text-white font-semibold"
            >
              Send
            </button>
          </div>
        </main>
      ) : (
        <div className="flex-1 flex items-center justify-center bg-[#0b0f1a]">
          <div className="flex flex-col items-center text-center gap-4 bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-8 max-w-sm shadow-xl">
            <div className="w-24 h-24 rounded-full bg-gradient-to-r from-blue-500/30 to-purple-500/30 flex items-center justify-center">
              <span className="text-4xl">💬</span>
            </div>
            <h2 className="text-white text-xl font-semibold">
              No Chat Selected
            </h2>
            <p className="text-white/60 text-sm">
              Select a conversation from the sidebar to start chatting
            </p>
          </div>
        </div>
      )}
    </>
  );
};

export default ChatContainer;
