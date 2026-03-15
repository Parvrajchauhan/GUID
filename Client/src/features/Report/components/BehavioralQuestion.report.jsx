import QCard from "./QCard.report";

const BehavioralQuestions = ({ r }) => {
  return (
    <div className="h-full overflow-y-auto rounded-xl p-5 md:p-7
    bg-[rgba(20,20,20,0.78)] border border-slate-600/20 backdrop-blur-lg">
    
      <p className="text-xs font-bold tracking-widest uppercase mb-1 text-[#5F8190] font-mono">04 · Behavioral</p>

      <h2 className="text-2xl font-bold mb-5 text-[#E2F0F0] font-serif">
        Behavioral Questions
      </h2>

      <div className="flex flex-col gap-2 overflow-y-auto max-h-[calc(100%-6rem)]">
        {r.behavioralQuestions.map((q, i) => (
          <QCard
            key={i}
            q={q.question}
            intention={q.intention}
            index={i}
          />
        ))}
      </div>
    </div>
  );
};

export default BehavioralQuestions;