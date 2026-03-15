import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

const LogoutButton = () => {
  const { handleLogout, Loader } = useAuth();
  const navigate = useNavigate();

  const onLogout = async () => {
    try {
      navigate("/");
      await handleLogout();
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };

  return (
    <button
      onClick={onLogout}
      disabled={Loader}
      className="
      flex items-center gap-2
      px-5 py-2.5
      rounded-xl
      text-sm font-semibold
      text-red-400
      border border-red-400/30
      bg-red-400/5
      hover:bg-red-400/10
      hover:border-red-400/50
      transition-all duration-200
      active:scale-95
      disabled:opacity-50
      "
    >
      {/* Icon */}
      <svg
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
        <polyline points="16 17 21 12 16 7" />
        <line x1="21" y1="12" x2="9" y2="12" />
      </svg>

      {Loader ? "Logging out..." : "Logout"}
    </button>
  );
};

export default LogoutButton;