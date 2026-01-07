import React from "react";

const LeftSideBar = ({setUserSelected}) => {
  return (
    
   <>

        <aside  className="w-1/4 border-r  border-white/20 p-4 flex flex-col bg-gradient-to-br from-[#0b0f1a] via-[#1e1b4b] to-black
 backdrop-blur-xl">
    
          {/* App Title */}
          <h2 className="text-xl font-bold text-white mb-4">
            Chat<span className="text-blue-400">Sphere</span>
          </h2>
    
          {/* Search */}
          <input
            type="text"
            placeholder="Search users..."
            className="w-full px-4 py-2 mb-4 rounded-xl 
                       bg-white/20 text-white placeholder-white/60 
                       outline-none border border-white/20 
                       focus:border-blue-400 focus:ring-2 focus:ring-blue-500/30
                       transition"
          />
    
          {/* User List */}
          <div className="flex-1 space-y-2 overflow-y-auto scrollbar-thin left-sidebar ">
    
            {[1, 2, 3, 4, 5,6,7,8,9,].map((user) => (
              <div onClick={()=>setUserSelected(true)}
                key={user}
                className="flex items-center gap-3 p-3 rounded-xl 
                           cursor-pointer transition
                           hover:bg-white/20
                           active:bg-white/25"
              >
                {/* Avatar */}
                <div className="w-10 h-10 rounded-full 
                                bg-gradient-to-r from-blue-400 to-purple-400 
                                flex items-center justify-center">
                  <img
                    className="w-[30px] h-[30px] rounded-full object-cover border border-white/30"
                    src="https://wallpapers.com/images/hd/cool-profile-picture-87h46gcobjl5e4xu.jpg"
                    alt="profile"
                  />
                </div>
    
                {/* User Info */}
                <div className="flex-1">
                  <p className="text-white font-medium leading-tight">
                    User {user}
                  </p>
                  <p className="text-white/60 text-sm truncate">
                    Last message...
                  </p>
                </div>
              </div>
            ))}
    
          </div>
        </aside>
   </>
  
  );
};

export default LeftSideBar;
