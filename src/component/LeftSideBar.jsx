import React, { useEffect, useState } from "react";
import { getUserForSidebarAPI } from "../Services/allApi";
import { socket } from "../Services/socket";

const LeftSideBar = ({ setUserSelected, setSelectedUser }) => {
  const [users, setUsers] = useState([]);
  const loggedInUser = JSON.parse(sessionStorage.getItem("user"));

  /* ================= LOAD SIDEBAR USERS ================= */
  useEffect(() => {
    const token = sessionStorage.getItem("token");
    if (token) {
      const reqHeaders = {
        Authorization: `Bearer ${token}`,
      };
      handleUserSidebar(reqHeaders);
    }
  }, []);

  const handleUserSidebar = async (reqHeaders) => {
    const result = await getUserForSidebarAPI(reqHeaders);
    if (result.status === 200) {
      setUsers(result.data.users);
    }
  };

  /* ================= REAL-TIME SIDEBAR UPDATE ================= */
  useEffect(() => {
    const handleSidebarUpdate = ({ userId, message }) => {
      setUsers((prev) => {
        const updated = prev.map((user) => {
          if (user._id !== userId) return user;

          // ✅ FIX: sender should NOT get unseen count
          if (message.senderId === loggedInUser._id) {
            return {
              ...user,
              lastMessage: message.text
                ? message.text
                : message.image
                ? "📷 Photo"
                : "",
              lastMessageTime: message.createdAt,
            };
          }

          return {
            ...user,
            lastMessage: message.text
              ? message.text
              : message.image
              ? "📷 Photo"
              : "",
            lastMessageTime: message.createdAt,
            unseenCount: user.unseenCount + 1,
            unseen: true,
          };
        });

        // 🔥 Reorder by last message
        return updated.sort(
          (a, b) =>
            new Date(b.lastMessageTime || 0) -
            new Date(a.lastMessageTime || 0)
        );
      });
    };

    socket.on("sidebarUpdate", handleSidebarUpdate);

    return () => {
      socket.off("sidebarUpdate", handleSidebarUpdate);
    };
  }, []);

  /* ================= UI ================= */
  return (
    <aside className="w-1/4 border-r border-white/20 p-4 flex flex-col
      bg-gradient-to-br from-[#0b0f1a] via-[#1e1b4b] to-black backdrop-blur-xl">

      <h2 className="text-xl font-bold text-white mb-4">
        Chat<span className="text-blue-400">Sphere</span>
      </h2>

      <input
        type="text"
        placeholder="Search users..."
        className="w-full px-4 py-2 mb-4 rounded-xl
        bg-white/20 text-white placeholder-white/60
        outline-none border border-white/20"
      />

      <div className="flex-1 space-y-2 overflow-y-auto">
        {users.map((user) => (
          <div
            key={user._id}
            onClick={() => {
              setUserSelected(true);
              setSelectedUser(user);

              // ✅ Reset unseen when chat opened
              setUsers((prev) =>
                prev.map((u) =>
                  u._id === user._id
                    ? { ...u, unseenCount: 0, unseen: false }
                    : u
                )
              );
            }}
            className="flex items-center gap-3 p-3 rounded-xl
            cursor-pointer hover:bg-white/20"
          >
            <img
              className="w-10 h-10 rounded-full border border-white/30"
              src={
                user.profilepic ||
                "https://wallpapers.com/images/hd/cool-profile-picture-87h46gcobjl5e4xu.jpg"
              }
              alt="profile"
            />

            <div className="flex-1 min-w-0">
              <p className="text-white font-medium truncate">
                {user.username}
              </p>
              <p className="text-white/60 text-sm truncate">
                {user.lastMessage || "No messages yet"}
              </p>
            </div>

            {user.unseenCount > 0 && (
              <div className="min-w-[22px] h-[22px] flex items-center justify-center
                rounded-full bg-green-500 text-black text-xs font-bold">
                {user.unseenCount}
              </div>
            )}
          </div>
        ))}
      </div>
    </aside>
  );
};

export default LeftSideBar;
