import { useState } from "react";
import { Building2, Mail, Lock, Eye, EyeOff, ArrowRight, Sparkles, CheckCircle2, TrendingUp } from "lucide-react";
import { useNavigate } from "react-router-dom";
import AuthService from "../../services/auth.service.js";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [focusedField, setFocusedField] = useState(null);
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [loginSuccess, setLoginSuccess] = useState(false);
  const navigate = useNavigate();
  
  const handleLogin = async () => {
    if (!email || !password) return;

    try {
      setIsLoggingIn(true);

      const res = await AuthService.login({
        email,
        password,
      });

      setIsLoggingIn(false);
      setLoginSuccess(true);

      // Hide success animation after 2s
      setTimeout(() => setLoginSuccess(false), 2000);

      // Redirect by role
      const role = res.data.user.role;
      console.log("User role:", role);

      setTimeout(() => {
        if (role === "admin") navigate("/admin");
        else if (role === "technician") navigate("/technician");
        else navigate("/resident");
      }, 800);

    } catch (error) {
      setIsLoggingIn(false);
      console.error("Login failed", error);
      alert("Invalid email or password");
    }
  };

  const handleForgotPassword = () => {
    navigate("/forgot-password");
  };

  const handleCreateAccount = () => {
    navigate("/register");
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 overflow-hidden relative">
      {/* Background Image with Blue Overlay */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070')",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/90 via-blue-800/85 to-cyan-900/90"></div>
      </div>

      {/* Main Grid Container */}
      <div className="relative z-10 w-full max-w-6xl mx-auto grid md:grid-cols-2 gap-8 items-center">
        {/* Left Section */}
        <div className="text-white space-y-6 px-4 hidden md:block">
          <div className="flex items-center gap-2 text-sm tracking-widest">
            <div className="p-2 bg-blue-500/30 rounded-lg backdrop-blur-sm border border-blue-400/50">
              <Building2 className="w-5 h-5" />
            </div>
            <span className="font-semibold">FACILITIES</span>
          </div>

          <div className="space-y-4">
            <div className="text-6xl tracking-tight leading-tight font-bold">
              MANAGE
              <div className="text-7xl bg-gradient-to-r from-white via-blue-200 to-cyan-300 bg-clip-text text-transparent">
                SMARTER
              </div>
            </div>

            <p className="text-xl text-blue-100 max-w-md font-medium">
              Where Your Facilities Management Becomes Effortless.
            </p>

            <p className="text-base text-blue-200 max-w-lg leading-relaxed">
              Streamline maintenance requests, track complaints, and enhance
              communication between residents, technicians, and administrators—
              all in one powerful platform.
            </p>

            {/* Feature Cards */}
            <div className="space-y-3 pt-4">
              {[
                { icon: Sparkles, text: "Real-time Tracking" },
                { icon: TrendingUp, text: "Enhanced Productivity" },
                { icon: CheckCircle2, text: "Seamless Integration" }
              ].map((feature, i) => (
                <div
                  key={i}
                  className="flex items-center gap-3 text-blue-50 bg-blue-500/20 backdrop-blur-md p-4 rounded-xl border border-blue-400/30 hover:bg-blue-500/30 transition-colors duration-300"
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
        <div className="w-full max-w-md mx-auto">
          <div className="bg-white/10 backdrop-blur-2xl rounded-3xl shadow-2xl p-8 border border-blue-300/30">
            {/* Form Header */}
            <div className="text-center mb-8">
              <div className="flex justify-center mb-4">
                <div className="bg-gradient-to-br from-blue-400/40 to-cyan-500/40 backdrop-blur-sm p-4 rounded-2xl border border-blue-300/50 shadow-xl">
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

              <div className="relative">
                <input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onFocus={() => setFocusedField('email')}
                  onBlur={() => setFocusedField(null)}
                  className={`w-full rounded-xl bg-blue-900/40 border-2 text-white placeholder:text-blue-200/60 px-4 py-3 shadow-lg outline-none transition-all duration-300 ${
                    focusedField === 'email' 
                      ? 'border-blue-300 bg-blue-900/60' 
                      : 'border-blue-400/40'
                  }`}
                />
                {email && (
                  <CheckCircle2 className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-cyan-400" />
                )}
              </div>
            </div>

            {/* Password Field */}
            <div className="mb-6">
              <label className="block text-white text-sm mb-2 drop-shadow flex items-center gap-2 font-medium">
                <Lock className="w-4 h-4" />
                Password
              </label>

              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onFocus={() => setFocusedField('password')}
                  onBlur={() => setFocusedField(null)}
                  className={`w-full rounded-xl bg-blue-900/40 border-2 text-white placeholder:text-blue-200/60 px-4 py-3 pr-12 shadow-lg outline-none transition-all duration-300 ${
                    focusedField === 'password' 
                      ? 'border-blue-300 bg-blue-900/60' 
                      : 'border-blue-400/40'
                  }`}
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
              <button
                onClick={handleForgotPassword}
                className="text-sm text-cyan-300 hover:text-cyan-200 transition-colors duration-300 hover:underline font-medium"
              >
                Forgot Password?
              </button>
            </div>

            {/* Login Button */}
            <button
              onClick={handleLogin}
              disabled={isLoggingIn || !email || !password}
              className="w-full bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white font-semibold py-3 rounded-xl shadow-xl hover:shadow-2xl disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 border border-blue-400/30"
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
            <button 
              onClick={handleCreateAccount}
              className="w-full bg-blue-500/20 hover:bg-blue-500/30 text-white font-semibold py-3 rounded-xl backdrop-blur-sm border border-blue-400/30 transition-all duration-300 shadow-lg"
            >
              Create Account
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}