import { useEffect, useRef, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import apiClient from "../../services/apiclient";

const AcceptTicket = () => {
  const [params] = useSearchParams();
  const ticketId = params.get("ticket");
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState("processing");

  const hasCalledRef = useRef(false); // 🔒 KEY FIX

  useEffect(() => {
    if (hasCalledRef.current) return; // ❌ prevent second run
    hasCalledRef.current = true;

    const handleAccept = async () => {
      try {
        await apiClient.post(`/tickets/accept/${ticketId}`);
        setStatus("success");

        setTimeout(() => navigate("/technician"), 1500);
      } catch (err) {
        if (err.response?.status === 401) {
          const redirectPath = `/accept-ticket?ticket=${ticketId}`;
          navigate(`/login?redirect=${encodeURIComponent(redirectPath)}`);
          return;
        }

        if (err.response?.status === 409) {
          setStatus("already_assigned"); // 👈 separate state
        } else {
          setStatus("error");
        }

        setTimeout(() => navigate("/technician"), 2000);
      } finally {
        setLoading(false);
      }
    };

    handleAccept();
  }, [navigate, ticketId]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-(--color-primary)">
      <div className="bg-white p-8 rounded-xl shadow-lg max-w-md w-full text-center">
        <h2 className="text-2xl font-bold text-(--color-secondary) mb-4">
          Ticket Acceptance
        </h2>

        {loading && <p>Processing your request...</p>}

        {status === "success" && (
          <p className="text-(--color-accent) font-semibold">
            ✅ Ticket accepted successfully!
          </p>
        )}

        {status === "already_assigned" && (
          <p className="text-yellow-600 font-semibold">
            ⚠️ Ticket already assigned
          </p>
        )}

        {status === "error" && (
          <p className="text-red-600 font-semibold">
            ❌ Something went wrong
          </p>
        )}
      </div>
    </div>
  );
};

export default AcceptTicket;
