import { useState } from "react";
import { Building2, Mail, Lock, Eye, EyeOff, ArrowRight, Sparkles, CheckCircle2, TrendingUp } from "lucide-react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [focusedField, setFocusedField] = useState(null);
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [loginSuccess, setLoginSuccess] = useState(false);

  const handleLogin = () => {
    setIsLoggingIn(true);
    setTimeout(() => {
      setIsLoggingIn(false);
      setLoginSuccess(true);
      setTimeout(() => setLoginSuccess(false), 3000);
    }, 1500);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 overflow-hidden relative">
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) translateX(0px); }
          33% { transform: translateY(-20px) translateX(10px); }
          66% { transform: translateY(-10px) translateX(-10px); }
        }
        @keyframes slideInLeft {
          from { transform: translateX(-100px); opacity: 0; }
          to { transform: translateX(0); opacity: 1; }
        }
        @keyframes slideInRight {
          from { transform: translateX(100px); opacity: 0; }
          to { transform: translateX(0); opacity: 1; }
        }
        @keyframes fadeInUp {
          from { transform: translateY(30px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        @keyframes glow {
          0%, 100% { box-shadow: 0 0 20px rgba(59, 130, 246, 0.5); }
          50% { box-shadow: 0 0 40px rgba(59, 130, 246, 0.8), 0 0 60px rgba(96, 165, 250, 0.6); }
        }
        @keyframes pulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.05); }
        }
        @keyframes shimmer {
          0% { background-position: -1000px 0; }
          100% { background-position: 1000px 0; }
        }
        @keyframes ripple {
          0% { transform: scale(0.8); opacity: 0.8; }
          100% { transform: scale(2.5); opacity: 0; }
        }
        .shimmer-text {
          background: linear-gradient(90deg, #fff 0%, #60A5FA 50%, #fff 100%);
          background-size: 200% 100%;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          animation: shimmer 3s infinite;
        }
        .ripple-bg::before {
          content: '';
          position: absolute;
          top: 50%;
          left: 50%;
          width: 100%;
          height: 100%;
          background: radial-gradient(circle, rgba(59, 130, 246, 0.3) 0%, transparent 70%);
          border-radius: 50%;
          animation: ripple 3s infinite;
        }
      `}</style>

      {/* Background Image with Blue Overlay */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: "url('/images/loginPageImages/login_bg.jpeg')",
        }}
      >
        {/* Blue gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/90 via-blue-800/85 to-cyan-900/90"></div>
        
        {/* Animated particles */}
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(25)].map((_, i) => (
            <div
              key={i}
              className="absolute rounded-full bg-white"
              style={{
                width: `${Math.random() * 6 + 2}px`,
                height: `${Math.random() * 6 + 2}px`,
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                opacity: Math.random() * 0.5 + 0.2,
                animation: `float ${Math.random() * 15 + 10}s ease-in-out infinite`,
                animationDelay: `${Math.random() * 5}s`,
              }}
            />
          ))}
        </div>

        {/* Grid pattern overlay */}
        <div 
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `linear-gradient(rgba(59, 130, 246, 0.3) 1px, transparent 1px),
                             linear-gradient(90deg, rgba(59, 130, 246, 0.3) 1px, transparent 1px)`,
            backgroundSize: '50px 50px'
          }}
        />
      </div>

      {/* Main Grid Container */}
      <div className="relative z-10 w-full max-w-6xl mx-auto grid md:grid-cols-2 gap-8 items-center">
        {/* Left Section */}
        <div 
          className="text-white space-y-6 px-4 hidden md:block"
          style={{ animation: "slideInLeft 0.8s ease-out" }}
        >
          <div 
            className="flex items-center gap-2 text-sm tracking-widest transform hover:translate-x-2 transition-transform duration-300"
            style={{ animation: "fadeInUp 1s ease-out 0.2s both" }}
          >
            <div className="p-2 bg-blue-500/30 rounded-lg backdrop-blur-sm border border-blue-400/50 shadow-lg">
              <Building2 className="w-5 h-5" />
            </div>
            <span className="font-semibold">FACILITIES</span>
          </div>

          <div className="space-y-4">
            <div 
              className="text-6xl tracking-tight leading-tight font-bold"
              style={{ animation: "fadeInUp 1s ease-out 0.4s both" }}
            >
              MANAGE
              <div className="text-7xl shimmer-text">SMARTER</div>
            </div>

            <p 
              className="text-xl text-blue-100 max-w-md font-medium"
              style={{ animation: "fadeInUp 1s ease-out 0.6s both" }}
            >
              Where Your Facilities Management Becomes Effortless.
            </p>

            <p 
              className="text-base text-blue-200 max-w-lg leading-relaxed"
              style={{ animation: "fadeInUp 1s ease-out 0.8s both" }}
            >
              Streamline maintenance requests, track complaints, and enhance
              communication between residents, technicians, and administrators—
              all in one powerful platform.
            </p>

            {/* Feature Cards */}
            <div 
              className="space-y-3 pt-4"
              style={{ animation: "fadeInUp 1s ease-out 1s both" }}
            >
              {[
                { icon: Sparkles, text: "Real-time Tracking" },
                { icon: TrendingUp, text: "Enhanced Productivity" },
                { icon: CheckCircle2, text: "Seamless Integration" }
              ].map((feature, i) => (
                <div
                  key={i}
                  className="flex items-center gap-3 text-blue-50 bg-blue-500/20 backdrop-blur-md p-4 rounded-xl border border-blue-400/30 transform hover:translate-x-3 hover:bg-blue-500/30 transition-all duration-300 shadow-lg"
                  style={{ animation: `fadeInUp 0.5s ease-out ${1.2 + i * 0.15}s both` }}
                >
                  <div className="p-2 bg-cyan-400/30 rounded-lg">
                    <feature.icon className="w-5 h-5 text-cyan-300" />
                  </div>
                  <span className="font-medium">{feature.text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Section - Login Form */}
        <div 
          className="w-full max-w-md mx-auto"
          style={{ animation: "slideInRight 0.8s ease-out" }}
        >
          <div className="bg-white/10 backdrop-blur-2xl rounded-3xl shadow-2xl p-8 border border-blue-300/30 transform hover:scale-[1.02] transition-all duration-300">
            {/* Form Header */}
            <div className="text-center mb-8">
              <div className="flex justify-center mb-4 relative">
                <div className="ripple-bg absolute inset-0" />
                <div 
                  className="relative bg-gradient-to-br from-blue-400/40 to-cyan-500/40 backdrop-blur-sm p-4 rounded-2xl border border-blue-300/50 shadow-xl transform hover:rotate-12 transition-transform duration-500"
                  style={{ animation: "pulse 2s ease-in-out infinite" }}
                >
                  <Building2 className="h-10 w-10 text-white drop-shadow-lg" />
                </div>
              </div>

              <h1 className="text-3xl text-white mb-2 drop-shadow-lg font-bold">
                CAFM System
              </h1>
              <h2 className="text-xl text-blue-100 mb-2 drop-shadow-md font-semibold">
                Welcome Back
              </h2>
              <p className="text-blue-200 text-sm drop-shadow">
                Help Desk & Complaint Management
              </p>
            </div>

            {/* Email Field */}
            <div className="mb-5">
              <label className="block text-white text-sm mb-2 drop-shadow flex items-center gap-2 font-medium">
                <Mail className="w-4 h-4" />
                Email Address
              </label>

              <div className={`relative transform transition-all duration-300 ${focusedField === 'email' ? 'scale-105' : ''}`}>
                <input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onFocus={() => setFocusedField('email')}
                  onBlur={() => setFocusedField(null)}
                  className="w-full rounded-xl bg-blue-900/40 border-2 border-blue-400/40 text-white placeholder:text-blue-200/60 px-4 py-3 focus:bg-blue-900/60 focus:border-blue-300 shadow-lg outline-none transition-all duration-300"
                  style={focusedField === 'email' ? { animation: 'glow 2s infinite' } : {}}
                />
                {email && (
                  <CheckCircle2 
                    className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-cyan-400"
                    style={{ animation: "pulse 1s ease-in-out infinite" }}
                  />
                )}
              </div>
            </div>

            {/* Password Field */}
            <div className="mb-6">
              <label className="block text-white text-sm mb-2 drop-shadow flex items-center gap-2 font-medium">
                <Lock className="w-4 h-4" />
                Password
              </label>

              <div className={`relative transform transition-all duration-300 ${focusedField === 'password' ? 'scale-105' : ''}`}>
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onFocus={() => setFocusedField('password')}
                  onBlur={() => setFocusedField(null)}
                  className="w-full rounded-xl bg-blue-900/40 border-2 border-blue-400/40 text-white placeholder:text-blue-200/60 px-4 py-3 pr-12 focus:bg-blue-900/60 focus:border-blue-300 shadow-lg outline-none transition-all duration-300"
                  style={focusedField === 'password' ? { animation: 'glow 2s infinite' } : {}}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-blue-200 hover:text-white transition-colors"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {/* Forgot Password */}
            <div className="mb-6 text-right">
              <button className="text-sm text-cyan-300 hover:text-cyan-200 transition-colors duration-300 hover:underline font-medium">
                Forgot Password?
              </button>
            </div>

            {/* Login Button */}
            <button
              onClick={handleLogin}
              disabled={isLoggingIn || !email || !password}
              className="w-full bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white font-semibold py-3 rounded-xl shadow-xl hover:shadow-2xl backdrop-blur-sm disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105 active:scale-95 transition-all duration-300 border border-blue-400/30"
            >
              <span className="flex items-center justify-center gap-2 text-lg">
                {isLoggingIn ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Logging in...
                  </>
                ) : loginSuccess ? (
                  <>
                    <Sparkles className="w-5 h-5" />
                    Success!
                  </>
                ) : (
                  <>
                    Login
                    <ArrowRight className="h-5 w-5" />
                  </>
                )}
              </span>
            </button>

            {/* Divider */}
            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-blue-300/30" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 bg-blue-900/40 backdrop-blur-sm text-blue-100 rounded-full font-medium">
                  New to CAFM?
                </span>
              </div>
            </div>

            {/* Register Link */}
            <a href="/register" className="block w-full">
              <button className="w-full bg-blue-500/20 hover:bg-blue-500/30 text-white font-semibold py-3 rounded-xl backdrop-blur-sm border border-blue-400/30 transform hover:scale-105 transition-all duration-300 shadow-lg">
                Create Account
              </button>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}