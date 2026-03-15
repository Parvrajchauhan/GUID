import { useNavigate } from "react-router";
import IcoFidget from "../components/frigit.page";

const HeroSection = () => {
    const navigate = useNavigate();

    return (
        <section className="relative min-h-screen flex items-center
            px-6 md:px-16 lg:px-24 pt-20">

            {/* Background glow blobs */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] rounded-full
                    bg-[#36565F]/25 blur-[130px]" />
                <div className="absolute top-1/3 right-1/4 w-[400px] h-[400px] rounded-full
                    bg-[#36565F]/15 blur-[110px]" />
            </div>

            <div className="relative z-10 w-full max-w-[1200px] mx-auto
                flex flex-col lg:flex-row items-center gap-12 lg:gap-0">

                {/* Left — copy */}
                <div className="flex-1 max-w-[560px]">
                    <p className="text-[11px] font-bold tracking-[0.25em] text-[#5F8190] uppercase mb-5">
                        AI-Powered Career Guidance
                    </p>
                    <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold leading-[1.08] tracking-tight mb-6 text-[#E2F0F0]">
                        Your Career,{" "}
                        <span className="text-[#5F8190]">Elevated by AI</span>
                    </h1>
                    <p className="text-base md:text-lg text-[#E2F0F0]/40 leading-relaxed mb-10 max-w-[480px]">
                        Upload your resume and paste a job description for instant,
                        deep-dive analysis and tailored interview preparation.
                    </p>
                    <div className="flex items-center gap-5">
                        <button
                            onClick={() => navigate("/report")}
                            className="px-7 py-3.5 rounded-xl font-bold text-sm tracking-wide
                                bg-[#36565F] text-[#E2F0F0]
                                border border-[#5F8190]/40
                                hover:bg-[#5F8190] hover:border-[#5F8190]
                                active:scale-[0.98]
                                transition-all duration-200
                                shadow-[0_0_32px_rgba(54,86,95,0.4)]">
                            Get Started Free
                        </button>
                    </div>
                </div>

                {/* Right — IcoFidget */}
                <div className="flex-1 flex justify-center lg:justify-end">
                    <div className="relative w-[380px] h-[420px]
                        rounded-2xl 
                        overflow-hidden flex items-center justify-center
                        ">
                        <IcoFidget />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default HeroSection;