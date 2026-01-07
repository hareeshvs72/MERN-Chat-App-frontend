import React from "react";

const ChatContainer = ({userSelected}) => {
  return (
 <>
 {userSelected ?
      <main className="flex-1 flex flex-col bg-[#0b0f1a] backdrop-blur-xl">
  
        {/* ================= Chat Header ================= */}
        <div className="p-4 border-b border-white/20 flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-400 to-purple-400 flex items-center justify-center">
            <img
              className="w-[30px] h-[30px] rounded-full object-cover border border-white/30"
              src="https://wallpapers.com/images/hd/cool-profile-picture-87h46gcobjl5e4xu.jpg"
              alt="profile"
            />
          </div>
          <div>
            <p className="text-white font-semibold">John Doe</p>
            <p className="text-green-400 text-sm">Online</p>
          </div>
        </div>
  
        {/* ================= Messages ================= */}
        <div className="flex-1 p-4 space-y-6 overflow-y-auto chat-container">
  
          {/* -------- RECEIVER TEXT -------- */}
          <div className="flex items-end gap-3">
            <img
              className="w-8 h-8 rounded-full border border-white/20"
              src="https://wallpapers.com/images/hd/cool-profile-picture-87h46gcobjl5e4xu.jpg"
              alt="receiver"
            />
  
            <div>
              <div className="bg-white/20 text-white px-4 py-2 rounded-2xl max-w-xs">
                Hi! How are you?
              </div>
              <span className="text-white/50 text-xs mt-1 block">
                10:24 AM
              </span>
            </div>
          </div>
  
          {/* -------- RECEIVER IMAGE -------- */}
          <div className="flex items-end gap-3">
            <img
              className="w-8 h-8 rounded-full border border-white/20"
              src="https://wallpapers.com/images/hd/cool-profile-picture-87h46gcobjl5e4xu.jpg"
              alt="receiver"
            />
  
            <div>
              <img
                src="https://images.unsplash.com/photo-1547721064-da6cfb341d50"
                alt="received"
                className="max-w-xs rounded-2xl border border-white/20"
              />
              <span className="text-white/50 text-xs mt-1 block">
                10:26 AM
              </span>
            </div>
          </div>
  
          {/* -------- SENDER TEXT -------- */}
          <div className="flex justify-end items-end gap-3">
            <div className="text-right">
              <div className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-4 py-2 rounded-2xl max-w-xs">
                I'm good! How about you?
              </div>
              <span className="text-white/50 text-xs mt-1 block">
                10:25 AM
              </span>
            </div>
  
            <img
              className="w-8 h-8 rounded-full border border-white/20"
              src="https://i.pravatar.cc/150?img=3"
              alt="sender"
            />
          </div>
  
          {/* -------- SENDER IMAGE -------- */}
          <div className="flex justify-end items-end gap-3">
            <div className="text-right">
              <img
                src="https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e"
                alt="sent"
                className="max-w-xs rounded-2xl border border-white/20"
              />
              <span className="text-white/50 text-xs mt-1 block">
                10:27 AM
              </span>
            </div>
  
            <img
              className="w-8 h-8 rounded-full border border-white/20"
              src="https://i.pravatar.cc/150?img=3"
              alt="sender"
            />
          </div>
  
        </div>
  
        {/* ================= Message Input ================= */}
        <div className="p-4 border-t border-white/20 flex items-center gap-3">
  
          {/* Image Upload */}
          <label className="cursor-pointer   text-white/70 hover:text-white transition">
            📎
            <input type="file" accept="image/*" hidden />
          </label>
  
          {/* Text Input */}
          <input
            type="text"
            placeholder="Type a message..."
            className="flex-1 px-4 py-2 rounded-xl 
                       bg-white/20 text-white placeholder-white/60 
                       outline-none border border-white/20 
                       focus:border-blue-400 focus:ring-2 focus:ring-blue-500/30"
          />
  
          {/* Send Button */}
          <button className="px-5 py-2 rounded-xl 
                             bg-gradient-to-r from-blue-500 to-purple-500 
                             text-white font-semibold">
            Send
          </button>
        </div>
  
      </main>
     :
     <div className="flex-1 flex items-center justify-center bg-[#0b0f1a]">
  <div className="flex flex-col items-center text-center gap-4 
                  bg-white/10 backdrop-blur-xl 
                  border border-white/20 
                  rounded-2xl p-8 max-w-sm shadow-xl">

    {/* Icon / Image */}
    <div className="w-24 h-24 rounded-full 
                    bg-gradient-to-r from-blue-500/30 to-purple-500/30 
                    flex items-center justify-center">
      <span className="text-4xl">💬</span>
    </div>

    {/* Title */}
    <h2 className="text-white text-xl font-semibold">
      No Chat Selected
    </h2>

    {/* Description */}
    <p className="text-white/60 text-sm">
      Select a conversation from the sidebar to start chatting
    </p>

    {/* Optional Button */}
    {/* <button 
      className="mt-3 px-5 py-2 rounded-xl 
                 bg-gradient-to-r from-blue-500 to-purple-500 
                 text-white font-medium hover:opacity-90 transition">
      Start a New Chat
    </button> */}

  </div>
</div>}
 </>
  );
};

export default ChatContainer;
