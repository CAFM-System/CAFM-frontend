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

export default function RegisterPage() {
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [apartment, setApartment] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [focusedField, setFocusedField] = useState(null);
  const [isRegistering, setIsRegistering] = useState(false);
  const [registered, setRegistered] = useState(false);

  const navigate = useNavigate();

  const passwordsMatch =
    password && confirmPassword && password === confirmPassword;

  const getPasswordStrength = () => {
    if (!password) return { strength: 0, label: "", color: "" };
    if (password.length < 6)
      return { strength: 33, label: "Weak", color: "bg-red-400" };
    if (password.length < 10)
      return { strength: 66, label: "Good", color: "bg-cyan-400" };
    return { strength: 100, label: "Strong", color: "bg-blue-400" };
  };

  const passwordStrength = getPasswordStrength();

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

      setIsRegistering(false);
      setRegistered(true);

      setTimeout(() => setRegistered(false), 2000);
      setTimeout(() => navigate("/login"), 800);
    } catch (error) {
      setIsRegistering(false);
      console.error("Registration failed", error);
      alert("Registration failed. Please try again.");
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-900 via-blue-700 to-cyan-600" />

      <div className="relative min-h-screen flex items-center justify-center p-4">
        <div className="w-full max-w-6xl bg-white/10 backdrop-blur-xl rounded-3xl shadow-2xl border border-blue-300/30 overflow-hidden">
          <div className="grid md:grid-cols-2">
            {/* LEFT */}
            <div className="bg-gradient-to-br from-blue-600/80 to-cyan-500/80 p-12 flex flex-col justify-center">
              <div className="space-y-6">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-white/20 rounded-lg">
                    <Building2 className="w-8 h-8 text-white" />
                  </div>
                  <span className="text-2xl font-bold text-white">CAFM</span>
                </div>
                <h1 className="text-4xl font-bold text-white">
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

            {/* RIGHT */}
            <div className="bg-gradient-to-br from-blue-950/80 to-blue-900/80 p-12">
            {/* Header */}
                <div className="text-center space-y-2">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-blue-500/30 backdrop-blur-sm mb-4 border-2 border-blue-400/50">
                    <Building2 className="w-8 h-8 text-blue-200" />
                  </div>
                  <h2 className="text-3xl font-bold text-white">Register</h2>
                  <p className="text-blue-200">Create your CAFM account</p>
                </div>
              <div className="space-y-5">

                {/* First Name */}
                <InputField
                  icon={<User />}
                  label="First Name"
                  value={firstName}
                  onChange={setFirstName}
                  placeholder="John"
                />

                {/* Last Name */}
                <InputField
                  icon={<User />}
                  label="Last Name"
                  value={lastName}
                  onChange={setLastName}
                  placeholder="Doe"
                />

                {/* Email */}
                <InputField
                  icon={<Mail />}
                  label="Email"
                  value={email}
                  onChange={setEmail}
                  placeholder="john@example.com"
                  type="email"
                />

                {/* Phone */}
                <InputField
                  icon={<Phone />}
                  label="Phone"
                  value={phone}
                  onChange={setPhone}
                  placeholder="+94 77 123 4567"
                />

                {/* Apartment */}
                <InputField
                  icon={<Home />}
                  label="Apartment No"
                  value={apartment}
                  onChange={setApartment}
                  placeholder="A-12"
                />

                {/* Password */}
                <PasswordField
                  label="Password"
                  password={password}
                  setPassword={setPassword}
                  showPassword={showPassword}
                  setShowPassword={setShowPassword}
                />

                {/* Strength */}
                {password && (
                  <div>
                    <div className="h-1 bg-blue-900/50 rounded-full">
                      <div
                        className={`h-full ${passwordStrength.color}`}
                        style={{ width: `${passwordStrength.strength}%` }}
                      />
                    </div>
                    <p className="text-xs text-blue-200">
                      {passwordStrength.label} password
                    </p>
                  </div>
                )}

                {/* Confirm Password */}
                <div>
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Confirm password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className={`w-full px-4 py-3 rounded-lg text-white bg-blue-800/40 border-2 ${
                      confirmPassword
                        ? passwordsMatch
                          ? "border-green-400"
                          : "border-red-400"
                        : "border-blue-400/40"
                    }`}
                  />
                  {confirmPassword && (
                    <p
                      className={`text-xs mt-1 ${
                        passwordsMatch ? "text-green-400" : "text-red-400"
                      }`}
                    >
                      {passwordsMatch
                        ? "Passwords match"
                        : "Passwords do not match"}
                    </p>
                  )}
                </div>

                {/* Button */}
                <button
                  onClick={handleRegister}
                  disabled={!passwordsMatch || isRegistering}
                  className="w-full bg-gradient-to-r from-blue-600 to-cyan-500 text-white py-3 rounded-lg font-semibold disabled:opacity-50"
                >
                  {isRegistering ? "Registering..." : "Register"}
                </button>

                <p className="text-center text-blue-200 text-sm">
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
    </div>
  );
}

/* 🔹 Small Reusable Components */
const InputField = ({ icon, label, value, onChange, placeholder, type = "text" }) => (
  <div>
    <label className="text-sm text-blue-100">{label}</label>
    <div className="flex items-center gap-2">
      {icon}
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full px-4 py-3 rounded-lg bg-blue-800/40 border-2 border-blue-400/40 text-white"
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
    <label className="text-sm text-blue-100">{label}</label>
    <div className="relative">
      <input
        type={showPassword ? "text" : "password"}
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="••••••••"
        className="w-full px-4 py-3 rounded-lg bg-blue-800/40 border-2 border-blue-400/40 text-white"
      />
      <button
        type="button"
        onClick={() => setShowPassword(!showPassword)}
        className="absolute right-3 top-1/2 -translate-y-1/2 text-blue-300"
      >
        {showPassword ? <EyeOff /> : <Eye />}
      </button>
    </div>
  </div>
);
