import { useState } from "react";
import { Building2, Mail, Lock, Eye, EyeOff, ArrowRight, Sparkles, CheckCircle2, TrendingUp } from "lucide-react";
import { useNavigate, useSearchParams } from "react-router-dom";
import AuthService from "../../services/auth.service.js";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [focusedField, setFocusedField] = useState(null);
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [loginSuccess, setLoginSuccess] = useState(false);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const redirectTo = searchParams.get("redirect")
  ? decodeURIComponent(searchParams.get("redirect"))
  : null;
  
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
        if (redirectTo) {
          navigate(redirectTo, { replace: true });
        } else {
          if (role === "admin") navigate("/admin");
          else if (role === "technician") navigate("/technician");
          else navigate("/resident/dashboard");
        }
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
    <div className="flex items-center justify-center min-h-screen overflow-hidden relative">
      {/* Background Image with Overlay */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070')",
        }}
      >
        {/* Overlay using Secondary Color */}
        <div className="absolute inset-0 bg-gradient-to-br from-secondary/95 via-secondary/90 to-[#1F2B2A]/95"></div>
      </div>

      {/* Main Grid Container */}
      <div className="relative z-10 w-full max-w-6xl mx-auto grid md:grid-cols-2 gap-8 items-center h-screen">
        {/* Left Section - Fixed, No Scroll */}
        <div className="text-primary space-y-6 px-4 hidden md:flex md:flex-col md:justify-center">
          

          <div className="space-y-4">
            <div className="text-6xl tracking-tight leading-tight font-bold text-primary">
              MANAGE
              <div className="text-7xl bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
                SMARTER
              </div>
            </div>

            <p className="text-xl text-primary/90 max-w-md font-medium">
              Where Your Facilities Management Becomes Effortless.
            </p>

            <p className="text-base text-primary/70 max-w-lg leading-relaxed">
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
                  className="flex items-center gap-3 text-primary bg-primary/5 backdrop-blur-md p-4 rounded-xl border border-primary/10 hover:bg-primary/10 transition-colors duration-300"
                >
                  <div className="p-2 bg-accent/20 rounded-lg">
                    <feature.icon className="w-5 h-5 text-accent" />
                  </div>
                  <span className="font-medium">{feature.text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Section - Scrollable Form */}
        <div className="w-full max-w-sm mx-auto h-full overflow-y-auto flex items-center py-8 px-4 scrollbar-hide">
          <style>{`
            .scrollbar-hide::-webkit-scrollbar {
              display: none;
            }
            .scrollbar-hide {
              -ms-overflow-style: none;
              scrollbar-width: none;
            }
          `}</style>
          
          {/* Form Card - Glassmorphism on Secondary Background */}
          <div className="w-full bg-secondary/60 backdrop-blur-2xl rounded-3xl shadow-2xl p-6 border border-primary/20">
            
            {/* Form Header */}
            <div className="text-center mb-6">
              <div className="flex justify-center mb-3">
                  {/* Updated Logo Path */}
                  <img 
                    src="/images/logo_withoutBG.png" 
                    alt="Facilitron Logo" 
                    className="h-30 w-auto object-contain drop-shadow-lg" 
                  />
              </div>

              <h1 className="text-2xl text-primary mb-1 drop-shadow-lg font-bold tracking-wide">
              </h1>
              <h2 className="text-lg text-primary/90 mb-1 drop-shadow-md font-semibold">
                Welcome Back
              </h2>
              <p className="text-primary/60 text-xs drop-shadow">
                Computer Aided Facility Management
              </p>
            </div>

            {/* Email Field */}
            <div className="mb-4">
              <label className="block text-primary text-sm mb-2 drop-shadow flex items-center gap-2 font-medium">
                <Mail className="w-4 h-4 text-accent" />
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
                    onKeyDown={(e) => e.key === 'Enter' && handleLogin()}
                    className={`w-full rounded-xl bg-primary/5 border-2 text-primary placeholder:text-primary/40 px-4 py-3 shadow-lg outline-none transition-all duration-300 ${
                      focusedField === 'email' 
                        ? 'border-accent bg-primary/10' 
                        : 'border-primary/10'
                    }`}
                  />
                {email && (
                  <CheckCircle2 className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-accent" />
                )}
              </div>
            </div>

            {/* Password Field */}
            <div className="mb-4">
              <label className="block text-primary text-sm mb-2 drop-shadow flex items-center gap-2 font-medium">
                <Lock className="w-4 h-4 text-accent" />
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
                  onKeyDown={(e) => e.key === "Enter" && handleLogin()}
                  className={`w-full rounded-xl bg-primary/5 border-2 text-primary placeholder:text-primary/40 px-4 py-3 pr-12 shadow-lg outline-none transition-all duration-300 ${
                    focusedField === 'password' 
                      ? 'border-accent bg-primary/10' 
                      : 'border-primary/10'
                  }`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-primary/60 hover:text-accent transition-colors"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {/* Forgot Password */}
            <div className="mb-4 text-right">
              <button
                onClick={handleForgotPassword}
                className="text-sm text-accent hover:text-primary transition-colors duration-300 hover:underline font-medium"
              >
                Forgot Password?
              </button>
            </div>

            {/* Login Button */}
            <button
              onClick={handleLogin}
              disabled={isLoggingIn || !email || !password}
              className="w-full bg-accent hover:bg-[#d69200] text-secondary font-bold py-2.5 rounded-xl shadow-xl hover:shadow-2xl disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 border border-accent/50"
            >
              <span className="flex items-center justify-center gap-2 text-base">
                {isLoggingIn ? (
                  <>
                    <div className="w-5 h-5 border-2 border-secondary/30 border-t-secondary rounded-full animate-spin" />
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
            <div className="relative my-4">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-primary/20" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 bg-secondary/40 backdrop-blur-sm text-primary/60 rounded-full font-medium">
                  New to FACILITRON?
                </span>
              </div>
            </div>

            {/* Register Link */}
            <button 
              onClick={handleCreateAccount}
              className="w-full bg-primary/5 hover:bg-primary/10 text-primary font-semibold py-2.5 rounded-xl backdrop-blur-sm border border-primary/20 transition-all duration-300 shadow-lg"
            >
              Create Account
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}