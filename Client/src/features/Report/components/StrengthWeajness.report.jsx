

const StrengthsWeaknesses = ({ r }) => {
  return (
    <div className="h-full overflow-y-auto rounded-xl p-5 md:p-7
    bg-[rgba(20,20,20,0.78)] border border-slate-600/20 backdrop-blur-lg">
      <p className="text-xs font-bold tracking-widest uppercase mb-1 text-[#5F8190] font-mono">02 · Assessment</p>

      <h2 className="text-2xl font-bold mb-5 text-[#E2F0F0] font-serif">
        Strengths & Weaknesses
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 h-[calc(100%-6rem)]">

        {/* Strengths */}
        <div className="rounded-xl p-4 flex flex-col gap-3 overflow-y-auto
        bg-emerald-500/10 border border-emerald-500/30">

          <p className="text-xs font-bold tracking-widest uppercase text-emerald-400 font-mono">
            ✓ Strengths
          </p>

          {r.strengths.map((s, i) => (
            <div key={i} className="flex gap-3 text-sm text-[#aac4cc]">

              <span className="shrink-0 mt-1.5 w-1.5 h-1.5 rounded-full bg-emerald-400" />

              <p>{s}</p>

            </div>
          ))}
        </div>

        {/* Weaknesses */}
        <div className="rounded-xl p-4 flex flex-col gap-3 overflow-y-auto
        bg-red-500/10 border border-red-500/30">

          <p className="text-xs font-bold tracking-widest uppercase text-red-400 font-mono">
            ✗ Weaknesses
          </p>

          {r.weaknesses.map((w, i) => (
            <div key={i} className="flex gap-3 text-sm text-[#aac4cc]">

              <span className="shrink-0 mt-1.5 w-1.5 h-1.5 rounded-full bg-red-400" />

              <p>{w}</p>

            </div>
          ))}
        </div>

      </div>
    </div>
  );
};

export default StrengthsWeaknesses;