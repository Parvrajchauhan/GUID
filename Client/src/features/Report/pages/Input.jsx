import React, { useEffect } from "react";
import { useNavigate } from "react-router";
import { useReport } from "../hooks/report.hook";
import InputCard from "../components/InputCard.input";
import PreviousReports from "../components/PreviousReports.input";
const Input = () => {
    const { Loader, Usegenrate, Reports, Usegetall } = useReport();
    const navigate = useNavigate();

    useEffect(() => {
        Usegetall();
    }, []);

    const hasPrevReports = Reports && Reports.length > 0;

    const handleSubmit = async ({ jobTitle, jobDescription, resume }) => {
        const data = await Usegenrate({ jobDescription, jobTitle, resume });
        navigate(`/data/${data._id}`);
    };

    if (Loader) {
        return (
            <main className="min-h-screen flex flex-col items-center justify-center gap-5
                bg-gradient-to-br from-[#1a2328] via-[#2b3a42] to-[#36565F]">
                <div className="w-12 h-12 rounded-full border-2 border-[#5F8190]/20 border-t-[#7ecfeb] animate-spin" />
                <p className="text-sm font-bold text-[#5F8190] tracking-[0.2em] uppercase animate-pulse">
                    Loading…
                </p>
            </main>
        );
    }

    return (
        /*
         * Desktop : h-screen + overflow-hidden  → page never scrolls
         * Mobile  : min-h-screen + overflow-auto → cards stack, page scrolls naturally
         */
        <main className="
            min-h-screen md:h-screen
            overflow-auto md:overflow-hidden
            flex items-start md:items-center justify-center
            p-4 md:p-8
            bg-gradient-to-br from-[#1a2328] via-[#2b3a42] to-[#36565F]
        ">
            {/*
             * Mobile  → flex-col : InputCard on top, PreviousReports below
             * Desktop → flex-row : side by side, same height via items-stretch
             */}
            <div className={`
                flex flex-col md:flex-row
                md:items-stretch
                w-full gap-4 md:gap-6
                md:max-h-[calc(100vh-4rem)]
                ${hasPrevReports ? "max-w-[1280px]" : "max-w-[960px] md:justify-center"}
            `}>
                <InputCard onSubmit={handleSubmit} />
                <PreviousReports reports={Reports} />
            </div>
        </main>
    );
};

export default Input;