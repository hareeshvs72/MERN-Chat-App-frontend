import React from 'react'

const RightSideBar = () => {
  return (
 <aside className="w-1/4 border-l bg-gradient-to-br from-[#0b0f1a] via-[#1e1b4b] to-black
 border-white/20 p-4">

          <div className="flex flex-col items-center text-center">
            <div className="w-20 h-20 flex items-center justify-center rounded-full bg-gradient-to-r from-blue-400 to-purple-400 mb-3">
                <img
            className="w-15 h-15 rounded-full border border-white/20"
            src="https://wallpapers.com/images/hd/cool-profile-picture-87h46gcobjl5e4xu.jpg"
            alt="receiver"
          />
            </div>
            <h3 className="text-white font-semibold text-lg">John Doe</h3>
            <p className="text-green-400 text-sm mb-6">Online</p>

            <button className="w-full mb-3 py-2 rounded-xl bg-white/20 text-white hover:bg-white/30 transition">
              View Profile
            </button>
            <button className="w-full py-2 rounded-xl bg-red-500/70 text-white hover:bg-red-600 transition">
              Block User
            </button>
          </div>
        </aside>  )
}

export default RightSideBar