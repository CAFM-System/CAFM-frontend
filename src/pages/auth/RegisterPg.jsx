import { useState } from "react";
import {
  Building2,
  Mail,
  Home,
  Lock,
  Eye,
  EyeOff,
  CheckCircle2,
  User,
  Phone
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import AuthService from "../../services/auth.service.js";
import { useTheme } from "../../hooks/useTheme";

export default function RegisterPage() {
  const { isDarkMode } = useTheme();
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [apartment, setApartment] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isRegistering, setIsRegistering] = useState(false);

  const navigate = useNavigate();

  const getPasswordStrength = () => {
    if (!password) return { value: 0, label: "", color: "" };

    if (password.length < 6)
      return { value: 33, label: "Weak", color: "bg-red-400" };

    if (password.length < 10)
      return { value: 66, label: "Medium", color: "bg-yellow-400" };

    return { value: 100, label: "Strong", color: "bg-green-400" };
  };

  const passwordStrength = getPasswordStrength();


  const passwordsMatch =
    password && confirmPassword && password === confirmPassword;

  const handleRegister = async () => {
    if (
      !email ||
      !firstName ||
      !lastName ||
      !phone ||
      !apartment ||
      !password ||
      password !== confirmPassword
    )
      return;

    try {
      setIsRegistering(true);

      await AuthService.register({
        email,
        password,
        first_name: firstName,
        last_name: lastName,
        apartment_no: apartment,
        phone
      });

      navigate("/login");
    } catch (err) {
      alert("Registration failed");
    } finally {
      setIsRegistering(false);
    }
  };

  return (
    <div className={`flex items-center justify-center min-h-screen overflow-hidden relative ${isDarkMode ? 'bg-zinc-950' : 'bg-slate-100'}`}>
        {/* Background Image with Overlay */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070')",
        }}
      >
        <div className={`absolute inset-0 bg-gradient-to-br ${isDarkMode ? 'from-zinc-900/95 via-zinc-900/90 to-zinc-950/95' : 'from-[#1687A7]/90 via-[#1687A7]/85 to-[#0d5f7a]/90'}`}></div>
      </div>

      <div className={`w-full max-w-6xl h-[90vh] backdrop-blur-xl rounded-3xl shadow-2xl border overflow-hidden ${isDarkMode ? 'bg-zinc-900/30 border-zinc-700/40' : 'bg-white/10 border-[#1687A7]/40'}`}>
        <div className="grid md:grid-cols-2 h-full">

          {/* LEFT */}
          <div className={`p-12 flex flex-col justify-center text-white ${isDarkMode ? 'bg-gradient-to-br from-zinc-800 via-zinc-900 to-zinc-950' : 'bg-gradient-to-br from-[#1fa2c9] via-[#1687A7] to-[#0b4f63]'}`}>
            <div className="space-y-6">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-white/20 rounded-lg">
                  <Building2 className="w-8 h-8" />
                </div>
                <span className="text-2xl font-bold">CAFM</span>
              </div>

              <h1 className="text-4xl font-bold">Create Your Account</h1>

              <p className="text-white/90">
                Centralized facility & maintenance management system
              </p>
            </div>

            <div className="space-y-4 pt-8">
              {[
                "Centralized Maintenance",
                "Real-time Communication",
                "Smart Facility Management"
              ].map((item, i) => (
                <div
                  key={i}
                  className="flex items-center gap-3 bg-white/15 p-3 rounded-lg"
                >
                  <CheckCircle2 className="text-cyan-200" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT – SCROLLABLE */}
          <div className={`p-10 overflow-y-auto ${isDarkMode ? 'bg-zinc-950/60' : 'bg-[#0b3c49]/60'}`}>
            <div className="max-w-md mx-auto space-y-5">
              <div className="text-center mb-6">
                <h2 className="text-3xl font-bold text-white">Register</h2>
                <p className="text-[#8fd3e3]">Create your CAFM account</p>
              </div>

              <InputField icon={<User />} label="First Name" value={firstName} onChange={setFirstName} />
              <InputField icon={<User />} label="Last Name" value={lastName} onChange={setLastName} />
              <InputField icon={<Mail />} label="Email" value={email} onChange={setEmail} />
              <InputField icon={<Phone />} label="Phone" value={phone} onChange={setPhone} />
              <InputField icon={<Home />} label="Apartment No" value={apartment} onChange={setApartment} />

              <PasswordField
                label="Password"
                password={password}
                setPassword={setPassword}
                showPassword={showPassword}
                setShowPassword={setShowPassword}
              />

              {/* Password Strength */}
              {password && (
                <div className="space-y-1">
                  <div className="h-1.5 w-full bg-white/20 rounded-full overflow-hidden">
                    <div
                      className={`h-full ${passwordStrength.color} transition-all duration-300`}
                      style={{ width: `${passwordStrength.value}%` }}
                    />
                  </div>
                  <p className="text-xs text-[#8fd3e3]">
                    Strength: <span className="font-semibold">{passwordStrength.label}</span>
                  </p>
                </div>
              )}


              {/* Confirm Password */}
              <div>
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Confirm Password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className={`w-full px-4 py-3 rounded-lg bg-[#1687A7]/20 border-2 text-white ${confirmPassword
                      ? passwordsMatch
                        ? "border-green-400"
                        : "border-red-400"
                      : "border-[#1687A7]/40"
                    }`}
                />
              </div>

              <button
                onClick={handleRegister}
                disabled={!passwordsMatch || isRegistering}
                className="w-full bg-gradient-to-r from-[#1687A7] to-cyan-500 text-white py-3 rounded-lg font-semibold disabled:opacity-50"
              >
                {isRegistering ? "Registering..." : "Register"}
              </button>

              <p className="text-center text-[#8fd3e3] text-sm">
                Already have an account?{" "}
                <span
                  onClick={() => navigate("/login")}
                  className="text-cyan-300 cursor-pointer hover:underline"
                >
                  Login
                </span>
              </p>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

/* 🔹 Reusable Components */

const InputField = ({ icon, label, value, onChange }) => (
  <div>
    <label className="text-sm text-white/90">{label}</label>
    <div className="flex items-center gap-2">
      <span className="text-white/80">{icon}</span>
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full px-4 py-3 rounded-lg bg-[#1687A7]/20 border-2 border-[#1687A7]/40 text-white placeholder-white/40"
      />
    </div>
  </div>
);


const PasswordField = ({
  label,
  password,
  setPassword,
  showPassword,
  setShowPassword
}) => (
  <div>
    <label className="text-sm text-white/90 font-medium">{label}</label>
    <div className="relative">
      <input
        type={showPassword ? "text" : "password"}
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="w-full px-4 py-3 rounded-lg bg-[#1687A7]/20 border-2 border-[#1687A7]/40 text-white"
      />
      <button
        type="button"
        onClick={() => setShowPassword(!showPassword)}
        className="absolute right-3 top-1/2 -translate-y-1/2 text-cyan-300"
      >
        {showPassword ? <EyeOff /> : <Eye />}
      </button>
    </div>
  </div>
);
