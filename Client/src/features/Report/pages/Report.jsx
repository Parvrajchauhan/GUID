import { useState, useEffect } from "react";
import Overview from "../components/overview.report";
import StrengthsWeaknesses from "../components/StrengthWeajness.report";
import TechnicalQuestions from "../components/TechnicalQuestion.report";
import BehavioralQuestions from "../components/BehavioralQuestion.report";
import PreparationPlan from "../components/PreparationalPlan.report";
import { TABS, TAB_ICONS } from "../components/tab.report";
import { useParams, useNavigate } from "react-router";
import { useReport } from "../hooks/report.hook";
import Cube from "../components/cube.input";

const Report = () => {
    const [active, setActive] = useState("overview");
    const { Report, Loader, UsegetById,Usegetall } = useReport();
    const { reportId } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        if (reportId) UsegetById(reportId);
    }, [reportId]);

    if (Loader || !Report) {
        return (
            <main className="min-h-screen flex flex-col items-center justify-center gap-5 bg-[#0f1c22]">
                <div className="w-12 h-12 rounded-full border-2 border-[#5F8190]/20 border-t-[#7ecfeb] animate-spin" />
                <p className="text-lg font-bold text-[#5F8190] tracking-[0.2em] uppercase animate-pulse">
                    Loading report…
                </p>
            </main>
        );
    }

    const renderPanel = () => {
        switch (active) {
            case "overview":   return <Overview r={Report} />;
            case "assessment": return <StrengthsWeaknesses r={Report} />;
            case "technical":  return <TechnicalQuestions r={Report} />;
            case "behavioral": return <BehavioralQuestions r={Report} />;
            case "plan":       return <PreparationPlan r={Report} />;
            default:           return null;
        }
    };

    const activeTabIndex = TABS.findIndex((t) => t.id === active);
    const activeTab = TABS[activeTabIndex];

    return (
        <div className="flex flex-col lg:flex-row h-screen w-screen overflow-hidden bg-gradient-to-br from-[#0f1c22] via-[#182830] to-[#1e3540]">

            {/* ══════════════════════════════
                DESKTOP SIDEBAR  (lg+)
            ══════════════════════════════ */}
            <nav className="
                hidden lg:flex flex-col flex-shrink-0
                w-64
                bg-black/40 backdrop-blur-2xl
                border-r border-white/[0.05]
                rounded-r-3xl
                shadow-[6px_0_48px_rgba(0,0,0,0.5)]
                py-5 overflow-hidden
            ">
                {/* Logo */}
                <div className="px-5 mb-2">
                    <h1 className="text-4xl font-black tracking-[0.2em] text-oceanSteel select-none">
                        GUID
                    </h1>
                    <span className="block text-[10px] text-[#5F8190]/70 tracking-[0.22em] uppercase mt-0.5">
                        Resume AI
                    </span>
                </div>

                {/* Divider */}
                <div className="h-px bg-white/[0.06] mx-4 mb-3" />

                {/* Nav tabs */}
                <div className="flex flex-col gap-1 px-3 flex-1">
                    {TABS.map((tab, idx) => {
                        const isActive = active === tab.id;
                        return (
                            <button
                                key={tab.id}
                                onClick={() => setActive(tab.id)}
                                className={`
                                    group relative flex items-center gap-3
                                    px-3 py-[11px] rounded-2xl
                                    text-[15px] font-semibold
                                    transition-all duration-200 ease-out border
                                    ${isActive
                                        ? "bg-[#5F8190]/[0.18] text-white border-[#5F8190]/30 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)]"
                                        : "text-white/35 border-transparent hover:text-white/75 hover:bg-white/[0.04]"
                                    }
                                `}
                            >
                                {isActive && (
                                    <span className="absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-6 bg-[#7ecfeb] rounded-r-full" />
                                )}
                                <span className={`flex-shrink-0 transition-colors duration-200 ${isActive ? "text-[#7ecfeb]" : "text-[#5F8190] group-hover:text-white/60"}`}>
                                    {TAB_ICONS[tab.id] ?? tab.icon}
                                </span>
                                <span className="tracking-wide">{tab.label}</span>
                                <span className="ml-auto text-[11px] font-mono text-[#5F8190]/40">
                                    0{idx + 1}
                                </span>
                            </button>
                        );
                    })}
                </div>

                {/* Cube */}
                <div className="flex items-center justify-center w-full">
                    <Cube />
                </div>

                {/* Divider */}
                <div className="h-px bg-white/[0.06] mx-4 mt-3 mb-2" />

                {/* Analyze More */}
                <button
                    onClick={() => navigate("/report")}
                    className="
                        mx-3 flex items-center gap-3 px-4 py-2.5 rounded-xl
                        text-[14px] font-semibold text-oceanSteel
                        border border-oceanSteel/20 bg-oceanSteel/5
                        hover:bg-oceanSteel/15 hover:border-oceanSteel/40 hover:text-white
                        transition-all duration-200 group
                    "
                >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                        className="flex-shrink-0 transition-transform duration-200 group-hover:translate-x-1">
                        <path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4" />
                        <path d="M16 17l5-5-5-5" />
                        <path d="M21 12H9" />
                    </svg>
                    <span>Analyze More Resume</span>
                </button>
            </nav>

            {/* ══════════════════════════════
                MAIN CONTENT AREA
            ══════════════════════════════ */}
            <div className="flex-1 flex flex-col overflow-hidden min-w-0">

                {/* Top bar */}
                <header className="flex items-center gap-4 px-5 lg:px-8 pt-5 lg:pt-7 pb-3 lg:pb-4 flex-shrink-0">
                    <div>
                        <p className="text-[11px] font-bold text-[#5F8190] uppercase tracking-[0.18em] mb-1.5">
                            0{activeTabIndex + 1} · {activeTab?.label}
                        </p>
                        <h1 className="text-2xl lg:text-[28px] font-extrabold text-white tracking-tight leading-none">
                            Resume Analysis
                        </h1>
                    </div>

                    <div className="flex-1" />

                    {/* Mobile-only: Analyze New button */}
                    <button
                        onClick={() => navigate("/report")}
                        className="
                            lg:hidden flex items-center gap-2
                            px-3 py-2 rounded-xl
                            text-[13px] font-semibold text-[#7ecfeb]
                            border border-[#7ecfeb]/20 bg-[#7ecfeb]/5
                            hover:bg-[#7ecfeb]/10 transition-all duration-200
                        "
                    >
                        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <line x1="12" y1="5" x2="12" y2="19" />
                            <line x1="5" y1="12" x2="19" y2="12" />
                        </svg>
                        <span>New</span>
                    </button>
                </header>

                {/* Accent divider */}
                <div className="mx-5 lg:mx-8 mb-3 lg:mb-5 h-px bg-gradient-to-r from-[#7ecfeb]/25 via-[#5F8190]/10 to-transparent" />

                {/* Panel */}
                <main className="flex-1 overflow-hidden px-3 lg:px-6 pb-2 lg:pb-6 min-h-0">
                    <div className="h-full overflow-y-auto rounded-2xl">
                        {renderPanel()}
                    </div>
                </main>
            </div>

            {/* ══════════════════════════════
                MOBILE BOTTOM NAV  (< lg)
            ══════════════════════════════ */}
            <nav className="
                lg:hidden flex-shrink-0
                flex flex-row items-stretch
                bg-black/70 backdrop-blur-2xl
                border-t border-white/[0.07]
                px-1 pt-1 pb-2
            ">
                {TABS.map((tab) => {
                    const isActive = active === tab.id;
                    return (
                        <button
                            key={tab.id}
                            onClick={() => setActive(tab.id)}
                            className={`
                                relative flex-1 flex flex-col items-center justify-center
                                gap-[5px] py-2 px-1 rounded-xl
                                transition-all duration-200
                                ${isActive
                                    ? "text-[#7ecfeb] bg-[#7ecfeb]/[0.08]"
                                    : "text-[#5F8190]/50 hover:text-[#5F8190]"
                                }
                            `}
                        >
                            {/* Active top pill */}
                            {isActive && (
                                <span className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-[1px] w-8 h-[2.5px] rounded-full bg-[#7ecfeb]" />
                            )}

                            {/* Icon */}
                            <span className={`transition-transform duration-200 ${isActive ? "scale-[1.15]" : "scale-100"}`}>
                                {TAB_ICONS[tab.id] ?? tab.icon}
                            </span>

                            {/* Short label */}
                            <span className={`text-[9px] font-bold tracking-wider uppercase leading-none ${isActive ? "opacity-100" : "opacity-40"}`}>
                                {tab.short ?? tab.label.slice(0, 5)}
                            </span>
                        </button>
                    );
                })}
            </nav>

        </div>
    );
};

export default Report;