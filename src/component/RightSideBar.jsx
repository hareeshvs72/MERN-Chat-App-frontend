import React from "react";

const RightSideBar = ({ selecteduser }) => {
  return (
    <aside
      className="w-1/4 border-l border-white/20 p-4
      bg-gradient-to-br from-[#0b0f1a] via-[#1e1b4b] to-black"
    >
      {/* ================= PROFILE ================= */}
      <div className="flex flex-col items-center text-center mb-6">
        <div className="w-28 h-28 rounded-full 
          bg-gradient-to-r from-blue-400 to-purple-400 
          flex items-center justify-center mb-4">
          <img
            className="w-[110px] h-[110px] rounded-full object-cover border border-white/30"
            src={
              selecteduser?.profilepic ||
              "https://wallpapers.com/images/hd/cool-profile-picture-87h46gcobjl5e4xu.jpg"
            }
            alt="profile"
          />
        </div>

        <h3 className="text-white font-semibold text-xl">
          {selecteduser?.username || "User Name"}
        </h3>

        <button
          className="mt-4 px-6 py-2 rounded-xl
          bg-gradient-to-r from-blue-500 to-purple-500
          text-white font-medium hover:opacity-90 transition"
        >
          Edit Profile
        </button>
      </div>

      {/* ================= MEDIA ================= */}
      <div>
        <h4 className="text-white font-semibold mb-3">
          Media
        </h4>

        <div className="grid grid-cols-3 gap-2">
          {/* Sample media images */}
          {[1, 2, 3, 4, 5, 6].map((item) => (
            <img
              key={item}
              src="https://images.unsplash.com/photo-1547721064-da6cfb341d50"
              alt="media"
              className="w-full h-20 object-cover rounded-lg
              border border-white/20 hover:opacity-80 transition cursor-pointer"
            />
          ))}
        </div>

        {/* Empty State */}
        {/* 
        <p className="text-white/50 text-sm text-center mt-4">
          No media shared yet
        </p> 
        */}
      </div>
    </aside>
  );
};

export default RightSideBar;
