import { useState } from "react";
import { Building2, Mail, Home, Lock, Eye, EyeOff, CheckCircle2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import AuthService from "../../services/auth.service.js";

export default function RegisterPage() {
  const [email, setEmail] = useState("");
  const [apartment, setApartment] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [focusedField, setFocusedField] = useState(null);
  const [isRegistering, setIsRegistering] = useState(false);
  const [registered, setRegistered] = useState(false);
  const navigate = useNavigate();

  const handleRegister = async () => {
    if (!email || !apartment || !password) return;

    try {
      setIsRegistering(true);

      const res = await AuthService.register({
        email,
        apartment,
        password,
      });

      setIsRegistering(false);
      setRegistered(true);

      // Hide success animation after 2s
      setTimeout(() => setRegistered(false), 2000);

      // Redirect to login or dashboard after successful registration
      setTimeout(() => {
        navigate("/login");
      }, 800);

    } catch (error) {
      setIsRegistering(false);
      console.error("Registration failed", error);
      alert("Registration failed. Please try again.");
    }
  };

  const handleLoginRedirect = () => {
    navigate("/login");
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
      {/* Simple Blue Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-900 via-blue-700 to-cyan-600"></div>

      {/* Main Container */}
      <div className="relative min-h-screen flex items-center justify-center p-4">
        <div className="w-full max-w-6xl bg-white/10 backdrop-blur-xl rounded-3xl shadow-2xl overflow-hidden border border-blue-300/30">
          <div className="grid md:grid-cols-2 gap-0">
            {/* Left Section */}
            <div className="bg-gradient-to-br from-blue-600/80 to-cyan-500/80 backdrop-blur-sm p-12 flex flex-col justify-center relative overflow-hidden">
              <div className="space-y-6 relative z-10">
                <div className="flex items-center gap-3">
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
                      className="flex items-center gap-3 text-white bg-white/10 backdrop-blur-sm p-3 rounded-lg hover:bg-white/20 transition-colors duration-300"
                    >
                      <CheckCircle2 className="w-5 h-5 flex-shrink-0 text-cyan-300" />
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Section */}
            <div className="bg-gradient-to-br from-blue-950/80 to-blue-900/80 backdrop-blur-sm p-12 flex flex-col justify-center">
              <div className="space-y-8">
                {/* Header */}
                <div className="text-center space-y-2">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-blue-500/30 backdrop-blur-sm mb-4 border-2 border-blue-400/50">
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
                    <div className="relative">
                      <input
                        type="email"
                        placeholder="your.email@example.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        onFocus={() => setFocusedField('email')}
                        onBlur={() => setFocusedField(null)}
                        className={`w-full rounded-lg bg-blue-800/40 border-2 text-white placeholder-blue-300/60 px-4 py-3 shadow-lg outline-none transition-all duration-300 ${
                          focusedField === 'email' 
                            ? 'border-blue-300 bg-blue-800/60' 
                            : 'border-blue-400/40'
                        }`}
                      />
                      {email && (
                        <CheckCircle2 className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-cyan-400" />
                      )}
                    </div>
                  </div>

                  {/* Apartment Number */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-blue-100 flex items-center gap-2">
                      <Home className="w-4 h-4" />
                      Apartment No
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        placeholder="A-101"
                        value={apartment}
                        onChange={(e) => setApartment(e.target.value)}
                        onFocus={() => setFocusedField('apartment')}
                        onBlur={() => setFocusedField(null)}
                        className={`w-full rounded-lg bg-blue-800/40 border-2 text-white placeholder-blue-300/60 px-4 py-3 shadow-lg outline-none transition-all duration-300 ${
                          focusedField === 'apartment' 
                            ? 'border-blue-300 bg-blue-800/60' 
                            : 'border-blue-400/40'
                        }`}
                      />
                      {apartment && (
                        <CheckCircle2 className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-cyan-400" />
                      )}
                    </div>
                  </div>

                  {/* Password */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-blue-100 flex items-center gap-2">
                      <Lock className="w-4 h-4" />
                      Password
                    </label>
                    <div className="relative">
                      <input
                        type={showPassword ? "text" : "password"}
                        placeholder="••••••••"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        onFocus={() => setFocusedField('password')}
                        onBlur={() => setFocusedField(null)}
                        className={`w-full rounded-lg bg-blue-800/40 border-2 text-white placeholder-blue-300/60 px-4 py-3 pr-12 shadow-lg outline-none transition-all duration-300 ${
                          focusedField === 'password' 
                            ? 'border-blue-300 bg-blue-800/60' 
                            : 'border-blue-400/40'
                        }`}
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
                    className="w-full bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-semibold py-3 rounded-lg shadow-xl hover:shadow-2xl hover:from-blue-500 hover:to-cyan-400 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed border border-blue-400/30"
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
                    <button 
                      onClick={handleLoginRedirect}
                      className="text-cyan-300 font-semibold hover:underline transition-all duration-300 hover:text-cyan-200"
                    >
                      Login
                    </button>
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