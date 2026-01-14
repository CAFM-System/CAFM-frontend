import { useState, useEffect } from 'react';
import { 
  Key, 
  Lock, 
  Eye, 
  EyeOff, 
  ArrowRight, 
  ArrowLeft, 
  CheckCircle2, 
  AlertCircle 
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function ResetPasswordPage() {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState('');
  const [accessToken, setAccessToken] = useState('');
  
  // Track focus for interactive styling
  const [focusedField, setFocusedField] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const hash = window.location.hash;
    const params = new URLSearchParams(hash.substring(1));
    const token = params.get('access_token');
    const type = params.get('type');

    if (token && type === 'recovery') {
      setAccessToken(token);
    } else {
      setError('Invalid or expired reset link');
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!password || !confirmPassword) {
      setError('Please fill in all fields');
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (!accessToken) {
      setError('Invalid reset token');
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch('http://localhost:4000/api/auth/reset-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`
        },
        body: JSON.stringify({ password })
      });

      const data = await response.json();

      if (data.success) {
        setIsSuccess(true);
      } else {
        setError(data.message || 'Failed to reset password');
      }
    } catch (error) {
      setError('An error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleBackToLogin = () => {
    navigate('/login');
  };

  // Helper for background visuals
  const BackgroundEffects = () => (
    <>
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070')",
        }}
      >
        {/* Gradient Overlay (Secondary Color) */}
        <div className="absolute inset-0 bg-gradient-to-br from-secondary/95 via-secondary/90 to-[#1F2B2A]/95"></div>
      </div>
      
      {/* Ambient Glows */}
      <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-accent/10 rounded-full blur-[100px] pointer-events-none animate-pulse"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-96 h-96 bg-primary/5 rounded-full blur-[100px] pointer-events-none"></div>
    </>
  );

  /* ================= SUCCESS SCREEN ================= */
  if (isSuccess) {
    return (
      <div className="flex items-center justify-center min-h-screen relative overflow-hidden font-sans p-4">
        <BackgroundEffects />

        <div className="relative z-10 w-full max-w-md">
          <div className="bg-secondary/60 backdrop-blur-xl rounded-3xl shadow-2xl p-8 border border-primary/10 ring-1 ring-white/5 text-center">
            
            <div className="mx-auto w-20 h-20 bg-accent/10 rounded-full flex items-center justify-center mb-6 ring-1 ring-accent/30 shadow-[0_0_15px_-3px_var(--color-accent)]">
              <CheckCircle2 className="w-10 h-10 text-accent" />
            </div>

            <h2 className="text-2xl font-bold text-primary mb-2">
              Password Reset Successful
            </h2>
            <p className="text-primary/70 text-sm mb-8">
              Your password has been updated. You can now login with your new credentials.
            </p>

            <button
              onClick={handleBackToLogin}
              className="w-full bg-accent hover:bg-[#d69200] text-secondary font-bold py-3.5 rounded-xl shadow-[0_0_20px_-5px_var(--color-accent)] hover:shadow-[0_0_25px_-5px_var(--color-accent)] transition-all duration-300 transform hover:-translate-y-0.5"
            >
              Go to Login
            </button>
          </div>
        </div>
      </div>
    );
  }

  /* ================= RESET FORM ================= */
  return (
    <div className="flex items-center justify-center min-h-screen relative overflow-hidden font-sans p-4">
      <BackgroundEffects />

      {/* Card */}
      <div className="relative z-10 w-full max-w-md">
        <div className="bg-secondary/60 backdrop-blur-xl rounded-3xl shadow-2xl p-8 border border-primary/10 ring-1 ring-white/5">
          
          {/* Header */}
          <div className="text-center mb-8">
            <div className="mx-auto w-20 h-20 bg-primary/5 rounded-3xl flex items-center justify-center mb-6 ring-1 ring-primary/10 backdrop-blur-sm">
              <Key className="w-10 h-10 text-accent" />
            </div>
            <h2 className="text-3xl font-bold text-primary mb-2 tracking-tight">
              Reset Password
            </h2>
            <p className="text-primary/60 text-sm">
              Enter your new password below
            </p>
          </div>

          {/* Error Message */}
          {error && (
            <div className="mb-6 bg-red-500/10 border border-red-500/20 rounded-xl p-4 flex items-start gap-3 backdrop-blur-sm">
              <AlertCircle className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
              <p className="text-sm text-red-200">{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            
            {/* New Password */}
            <div className="group">
              <label className={`text-xs font-semibold uppercase tracking-wider mb-1.5 block transition-colors duration-300 ${focusedField === 'password' ? 'text-accent' : 'text-primary/60'}`}>
                New Password
              </label>
              <div className="relative">
                <div className={`absolute left-3 top-1/2 -translate-y-1/2 transition-colors duration-300 ${focusedField === 'password' ? 'text-accent' : 'text-primary/40'}`}>
                  <Lock className="w-5 h-5" />
                </div>
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onFocus={() => setFocusedField('password')}
                  onBlur={() => setFocusedField(null)}
                  className={`w-full pl-10 pr-12 py-3.5 rounded-xl bg-primary/5 border-2 text-primary placeholder:text-primary/20 outline-none transition-all duration-300
                    ${focusedField === 'password' ? 'border-accent bg-primary/10 shadow-[0_0_15px_-5px_var(--color-accent)]' : 'border-primary/10 hover:border-primary/20'}
                  `}
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-primary/40 hover:text-accent transition-colors p-1"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Confirm Password */}
            <div className="group">
              <label className={`text-xs font-semibold uppercase tracking-wider mb-1.5 block transition-colors duration-300 ${focusedField === 'confirm' ? 'text-accent' : 'text-primary/60'}`}>
                Confirm Password
              </label>
              <div className="relative">
                <div className={`absolute left-3 top-1/2 -translate-y-1/2 transition-colors duration-300 ${focusedField === 'confirm' ? 'text-accent' : 'text-primary/40'}`}>
                  <Lock className="w-5 h-5" />
                </div>
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  onFocus={() => setFocusedField('confirm')}
                  onBlur={() => setFocusedField(null)}
                  className={`w-full pl-10 pr-12 py-3.5 rounded-xl bg-primary/5 border-2 text-primary placeholder:text-primary/20 outline-none transition-all duration-300
                    ${focusedField === 'confirm' ? 'border-accent bg-primary/10 shadow-[0_0_15px_-5px_var(--color-accent)]' : 'border-primary/10 hover:border-primary/20'}
                  `}
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-primary/40 hover:text-accent transition-colors p-1"
                >
                  {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="pt-2 space-y-4">
              <button
                type="submit"
                disabled={isLoading || !password || !confirmPassword || !accessToken}
                className="w-full bg-accent hover:bg-[#d69200] text-secondary font-bold py-3.5 rounded-xl shadow-[0_0_20px_-5px_var(--color-accent)] hover:shadow-[0_0_25px_-5px_var(--color-accent)] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center transform hover:-translate-y-0.5 active:translate-y-0 disabled:transform-none disabled:shadow-none"
              >
                {isLoading ? (
                   <>
                     <div className="w-5 h-5 border-2 border-secondary/30 border-t-secondary rounded-full animate-spin mr-2" />
                     Resetting...
                   </>
                ) : (
                   <>
                     Reset Password <ArrowRight className="w-5 h-5 ml-2" />
                   </>
                )}
              </button>

              <button
                type="button"
                onClick={handleBackToLogin}
                className="w-full text-sm text-primary/60 hover:text-accent font-medium flex items-center justify-center gap-2 transition-colors group"
              >
                <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                Back to Login
              </button>
            </div>

          </form>
        </div>
      </div>
    </div>
  );
}