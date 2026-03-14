import { useState,useEffect } from "react";
import Overview from "../components/overview.report";
import StrengthsWeaknesses from "../components/StrengthWeajness.report";
import TechnicalQuestions from "../components/TechnicalQuestion.report";
import BehavioralQuestions from "../components/BehavioralQuestion.report";
import PreparationPlan from "../components/PreparationalPlan.report";
import { TABS } from "../components/tab.report"
import { useParams } from "react-router";
import { useReport } from "../hooks/report.hook";

const Report = () => {
    const [active, setActive] = useState("overview");
    const { Report,Loader,UsegetById } = useReport();

    const {reportId}=useParams();

    useEffect(()=>{
        if(reportId){
            UsegetById(reportId)
        }
    },[reportId])


     if (Loader || !Report) {
        return (
            <main className="min-h-screen flex items-center justify-center bg-gray-900">
                <h1 className="text-2xl font-semibold text-white animate-pulse">
                    Loading...
                </h1>
            </main>
        )
    }

    const renderPanel = () => {
        switch (active) {
            case "overview":
                return <Overview r={Report} />;
            case "assessment":
                return <StrengthsWeaknesses r={Report} />;
            case "technical":
                return <TechnicalQuestions r={Report} />;
            case "behavioral":
                return <BehavioralQuestions r={Report} />;
            case "plan":
                return <PreparationPlan r={Report} />;
            default:
                return null;
        }
    };

    return (
        <div className="flex h-screen w-screen overflow-hidden
    bg-gradient-to-br from-[#1a2328] via-[#2b3a42] to-[#36565F]">

            {/* sidebar */}
            <nav className="flex flex-col items-center py-6 gap-1 w-16
      bg-black/60 border-r border-slate-600/20 backdrop-blur-md">

                <div className="w-2 h-2 rounded-full bg-[#5F8190] mb-5" />

                {TABS.map((tab) => {
                    const isActive = active === tab.id;

                    return (
                        <button
                            key={tab.id}
                            onClick={() => setActive(tab.id)}
                            className={`relative flex items-center justify-center
              rounded-xl w-12 h-12 transition
              ${isActive
                                    ? "bg-slate-500/20 border border-slate-500/40"
                                    : ""
                                }`}
                        >
                            <span className={`${isActive ? "text-white" : "text-[#5F8190]"}`}>
                                {tab.icon}
                            </span>
                        </button>
                    );
                })}
            </nav>

            <main className="flex-1 p-4 overflow-hidden">
                {renderPanel()}
            </main>
        </div>
    );
};

export default Report;