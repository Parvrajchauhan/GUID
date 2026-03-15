const PowerfulInsights = () => {
    const score = 45;
    const circ = 2 * Math.PI * 54;
    const offset = circ - (score / 100) * circ;

    return (
        <section id="features" className="px-6 md:px-16 lg:px-24 py-28 bg-[#141414]">
            <div className="max-w-[1200px] mx-auto">

                <div className="text-center mb-16">
                    <p className="text-[11px] font-bold tracking-[0.25em] text-[#5F8190] uppercase mb-3">
                        02 · Capabilities
                    </p>
                    <h2 className="text-4xl md:text-5xl font-extrabold text-[#E2F0F0] tracking-tight">
                        Powerful Insights
                    </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-5">

                    {/* Match Score card */}
                    <div className="rounded-2xl p-8
                        bg-[#0d1a1f] border border-[#36565F]/25
                        flex flex-col items-center text-center gap-5
                        hover:border-[#5F8190]/40 transition-all duration-300">
                        <div className="relative w-32 h-32">
                            <svg width="128" height="128" viewBox="0 0 128 128">
                                <circle cx="64" cy="64" r="54"
                                    fill="none" stroke="rgba(95,129,144,0.12)" strokeWidth="10" />
                                <circle cx="64" cy="64" r="54"
                                    fill="none" stroke="#36565F" strokeWidth="10"
                                    strokeDasharray={circ}
                                    strokeDashoffset={offset}
                                    strokeLinecap="round"
                                    transform="rotate(-90 64 64)"
                                />
                            </svg>
                            <div className="absolute inset-0 flex flex-col items-center justify-center">
                                <span className="text-3xl font-black text-[#E2F0F0]">{score}</span>
                                <span className="text-[11px] text-[#5F8190]/60 font-mono">/ 100</span>
                            </div>
                        </div>
                        <div>
                            <h3 className="text-lg font-bold text-[#E2F0F0] mb-2">Match Score</h3>
                            <p className="text-sm text-[#E2F0F0]/35 leading-relaxed">
                                Instant quantification of how well your profile aligns with the role's core expectations.
                            </p>
                        </div>
                    </div>

                    {/* Skill Gap card */}
                    <div className="rounded-2xl p-8
                        bg-[#0d1a1f] border border-[#5F8190]/35
                        flex flex-col gap-5
                        shadow-[0_0_40px_rgba(54,86,95,0.12)]
                        hover:border-[#5F8190]/60 transition-all duration-300">
                        <div className="flex flex-wrap gap-2">
                            <span className="text-[11px] font-bold px-3 py-1 rounded-full
                                bg-[#36565F]/30 text-[#E2F0F0]/70 border border-[#36565F]/50">
                                Node.js High
                            </span>
                            <span className="text-[11px] font-bold px-3 py-1 rounded-full
                                bg-[#5F8190]/20 text-[#E2F0F0]/70 border border-[#5F8190]/40">
                                REST APIs Medium
                            </span>
                        </div>
                        <div>
                            <h3 className="text-lg font-bold text-[#E2F0F0] mb-2">Skill Gap Analysis</h3>
                            <p className="text-sm text-[#E2F0F0]/35 leading-relaxed">
                                Identify exactly what technologies or experiences you need to highlight or learn to win the role.
                            </p>
                        </div>
                    </div>

                    {/* Interview Prep card */}
                    <div className="rounded-2xl p-8
                        bg-[#0d1a1f] border border-[#36565F]/25
                        flex flex-col gap-5
                        hover:border-[#5F8190]/40 transition-all duration-300">
                        <div className="flex flex-col gap-2">
                            <div className="h-1.5 w-3/4 rounded-full bg-[#5F8190]/30" />
                            <div className="h-1.5 w-1/2 rounded-full bg-[#36565F]/40" />
                            <div className="h-1.5 w-2/3 rounded-full bg-[#5F8190]/15" />
                        </div>
                        <div>
                            <h3 className="text-lg font-bold text-[#E2F0F0] mb-2">Interview Prep</h3>
                            <p className="text-sm text-[#E2F0F0]/35 leading-relaxed">
                                Deep-dive feedback on your resume's narrative, providing strengths to double down on and weaknesses to mitigate.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default PowerfulInsights;