import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Mail, ArrowLeft, Key, CheckCircle2 } from 'lucide-react';

export default function ForgotPasswordPage() {
    const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      const response = await fetch('http://localhost:4000/api/auth/forgot-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email })
      });

      const data = await response.json();

      if (data.success) {
        setIsSubmitted(true);
      } else {
        alert(data.message || 'Failed to send reset email');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleBackToLogin = () => {
navigate('/login');  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden">
        {/* Background Image with Overlay */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070')",
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-[#1687A7]/90 via-[#1687A7]/85 to-[#0d5f7a]/90"></div>
        </div>

        <div className="relative z-10 w-full max-w-md">
          <div className="bg-white/10 backdrop-blur-2xl rounded-3xl shadow-2xl p-8 border-2 border-white/40">
            <div className="text-center mb-6">
              <div className="mx-auto w-16 h-16 bg-[#76C7D8]/30 rounded-full flex items-center justify-center mb-4 border-2 border-[#76C7D8]/50">
                <CheckCircle2 className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-3xl font-bold text-white mb-3 drop-shadow-lg">Check Your Email</h2>
              <p className="text-white/90 text-sm drop-shadow">
                We've sent a password reset link to
              </p>
              <p className="text-[#76C7D8] font-semibold mt-1 drop-shadow">
                {email}
              </p>
            </div>

            <div className="bg-[#1687A7]/20 border border-[#76C7D8]/30 rounded-xl p-4 mb-6 backdrop-blur-sm">
              <p className="text-sm text-white/90">
                Didn't receive the email? Check your spam folder or try again with a different email address.
              </p>
            </div>

            <button
              onClick={handleBackToLogin}
              className="w-full bg-gradient-to-r from-[#1687A7] to-[#0d5f7a] hover:from-[#1a9ec4] hover:to-[#1687A7] text-white font-semibold py-3 rounded-xl shadow-xl hover:shadow-2xl transition-all duration-300 border border-[#1687A7]/30"
            >
              Back to Login
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background Image with Overlay */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070')",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-[#1687A7]/90 via-[#1687A7]/85 to-[#0d5f7a]/90"></div>
      </div>

      <div className="relative z-10 w-full max-w-md">
        <div className="bg-white/10 backdrop-blur-2xl rounded-3xl shadow-2xl p-8 border-2 border-white/40">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="mx-auto w-16 h-16 bg-[#76C7D8]/30 rounded-full flex items-center justify-center mb-4 border-2 border-[#76C7D8]/50">
              <Key className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-3xl font-bold text-white mb-3 drop-shadow-lg">Forgot Password?</h2>
            <p className="text-white/90 text-sm drop-shadow">
              No worries! Enter your email and we'll send you reset instructions.
            </p>
          </div>

          {/* Form */}
          <div>
            <div className="mb-6">
              <label className="block text-white text-sm font-medium mb-2 drop-shadow flex items-center gap-2">
                <Mail className="w-4 h-4" />
                Email Address
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && email) {
                    handleSubmit(e);
                  }
                }}
                className="w-full px-4 py-3 bg-[#0d5f7a]/40 border-2 border-white/40 rounded-xl text-white placeholder-white/60 focus:outline-none focus:border-[#1687A7] focus:bg-[#0d5f7a]/60 transition-all duration-300 shadow-lg"
              />
            </div>

            <button
              onClick={handleSubmit}
              disabled={isLoading || !email}
              className="w-full bg-gradient-to-r from-[#1687A7] to-[#0d5f7a] hover:from-[#1a9ec4] hover:to-[#1687A7] text-white font-semibold py-3 rounded-xl shadow-xl hover:shadow-2xl transition-all duration-300 border border-[#1687A7]/30 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
            >
              {isLoading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2" />
                  Sending...
                </>
              ) : (
                'Send Reset Link'
              )}
            </button>
          </div>

          {/* Back to Login */}
          <div className="mt-6 text-center">
            <button
              onClick={handleBackToLogin}
              className="text-sm text-[#76C7D8] hover:text-[#D3E0EA] transition-colors duration-300 hover:underline font-medium inline-flex items-center"
            >
              <ArrowLeft className="w-4 h-4 mr-1" />
              Back to Login
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}