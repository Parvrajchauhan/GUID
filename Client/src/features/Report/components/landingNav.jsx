import { useNavigate } from "react-router";

const LandingNav = () => {
    const navigate = useNavigate();

    return (
        <nav className="fixed top-0 left-0 right-0 z-50
            flex items-center justify-between
            px-6 md:px-12 py-4
            bg-[#141414]/85 backdrop-blur-md
            border-b border-[#5F8190]/10">

            {/* Logo */}
            <div className="flex items-center gap-2">
                <h1 className="text-4xl font-black tracking-[0.2em] text-[#5F8190] select-none self-end">
                    GUID
                </h1>
                <span className="text-[14px] text-[#5F8190]/60 tracking-[0.22em] uppercase self-end">
                    Resume AI
                </span>
            </div>

            <div className="flex items-center gap-4">
                <div className="hidden md:flex items-center gap-8">
                    {["How it Works", "Features"].map((link) => (
                        <a key={link}
                            href={`#${link.toLowerCase().replace(/\s+/g, "-")}`}
                            className="text-sm text-[#E2F0F0]/50 hover:text-[#E2F0F0] transition-colors duration-200">
                            {link}
                        </a>
                    ))}
                </div>
                <button
                    onClick={() => navigate("/report")}
                    className="
  px-6 py-2.5
  rounded-xl
  text-sm font-semibold
  text-[#E2F0F0]
  bg-gradient-to-r from-[#36565F] to-[#5F8190]
  border border-[#5F8190]/40
  shadow-[0_0_15px_rgba(95,129,144,0.35)]
  hover:shadow-[0_0_25px_rgba(95,129,144,0.6)]
  hover:scale-[1.03]
  transition-all duration-300
  "
                >
                    Login
                </button>
            </div>
        </nav>
    );
};

export default LandingNav;