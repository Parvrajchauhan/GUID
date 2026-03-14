import Panel from "./panel.report";
import Tag from "./Tag.report";
import QCard from "./QCard.report";

const BehavioralQuestions = ({ r }) => {
  return (
    <Panel>
      <Tag>04 · Behavioral</Tag>

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
    </Panel>
  );
};

export default BehavioralQuestions;