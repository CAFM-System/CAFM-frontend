import { useState } from "react";
import { Building2 } from "lucide-react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    //  login logic 
    console.log("Logging in with:", { email, password });
  };


  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 overflow-hidden">

      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: "url('/images/loginPageImages/login_bg.jpeg')",
        }}
      >
        <div className="absolute inset-0 bg-linear-to-br from-blue-900/80 via-indigo-900/70 to-purple-900/80"></div>
      </div>

      {/* Main Grid Container */}
      <div className="relative z-10 w-full max-w-6xl mx-auto grid md:grid-cols-2 gap-8 items-center">

        {/* Left Section */}
        <div className="text-white space-y-6 px-4 hidden md:block">
          <div className="flex items-center gap-2 text-sm tracking-widest">
            <Building2 className="w-5 h-5" />
            <span>FACILITIES</span>
          </div>

          <div className="space-y-4">
            <div className="text-6xl tracking-tight leading-tight">
              MANAGE
              <div className="text-7xl">SMARTER</div>
            </div>

            <p className="text-xl text-blue-100 max-w-md">
              Where Your Facilities Management Becomes Effortless.
            </p>

            <p className="text-base text-blue-200 max-w-lg leading-relaxed">
              Streamline maintenance requests, track complaints, and enhance
              communication between residents, technicians, and administrators—
              all in one powerful platform.
            </p>
          </div>
        </div>

        {/* Right Section - Login Form */}
        <div className="w-full max-w-md mx-auto">
          <div className="bg-white/20 backdrop-blur-xl rounded-2xl shadow-2xl p-8 border border-white/30">

            {/* Form Header */}
            <div className="text-center mb-8">
              <div className="flex justify-center mb-4">
                <div className="bg-linear-to-br from-blue-400/40 to-purple-500/40 backdrop-blur-sm p-4 rounded-full border border-white/50 shadow-lg">
                  <Building2 className="h-8 w-8 text-white drop-shadow-md" />
                </div>
              </div>

              <h1 className="text-3xl text-white mb-2 drop-shadow-lg">CAFM System</h1>
              <h2 className="text-xl text-white/95 mb-2 drop-shadow-md">Welcome Back</h2>
              <p className="text-white/85 text-sm drop-shadow">
                Help Desk & Complaint Management
              </p>
            </div>

            {/* Email Field */}
            <div className="mb-4">
              <label className="block text-white text-sm mb-2 drop-shadow">
                Email Address
              </label>

              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-md bg-white/30 border border-white/40 text-white placeholder:text-white/70 px-3 py-2 focus:bg-white/35 focus:border-white/60 shadow-md outline-none"
              />
            </div>

            {/* Password Field */}
            <div className="mb-6">
              <label className="block text-white text-sm mb-2 drop-shadow">
                Password
              </label>

              <input
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full rounded-md bg-white/30 border border-white/40 text-white placeholder:text-white/70 px-3 py-2 focus:bg-white/35 focus:border-white/60 shadow-md outline-none"
              />
            </div>

            {/* Login Button */}
            <button
              onClick={handleLogin}
              className="w-full bg-linear-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-medium py-2 rounded-md shadow-lg backdrop-blur-sm disabled:opacity-50"
            >
              Login
            </button>

          </div>
        </div>

      </div>
    </div>
  );
}
