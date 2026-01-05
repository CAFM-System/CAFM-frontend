import { useEffect, useState } from "react";
import Footer from "../../components/resident/Footer";
import AuthService from "../../services/auth.service";

export default function UserProfileCard() {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchUserProfile();
  }, []);

  const fetchUserProfile = async () => {
    try {
      setLoading(true);
      setError(null);
      
      // Simulate API call with mock data
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const response = await AuthService.getuser();

      
      setUserData(response.data.user);
      
    } catch (err) {
      console.error("Error fetching profile:", err);
      setError(err.response?.data?.message || "Failed to load profile");
    } finally {
      setLoading(false);
    }
  };

  // Get first letter for avatar
  const getInitial = (name) => {
    return name ? name.charAt(0).toUpperCase() : 'U';
  };

  // Format date
  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
  };

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-linear-to-br from-gray-50 to-gray-100 p-4 md:p-8 flex flex-col">
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <div className="w-16 h-16 border-4 border-[#1687A7] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-gray-600">Loading profile...</p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="min-h-screen bg-linear-to-br from-gray-50 to-gray-100 p-4 md:p-8 flex flex-col">
        <div className="flex-1 flex items-center justify-center">
          <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md text-center">
            <div className="text-red-500 text-5xl mb-4">⚠️</div>
            <h2 className="text-xl font-semibold text-gray-800 mb-2">Error Loading Profile</h2>
            <p className="text-gray-600 mb-4">{error}</p>
            <button
              onClick={fetchUserProfile}
              className="px-6 py-2 bg-[#1687A7] text-white rounded-lg hover:bg-[#126b8a] transition-colors"
            >
              Try Again
            </button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-gray-50 to-gray-100 p-4 md:p-8 flex flex-col">
      <div className="flex-1 p-4 md:p-8 flex items-center justify-center">
        <div className="w-full max-w-4xl bg-white rounded-2xl shadow-xl p-6 md:p-8">
          {/* Header Section */}
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 mb-8">
            {/* Avatar */}
            <div className="relative">
              <div className="w-24 h-24 bg-linear-to-br from-[#1687A7] to-[#126b8a] rounded-full flex items-center justify-center text-white text-3xl font-semibold shadow-[0_10px_40px_rgba(22,135,167,0.5)] ring-[6px] ring-white">
                {getInitial(userData.profile.firstName)}
              </div>
            </div>
            
            {/* User Info */}
            <div className="flex-1 text-center sm:text-left">
              <h1 className="text-2xl md:text-3xl font-semibold text-gray-800 mb-1">
                {`${userData.profile.firstName} ${userData.profile.lastName}` || 'N/A'}
              </h1>
              <p className="text-gray-600 mb-2">{userData?.email || 'N/A'}</p>
              <div className="flex items-center justify-center sm:justify-start gap-2 text-gray-600">
                <svg 
                  className="w-4 h-4" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" 
                  />
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" 
                  />
                </svg>
                <span className="text-sm">{userData.profile.apartmentNo || 'N/A'}</span>
              </div>
            </div>
          </div>

          {/* Cards Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Account Information Card */}
            <div className="border border-gray-200 rounded-xl p-6 hover:shadow-md transition-shadow">
              <h2 className="text-lg font-semibold text-transparent bg-clip-text bg-linear-to-r from-[#1687A7] to-[#126b8a] mb-6">
                Account Information
              </h2>
              
              <div className="space-y-4">
                <div>
                  <p className="text-base text-gray-500 mb-1">Role</p>
                  <p className="text-lg font-medium text-gray-800">
                    {userData?.role || 'N/A'}
                  </p>
                </div>
                
                <div>
                  <p className="text-base text-gray-500 mb-1">Member Since</p>
                  <p className="text-lg font-medium text-gray-800">
                    {formatDate(userData?.profile?.dateOfEntry)}
                  </p>
                </div>
                
                <div>
                  <p className="text-base text-gray-500 mb-1">Status</p>
                  <div className="flex items-center gap-2">
                    <span className={`w-2 h-2 rounded-full ${
                      userData?.status === 'Active' ? 'bg-green-500' : 'bg-gray-400'
                    }`}></span>
                    <p className="text-lg font-medium text-gray-800">
                      {userData?.status || 'N/A'}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Activity Summary Card */}
            <div className="border border-gray-200 rounded-xl p-6 hover:shadow-md transition-shadow">
              <h2 className="text-lg font-semibold text-transparent bg-clip-text bg-linear-to-r from-[#1687A7] to-[#126b8a] mb-6">
                Activity Summary
              </h2>
              
              <div className="space-y-4">
                <div>
                  <p className="text-base text-gray-500 mb-1">Total Tickets</p>
                  <p className="text-3xl font-semibold text-gray-800">
                    {userData?.activitySummary?.totalTickets || 0}
                  </p>
                </div>
                
                <div>
                  <p className="text-base text-gray-500 mb-1">Active Tickets</p>
                  <p className="text-3xl font-semibold text-gray-800">
                    {userData?.activitySummary?.activeTickets || 0}
                  </p>
                </div>
                
                <div>
                  <p className="text-base text-gray-500 mb-1">Resolved Tickets</p>
                  <p className="text-3xl font-semibold text-gray-800">
                    {userData?.activitySummary?.resolvedTickets || 0}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}