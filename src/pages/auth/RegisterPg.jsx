import { useState } from "react";
import { Building2, Mail, Home, Lock, Eye, EyeOff, CheckCircle2 } from "lucide-react";

export default function RegisterPage() {
  const [email, setEmail] = useState("");
  const [apartment, setApartment] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [focusedField, setFocusedField] = useState(null);
  const [isRegistering, setIsRegistering] = useState(false);
  const [registered, setRegistered] = useState(false);

  const handleRegister = () => {
    setIsRegistering(true);
    setTimeout(() => {
      setIsRegistering(false);
      setRegistered(true);
      setTimeout(() => setRegistered(false), 3000);
    }, 1500);
  };

  const getPasswordStrength = () => {
    if (!password) return { strength: 0, label: "", color: "" };
    const len = password.length;
    if (len < 6) return { strength: 33, label: "Weak", color: "bg-red-400" };
    if (len < 10) return { strength: 66, label: "Good", color: "bg-cyan-400" };
    return { strength: 100, label: "Strong", color: "bg-blue-400" };
  };

  const passwordStrength = getPasswordStrength();

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Animated Blue Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-900 via-blue-700 to-cyan-600">
        <div className="absolute inset-0 opacity-20">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute rounded-full bg-white"
              style={{
                width: `${Math.random() * 300 + 50}px`,
                height: `${Math.random() * 300 + 50}px`,
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animation: `float ${Math.random() * 10 + 10}s ease-in-out infinite`,
                animationDelay: `${Math.random() * 5}s`,
              }}
            />
          ))}
        </div>
        {/* Blue wave effect */}
        <div className="absolute inset-0 opacity-30">
          <svg className="absolute bottom-0 w-full" viewBox="0 0 1440 320">
            <path
              fill="#1e40af"
              fillOpacity="0.3"
              d="M0,96L48,112C96,128,192,160,288,160C384,160,480,128,576,122.7C672,117,768,139,864,144C960,149,1056,139,1152,128C1248,117,1344,107,1392,101.3L1440,96L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
            />
          </svg>
        </div>
      </div>

      <style>{`
        @keyframes float {
          0%, 100% { transform: translate(0, 0) scale(1); }
          50% { transform: translate(${Math.random() * 100 - 50}px, ${Math.random() * 100 - 50}px) scale(1.1); }
        }
        @keyframes slideInLeft {
          from { transform: translateX(-100%); opacity: 0; }
          to { transform: translateX(0); opacity: 1; }
        }
        @keyframes slideInRight {
          from { transform: translateX(100%); opacity: 0; }
          to { transform: translateX(0); opacity: 1; }
        }
        @keyframes pulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.05); }
        }
        @keyframes success {
          0% { transform: scale(0); opacity: 0; }
          50% { transform: scale(1.2); opacity: 1; }
          100% { transform: scale(1); opacity: 1; }
        }
        @keyframes glow {
          0%, 100% { box-shadow: 0 0 20px rgba(59, 130, 246, 0.5); }
          50% { box-shadow: 0 0 40px rgba(59, 130, 246, 0.8); }
        }
      `}</style>

      {/* Main Container */}
      <div className="relative min-h-screen flex items-center justify-center p-4">
        <div className="w-full max-w-6xl bg-white/10 backdrop-blur-xl rounded-3xl shadow-2xl overflow-hidden border border-blue-300/30">
          <div className="grid md:grid-cols-2 gap-0">
            {/* Left Section */}
            <div 
              className="bg-gradient-to-br from-blue-600/80 to-cyan-500/80 backdrop-blur-sm p-12 flex flex-col justify-center relative overflow-hidden"
              style={{ animation: "slideInLeft 0.8s ease-out" }}
            >
              {/* Decorative circles */}
              <div className="absolute top-10 right-10 w-32 h-32 bg-white/10 rounded-full blur-2xl" />
              <div className="absolute bottom-10 left-10 w-40 h-40 bg-blue-300/20 rounded-full blur-3xl" />
              
              <div className="space-y-6 relative z-10">
                <div className="flex items-center gap-3 transform hover:scale-105 transition-transform duration-300">
                  <div className="p-2 bg-white/20 rounded-lg backdrop-blur-sm">
                    <Building2 className="w-8 h-8 text-white" />
                  </div>
                  <span className="text-2xl font-bold text-white">CAFM</span>
                </div>
                <div className="space-y-2">
                  <h2 className="text-sm font-semibold text-blue-100 tracking-widest uppercase">
                    FACILITIES
                  </h2>
                  <h1 className="text-4xl font-bold text-white leading-tight">
                    CREATE YOUR ACCOUNT
                  </h1>
                  <p className="text-blue-50 text-lg">
                    Register to access centralized maintenance and communication features.
                  </p>
                </div>
                <div className="space-y-4 pt-6">
                  {["Centralized Maintenance", "Real-time Communication", "Smart Facility Management"].map((feature, i) => (
                    <div 
                      key={i}
                      className="flex items-center gap-3 text-white bg-white/10 backdrop-blur-sm p-3 rounded-lg transform hover:translate-x-2 hover:bg-white/20 transition-all duration-300"
                      style={{ animationDelay: `${i * 0.2}s` }}
                    >
                      <CheckCircle2 className="w-5 h-5 flex-shrink-0 text-cyan-300" />
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Section */}
            <div 
              className="bg-gradient-to-br from-blue-950/80 to-blue-900/80 backdrop-blur-sm p-12 flex flex-col justify-center"
              style={{ animation: "slideInRight 0.8s ease-out" }}
            >
              <div className="space-y-8">
                {/* Header */}
                <div className="text-center space-y-2">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-blue-500/30 backdrop-blur-sm mb-4 transform hover:rotate-12 transition-transform duration-300 border-2 border-blue-400/50">
                    <Building2 className="w-8 h-8 text-blue-200" />
                  </div>
                  <h2 className="text-3xl font-bold text-white">Register</h2>
                  <p className="text-blue-200">Create your CAFM account</p>
                </div>

                {/* Form */}
                <div className="space-y-5">
                  {/* Email */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-blue-100 flex items-center gap-2">
                      <Mail className="w-4 h-4" />
                      Email Address
                    </label>
                    <div className={`relative transform transition-all duration-300 ${focusedField === 'email' ? 'scale-105' : ''}`}>
                      <input
                        type="email"
                        placeholder="your.email@example.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        onFocus={() => setFocusedField('email')}
                        onBlur={() => setFocusedField(null)}
                        className="w-full rounded-lg bg-blue-800/40 border-2 border-blue-400/40 text-white placeholder-blue-300/60 px-4 py-3 shadow-lg outline-none focus:bg-blue-800/60 focus:border-blue-300 transition-all duration-300"
                        style={focusedField === 'email' ? { animation: 'glow 2s infinite' } : {}}
                      />
                      {email && (
                        <CheckCircle2 
                          className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-cyan-400"
                          style={{ animation: "success 0.5s ease-out" }}
                        />
                      )}
                    </div>
                  </div>

                  {/* Apartment Number */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-blue-100 flex items-center gap-2">
                      <Home className="w-4 h-4" />
                      Apartment No
                    </label>
                    <div className={`relative transform transition-all duration-300 ${focusedField === 'apartment' ? 'scale-105' : ''}`}>
                      <input
                        type="text"
                        placeholder="A-101"
                        value={apartment}
                        onChange={(e) => setApartment(e.target.value)}
                        onFocus={() => setFocusedField('apartment')}
                        onBlur={() => setFocusedField(null)}
                        className="w-full rounded-lg bg-blue-800/40 border-2 border-blue-400/40 text-white placeholder-blue-300/60 px-4 py-3 shadow-lg outline-none focus:bg-blue-800/60 focus:border-blue-300 transition-all duration-300"
                        style={focusedField === 'apartment' ? { animation: 'glow 2s infinite' } : {}}
                      />
                      {apartment && (
                        <CheckCircle2 
                          className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-cyan-400"
                          style={{ animation: "success 0.5s ease-out" }}
                        />
                      )}
                    </div>
                  </div>

                  {/* Password */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-blue-100 flex items-center gap-2">
                      <Lock className="w-4 h-4" />
                      Password
                    </label>
                    <div className={`relative transform transition-all duration-300 ${focusedField === 'password' ? 'scale-105' : ''}`}>
                      <input
                        type={showPassword ? "text" : "password"}
                        placeholder="••••••••"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        onFocus={() => setFocusedField('password')}
                        onBlur={() => setFocusedField(null)}
                        className="w-full rounded-lg bg-blue-800/40 border-2 border-blue-400/40 text-white placeholder-blue-300/60 px-4 py-3 pr-12 shadow-lg outline-none focus:bg-blue-800/60 focus:border-blue-300 transition-all duration-300"
                        style={focusedField === 'password' ? { animation: 'glow 2s infinite' } : {}}
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-blue-300 hover:text-blue-100 transition-colors"
                      >
                        {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                      </button>
                    </div>
                    {password && (
                      <div className="space-y-1">
                        <div className="h-1.5 bg-blue-900/50 rounded-full overflow-hidden">
                          <div
                            className={`h-full ${passwordStrength.color} transition-all duration-300`}
                            style={{ width: `${passwordStrength.strength}%` }}
                          />
                        </div>
                        <p className="text-xs text-blue-200">{passwordStrength.label} password</p>
                      </div>
                    )}
                  </div>

                  {/* Register Button */}
                  <button
                    onClick={handleRegister}
                    disabled={isRegistering || !email || !apartment || !password}
                    className="w-full bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-semibold py-3 rounded-lg shadow-xl hover:shadow-2xl hover:from-blue-500 hover:to-cyan-400 transform hover:scale-105 active:scale-95 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none border border-blue-400/30"
                  >
                    {isRegistering ? (
                      <div className="flex items-center justify-center gap-2">
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        Registering...
                      </div>
                    ) : registered ? (
                      <div className="flex items-center justify-center gap-2">
                        <CheckCircle2 className="w-5 h-5" />
                        Success!
                      </div>
                    ) : (
                      "Register"
                    )}
                  </button>

                  {/* Login Link */}
                  <p className="text-center text-blue-200 text-sm">
                    Already have an account?{" "}
                    <a href="/login" className="text-cyan-300 font-semibold hover:underline transition-all duration-300 hover:text-cyan-200">
                      Login
                    </a>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}