const LandingFooter = () => (
    <footer className="bg-[#0d1a1f] border-t border-[#36565F]/20
        px-6 md:px-16 lg:px-24 pt-16 pb-8">
        <div className="max-w-[1200px] mx-auto">

            <div className="grid grid-cols-1 md:grid-cols-[1fr_auto_auto] gap-10 mb-14">

                {/* Brand */}
                <div className="max-w-[320px]">
                    <div className="flex items-center gap-2 mb-5">
                        <h2 className="text-2xl font-black tracking-[0.2em] text-[#5F8190] select-none">
                            GUID
                        </h2>
                        <span className="text-[10px] text-[#5F8190]/50 tracking-[0.2em] uppercase self-end mb-0.5">
                            Resume AI
                        </span>
                    </div>
                    <p className="text-sm text-[#E2F0F0]/30 leading-relaxed mb-6">
                        Empowering the next generation of professionals with AI-driven career guidance.
                        Your journey to your dream job starts here.
                    </p>
                    <div className="flex items-center gap-3">
                        <a href="#"
                            className="w-9 h-9 rounded-xl bg-[#141414] border border-[#36565F]/30
                                flex items-center justify-center
                                hover:border-[#5F8190]/60 hover:bg-[#5F8190]/10
                                transition-all duration-200">
                            <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" className="text-[#5F8190]">
                                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                            </svg>
                        </a>
                        <a href="#"
                            className="w-9 h-9 rounded-xl bg-[#141414] border border-[#36565F]/30
                                flex items-center justify-center
                                hover:border-[#5F8190]/60 hover:bg-[#5F8190]/10
                                transition-all duration-200">
                            <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" className="text-[#5F8190]">
                                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                            </svg>
                        </a>
                    </div>
                </div>

                {/* Product */}
                <div>
                    <p className="text-[10px] font-bold tracking-[0.2em] text-[#5F8190] uppercase mb-5">
                        Product
                    </p>
                    <ul className="space-y-3">
                        {["Features", "Analysis", "Pricing"].map((item) => (
                            <li key={item}>
                                <a href="#" className="text-sm text-[#E2F0F0]/35 hover:text-[#E2F0F0] transition-colors duration-200">
                                    {item}
                                </a>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Legal */}
                <div>
                    <p className="text-[10px] font-bold tracking-[0.2em] text-[#5F8190] uppercase mb-5">
                        Legal
                    </p>
                    <ul className="space-y-3">
                        {["Privacy Policy", "Terms of Service", "Cookies"].map((item) => (
                            <li key={item}>
                                <a href="#" className="text-sm text-[#E2F0F0]/35 hover:text-[#E2F0F0] transition-colors duration-200">
                                    {item}
                                </a>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>

            <div className="pt-6 border-t border-[#36565F]/20 text-center">
                <p className="text-[11px] font-bold tracking-[0.2em] text-[#5F8190]/30 uppercase">
                    © 2024 GUID AI. All rights reserved.
                </p>
            </div>
        </div>
    </footer>
);

export default LandingFooter;