const PreparationPlan = ({ r }) => {
  return (
    <div className="h-full overflow-y-auto rounded-xl p-5 md:p-7
    bg-[rgba(20,20,20,0.78)] border border-slate-600/20 backdrop-blur-lg">
      <p className="text-xs font-bold tracking-widest uppercase mb-1 text-[#5F8190] font-mono">05 · Action Items</p>

      <h2 className="text-2xl font-bold mb-5 text-[#E2F0F0] font-serif">
        Preparation Plan
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 overflow-y-auto max-h-[calc(100%-6rem)]">
        {r.preparationPlan.map((plan, i) => (
          <div
            key={i}
            className="rounded-xl p-4 bg-slate-500/10 border border-slate-500/20"
          >
            <div className="flex items-center gap-2 mb-3">
              <span className="text-xs font-bold text-[#5F8190] font-mono">
                {String(i + 1).padStart(2, "0")}
              </span>

              <p className="text-sm font-bold text-[#E2F0F0]">
                {plan.focusArea}
              </p>
            </div>

            <ul className="space-y-1.5">
              {plan.tasks.map((t, j) => (
                <li key={j} className="flex gap-2 text-xs text-[#aac4cc]">
                  <span className="text-[#5F8190]">›</span>
                  {t}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PreparationPlan;