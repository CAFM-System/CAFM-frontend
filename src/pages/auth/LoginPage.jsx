import { useState } from "react";
import { 
  Building2, Mail, Lock, Eye, EyeOff, ArrowRight, Sparkles, 
  CheckCircle2, TrendingUp, Sun, Moon 
} from "lucide-react";
import { useNavigate, useSearchParams } from "react-router-dom";
import AuthService from "../../services/auth.service.js";
import { useTheme } from "../../hooks/useTheme";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [focusedField, setFocusedField] = useState(null);
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [loginSuccess, setLoginSuccess] = useState(false);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const { isDarkMode, toggleTheme, bg, text, subText, inputBg, modalBg, border, buttonPrimary } = useTheme();

  const redirectTo = searchParams.get("redirect")
    ? decodeURIComponent(searchParams.get("redirect"))
    : null;

  const handleLogin = async () => {
    if (!email || !password) return;

    try {
      setIsLoggingIn(true);

      const res = await AuthService.login({ email, password });

      setIsLoggingIn(false);
      setLoginSuccess(true);

      setTimeout(() => setLoginSuccess(false), 2000);

      const role = res.data.user.role;

      setTimeout(() => {
        if (redirectTo) navigate(redirectTo, { replace: true });
        else if (role === "admin") navigate("/admin");
        else if (role === "technician") navigate("/technician");
        else if (role === "frontdesk") navigate("/frontdesk");
        else navigate("/resident/dashboard");
      }, 800);

    } catch (error) {
      setIsLoggingIn(false);
      console.error("Login failed", error);
      alert("Invalid email or password");
    }
  };

  const handleForgotPassword = () => navigate("/forgot-password");
  const handleCreateAccount = () => navigate("/register");

  // Theme Classes
  const theme = {
    bgOverlay: isDarkMode 
      ? "bg-gradient-to-br from-secondary via-secondary/95 to-secondary"
      : "bg-gradient-to-br from-primary/95 via-white/90 to-primary/90",
    card: isDarkMode 
      ? "bg-secondary/80 border-primary/10" 
      : "bg-white/80 border-gray-300",
    textPrimary: text,
    textSecondary: subText,
    textMuted: isDarkMode ? "text-primary/50" : "text-gray-500",
    input: isDarkMode 
      ? "bg-secondary text-primary placeholder-primary/40 border-primary/10" 
      : "bg-gray-100 text-secondary placeholder-gray-400 border-gray-300",
    buttonPrimary: "w-full bg-accent hover:bg-accent/90 text-secondary font-bold py-2.5 rounded-xl shadow-xl hover:shadow-2xl disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 border border-accent/50"
  };

  return (
    <div className="flex items-center justify-center min-h-screen relative overflow-hidden">

      {/* Theme Toggle */}
      <button 
        onClick={toggleTheme}
        className={`absolute top-6 right-6 z-50 p-3 rounded-full backdrop-blur-sm transition-all duration-300 border shadow-lg ${
          isDarkMode 
            ? "bg-primary/10 hover:bg-primary/20 text-primary border-primary/20"
            : "bg-secondary/10 hover:bg-secondary/20 text-secondary border-secondary/20"
        }`}
        title="Toggle Theme"
      >
        {isDarkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
      </button>

      {/* Background Overlay */}
      <div
        className="absolute inset-0 bg-cover bg-center transition-all duration-500"
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070')"
        }}
      >
        <div className={`absolute inset-0 transition-all duration-500 ${theme.bgOverlay}`}></div>
      </div>

      {/* Main Grid */}
      <div className="relative z-10 w-full max-w-6xl mx-auto grid md:grid-cols-2 gap-8 items-center h-screen">

        {/* Left Section */}
        <div className={`hidden md:flex flex-col justify-center space-y-6 px-4 ${theme.textPrimary}`}>
          <div className="text-6xl font-bold tracking-tight leading-tight">
            MANAGE
            <div className="text-7xl bg-gradient-to-r from-accent via-accent to-[#d69200] bg-clip-text text-transparent">
              SMARTER
            </div>
          </div>
          <p className={`text-xl font-medium max-w-md ${theme.textPrimary}`}>
            Where Your Facilities Management Becomes Effortless.
          </p>
          <p className={`text-base max-w-lg leading-relaxed ${theme.textSecondary}`}>
            Streamline maintenance requests, track complaints, and enhance communication between residents, technicians, and administrators— all in one powerful platform.
          </p>

          {/* Feature Cards */}
          <div className="space-y-3 pt-4">
            {[{icon: Sparkles, text: "Real-time Tracking"}, {icon: TrendingUp, text: "Enhanced Productivity"}, {icon: CheckCircle2, text: "Seamless Integration"}].map((feature, i) => (
              <div key={i} className={`flex items-center gap-3 p-4 rounded-xl border backdrop-blur-md transition-colors duration-300 ${
                isDarkMode 
                  ? "bg-primary/5 border-primary/10 hover:bg-primary/10"
                  : "bg-white/40 border-white/30 hover:bg-white/60"
              }`}>
                <div className="p-2 bg-accent/20 rounded-lg">
                  <feature.icon className="w-5 h-5 text-accent" />
                </div>
                <span className="font-medium">{feature.text}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Right Section */}
        <div className="w-full max-w-sm mx-auto h-full overflow-y-auto flex items-center py-8 px-4 scrollbar-hide">
          <style>{`
            .scrollbar-hide::-webkit-scrollbar { display: none; }
            .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
          `}</style>

          <div className={`w-full rounded-3xl shadow-2xl p-6 border transition-all duration-500 ${theme.card}`}>

            {/* Header */}
            <div className="text-center mb-6">
              <div className="flex justify-center mb-3">
                <img src="/images/logo_withoutBG.png" alt="Facilitron Logo" className="h-30 w-auto object-contain drop-shadow-lg" />
              </div>
              <h2 className={`text-lg mb-1 drop-shadow-md font-semibold ${theme.textPrimary}`}>Welcome Back</h2>
              <p className={`text-xs drop-shadow ${theme.textMuted}`}>Computer Aided Facility Management</p>
            </div>

            {/* Email */}
            <div className="mb-4">
              <label className={`block text-sm mb-2 flex items-center gap-2 font-medium ${theme.textPrimary}`}>
                <Mail className="w-4 h-4 text-accent" /> Email Address
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
                  className={`w-full rounded-xl border-2 px-4 py-3 shadow-lg outline-none transition-all duration-300 ${theme.input} ${focusedField==='email'?'border-accent':''}`}
                />
                {email && <CheckCircle2 className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-accent" />}
              </div>
            </div>

            {/* Password */}
            <div className="mb-4">
              <label className={`block text-sm mb-2 flex items-center gap-2 font-medium ${theme.textPrimary}`}>
                <Lock className="w-4 h-4 text-accent" /> Password
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
                  className={`w-full rounded-xl border-2 px-4 py-3 pr-12 shadow-lg outline-none transition-all duration-300 ${theme.input} ${focusedField==='password'?'border-accent':''}`}
                />
                <button type="button" onClick={() => setShowPassword(!showPassword)} className={`absolute right-3 top-1/2 -translate-y-1/2 transition-colors ${isDarkMode?"text-primary/60 hover:text-accent":"text-gray-500 hover:text-accent"}`}>
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {/* Forgot Password */}
            <div className="mb-4 text-right">
              <button onClick={handleForgotPassword} className={`text-sm font-medium transition-colors duration-300 hover:underline ${isDarkMode?"text-accent hover:text-primary":"text-accent hover:text-secondary"}`}>
                Forgot Password?
              </button>
            </div>

            {/* Login */}
            <button onClick={handleLogin} disabled={isLoggingIn || !email || !password} className={theme.buttonPrimary}>
              <span className="flex items-center justify-center gap-2 text-base">
                {isLoggingIn ? (
                  <><div className="w-5 h-5 border-2 border-secondary/30 border-t-secondary rounded-full animate-spin" />Logging in...</>
                ) : loginSuccess ? (
                  <><Sparkles className="w-5 h-5" />Success!</>
                ) : (
                  <>Login<ArrowRight className="h-5 w-5" /></>
                )}
              </span>
            </button>

            {/* Divider */}
            <div className="relative my-4">
              <div className="absolute inset-0 flex items-center">
                <div className={`w-full border-t ${isDarkMode?"border-primary/20":"border-gray-200"}`}></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className={`px-4 backdrop-blur-sm rounded-full font-medium ${isDarkMode?"bg-secondary/40 text-primary/60":"bg-white/60 text-gray-500"}`}>
                  New to FACILITRON?
                </span>
              </div>
            </div>

            {/* Register */}
            <button onClick={handleCreateAccount} className={`w-full font-semibold py-2.5 rounded-xl backdrop-blur-sm border transition-all duration-300 shadow-lg ${isDarkMode?"bg-primary/5 hover:bg-primary/10 text-primary border-primary/20":"bg-gray-100/5 hover:bg-gray-100/10 text-secondary border-gray-300"}`}>
              Create Account
            </button>

          </div>
        </div>

      </div>
    </div>
  );
}
