import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getMessageApi } from "../Services/allApi";
import { socket } from "../Services/socket";


const RightSideBar = ({ selecteduser }) => {
  const [bio, setBio] = useState("");
  const [media, setMedia] = useState([]);
  const [username, setUsername] = useState("");
  const [image, setImage] = useState("");

  const navigate = useNavigate();

useEffect(() => {
  if (!selecteduser?._id) return;

  const handleReceiveMessage = (newMessage) => {
    const isCurrentChat =
      newMessage.senderId === selecteduser._id ||
      newMessage.receiverId === selecteduser._id;

    if (isCurrentChat && newMessage.image) {
      setMedia((prev) =>
        prev.includes(newMessage.image)
          ? prev
          : [newMessage.image, ...prev]
      );
    }
  };

  socket.on("receiveMessage", handleReceiveMessage);

  return () => {
    socket.off("receiveMessage", handleReceiveMessage);
  };
}, [selecteduser?._id]);


  /* ================= LOGGED-IN USER INFO ================= */
  useEffect(() => {
    const user = JSON.parse(sessionStorage.getItem("user"));
    if (user) {
      setUsername(user.username || "");
      setBio(user.bio || "");
      setImage(user.profilepic || "");
    }
  }, []);

  /* ================= FETCH MEDIA WHEN USER CHANGES ================= */
useEffect(() => {
  setMedia([]);       
  if (selecteduser?._id) {
    handleMedia();
  }
}, [selecteduser?._id]);


  /* ================= FETCH MEDIA ================= */
  // const handleMedia = async () => {
  //   console.log("handleMedia called");

  //   const token = sessionStorage.getItem("token");
  //   console.log("TOKEN:", token);

  //   if (!token) return;

  //   try {
  //     const reqHeaders = {
  //       Authorization: `Bearer ${token}`,
  //     };

  //     console.log("Calling getMessageApi...");
  //     const result = await getMessageApi(selecteduser._id, reqHeaders);
  //     console.log("API RESULT:", result);

  //     // ✅ support both { messages: [] } and [] responses
  //     const messages = result.data.message
  //       console.log("message from medai", messages);
        
  //     const mediaMessages = messages?.filter((msg) => msg.image ).map((img)=>img.image)
  //   console.log("mediaMessages",mediaMessages);
    
  //     setMedia(mediaMessages);
  //     console.log("media ," ,media);
      
  //   } catch (error) {
  //     console.log("MEDIA ERROR:", error);
  //   }
  // };
const handleMedia = async () => {
  const token = sessionStorage.getItem("token");
  if (!token || !selecteduser?._id) return;

  try {
    const reqHeaders = {
      Authorization: `Bearer ${token}`,
    };

    const result = await getMessageApi(selecteduser._id, reqHeaders);

    const messages = result.data.message || [];

    const mediaMessages = messages
      .filter((msg) => msg.image)
      .map((msg) => msg.image);

    setMedia(mediaMessages);
  } catch (error) {
    console.log("MEDIA ERROR:", error);
  }
};

  return (
    <aside
      className="
        hidden lg:block
        lg:w-1/4
        border-l border-white/20
        p-4
        bg-gradient-to-br from-[#0b0f1a] via-[#1e1b4b] to-black
      "
    >
      {/* ================= PROFILE ================= */}
      <div className="flex flex-col items-center text-center mb-6">
        <div
          className="w-28 h-28 rounded-full
          bg-gradient-to-r from-blue-400 to-purple-400
          flex items-center justify-center mb-4"
        >
          <img
            className="w-[110px] h-[110px] rounded-full object-cover border border-white/30"
            src={
              image ||
              "https://wallpapers.com/images/hd/cool-profile-picture-87h46gcobjl5e4xu.jpg"
            }
            alt="profile"
          />
        </div>

        <h3 className="text-white font-semibold text-xl">{username}</h3>

        <p className="mt-2 text-sm text-white/60 px-4">
          {bio || "No bio added yet"}
        </p>

        <button
          onClick={() => navigate("/editProfile")}
          className="mt-4 px-6 py-2 rounded-xl
          bg-gradient-to-r from-blue-500 to-purple-500
          text-white font-medium hover:opacity-90 transition"
        >
          Edit Profile
        </button>
      </div>

      {/* ================= MEDIA ================= */}
     {/* ================= MEDIA ================= */}
<div className="">
  <h4 className="text-white font-semibold mb-3">Media</h4>

  {media?.length > 0 ? (
    <div
      className="
        grid grid-cols-3 gap-2
        max-h-60
        overflow-y-auto
        pr-1
        media-container
      "
    >
      {media.map((item, index) => (
        <img
          key={index}
          src={item}
          alt="media"
          className="
            w-full h-20 object-cover rounded-lg
            border border-white/20
            hover:opacity-80 transition cursor-pointer
          "
        />
      ))}
    </div>
  ) : (
    <p className="text-white/50 text-sm text-center mt-4">
      No media shared yet
    </p>
  )}
</div>

    </aside>
  );
};

export default RightSideBar;
