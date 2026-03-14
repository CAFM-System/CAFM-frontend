import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Footer from "../../components/resident/Footer";
import ResidentProfileService from "../../services/residentProfile.service";
import ProfileCard from "../resident/ProfileCard";
import { useTheme } from "../../hooks/useTheme";

export default function UserProfileCard() {
  const navigate = useNavigate();
  const { isDarkMode, bg, cardBg, text, subText, inputBg, modalBg, buttonSecondary } = useTheme();
  const [profileData, setProfileData] = useState(null);
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

  const getSaveErrorMessage = (err) => {
    const responseData = err.response?.data;
    return responseData?.message || responseData?.errors?.[0]?.msg || "Failed to update profile";
  };

  const fetchUserProfile = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await ResidentProfileService.getProfile();
      const profile = response.data.profile;
      setProfileData(profile);
      setFormData(buildFormData(profile));
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

  const buildFormData = (profile) => ({
    firstName: profile?.first_name || "",
    lastName: profile?.last_name || "",
    dob: toInputDate(profile?.date_of_birth),
    gender: profile?.gender || "",
    maritalStatus: profile?.marital_status || "",
    phone: profile?.phone || "",
    apartmentNo: profile?.apartment_no || "",
    noOfResidents: profile?.resident_count ?? "",
    email: profile?.email || "",
    nic: profile?.nic_passport || "",
  });

  const toDisplayLabel = (value) => {
    if (!value) return "N/A";
    return value
      .toString()
      .split("_")
      .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
      .join(" ");
  };

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
    setFormData(buildFormData(profileData));
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

      const parsedResidentCount = Number.parseInt(formData.noOfResidents, 10);
      const currentResidentCount = Number(profileData?.resident_count ?? 0);

      const payload = {
        first_name: formData.firstName,
        last_name: formData.lastName,
        phone: formData.phone,
        ...(formData.dob ? { date_of_birth: formData.dob } : {}),
        ...(formData.gender ? { gender: formData.gender.toLowerCase() } : {}),
        ...(formData.maritalStatus ? { marital_status: formData.maritalStatus.toLowerCase() } : {}),
        ...(formData.apartmentNo ? { apartment_no: formData.apartmentNo } : {}),
        ...(formData.noOfResidents !== "" && !Number.isNaN(parsedResidentCount) && parsedResidentCount !== currentResidentCount
          ? { resident_count: parsedResidentCount }
          : {}),
      };

      const response = await ResidentProfileService.updateProfile(payload);
      const updatedProfile = response?.data?.profile;

      if (updatedProfile) {
        setProfileData(updatedProfile);
        setFormData(buildFormData(updatedProfile));
      } else {
        // Apply locally if backend didn't return updated profile
        setProfileData((prev) => ({
          ...prev,
          first_name: formData.firstName,
          last_name: formData.lastName,
          phone: formData.phone,
          date_of_birth: formData.dob,
          gender: formData.gender,
          marital_status: formData.maritalStatus,
          apartment_no: formData.apartmentNo,
          resident_count: formData.noOfResidents ? parseInt(formData.noOfResidents) : 0,
        }));
      }

      setIsEditing(false);
    } catch (err) {
      console.error("Error updating profile:", err);
      setSaveError(getSaveErrorMessage(err));
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
                  setFormData(buildFormData(profileData));
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
                {getInitial(profileData?.first_name)}
              </div>


              {/* NAME */}
              <h1 className={`text-xl font-bold ${text}`}>
                {profileData.first_name} {profileData.last_name}
              </h1>

              <p className={subText}>
                {profileData.email}
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
                      data={`${profileData.first_name} ${profileData.last_name}`}
                      icon={<FullNameIcon />} />

                    <ProfileCard heading="Date of Birth"
                      data={formatDate(profileData.date_of_birth)}
                      icon={<DateOfBirthIcon />} />
                    <ProfileCard heading="NIC / Passport"
                      data={profileData.nic_passport}
                      icon={<IdIcon />} />

                    <ProfileCard heading="Gender"
                      data={toDisplayLabel(profileData.gender)}
                      icon={<GenderIcon />} />

                    <ProfileCard heading="Marital Status"
                      data={toDisplayLabel(profileData.marital_status)}
                      icon={<HeartIcon />} />

                    <ProfileCard heading="Email"
                      data={profileData.email}
                      icon={<MailIcon />} />

                    <ProfileCard heading="Phone"
                      data={profileData.phone}
                      icon={<PhoneIcon />} />

                    <ProfileCard heading="Apartment Number"
                      data={profileData.apartment_no}
                      icon={<HomeIcon />} />

                    <ProfileCard heading="No. of Residents"
                      data={profileData.resident_count}
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
                          <option value="male">Male</option>
                          <option value="female">Female</option>
                          <option value="other">Other</option>
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
                          <option value="single">Single</option>
                          <option value="married">Married</option>
                          <option value="divorced">Divorced</option>
                          <option value="widowed">Widowed</option>
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

const FullNameIcon = () => <IconBase>👤</IconBase>;
const DateOfBirthIcon = () => <IconBase>🎂</IconBase>;
const IdIcon = () => <IconBase>🪪</IconBase>;
const GenderIcon = () => <IconBase>⚧️</IconBase>;
const HeartIcon = () => <IconBase>❤️</IconBase>;
const MailIcon = () => <IconBase>📧</IconBase>;
const PhoneIcon = () => <IconBase>📞</IconBase>;
const HomeIcon = () => <IconBase>🏠</IconBase>;
const UsersIcon = () => <IconBase>👨‍👩‍👧‍👦</IconBase>;
