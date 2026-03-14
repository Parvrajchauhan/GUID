import Panel from "./panel.report";
import Tag from "./Tag.report";

import { scoreLabel, scoreColor, sevBg, sevColor, sevText} from "./helpher.report"

const Overview = ({ r }) => {
  const score = r.matchScore;
  const circ = 2 * Math.PI * 36;
  const offset = circ - (score / 100) * circ;
  
  return (
    <Panel>
      <Tag>01 · Overview</Tag>

      <h2 className="text-2xl font-bold mb-5 text-[#E2F0F0] font-serif">
        Resume Analysis
      </h2>

      <div className="flex flex-col sm:flex-row gap-4 mb-5">

        <div className="flex items-center gap-4 rounded-xl px-5 py-4 bg-slate-500/10 border border-slate-500/30">
          <svg width={84} height={84} viewBox="0 0 84 84">
            <circle cx="42" cy="42" r="36" fill="none" stroke="rgba(95,129,144,0.2)" strokeWidth="7" />
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
            <text x="42" y="39" textAnchor="middle" className="fill-[#E2F0F0] text-lg font-bold">{score}</text>
            <text x="42" y="53" textAnchor="middle" className="fill-[#5F8190] text-[8px]">/100</text>
          </svg>

          <div>
            <p className="text-xs uppercase tracking-widest text-[#5F8190] font-mono">
              Match
            </p>
            <p className={`text-xl font-bold ${scoreColor(score)}`}>
              {scoreLabel(score)}
            </p>
          </div>
        </div>

        <div className="flex-1 rounded-xl p-4 text-sm text-[#aac4cc] bg-slate-500/10 border border-slate-500/20">
          {r.overallFeedback}
        </div>
      </div>

      <Tag>Skill Gap</Tag>

      <div className="flex flex-wrap gap-2">
        {r.skillGap.map((g, i) => (
          <div
            key={i}
            className={`flex items-center gap-2 rounded-full px-3 py-1.5 text-sm border ${sevBg[g.severity]}`}
          >
            <span className={`w-1.5 h-1.5 rounded-full ${sevColor[g.severity]}`} />
            <span className="text-[#E2F0F0]">{g.skill}</span>
            <span className={`text-xs font-bold font-mono ${sevText[g.severity]}`}>
              {g.severity}
            </span>
          </div>
        ))}
      </div>
    </Panel>
  );
};

export default Overview;