import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

const LogoutButton = () => {
  const { handleLogout, Loader } = useAuth();
  const navigate = useNavigate();

  const onLogout = async () => {
    try {
      await handleLogout();
      navigate("/login");
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };

  return (
    <button
      onClick={onLogout}
      disabled={Loader}
      className="px-6 py-3 rounded-xl font-semibold text-sm tracking-wide text-[#E2F0F0] bg-gradient-to-br from-[#36565F] to-[#5F8190] shadow-[0_4px_20px_rgba(54,86,95,0.4)] transition-all duration-200 hover:opacity-90 active:scale-95 disabled:opacity-50"
    >
      {Loader ? "Logging out..." : "Logout"}
    </button>
  );
};

export default LogoutButton;