import React, { use, useState } from "react"
import {useNavigate,Link} from 'react-router'
import { useAuth } from "../hooks/useAuth"

const Signup = () => {
  const [focused, setFocused] = useState(null);

  const {Loader,handleRegister}=useAuth();

  const [username,setUsername]=useState("");
  const [email,setEmail]=useState("");
  const [password,setPassword]=useState("");
  

  const navigate=useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const credentials = {username, email, password };

    try {
      const res=await handleRegister(credentials);

      navigate("/");

    } catch (error) {
      console.error("Login failed", error);
    }
  };


  const inputClass = (field) =>
    `w-full px-4 py-3 rounded-xl text-sm outline-none border transition
    ${focused === field
      ? "bg-[rgba(95,129,144,0.1)] border-[#5F8190] text-[#E2F0F0]"
      : "bg-[rgba(255,255,255,0.04)] border-[rgba(95,129,144,0.2)] text-[#E2F0F0]"}`

  const labelClass = (field) =>
    `block text-xs font-semibold uppercase tracking-widest mb-2 font-mono ${
      focused === field ? "text-[#E2F0F0]" : "text-[#5F8190]"
    }`

if (Loader) {
  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-900">
      <h1 className="text-2xl font-semibold text-white animate-pulse">
        Loading...
      </h1>
    </main>
  )
}

  return (
    <main className="min-h-screen flex items-center justify-center px-4 bg-gradient-to-br from-[#1a2328] via-[#2b3a42] to-[#36565F]">

      {/* Background blur */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-20 -right-20 w-72 h-72 rounded-full bg-[#5F8190] opacity-20 blur-[80px]" />
        <div className="absolute -bottom-16 -left-16 w-64 h-64 rounded-full bg-[#E2F0F0] opacity-15 blur-[100px]" />
      </div>

      <div className="relative w-full max-w-md">

        {/* Logo */}
        <div className="flex items-center gap-2 mb-8">
          <div className="w-2 h-2 rounded-full bg-[#5F8190]" />
          <span className="text-xs tracking-widest uppercase font-medium text-[#5F8190] font-mono">
            Resume Assistant · AI
          </span>
        </div>

        {/* Card */}
        <div className="rounded-2xl p-8 border border-[rgba(95,129,144,0.2)] bg-[rgba(20,20,20,0.6)] backdrop-blur-xl shadow-[0_0_60px_rgba(54,86,95,0.15)]">

          <h1 className="text-3xl font-bold text-[#E2F0F0] mb-1">Get started</h1>
          <p className="text-sm text-[#5F8190] mb-8">Create your account — it's free</p>

          <form className="space-y-5" onSubmit={handleSubmit}>

            <div>
              <label className={labelClass("username")}>Username</label>
              <input
                type="text"
                placeholder="your_handle"
                onFocus={() => setFocused("username")}
                onBlur={() => setFocused(null)}
                onChange={(e)=> setUsername(e.target.value)}
                className={inputClass("username")}
              />
            </div>

            <div>
              <label className={labelClass("email")}>Email</label>
              <input
                type="email"
                placeholder="you@example.com"
                onFocus={() => setFocused("email")}
                onBlur={() => setFocused(null)}
                onChange={(e)=> setEmail(e.target.value)}
                className={inputClass("email")}
              />
            </div>

            <div>
              <label className={labelClass("password")}>Password</label>
              <input
                type="password"
                placeholder="••••••••"
                onFocus={() => setFocused("password")}
                onBlur={() => setFocused(null)}
                onChange={(e)=> setPassword(e.target.value)}
                className={inputClass("password")}
              />
            </div>

            <button className="w-full py-3 rounded-xl font-semibold text-sm tracking-wide bg-gradient-to-br from-[#36565F] to-[#5F8190] text-[#E2F0F0] shadow-lg hover:opacity-90 active:scale-95 transition">
              Create Account →
            </button>
          </form>

          {/* Divider */}
          <div className="flex items-center gap-3 my-6">
            <div className="flex-1 h-px bg-[rgba(95,129,144,0.2)]" />
            <span className="text-xs text-[#36565F]">or</span>
            <div className="flex-1 h-px bg-[rgba(95,129,144,0.2)]" />
          </div>

          <p className="text-center text-sm text-[#5F8190]">
            Already have an account?{" "}
            <Link to={"/login"} className="font-semibold text-[#E2F0F0] hover:underline">
               Signin
            </Link>
          </p>
        </div>

        <p className="text-center mt-6 text-xs text-[rgba(95,129,144,0.5)] font-mono">
          Powered by AI · Your career, elevated.
        </p>
      </div>
    </main>
  )
}

export default Signup