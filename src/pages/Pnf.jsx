import React from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Home, RefreshCw } from "lucide-react";

const Pnf = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center
      bg-gradient-to-br from-[#0b0f1a] via-[#1e1b4b] to-black text-white">

      <div className="text-center p-8 max-w-md">
        
        {/* 404 Number */}
        <h1 className="text-[120px] font-extrabold bg-gradient-to-r 
          from-blue-400 to-purple-500 text-transparent bg-clip-text
          animate-pulse">
          404
        </h1>

        {/* Title */}
        <h2 className="text-2xl font-semibold mt-2">
          Page Not Found
        </h2>

        {/* Description */}
        <p className="text-white/60 mt-3">
          Oops! The page you’re looking for doesn’t exist or was moved.
        </p>

        {/* Buttons */}
        <div className="flex items-center justify-center gap-4 mt-8">

          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl
            bg-white/10 hover:bg-white/20 transition"
          >
            <ArrowLeft size={18} />
            Go Back
          </button>

          <button
            onClick={() => navigate("/")}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl
            bg-gradient-to-r from-blue-500 to-purple-500
            hover:opacity-90 transition"
          >
            <Home size={18} />
            Home
          </button>
        </div>

        {/* Reload */}
        <button
          onClick={() => window.location.reload()}
          className="mt-6 flex items-center gap-2 mx-auto
          text-white/50 hover:text-white transition"
        >
          <RefreshCw size={16} />
          Reload Page
        </button>

      </div>
    </div>
  );
};

export default Pnf;
