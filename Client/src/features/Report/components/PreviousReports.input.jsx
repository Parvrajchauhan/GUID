import React from "react";
import { useNavigate } from "react-router";

const ReportRow = ({ report, idx }) => {
    const navigate = useNavigate();
    const score = report.matchScore ?? 0;
    const isStrong = score >= 75;
    const isMedium = score >= 50 && score < 75;
    const ringColor = isStrong ? "#4caf8a" : isMedium ? "#f5b731" : "#e05f5f";
    const circ = 2 * Math.PI * 14;
    const dash = circ - (score / 100) * circ;

    return (
        <button
            onClick={() => navigate(`/data/${report._id}`)}
            className="w-full text-left flex items-center gap-3
                px-3 py-3 rounded-xl
                bg-white/[0.02] border border-white/[0.04]
                hover:bg-[#5F8190]/[0.1] hover:border-[#5F8190]/25
                transition-all duration-200 group"
        >
            {/* Index */}
            <span className="text-[10px] font-mono text-[#5F8190]/35 w-4 flex-shrink-0">
                {String(idx + 1).padStart(2, "0")}
            </span>

            {/* Score ring */}
            <div className="relative flex-shrink-0 w-9 h-9">
                <svg width="36" height="36" viewBox="0 0 36 36">
                    <circle cx="18" cy="18" r="14" fill="none"
                        stroke="rgba(95,129,144,0.15)" strokeWidth="3" />
                    <circle cx="18" cy="18" r="14" fill="none"
                        stroke={ringColor}
                        strokeWidth="3"
                        strokeDasharray={circ}
                        strokeDashoffset={dash}
                        strokeLinecap="round"
                        transform="rotate(-90 18 18)"
                    />
                </svg>
                <span className="absolute inset-0 flex items-center justify-center
                    text-[9px] font-bold font-mono text-white">
                    {score}
                </span>
            </div>

            {/* Info */}
            <div className="flex-1 min-w-0">
                <p className="text-[12px] font-semibold text-white/80 truncate
                    group-hover:text-white transition-colors">
                    {report.jobTitle ?? "Untitled Role"}
                </p>
                <p className="text-[10px] text-[#5F8190]/60 mt-0.5">
                    {report.createdAt
                        ? new Date(report.createdAt).toLocaleDateString("en-IN", {
                            day: "numeric", month: "short", year: "numeric",
                        })
                        : "—"
                    }
                </p>
            </div>

            {/* Score badge */}
            <span className={`text-[9px] font-bold font-mono px-1.5 py-0.5 rounded-full flex-shrink-0
                ${isStrong
                    ? "bg-[#4caf8a]/15 text-[#4caf8a]"
                    : isMedium
                        ? "bg-[#f5b731]/15 text-[#f5b731]"
                        : "bg-[#e05f5f]/15 text-[#e05f5f]"
                }`}>
                {isStrong ? "Strong" : isMedium ? "Fair" : "Weak"}
            </span>

            {/* Arrow */}
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none"
                stroke="currentColor" strokeWidth="2.5"
                strokeLinecap="round" strokeLinejoin="round"
                className="text-[#5F8190]/25 group-hover:text-[#7ecfeb]/50
                    group-hover:translate-x-0.5 transition-all duration-200 flex-shrink-0">
                <path d="M9 18l6-6-6-6" />
            </svg>
        </button>
    );
};

const PanelInner = ({ reports }) => (
    <>
        <div className="flex-shrink-0 px-5 pt-6 pb-4
            border-b border-white/[0.06]
            flex items-center justify-between">
            <div>
                <p className="text-[9px] font-bold tracking-[0.22em] uppercase text-[#5F8190] font-mono mb-1">
                    History
                </p>
                <h3 className="text-xl font-semibold text-[#E2F0F0] font-serif">
                    Previous Reports
                </h3>
            </div>
            <span className="text-[10px] font-mono text-[#5F8190]/70
                bg-[#5F8190]/10 border border-[#5F8190]/20
                px-2.5 py-1 rounded-full">
                {reports.length} total
            </span>
        </div>

        <div className="flex-1 min-h-0 overflow-y-auto px-2 py-2 space-y-1
            [&::-webkit-scrollbar]:w-[4px]
            [&::-webkit-scrollbar-track]:rounded-full
            [&::-webkit-scrollbar-track]:bg-white/[0.03]
            [&::-webkit-scrollbar-thumb]:rounded-full
            [&::-webkit-scrollbar-thumb]:bg-[#5F8190]/30
            [&::-webkit-scrollbar-thumb:hover]:bg-[#7ecfeb]/50">
            {reports.map((report, idx) => (
                <ReportRow key={report._id} report={report} idx={idx} />
            ))}
        </div>
    </>
);

const PreviousReports = ({ reports }) => {
    if (!reports || reports.length === 0) return null;

    return (<>
        {/* DESKTOP — absolute fill inside relative wrapper to match input card height */}
        <div className="hidden md:block relative flex-1 min-w-[260px] max-w-[400px]">
            <div className="absolute inset-0 flex flex-col
                rounded-2xl overflow-hidden
                bg-[#141414e0] backdrop-blur-xl
                border border-white/[0.05]
                shadow-[0_0_80px_rgba(54,86,95,0.25)]">
                <PanelInner reports={reports} />
            </div>
        </div>

        {/* MOBILE — normal flow, fixed max-height, page scrolls */}
        <div className="md:hidden flex flex-col
            w-full max-h-[420px]
            rounded-2xl overflow-hidden
            bg-[#141414e0] backdrop-blur-xl
            border border-white/[0.05]
            shadow-[0_0_40px_rgba(54,86,95,0.2)]">
            <PanelInner reports={reports} />
        </div>
    </>);
};

export default PreviousReports;