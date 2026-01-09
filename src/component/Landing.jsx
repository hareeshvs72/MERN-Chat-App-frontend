import React from "react";
import { Link } from "react-router-dom";

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0b0f1a] via-[#1e1b4b] to-black text-white overflow-hidden">

      {/* ================= NAVBAR ================= */}
      <nav className="flex items-center justify-between px-8 py-6">
        <h1 className="text-2xl font-bold">
          Chat<span className="text-blue-400">Sphere</span>
        </h1>

        <div className="flex gap-4">
          <Link
            to="/login"
            className="px-5 py-2 rounded-xl bg-white/10 border border-white/20 backdrop-blur hover:bg-white/20 transition"
          >
            Login
          </Link>
          <Link
            to="/login"
            className="px-5 py-2 rounded-xl bg-gradient-to-r from-blue-500 to-purple-500 font-semibold hover:opacity-90 transition"
          >
            Get Started
          </Link>
        </div>
      </nav>

      {/* ================= HERO ================= */}
      <section className="flex flex-col items-center text-center px-6 mt-24 relative">

        {/* glow blobs */}
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-purple-600/30 rounded-full blur-3xl"></div>
        <div className="absolute top-32 right-0 w-96 h-96 bg-blue-600/30 rounded-full blur-3xl"></div>

        <h2 className="text-5xl md:text-6xl font-extrabold leading-tight z-10">
          Chat in <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
            Real Time
          </span>
        </h2>

        <p className="mt-6 max-w-xl text-white/70 z-10">
          A fast, secure, and beautiful chat platform built for modern
          conversations. Share messages, images, and stay connected — instantly.
        </p>

        <div className="flex gap-4 mt-10 z-10">
          <Link
            to="/login"
            className="px-8 py-3 rounded-2xl bg-gradient-to-r from-blue-500 to-purple-500 text-lg font-semibold hover:opacity-90 transition"
          >
            Start Chatting
          </Link>
          <Link
            to="/login"
            className="px-8 py-3 rounded-2xl bg-white/10 border border-white/20 backdrop-blur hover:bg-white/20 transition"
          >
            Login
          </Link>
        </div>
      </section>

      {/* ================= FEATURES ================= */}
      <section className="mt-32 px-8 max-w-6xl mx-auto grid md:grid-cols-3 gap-8">

        {[
          {
            title: "Real-Time Messaging",
            desc: "Instant message delivery powered by modern web technologies.",
          },
          {
            title: "Image Sharing",
            desc: "Send and receive images seamlessly inside your chats.",
          },
          {
            title: "Secure & Private",
            desc: "Your conversations stay private and protected.",
          },
        ].map((item, index) => (
          <div
            key={index}
            className="bg-white/10 border border-white/20 backdrop-blur-xl rounded-2xl p-6 hover:bg-white/20 transition"
          >
            <h3 className="text-xl font-semibold mb-2 text-blue-400">
              {item.title}
            </h3>
            <p className="text-white/70 text-sm">{item.desc}</p>
          </div>
        ))}
      </section>

      {/* ================= CTA ================= */}
      <section className="mt-32 mb-24 flex flex-col items-center text-center px-6">
        <h2 className="text-4xl font-bold mb-4">
          Ready to start chatting?
        </h2>
        <p className="text-white/70 mb-8">
          Create an account and connect instantly with your friends.
        </p>
        <Link
          to="/login"
          className="px-10 py-4 rounded-2xl bg-gradient-to-r from-blue-500 to-purple-500 text-lg font-semibold hover:opacity-90 transition"
        >
          Create Free Account
        </Link>
      </section>

      {/* ================= FOOTER ================= */}
      <footer className="border-t border-white/20 py-6 text-center text-white/50 text-sm">
        © {new Date().getFullYear()} ChatSphere. All rights reserved.
      </footer>
    </div>
  );
};

export default LandingPage;
