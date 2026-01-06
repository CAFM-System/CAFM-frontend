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
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100 p-4 md:p-8 flex flex-col">
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <div className="w-16 h-16 border-4 border-[#1687A7] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-gray-600 font-medium">Loading profile...</p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100 p-4 md:p-8 flex flex-col">
        <div className="flex-1 flex items-center justify-center">
          <div className="bg-white rounded-3xl shadow-2xl p-8 max-w-md text-center border border-red-100">
            <div className="text-red-500 text-6xl mb-4">⚠️</div>
            <h2 className="text-2xl font-bold text-gray-800 mb-3">Error Loading Profile</h2>
            <p className="text-gray-600 mb-6">{error}</p>
            <button
              onClick={fetchUserProfile}
              className="px-8 py-3 bg-gradient-to-r from-[#1687A7] to-[#126b8a] text-white rounded-xl hover:shadow-lg transform hover:scale-105 transition-all duration-200 font-medium"
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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100 p-4 md:p-8 flex flex-col">
      <div className="flex-1 p-4 md:p-5 flex items-center justify-center">
        <div className="w-full max-w-lg">
          {/* Main Profile Card */}
          <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-100">
            {/* Header Background with Gradient */}
            <div className="h-20 bg-gradient-to-r from-[#1687A7] via-[#1a9aba] to-[#126b8a] relative">
              <div className="absolute inset-0 bg-black opacity-5"></div>
              <div className="absolute inset-0 bg-gradient-to-b from-transparent to-white opacity-20"></div>
            </div>

            {/* Profile Content */}
            <div className="px-5 md:px-7 pb-7">
              {/* Avatar Section - Centered */}
              <div className="flex flex-col items-center -mt-10 mb-4">
                <div className="relative">
                  <div className="w-20 h-20 bg-gradient-to-br from-[#1687A7] to-[#126b8a] rounded-full flex items-center justify-center text-white text-2xl font-bold shadow-2xl ring-6 ring-white">
                    {getInitial(userData.profile.firstName)}
                  </div>
                </div>
              </div>
              
              {/* User Info - Centered */}
              <div className="text-center mb-5">
                <h1 className="text-xl md:text-2xl font-bold text-gray-800 mb-1.5">
                  {`${userData.profile.firstName} ${userData.profile.lastName}` || 'N/A'}
                </h1>
                <p className="text-gray-600 text-base mb-2.5">{userData?.email || 'N/A'}</p>
                <div className="inline-flex items-center gap-2 text-gray-600 bg-gray-50 px-3 py-1.5 rounded-full">
                  <svg 
                    className="w-4 h-4 text-[#1687A7]" 
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
                  <span className="text-sm font-medium">Apartment {userData.profile.apartmentNo || 'N/A'}</span>
                </div>
              </div>

              {/* Resident Details Card - Centered */}
              <div className="max-w-md mx-auto">
                <div className="bg-gradient-to-br from-gray-50 to-white border-2 border-gray-100 rounded-2xl p-5 shadow-lg">
                  <div className="space-y-3.5">
                    <div className="flex items-center justify-between p-3.5 bg-white rounded-xl border border-gray-100 hover:shadow-md transition-shadow">
                      <div>
                        <p className="text-sm text-gray-500 mb-1 font-medium">Role</p>
                        <p className="text-lg font-semibold text-gray-800">
                          {userData?.role || 'N/A'}
                        </p>
                      </div>
                      <div className="w-10 h-10 bg-blue-50 rounded-full flex items-center justify-center">
                        <svg className="w-5 h-5 text-[#1687A7]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between p-3.5 bg-white rounded-xl border border-gray-100 hover:shadow-md transition-shadow">
                      <div>
                        <p className="text-sm text-gray-500 mb-1 font-medium">Member Since</p>
                        <p className="text-lg font-semibold text-gray-800">
                          {formatDate(userData?.profile?.dateOfEntry)}
                        </p>
                      </div>
                      <div className="w-10 h-10 bg-green-50 rounded-full flex items-center justify-center">
                        <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between p-3.5 bg-white rounded-xl border border-gray-100 hover:shadow-md transition-shadow">
                      <div>
                        <p className="text-sm text-gray-500 mb-1 font-medium">Status</p>
                        <div className="flex items-center gap-3">
                          <span className={`w-3 h-3 rounded-full ${
                            userData?.status === 'Active' ? 'bg-green-500 shadow-lg shadow-green-200' : 'bg-gray-400'
                          }`}></span>
                          <p className="text-lg font-semibold text-gray-800">
                            {userData?.status || 'N/A'}
                          </p>
                        </div>
                      </div>
                      <div className="w-10 h-10 bg-purple-50 rounded-full flex items-center justify-center">
                        <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                    </div>
                  </div>
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