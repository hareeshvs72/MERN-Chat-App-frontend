import React, { useState } from 'react'

const Login = () => {

    const [isActive, setActive] = useState(false)
    const [userDetail,setUserDetail] = useState({
        username:"",email:"",password:"",cPassword:""
    })
    console.log(userDetail);
    
    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-900 via-purple-900 to-black relative overflow-hidden">

            {/* Gradient blobs */}
            <div className="absolute -top-24 -left-24 w-96 h-96 bg-purple-600 rounded-full blur-3xl opacity-30"></div>
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-600 rounded-full blur-3xl opacity-30"></div>

            {/* Glass Card */}
            <div className="relative z-10 w-[380px] rounded-2xl border border-white/20 bg-white/10 backdrop-blur-3xl shadow-2xl p-8">

                {/* App Name */}
                <h1 className="text-3xl font-bold text-white text-center mb-2">
                    Chat<span className="text-blue-400">Sphere</span>
                </h1>
                <p className="text-center text-white/70 mb-6">
                    Connect instantly. Chat freely.
                </p>

                {/* Login Form */}
                <form className="space-y-4">

                    {isActive &&
                        <>
                            <div>
                                <label className="text-white/80 text-sm">Username</label>
                                <input
                                    value={userDetail.username}
                                    onChange={(e)=>setUserDetail({...userDetail,username:e.target.value})}
                                    type="text"
                                    placeholder="your name"
                                    className="w-full mt-1 px-4 py-3 rounded-xl bg-white/20 text-white placeholder-white/60 outline-none border border-white/20 focus:border-blue-400 focus:ring-2 focus:ring-blue-500/40 transition"
                                />
                            </div>
                        </>
                    }
                    <div>
                        <label className="text-white/80 text-sm">Email</label>
                        <input
                        value={userDetail.email}
                                    onChange={(e)=>setUserDetail({...userDetail,email:e.target.value})}
                            type="email"
                            placeholder="you@example.com"
                            className="w-full mt-1 px-4 py-3 rounded-xl bg-white/20 text-white placeholder-white/60 outline-none border border-white/20 focus:border-blue-400 focus:ring-2 focus:ring-blue-500/40 transition"
                        />
                    </div>

                    <div>
                        <label className="text-white/80 text-sm">Password</label>
                        <input
                        value={userDetail.password}
                            onChange={(e)=>setUserDetail({...userDetail,password:e.target.value})}
                            type="password"
                            placeholder="••••••••"
                            className="w-full mt-1 px-4 py-3 rounded-xl bg-white/20 text-white placeholder-white/60 outline-none border border-white/20 focus:border-blue-400 focus:ring-2 focus:ring-blue-500/40 transition"
                        />
                    </div>
                    {isActive &&
                        <div>
                            <label className="text-white/80 text-sm">Confirm Password</label>
                            <input
                            value={userDetail.cPassword}
                            onChange={(e)=>setUserDetail({...userDetail,cPassword:e.target.value})}
                                type="password"
                                placeholder="••••••••"
                                className="w-full mt-1 px-4 py-3 rounded-xl bg-white/20 text-white placeholder-white/60 outline-none border border-white/20 focus:border-blue-400 focus:ring-2 focus:ring-blue-500/40 transition"
                            />
                        </div>}
                 {isActive ?
                    <button
                        type="submit"
                        className="w-full mt-4 py-3 rounded-xl bg-gradient-to-r from-blue-500 to-purple-500 text-white font-semibold hover:opacity-90 transition shadow-lg"
                    >
                        SignUp
                    </button>
                 :   <button
                        type="submit"
                        className="w-full mt-4 py-3 rounded-xl bg-gradient-to-r from-blue-500 to-purple-500 text-white font-semibold hover:opacity-90 transition shadow-lg"
                    >
                        Login
                    </button>}
                </form>

                {/* Footer */}
                <p className="text-center text-white/60 text-sm mt-6">
                    Already  have an account?
                   {isActive ?
                   <span onClick={() => setActive(false)} className="text-blue-400 cursor-pointer hover:underline">
                        Sign In
                    </span>
                    :
                   <span onClick={() => setActive(true)} className="text-blue-400 cursor-pointer hover:underline">
                        Sign up
                    </span>}
                </p>
            </div>
        </div>
    )
}

export default Login