import { useState } from "react";

const QCard = ({ q, intention, index }) => {
  const [open, setOpen] = useState(false);

  return (
    <div
      className={`rounded-xl border border-slate-600/20 overflow-hidden ${
        open ? "bg-slate-500/10" : "bg-slate-500/5"
      }`}
    >
      <button
        className="w-full flex items-start gap-3 px-4 py-3 text-left"
        onClick={() => setOpen(!open)}
      >
        <span className="text-xs font-bold text-[#5F8190] font-mono min-w-[22px]">
          {String(index + 1).padStart(2, "0")}
        </span>

        <span className="flex-1 text-sm text-[#E2F0F0] leading-snug">
          {q}
        </span>

        <span
          className={`text-base text-[#5F8190] transition-transform ${
            open ? "rotate-90" : ""
          }`}
        >
          ›
        </span>
      </button>

      {open && (
        <div className="flex gap-2 px-4 pb-3 pt-1 border-t border-slate-600/20">
          <span className="text-xs">💡</span>
          <p className="text-xs text-[#5F8190]">{intention}</p>
        </div>
      )}
    </div>
  );
};

export default QCard;