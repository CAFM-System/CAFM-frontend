import { useState } from 'react';
import { 
  Home, 
  Bell, 
  User as UserIcon, 
  LogOut,
  ArrowRight,
  Wrench,
  Clock,
  Star,
  CheckCircle,
  Shield,
  Zap,
  TrendingUp,
  Mail,
  Phone,
  MapPin,
  Award,
  Target,
  Quote
} from 'lucide-react';

export default function ResidentLandingPage() {
  const [activeNav, setActiveNav] = useState('home');
  
  // Mock handlers
  const handleNavigateToDashboard = () => alert('Navigate to Dashboard');
  const handleNavigateToProfile = () => alert('Navigate to Profile');
  const handleNavigateToNotifications = () => alert('Navigate to Notifications');
  const handleLogout = () => alert('Logout');

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

// Mock User Data
const mockUser = {
  name: "John Doe",
  email: "john.doe@example.com"
};

// Mock open tickets count
const mockOpenTicketsCount = 3;

// Button Component
const Button = ({ children, onClick, variant = "default", className = "" }) => {
  const baseStyles = "px-6 py-3 rounded-xl font-medium transition-all";
  const variants = {
    default: "bg-[#1687A7] hover:bg-[#1687A7]/90 text-white",
    outline: "border-2 border-[#D3E0EA] text-[#1687A7] hover:bg-[#D3E0EA] bg-white"
  };
  
  return (
    <button 
      onClick={onClick} 
      className={`${baseStyles} ${variants[variant]} ${className}`}
    >
      {children}
    </button>
  );
};

// Simple Carousel Component
const Carousel = ({ children, autoplay = false, autoplaySpeed = 3000, slidesToShow = 1 }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const childrenArray = Array.isArray(children) ? children : [children];
  
  useState(() => {
    if (autoplay) {
      const interval = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % childrenArray.length);
      }, autoplaySpeed);
      return () => clearInterval(interval);
    }
  }, [autoplay, autoplaySpeed, childrenArray.length]);

  return (
    <div className="relative overflow-hidden">
      <div className="flex gap-4">
        {childrenArray.slice(currentIndex, currentIndex + slidesToShow).map((child, idx) => (
          <div key={idx} className="flex-1">
            {child}
          </div>
        ))}
      </div>
      <div className="flex justify-center gap-2 mt-6">
        {childrenArray.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentIndex(idx)}
            className={`w-2 h-2 rounded-full transition-all ${
              idx === currentIndex ? 'bg-white w-8' : 'bg-white/50'
            }`}
          />
        ))}
      </div>
    </div>
  );
};

// Fade Carousel Component
const FadeCarousel = ({ children, autoplay = false, autoplaySpeed = 3000 }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const childrenArray = Array.isArray(children) ? children : [children];
  
  useState(() => {
    if (autoplay) {
      const interval = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % childrenArray.length);
      }, autoplaySpeed);
      return () => clearInterval(interval);
    }
  }, [autoplay, autoplaySpeed, childrenArray.length]);

  return (
    <div className="relative">
      {childrenArray.map((child, idx) => (
        <div
          key={idx}
          className={`transition-opacity duration-1000 ${
            idx === currentIndex ? 'opacity-100' : 'opacity-0 absolute inset-0'
          }`}
        >
          {child}
        </div>
      ))}
      <div className="flex justify-center gap-2 mt-6">
        {childrenArray.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentIndex(idx)}
            className={`w-2 h-2 rounded-full transition-all ${
              idx === currentIndex ? 'bg-white w-8' : 'bg-white/50'
            }`}
          />
        ))}
      </div>
    </div>
  );
};

  // Stats data for carousel
  const statsSlides = [
    {
      icon: <CheckCircle className="h-16 w-16" />,
      stat: "98%",
      label: "Customer Satisfaction",
      description: "Our residents love the seamless experience",
      gradient: "from-emerald-500 to-green-500"
    },
    {
      icon: <Clock className="h-16 w-16" />,
      stat: "< 2 hrs",
      label: "Average Response Time",
      description: "Lightning-fast support when you need it",
      gradient: "from-blue-500 to-cyan-500"
    },
    {
      icon: <Star className="h-16 w-16" />,
      stat: "4.9/5",
      label: "Service Rating",
      description: "Consistently high-quality maintenance",
      gradient: "from-amber-500 to-orange-500"
    },
    {
      icon: <Award className="h-16 w-16" />,
      stat: "1000+",
      label: "Tickets Resolved",
      description: "Successfully completed this month",
      gradient: "from-purple-500 to-violet-500"
    }
  ];

  // Testimonials data
  const testimonials = [
    {
      name: "Sarah Johnson",
      apartment: "Apt 302",
      rating: 5,
      text: "The response time is incredible! My plumbing issue was resolved within hours. Highly recommend this service.",
      avatar: "SJ"
    },
    {
      name: "Michael Chen",
      apartment: "Apt 145",
      rating: 5,
      text: "Finally, a maintenance system that actually works. Love the real-time updates and professional technicians.",
      avatar: "MC"
    },
    {
      name: "Emily Rodriguez",
      apartment: "Apt 201",
      rating: 5,
      text: "Transparent, efficient, and hassle-free. The best apartment management system I've experienced.",
      avatar: "ER"
    },
    {
      name: "David Park",
      apartment: "Apt 428",
      rating: 5,
      text: "The technicians are always professional and the app makes it so easy to track my requests. Five stars!",
      avatar: "DP"
    },
    {
      name: "Lisa Thompson",
      apartment: "Apt 515",
      rating: 5,
      text: "Quick, reliable, and convenient. I can submit requests anytime and get updates instantly.",
      avatar: "LT"
    }
  ];

  return (
    <div className="min-h-screen bg-[#F6F5F5]">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white border-b-2 border-[#D3E0EA] shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            {/* Brand */}
            <div className="flex items-center gap-3">
              <div className="bg-[#1687A7] p-3 rounded-xl">
                <Home className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl text-[#1687A7]">CAFM Portal</h1>
                <p className="text-xs text-[#1687A7]/60">Facilities Management</p>
              </div>
            </div>

            {/* Navigation */}
            <nav className="hidden md:flex items-center gap-1">
              <button
                onClick={() => {
                  setActiveNav('home');
                  scrollToSection('hero');
                }}
                className={`px-6 py-2.5 rounded-lg transition-all ${
                  activeNav === 'home' 
                    ? 'bg-[#1687A7] text-white' 
                    : 'text-[#1687A7] hover:bg-[#D3E0EA]'
                }`}
              >
                Home
              </button>
              <button
                onClick={() => {
                  setActiveNav('features');
                  scrollToSection('features');
                }}
                className={`px-6 py-2.5 rounded-lg transition-all ${
                  activeNav === 'features' 
                    ? 'bg-[#1687A7] text-white' 
                    : 'text-[#1687A7] hover:bg-[#D3E0EA]'
                }`}
              >
                Features
              </button>
              <button
                onClick={() => {
                  setActiveNav('about');
                  scrollToSection('about');
                }}
                className={`px-6 py-2.5 rounded-lg transition-all ${
                  activeNav === 'about' 
                    ? 'bg-[#1687A7] text-white' 
                    : 'text-[#1687A7] hover:bg-[#D3E0EA]'
                }`}
              >
                About
              </button>
            </nav>

            {/* User Menu */}
            <div className="flex items-center gap-3">
              <button
                onClick={handleNavigateToNotifications}
                className="relative p-2.5 bg-[#D3E0EA] hover:bg-[#1687A7] text-[#1687A7] hover:text-white rounded-lg transition-all"
              >
                <Bell className="h-5 w-5" />
                {mockOpenTicketsCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {mockOpenTicketsCount}
                  </span>
                )}
              </button>
              <button
                onClick={handleNavigateToProfile}
                className="p-2.5 bg-[#D3E0EA] hover:bg-[#1687A7] text-[#1687A7] hover:text-white rounded-lg transition-all"
              >
                <UserIcon className="h-5 w-5" />
              </button>
              <button
                onClick={handleLogout}
                className="p-2.5 bg-[#D3E0EA] hover:bg-red-500 text-[#1687A7] hover:text-white rounded-lg transition-all"
              >
                <LogOut className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section id="hero" className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#D3E0EA] rounded-full mb-6">
                <div className="w-2 h-2 bg-[#1687A7] rounded-full animate-pulse"></div>
                <span className="text-sm text-[#1687A7]">Welcome, {mockUser.name.split(' ')[0]}!</span>
              </div>
              
              <h1 className="text-5xl lg:text-6xl text-[#1687A7] mb-6 leading-tight">
                Your Apartment<br />
                Management<br />
                <span className="text-[#D3E0EA]">Made Simple</span>
              </h1>
              
              <p className="text-xl text-gray-700 mb-8 leading-relaxed">
                Submit requests, track maintenance, and communicate with our team—all from one powerful platform.
              </p>

              <div className="flex flex-wrap gap-4 mb-12">
                <Button
                  onClick={handleNavigateToDashboard}
                  className="px-8 py-6 group"
                >
                  <span className="flex items-center gap-2">
                    Open Dashboard
                    <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  </span>
                </Button>
                <Button
                  onClick={() => scrollToSection('features')}
                  variant="outline"
                  className="px-8 py-6"
                >
                  Learn More
                </Button>
              </div>

              {/* Quick Stats */}
              <div className="grid grid-cols-3 gap-4">
                <div className="bg-gradient-to-br from-cyan-50 to-blue-50 p-4 rounded-xl border-2 border-cyan-200 shadow-lg hover:shadow-xl transition-all">
                  <div className="text-3xl bg-gradient-to-br from-cyan-600 to-blue-600 bg-clip-text text-transparent mb-1">24/7</div>
                  <div className="text-sm text-cyan-700">Support</div>
                </div>
                <div className="bg-gradient-to-br from-emerald-50 to-green-50 p-4 rounded-xl border-2 border-emerald-200 shadow-lg hover:shadow-xl transition-all">
                  <div className="text-3xl bg-gradient-to-br from-emerald-600 to-green-600 bg-clip-text text-transparent mb-1">{"<"}2h</div>
                  <div className="text-sm text-emerald-700">Response</div>
                </div>
                <div className="bg-gradient-to-br from-purple-50 to-violet-50 p-4 rounded-xl border-2 border-purple-200 shadow-lg hover:shadow-xl transition-all">
                  <div className="text-3xl bg-gradient-to-br from-purple-600 to-violet-600 bg-clip-text text-transparent mb-1">98%</div>
                  <div className="text-sm text-purple-700">Satisfaction</div>
                </div>
              </div>
            </div>

            {/* Right Content - Preview Card */}
            <div className="relative">
              <div className="bg-white border-2 border-[#D3E0EA] rounded-3xl p-8 shadow-xl">
                <div className="bg-gradient-to-br from-[#1687A7] via-[#1687A7] to-[#126b8a] rounded-2xl p-6 text-white mb-6 shadow-lg">
                  <div className="flex items-center justify-between mb-4">
                    <h3>Active Requests</h3>
                    <span className="text-4xl">{mockOpenTicketsCount}</span>
                  </div>
                  <div className="h-2 bg-white/30 rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-white to-white/80 rounded-full w-2/3"></div>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="bg-gradient-to-br from-emerald-50 to-green-50 p-4 rounded-xl border-2 border-emerald-200 shadow-lg hover:shadow-xl transition-all">
                    <div className="bg-gradient-to-br from-emerald-500 to-green-500 p-2 rounded-lg inline-flex shadow-md mb-2">
                      <CheckCircle className="h-5 w-5 text-white" />
                    </div>
                    <p className="text-sm text-emerald-700 mb-1">Resolved</p>
                    <p className="text-2xl bg-gradient-to-br from-emerald-600 to-green-600 bg-clip-text text-transparent">28</p>
                  </div>
                  <div className="bg-gradient-to-br from-amber-50 to-yellow-50 p-4 rounded-xl border-2 border-amber-200 shadow-lg hover:shadow-xl transition-all">
                    <div className="bg-gradient-to-br from-amber-500 to-yellow-500 p-2 rounded-lg inline-flex shadow-md mb-2">
                      <Star className="h-5 w-5 text-white" />
                    </div>
                    <p className="text-sm text-amber-700 mb-1">Rating</p>
                    <p className="text-2xl bg-gradient-to-br from-amber-600 to-yellow-600 bg-clip-text text-transparent">4.9</p>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-indigo-50 to-blue-50 p-4 rounded-xl border-2 border-indigo-200 shadow-lg">
                  <div className="flex items-center gap-3">
                    <div className="bg-gradient-to-br from-indigo-500 to-blue-600 p-2 rounded-lg shadow-md">
                      <Clock className="h-5 w-5 text-white" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm text-indigo-700 mb-1">Latest Update</p>
                      <p className="text-xs text-indigo-600/70">Plumbing request in progress</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Carousel Section */}
      <section className="py-16 bg-gradient-to-br from-[#19A7CE] to-[#1687A7] relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-96 h-96 bg-white rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl"></div>
        </div>
        
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <FadeCarousel autoplay={true} autoplaySpeed={4000}>
            {statsSlides.map((slide, index) => (
              <div key={index} className="text-center px-8 py-12">
                <div className={`inline-flex bg-gradient-to-br ${slide.gradient} p-6 rounded-3xl mb-8 text-white shadow-2xl`}>
                  {slide.icon}
                </div>
                <div className="text-7xl text-white mb-4">{slide.stat}</div>
                <h3 className="text-3xl text-white mb-3">{slide.label}</h3>
                <p className="text-xl text-white/90 max-w-2xl mx-auto">{slide.description}</p>
              </div>
            ))}
          </FadeCarousel>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-4 sm:px-6 lg:px-8 bg-[#F6F5F5]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl text-[#1687A7] mb-4">
              Everything You Need
            </h2>
            <p className="text-xl text-gray-700 max-w-2xl mx-auto">
              Comprehensive tools to manage your apartment maintenance efficiently
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="bg-white border-2 border-[#D3E0EA] rounded-2xl p-8 hover:shadow-xl transition-all">
              <div className="bg-gradient-to-br from-cyan-500 to-blue-500 p-4 rounded-xl inline-flex mb-6 shadow-lg">
                <Wrench className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl text-gray-900 mb-3">Instant Reporting</h3>
              <p className="text-gray-700">
                Submit maintenance requests with photos and descriptions in seconds
              </p>
            </div>

            {/* Feature 2 */}
            <div className="bg-white border-2 border-[#D3E0EA] rounded-2xl p-8 hover:shadow-xl transition-all">
              <div className="bg-gradient-to-br from-emerald-500 to-green-500 p-4 rounded-xl inline-flex mb-6 shadow-lg">
                <TrendingUp className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl text-gray-900 mb-3">Real-Time Tracking</h3>
              <p className="text-gray-700">
                Monitor status updates and get live notifications on your requests
              </p>
            </div>

            {/* Feature 3 */}
            <div className="bg-white border-2 border-[#D3E0EA] rounded-2xl p-8 hover:shadow-xl transition-all">
              <div className="bg-gradient-to-br from-purple-500 to-violet-500 p-4 rounded-xl inline-flex mb-6 shadow-lg">
                <Shield className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl text-gray-900 mb-3">Quality Service</h3>
              <p className="text-gray-700">
                Rate completed work and ensure consistent high-quality maintenance
              </p>
            </div>

            {/* Feature 4 */}
            <div className="bg-white border-2 border-[#D3E0EA] rounded-2xl p-8 hover:shadow-xl transition-all">
              <div className="bg-gradient-to-br from-orange-500 to-amber-500 p-4 rounded-xl inline-flex mb-6 shadow-lg">
                <Zap className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl text-gray-900 mb-3">Fast Response</h3>
              <p className="text-gray-700">
                Average response time under 2 hours for all maintenance requests
              </p>
            </div>

            {/* Feature 5 */}
            <div className="bg-white border-2 border-[#D3E0EA] rounded-2xl p-8 hover:shadow-xl transition-all">
              <div className="bg-gradient-to-br from-indigo-500 to-blue-600 p-4 rounded-xl inline-flex mb-6 shadow-lg">
                <Award className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl text-gray-900 mb-3">Expert Technicians</h3>
              <p className="text-gray-700">
                Certified professionals handle all your maintenance needs
              </p>
            </div>

            {/* Feature 6 */}
            <div className="bg-white border-2 border-[#D3E0EA] rounded-2xl p-8 hover:shadow-xl transition-all">
              <div className="bg-gradient-to-br from-rose-500 to-pink-500 p-4 rounded-xl inline-flex mb-6 shadow-lg">
                <Target className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl text-gray-900 mb-3">Priority System</h3>
              <p className="text-gray-700">
                Urgent issues get immediate attention with smart prioritization
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl lg:text-5xl text-[#1687A7] mb-6">
                Built for Modern Living
              </h2>
              <p className="text-lg text-gray-700 mb-6">
                Our CAFM system streamlines communication between residents, technicians, and management to deliver exceptional service.
              </p>
              <div className="space-y-4 mb-8">
                <div className="flex items-start gap-3">
                  <div className="bg-gradient-to-br from-cyan-500 to-blue-500 p-2 rounded-lg shadow-lg mt-1">
                    <CheckCircle className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h4 className="text-gray-900 mb-1">Transparent Process</h4>
                    <p className="text-gray-600">Track every step from submission to completion</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="bg-gradient-to-br from-emerald-500 to-green-500 p-2 rounded-lg shadow-lg mt-1">
                    <CheckCircle className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h4 className="text-gray-900 mb-1">Direct Communication</h4>
                    <p className="text-gray-600">Message technicians and management directly</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="bg-gradient-to-br from-purple-500 to-violet-500 p-2 rounded-lg shadow-lg mt-1">
                    <CheckCircle className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h4 className="text-gray-900 mb-1">Proven Results</h4>
                    <p className="text-gray-600">98% satisfaction rate from our residents</p>
                  </div>
                </div>
              </div>
              <Button
                onClick={handleNavigateToDashboard}
                className="px-8 py-6 group"
              >
                <span className="flex items-center gap-2">
                  Get Started Now
                  <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </span>
              </Button>
            </div>
            <div className="bg-gradient-to-br from-[#1687A7] via-[#1687A7] to-[#126b8a] rounded-3xl p-12 text-white shadow-2xl">
              <h3 className="text-3xl mb-6">Ready to Experience Better Maintenance?</h3>
              <p className="text-white/90 mb-8">
                Join hundreds of satisfied residents who trust our platform for all their apartment maintenance needs.
              </p>
              <div className="grid grid-cols-2 gap-6">
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
                  <div className="text-4xl mb-2">500+</div>
                  <div className="text-white/80">Active Users</div>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
                  <div className="text-4xl mb-2">5,000+</div>
                  <div className="text-white/80">Tickets Resolved</div>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
                  <div className="text-4xl mb-2">24/7</div>
                  <div className="text-white/80">Support Available</div>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
                  <div className="text-4xl mb-2">98%</div>
                  <div className="text-white/80">Satisfaction Rate</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Carousel Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-[#F6F5F5]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-[#19A7CE] to-[#1687A7] rounded-2xl mb-6">
              <Quote className="h-8 w-8 text-white" />
            </div>
            <h2 className="text-4xl lg:text-5xl text-[#1687A7] mb-4">
              What Our Residents Say
            </h2>
            <p className="text-xl text-gray-700 max-w-2xl mx-auto">
              Real experiences from real residents who trust our service
            </p>
          </div>

                    <Carousel autoplay={true} autoplaySpeed={5000} slidesToShow={1}>
                      {testimonials.map((testimonial, index) => (
                        <div key={index} className="h-full">
                          <div className="bg-white border-2 border-[#D3E0EA] rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all mx-2 h-full min-h-[280px]">
                            <div className="flex items-center gap-4 mb-6">
                              <div className="w-12 h-12 bg-gradient-to-br from-[#1687A7] to-[#126b8a] rounded-full flex items-center justify-center text-white font-bold shadow-lg">
                                {testimonial.avatar}
                              </div>
                              <div>
                                <h4 className="text-gray-900 font-semibold">{testimonial.name}</h4>
                                <p className="text-sm text-gray-600">{testimonial.apartment}</p>
                              </div>
                            </div>
                            <div className="flex gap-1 mb-4">
                              {[...Array(testimonial.rating)].map((_, i) => (
                                <Star key={i} className="h-5 w-5 fill-amber-400 text-amber-400" />
                              ))}
                            </div>
                            <p className="text-gray-700 italic">"{testimonial.text}"</p>
                          </div>
                        </div>
                      ))}
                    </Carousel>
                  </div>
                </section>
          
                {/* Contact Section */}
                <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
                  <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-16">
                      <h2 className="text-4xl lg:text-5xl text-[#1687A7] mb-4">
                        Get In Touch
                      </h2>
                      <p className="text-xl text-gray-700 max-w-2xl mx-auto">
                        Have questions? We're here to help!
                      </p>
                    </div>
          
                    <div className="grid md:grid-cols-3 gap-8 mb-12">
                      <div className="bg-[#F6F5F5] rounded-2xl p-8 text-center hover:shadow-lg transition-all">
                        <div className="bg-gradient-to-br from-cyan-500 to-blue-500 p-4 rounded-xl inline-flex mb-4 shadow-lg">
                          <Mail className="h-8 w-8 text-white" />
                        </div>
                        <h3 className="text-xl text-gray-900 mb-2">Email</h3>
                        <p className="text-gray-700">support@cafmportal.com</p>
                      </div>
                      <div className="bg-[#F6F5F5] rounded-2xl p-8 text-center hover:shadow-lg transition-all">
                        <div className="bg-gradient-to-br from-emerald-500 to-green-500 p-4 rounded-xl inline-flex mb-4 shadow-lg">
                          <Phone className="h-8 w-8 text-white" />
                        </div>
                        <h3 className="text-xl text-gray-900 mb-2">Phone</h3>
                        <p className="text-gray-700">+1 (555) 123-4567</p>
                      </div>
                      <div className="bg-[#F6F5F5] rounded-2xl p-8 text-center hover:shadow-lg transition-all">
                        <div className="bg-gradient-to-br from-purple-500 to-violet-500 p-4 rounded-xl inline-flex mb-4 shadow-lg">
                          <MapPin className="h-8 w-8 text-white" />
                        </div>
                        <h3 className="text-xl text-gray-900 mb-2">Address</h3>
                        <p className="text-gray-700">123 Management Ave, City, State</p>
                      </div>
                    </div>
                  </div>
                </section>
          
                {/* Footer */}
                <footer className="bg-[#1687A7] text-white py-12 px-4 sm:px-6 lg:px-8">
                  <div className="max-w-7xl mx-auto">
                    <div className="grid md:grid-cols-4 gap-8 mb-8">
                      <div>
                        <h4 className="text-lg font-semibold mb-4">CAFM Portal</h4>
                        <p className="text-white/80">Making apartment management simple and efficient.</p>
                      </div>
                      <div>
                        <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
                        <ul className="space-y-2 text-white/80">
                          <li><button onClick={() => scrollToSection('hero')} className="hover:text-white transition-colors">Home</button></li>
                          <li><button onClick={() => scrollToSection('features')} className="hover:text-white transition-colors">Features</button></li>
                          <li><button onClick={() => scrollToSection('about')} className="hover:text-white transition-colors">About</button></li>
                        </ul>
                      </div>
                      <div>
                        <h4 className="text-lg font-semibold mb-4">Support</h4>
                        <ul className="space-y-2 text-white/80">
                          <li><a href="#" className="hover:text-white transition-colors">Help Center</a></li>
                          <li><a href="#" className="hover:text-white transition-colors">Contact Us</a></li>
                          <li><a href="#" className="hover:text-white transition-colors">FAQ</a></li>
                        </ul>
                      </div>
                      <div>
                        <h4 className="text-lg font-semibold mb-4">Legal</h4>
                        <ul className="space-y-2 text-white/80">
                          <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
                          <li><a href="#" className="hover:text-white transition-colors">Terms of Service</a></li>
                        </ul>
                      </div>
                    </div>
                    <div className="border-t border-white/20 pt-8">
                      <p className="text-center text-white/80">© 2024 CAFM Portal. All rights reserved.</p>
                    </div>
                  </div>
                </footer>
              </div>
            );
          }