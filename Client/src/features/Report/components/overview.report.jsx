import { scoreLabel, scoreColor, sevBg, sevColor, sevText } from "./helpher.report"

const Overview = ({ r }) => {
  const score = r.matchScore;
  const circ = 2 * Math.PI * 36;
  const offset = circ - (score / 100) * circ;

  return (
    <div className="h-full overflow-y-auto rounded-2xl p-6 md:p-8
    bg-[rgba(20,20,20,0.82)] border border-[#5F8190]/20 backdrop-blur-xl">

      {/* Header */}
      <div className="mb-6">
        <p className="text-[11px] font-bold tracking-[0.18em] uppercase text-[#5F8190] font-mono">
          01 · Overview
        </p>

        <h2 className="text-2xl font-bold text-[#E2F0F0] mt-1">
          Resume Analysis
        </h2>
      </div>


      {/* Top Section */}
      <div className="grid md:grid-cols-[260px_1fr] gap-5 mb-6">

        {/* Score Card */}
        <div className="flex items-center gap-4 rounded-2xl px-5 py-4
        bg-[#36565F]/10 border border-[#5F8190]/20">

          <svg width={90} height={90} viewBox="0 0 84 84">
            <circle
              cx="42"
              cy="42"
              r="36"
              fill="none"
              stroke="rgba(95,129,144,0.2)"
              strokeWidth="7"
            />

            <circle
              cx="42"
              cy="42"
              r="36"
              fill="none"
              stroke="rgb(76 175 138)"
              strokeWidth="7"
              strokeDasharray={circ}
              strokeDashoffset={offset}
              strokeLinecap="round"
              transform="rotate(-90 42 42)"
            />

            <text
              x="42"
              y="39"
              textAnchor="middle"
              className="fill-[#E2F0F0] text-lg font-bold"
            >
              {score}
            </text>

            <text
              x="42"
              y="53"
              textAnchor="middle"
              className="fill-[#5F8190] text-[8px]"
            >
              /100
            </text>
          </svg>

          <div>
            <p className="text-[10px] uppercase tracking-[0.2em] text-[#5F8190] font-mono">
              Match Score
            </p>

            <p className={`text-2xl font-bold ${scoreColor(score)}`}>
              {scoreLabel(score)}
            </p>
          </div>
        </div>


        {/* Feedback Card */}
        <div className="rounded-2xl p-5 text-[14px] leading-relaxed
        text-[#c5dbe0]
        bg-[#36565F]/10 border border-[#5F8190]/20">

          {r.overallFeedback}
        </div>
      </div>


      {/* Skill Gap Section */}
      <div>
        <p className="text-[11px] font-bold tracking-[0.18em] uppercase mb-3 text-[#5F8190] font-mono">
          Skill Gap
        </p>

        <div className="flex flex-wrap gap-2">

          {r.skillGap.map((g, i) => (
            <div
              key={i}
              className={`flex items-center gap-2 rounded-full px-3 py-1.5 text-sm border
              ${sevBg[g.severity]} transition-all hover:scale-[1.03]`}
            >

              <span
                className={`w-2 h-2 rounded-full ${sevColor[g.severity]}`}
              />

              <span className="text-[#E2F0F0]">
                {g.skill}
              </span>

              <span
                className={`text-[10px] font-bold font-mono ${sevText[g.severity]}`}
              >
                {g.severity}
              </span>

            </div>
          ))}
        </div>
      </div>

    </div>
  );
};

export default Overview;