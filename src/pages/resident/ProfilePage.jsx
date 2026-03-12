import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Footer from "../../components/resident/Footer";
import AuthService from "../../services/auth.service";
import ProfileCard from "../resident/ProfileCard";
import { useTheme } from "../../hooks/useTheme";

export default function UserProfileCard() {
  const navigate = useNavigate();
  const { isDarkMode, bg, cardBg, text, subText, inputBg, modalBg, buttonSecondary } = useTheme();
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [saveError, setSaveError] = useState(null);
  const [formData, setFormData] = useState(null);
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  useEffect(() => {
    fetchUserProfile();
  }, []);

  const fetchUserProfile = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await AuthService.getuser();
      setUserData(response.data.user);
      setFormData(buildFormData(response.data.user));

    } catch (err) {
      console.error("Error fetching profile:", err);
      setError(err.response?.data?.message || "Failed to load profile");
    } finally {
      setLoading(false);
    }
  };

  const getInitial = (name) => {
    return name ? name.charAt(0).toUpperCase() : "U";
  };

  const toInputDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    if (Number.isNaN(date.getTime())) return "";
    return date.toISOString().split("T")[0];
  };

  const buildFormData = (user) => ({
    firstName: user?.profile?.firstName || "",
    lastName: user?.profile?.lastName || "",
    dob: toInputDate(user?.profile?.dob),
    gender: user?.profile?.gender || "",
    maritalStatus: user?.profile?.maritalStatus || "",
    phone: user?.profile?.phone || "",
    apartmentNo: user?.profile?.apartmentNo || "",
    noOfResidents: user?.profile?.noOfResidents || "",
    email: user?.email || "",
    nic: user?.profile?.nic || "",
  });

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "long",
      year: "numeric",
    });
  };

  const handleEditClick = () => {
    setShowConfirmModal(true);
  };

  const handleCancelEdit = () => {
    setSaveError(null);
    setFormData(buildFormData(userData));
    setIsEditing(false);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSave = async () => {
    try {
      setIsSaving(true);
      setSaveError(null);

      const payload = {
        profile: {
          firstName: formData.firstName,
          lastName: formData.lastName,
          dob: formData.dob || null,
          gender: formData.gender,
          maritalStatus: formData.maritalStatus,
          phone: formData.phone,
          apartmentNo: formData.apartmentNo,
          noOfResidents: formData.noOfResidents,
        },
      };

      const response = await AuthService.updateProfile(payload);
      const updatedUser = response?.data?.user || response?.data || null;

      if (updatedUser) {
        setUserData((prev) => ({
          ...prev,
          ...updatedUser,
          profile: {
            ...(prev?.profile || {}),
            ...(updatedUser?.profile || {}),
          },
        }));
      } else {
        setUserData((prev) => ({
          ...prev,
          profile: {
            ...(prev?.profile || {}),
            ...payload.profile,
          },
        }));
      }

      setIsEditing(false);
    } catch (err) {
      console.error("Error updating profile:", err);
      setSaveError(err.response?.data?.message || "Failed to update profile");
    } finally {
      setIsSaving(false);
    }
  };

  /* =======================
      LOADING STATE
  ======================== */
  if (loading) {
    return (
      <div className={`min-h-screen flex items-center justify-center ${bg}`}>
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-accent border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className={`font-medium ${subText}`}>
            Loading profile...
          </p>
        </div>
      </div>
    );
  }

  /* =======================
      ERROR STATE
  ======================== */
  if (error) {
    return (
      <div className={`min-h-screen flex items-center justify-center ${bg}`}>
        <div className={`rounded-3xl shadow-xl p-8 text-center border ${modalBg}`}>
          <h2 className={`text-xl font-bold mb-2 ${text}`}>
            Error Loading Profile
          </h2>
          <p className={`mb-6 ${subText}`}>{error}</p>
          <button
            onClick={fetchUserProfile}
            className="px-6 py-2 bg-accent text-secondary rounded-xl hover:opacity-90"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  /* =======================
      MAIN UI
  ======================== */
  return (
    <div className={`min-h-screen p-4 md:p-8 flex flex-col ${bg}`}>

      {showConfirmModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className={`rounded-2xl shadow-xl w-[90%] max-w-md p-6 animate-fadeIn border ${modalBg}`}>

            <h2 className={`text-lg font-semibold mb-3 ${text}`}>
              Confirm Edit
            </h2>

            <p className={`text-sm mb-6 ${subText}`}>
              Do you want to edit your profile?
              <br />
              <span className="text-red-500">
                Email and NIC/Passport cannot be changed.
              </span>
            </p>

            <div className="flex justify-end gap-3">
              <button
                onClick={() => setShowConfirmModal(false)}
                className={`px-4 py-2 rounded-lg transition border ${buttonSecondary}`}
              >
                Cancel
              </button>

              <button
                onClick={() => {
                  setShowConfirmModal(false);
                  setSaveError(null);
                  setFormData(buildFormData(userData));
                  setIsEditing(true);
                }}
                className="px-4 py-2 rounded-lg bg-accent text-secondary hover:opacity-90 transition"
              >
                Yes, Edit
              </button>
            </div>
          </div>
        </div>
      )}


      <div className="flex-1 flex items-center justify-center">
        <div className="w-full max-w-lg">

          <div className={`rounded-3xl shadow-2xl overflow-hidden border mb-8 ${cardBg}`}>

            {/* HEADER */}
            <div className="h-20 bg-gradient-to-r from-accent to-accent/80" />


            {/* CONTENT */}
            <div className="px-6 pb-7">

              {/* AVATAR */}
              <div className={`w-20 h-20 rounded-full
  bg-gradient-to-br from-accent to-accent/80
  flex items-center justify-center
  text-primary text-2xl font-bold
  ring-4 ${isDarkMode ? "ring-secondary" : "ring-primary"}`}>
                {getInitial(userData?.profile?.firstName)}
              </div>


              {/* NAME */}
              <h1 className={`text-xl font-bold ${text}`}>
                {userData.profile.firstName} {userData.profile.lastName}
              </h1>

              <p className={subText}>
                {userData.email}
              </p>

              {/* Edit profile button */}

              <div className="mt-4 flex flex-wrap gap-3 mb-2">
                {!isEditing && (
                  <>
                    <button
                      onClick={handleEditClick}
                      className="px-4 py-2 bg-accent text-white rounded-lg
  hover:bg-accent/90 transition-colors text-sm font-medium"
                    >
                      Edit Profile
                    </button>

                    {/* Family Profile button */}

                  <button
                    onClick={() => navigate("/family-profile")}
                    className="px-4 py-2 bg-indigo-600 text-white rounded-lg
    hover:bg-indigo-700 transition-colors text-sm font-medium"
                  >
                    Family Profile
                  </button>
                  </>
                )}

                {isEditing && (
                  <>
                    <button
                      onClick={handleSave}
                      disabled={isSaving}
                      className="px-4 py-2 bg-emerald-600 text-white rounded-lg
  hover:bg-emerald-700 transition-colors text-sm font-medium disabled:opacity-60"
                    >
                      {isSaving ? "Saving..." : "Save Changes"}
                    </button>
                    <button
                      onClick={handleCancelEdit}
                      disabled={isSaving}
                      className={`px-4 py-2 rounded-lg transition-colors text-sm font-medium disabled:opacity-60 border ${buttonSecondary}`}
                    >
                      Cancel
                    </button>
                  </>
                )}
              </div>

              {saveError && (
                <p className="mt-3 text-sm text-red-600">{saveError}</p>
              )}


              {/* DETAILS */}
              <div className={`rounded-2xl p-5 space-y-3 border ${isDarkMode ? "bg-secondary/70 border-primary/10" : "bg-primary/70 border-secondary/10"}`}>

                {!isEditing && (
                  <>
                    <ProfileCard heading="Full Name"
                      data={`${userData.profile.firstName} ${userData.profile.lastName}`}
                      icon={<FullNameIcon />} />

                    <ProfileCard heading="Date of Birth"
                      data={formatDate(userData.profile.dob)}
                      icon={<DateOfBirthIcon />} />
                    <ProfileCard heading="NIC / Passport"
                      data={userData.profile.nic}
                      icon={<IdIcon />} />

                    <ProfileCard heading="Gender"
                      data={userData.profile.gender}
                      icon={<GenderIcon />} />

                    <ProfileCard heading="Marital Status"
                      data={userData.profile.maritalStatus}
                      icon={<HeartIcon />} />

                    <ProfileCard heading="Email"
                      data={userData.email}
                      icon={<MailIcon />} />

                    <ProfileCard heading="Phone"
                      data={userData.profile.phone}
                      icon={<PhoneIcon />} />

                    <ProfileCard heading="Apartment Number"
                      data={userData.profile.apartmentNo}
                      icon={<HomeIcon />} />

                    <ProfileCard heading="No. of Residents"
                      data={userData.profile.noOfResidents}
                      icon={<UsersIcon />} />
                  </>
                )}

                {isEditing && formData && (
                  <form className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <label className="space-y-1">
                        <span className={`text-sm ${subText}`}>First Name</span>
                        <input
                          type="text"
                          name="firstName"
                          value={formData.firstName}
                          onChange={handleChange}
                          className={`w-full rounded-lg border px-3 py-2 text-sm ${inputBg}`}
                        />
                      </label>
                      <label className="space-y-1">
                        <span className={`text-sm ${subText}`}>Last Name</span>
                        <input
                          type="text"
                          name="lastName"
                          value={formData.lastName}
                          onChange={handleChange}
                          className={`w-full rounded-lg border px-3 py-2 text-sm ${inputBg}`}
                        />
                      </label>
                      <label className="space-y-1">
                        <span className={`text-sm ${subText}`}>Date of Birth</span>
                        <input
                          type="date"
                          name="dob"
                          value={formData.dob}
                          onChange={handleChange}
                          className={`w-full rounded-lg border px-3 py-2 text-sm ${inputBg}`}
                        />
                      </label>
                      <label className="space-y-1">
                        <span className={`text-sm ${subText}`}>Gender</span>
                        <select
                          name="gender"
                          value={formData.gender}
                          onChange={handleChange}
                          className={`w-full rounded-lg border px-3 py-2 text-sm ${inputBg}`}
                        >
                          <option value="">Select gender</option>
                          <option value="Male">Male</option>
                          <option value="Female">Female</option>
                          <option value="Other">Other</option>
                        </select>
                      </label>
                      <label className="space-y-1">
                        <span className={`text-sm ${subText}`}>
                          Marital Status
                        </span>

                        <select
                          name="maritalStatus"
                          value={formData.maritalStatus}
                          onChange={handleChange}
                          className={`w-full rounded-lg border px-3 py-2 text-sm ${inputBg}`}
                        >
                          <option value="">Select status</option>
                          <option value="Single">Single</option>
                          <option value="Married">Married</option>
                        </select>
                      </label>
                      <label className="space-y-1">
                        <span className={`text-sm ${subText}`}>Phone</span>
                        <input
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          className={`w-full rounded-lg border px-3 py-2 text-sm ${inputBg}`}
                        />
                      </label>
                      <label className="space-y-1">
                        <span className={`text-sm ${subText}`}>Apartment Number</span>
                        <input
                          type="text"
                          name="apartmentNo"
                          value={formData.apartmentNo}
                          onChange={handleChange}
                          className={`w-full rounded-lg border px-3 py-2 text-sm ${inputBg}`}
                        />
                      </label>
                      <label className="space-y-1">
                        <span className={`text-sm ${subText}`}>No. of Residents</span>
                        <input
                          type="number"
                          name="noOfResidents"
                          value={formData.noOfResidents}
                          onChange={handleChange}
                          className={`w-full rounded-lg border px-3 py-2 text-sm ${inputBg}`}
                        />
                      </label>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <label className="space-y-1">
                        <span className={`text-sm ${subText}`}>Email (read-only)</span>
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          disabled
                          className={`w-full rounded-lg border px-3 py-2 text-sm opacity-60 ${inputBg}`}
                        />
                      </label>
                      <label className="space-y-1">
                        <span className={`text-sm ${subText}`}>NIC / Passport (read-only)</span>
                        <input
                          type="text"
                          name="nic"
                          value={formData.nic}
                          disabled
                          className={`w-full rounded-lg border px-3 py-2 text-sm opacity-60 ${inputBg}`}
                        />
                      </label>
                    </div>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

/* ICONS */
const IconBase = ({ children }) => (
  <div className="w-10 h-10 rounded-full
    bg-accent/15
    flex items-center justify-center
    text-accent">
    {children}
  </div>
);


const UserIcon = () => (
  <IconBase>
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
        d="M5.121 17.804A9 9 0 1118.879 6.196M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
  </IconBase>
);

const CalendarIcon = () => (
  <IconBase>
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
        d="M8 7V3m8 4V3m-9 8h10" />
    </svg>
  </IconBase>
);

const FullNameIcon = () => <IconBase>👤</IconBase>;
const DateOfBirthIcon = () => <IconBase>🎂</IconBase>;
const IdIcon = () => <IconBase>🪪</IconBase>;
const GenderIcon = () => <IconBase>⚧️</IconBase>;
const HeartIcon = () => <IconBase>❤️</IconBase>;
const MailIcon = () => <IconBase>📧</IconBase>;
const PhoneIcon = () => <IconBase>📞</IconBase>;
const HomeIcon = () => <IconBase>🏠</IconBase>;
const UsersIcon = () => <IconBase>👨‍👩‍👧‍👦</IconBase>;
