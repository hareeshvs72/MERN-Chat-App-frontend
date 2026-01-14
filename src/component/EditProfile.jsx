import React, { useEffect, useState } from "react";
import { updateProfileAPI } from "../Services/allApi";
import { useNavigate } from "react-router-dom";

const EditProfile = () => {
  const [preview, setPreview] = useState("");
  const [username, setUsername] = useState("");
  const [bio, setBio] = useState("");
  const [image, setImage] = useState("");        // existing profilepic URL
  const [imageFile, setImageFile] = useState(null); // new uploaded file
 const naviagte = useNavigate()
  /* ================= LOAD USER ================= */
  useEffect(() => {
    const user = JSON.parse(sessionStorage.getItem("user"));
    if (user) {
      setUsername(user.username || "");
      setBio(user.bio || "");
      setImage(user.profilepic || "");
    }
  }, []);

  /* ================= IMAGE CHANGE ================= */
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setImageFile(file);
    setPreview(URL.createObjectURL(file));
  };

  /* ================= UPDATE PROFILE ================= */
  const handleUpdateProfile = async () => {
    console.log("inside handleUpdateProfile");
    
    try {
      const token = sessionStorage.getItem("token");
      if (!token) return alert("Unauthorized");

      const reqHeaders = {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      };

      const reqBody = new FormData();
      reqBody.append("username", username);
      reqBody.append("bio", bio);

      if (imageFile) {
        reqBody.append("profilepic", imageFile);
      }

      const result = await updateProfileAPI(reqBody, reqHeaders);
       console.log(result);
       
      if (result.status === 200) {
        sessionStorage.setItem("user", JSON.stringify(result.data.user));
        sessionStorage.setItem("profilepic", result.data.user.profilepic);
          
        alert("Profile updated successfully ✅");
        naviagte('/enter')
      }
    } catch (error) {
      console.error(error);
      alert("Failed to update profile ❌");
    }
  };

  return (
    <div className="flex-1 flex items-center justify-center h-screen bg-[#0b0f1a] px-4">
      <div className="w-full max-w-md bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-6 shadow-xl">

        {/* ===== Header ===== */}
        <h2 className="text-white text-xl font-semibold text-center mb-6">
          Edit Profile
        </h2>

        {/* ===== Profile Image ===== */}
        <div className="flex flex-col items-center mb-6">
          <div className="w-28 h-28 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 p-1">
            <img
              src={
                preview
                  ? preview
                  : image
                  ? image
                  : "https://wallpapers.com/images/hd/cool-profile-picture-87h46gcobjl5e4xu.jpg"
              }
              alt="profile"
              className="w-full h-full rounded-full object-cover border border-white/30"
            />
          </div>

          <label className="mt-3 text-sm text-blue-400 cursor-pointer hover:underline">
            Change Photo
            <input
              type="file"
              accept="image/*"
              hidden
              onChange={handleImageChange}
            />
          </label>
        </div>

        {/* ===== Form ===== */}
        <div className="space-y-4">

          {/* Username */}
          <div>
            <label className="text-white/70 text-sm">Username</label>
            <input
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              type="text"
              placeholder="Enter username"
              className="w-full mt-1 px-4 py-2 rounded-xl bg-white/20 text-white placeholder-white/50 outline-none border border-white/20 focus:border-blue-400 focus:ring-2 focus:ring-blue-500/30"
            />
          </div>

          {/* Bio */}
          <div>
            <label className="text-white/70 text-sm">Bio</label>
            <textarea
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              rows="3"
              placeholder="Write something about you..."
              className="w-full mt-1 px-4 py-2 rounded-xl bg-white/20 text-white placeholder-white/50 outline-none border border-white/20 focus:border-purple-400 focus:ring-2 focus:ring-purple-500/30 resize-none"
            ></textarea>
          </div>

        </div>

        {/* ===== Buttons ===== */}
        <div className="flex gap-3 mt-6">
          <button
            onClick={() => window.history.back()}
            className="flex-1 px-4 py-2 rounded-xl border border-white/30 text-white hover:bg-white/10 transition"
          >
            Cancel
          </button>

          <button
          type="button"
            onClick={handleUpdateProfile}
            className="flex-1 px-4 py-2 rounded-xl bg-gradient-to-r from-blue-500 to-purple-500 text-white font-semibold hover:opacity-90 transition"
          >
            Save Changes
          </button>
        </div>

      </div>
    </div>
  );
};

export default EditProfile;
