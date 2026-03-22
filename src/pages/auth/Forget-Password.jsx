import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Mail, ArrowLeft, Key, CheckCircle2 } from 'lucide-react';
import toast from 'react-hot-toast';

export default function ForgotPasswordPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/auth/forgot-password`, {
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
        toast.error(data.message || 'Failed to send reset email');
      }
    } catch (error) {
      console.error('Error:', error);
      toast.error('An error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleBackToLogin = () => {
    navigate('/login');
  };

  // Helper for the visual background effects (Purely decorative)
  const BackgroundEffects = () => (
    <>
      <div className="absolute inset-0 bg-secondary"></div>
      <div
        className="absolute inset-0 bg-cover bg-center opacity-20 mix-blend-overlay"
        style={{ backgroundImage: "url('https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070')" }}
      ></div>
      {/* The "Bright Mix" Glows */}
      <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-accent/20 rounded-full blur-[100px] pointer-events-none"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-96 h-96 bg-accent/10 rounded-full blur-[100px] pointer-events-none"></div>
    </>
  );

  if (isSubmitted) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden">
        <BackgroundEffects />

        <div className="relative z-10 w-full max-w-md">
          <div className="bg-secondary/60 backdrop-blur-xl rounded-3xl shadow-2xl p-8 border border-primary/10 ring-1 ring-white/5">
            <div className="text-center mb-6">
              <div className="mx-auto w-20 h-20 bg-accent/10 rounded-full flex items-center justify-center mb-6 ring-1 ring-accent/30 shadow-[0_0_15px_-3px_var(--color-accent)]">
                <CheckCircle2 className="w-10 h-10 text-accent" />
              </div>
              <h2 className="text-3xl font-bold text-primary mb-3 tracking-tight">Check Your Email</h2>
              <p className="text-primary/70 text-sm">
                We've sent a password reset link to
              </p>
              <div className="mt-4 inline-block px-4 py-2 bg-accent/5 rounded-lg border border-accent/20">
                <p className="text-accent font-semibold tracking-wide">
                  {email}
                </p>
              </div>
            </div>

            <div className="bg-primary/5 border-l-4 border-accent rounded-r-lg p-4 mb-8">
              <p className="text-sm text-primary/80 leading-relaxed">
                Didn't receive the email? Check your spam folder or try again with a different email address.
              </p>
            </div>

            <button
              onClick={handleBackToLogin}
              className="w-full bg-accent hover:bg-accent/90 text-secondary font-bold py-3.5 rounded-xl shadow-[0_0_20px_-5px_var(--color-accent)] hover:shadow-[0_0_25px_-5px_var(--color-accent)] transition-all duration-300 transform hover:-translate-y-0.5"
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
      <BackgroundEffects />

      <div className="relative z-10 w-full max-w-md">
        <div className="bg-secondary/60 backdrop-blur-xl rounded-3xl shadow-2xl p-8 border border-primary/10 ring-1 ring-white/5">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="mx-auto w-20 h-20 bg-accent/10 rounded-full flex items-center justify-center mb-6 ring-1 ring-accent/30 shadow-[0_0_15px_-3px_var(--color-accent)]">
              <Key className="w-10 h-10 text-accent" />
            </div>
            <h2 className="text-3xl font-bold text-primary mb-3 tracking-tight">Forgot Password?</h2>
            <p className="text-primary/70 text-sm max-w-xs mx-auto">
              No worries! Enter your email and we'll send you reset instructions.
            </p>
          </div>

          {/* Form */}
          <div>
            <div className="mb-6 group">
              <label className="block text-primary/90 text-sm font-semibold mb-2 ml-1 flex items-center gap-2">
                <Mail className="w-4 h-4 text-accent" />
                Email Address
              </label>
              <div className="relative">
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
                  className="w-full px-5 py-4 bg-secondary/80 border-2 border-primary/10 rounded-xl text-primary placeholder-primary/30 focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent/50 transition-all duration-300 shadow-inner"
                />
              </div>
            </div>

            <button
              onClick={handleSubmit}
              disabled={isLoading || !email}
              className="w-full bg-accent hover:bg-accent/90 text-secondary font-bold py-3.5 rounded-xl shadow-[0_0_20px_-5px_var(--color-accent)] hover:shadow-[0_0_25px_-5px_var(--color-accent)] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center transform hover:-translate-y-0.5 active:translate-y-0 disabled:transform-none disabled:shadow-none"
            >
              {isLoading ? (
                <>
                  <div className="w-5 h-5 border-2 border-secondary/30 border-t-secondary rounded-full animate-spin mr-2" />
                  Sending...
                </>
              ) : (
                'Send Reset Link'
              )}
            </button>
          </div>

          {/* Back to Login */}
          <div className="mt-8 text-center">
            <button
              onClick={handleBackToLogin}
              className="text-sm text-primary/60 hover:text-accent transition-colors duration-300 font-medium inline-flex items-center group"
            >
              <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
              Back to Login
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}