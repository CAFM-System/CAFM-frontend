import { useState, useEffect } from "react";
import { Sparkles } from "lucide-react";
import AuthService from "../../services/auth.service";

export default function TopBanner({ openTicket }) {
  const [resident, setResident] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchResident = async () => {
      try {
        const response = await AuthService.getuser();
        setResident(response.data.user);
      } catch (error) {
        console.error("Error fetching resident data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchResident();
  }, []);

  if (loading) {
    return (
      <div className="relative overflow-hidden rounded-3xl mb-10 bg-[color:var(--color-secondary)]">
        <div className="p-10 text-[color:var(--color-primary)]">
          Loading...
        </div>
      </div>
    );
  }

  if (!resident) return null;

  return (
    <div className="relative overflow-hidden rounded-3xl mb-10">
      {/* Background gradient */}
      <div
        className="absolute inset-0 bg-gradient-to-r
        from-[color:var(--color-secondary)]
        via-[color:var(--color-accent)]
        to-[color:var(--color-secondary)] opacity-90"
      />

      <div className="relative p-10">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          {/* Left content */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Sparkles className="h-5 w-5 text-[color:var(--color-accent)]" />
              <span className="text-[color:var(--color-primary)]/80 text-sm">
                Welcome back
              </span>
            </div>

            <h2 className="text-4xl text-[color:var(--color-primary)]">
              Hello, {resident.profile.firstName} {resident.profile.lastName}! 👋
            </h2>

            <p className="text-[color:var(--color-primary)]/80 text-lg mt-2">
              Hope you’re having a great day at your residence.
            </p>
          </div>

          {/* Action button */}
          <button
            onClick={() => openTicket(true)}
            className="
              bg-[color:var(--color-accent)]
              text-[color:var(--color-secondary)]
              rounded-lg px-6 py-3 shadow-lg
              hover:bg-[rgba(234,179,8,0.85)]
              transition transform hover:scale-105
            "
          >
            + Create Request
          </button>
        </div>
      </div>
    </div>
  );
}
