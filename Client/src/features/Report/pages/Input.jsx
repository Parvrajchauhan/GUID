import React, { useState, useRef } from "react";
import Cube from "../components/cube.input";
import { useReport } from "../hooks/report.hook";
import { useNavigate } from "react-router";

const Input = () => {
    const { Loader, Usegenrate } = useReport();

    const [jobDescription, setJobDescription] = useState("")
    const [jobTitle, setJobTitle] = useState("")
    const resumeInputRef = useRef()
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        const resume = resumeInputRef.current.files[0];

        const data = await Usegenrate({ jobDescription, jobTitle, resume });

        navigate(`/data/${data._id}`);
    };

    if (Loader) {
        return (
            <main className="min-h-screen flex items-center justify-center bg-gray-900">
                <h1 className="text-2xl font-semibold text-white animate-pulse">
                    Loading...
                </h1>
            </main>
        )
    }


    return (
        <main className="min-h-screen flex items-center justify-center p-4 md:p-8 bg-gradient-to-br from-[#1a2328] via-[#2b3a42] to-[#36565F]">

            <div className="flex flex-col md:flex-row w-full max-w-[960px] rounded-2xl overflow-hidden shadow-[0_0_80px_rgba(54,86,95,0.35)]">

                {/* Left Panel */}
                <div className="hidden md:flex flex-col justify-between p-10 select-none w-[42%] bg-gradient-to-br from-[#36565F] to-[#141414]">

                    <div>
                        <p className="text-xs tracking-widest uppercase mb-6 text-[#5F8190] font-mono">
                            Resume Assistant · AI
                        </p>

                        <h2 className="text-4xl font-bold leading-tight text-[#E2F0F0] font-serif">
                            Analyse Your Resume
                        </h2>

                        <p className="mt-4 text-sm leading-relaxed text-[#5F8190]">
                            Upload your resume and paste a job description. Let AI do the
                            heavy lifting.
                        </p>
                    </div>

                    {/* Cube */}
                    <Cube />

                    <div />
                </div>

                {/* Right Panel */}
                <div className="flex-1 p-6 md:p-10 bg-[#141414e0] backdrop-blur-xl">

                    <h3 className="text-2xl md:text-3xl font-semibold mb-6 text-[#E2F0F0] font-serif">
                        Job Details
                    </h3>

                    <form onSubmit={handleSubmit} className="space-y-4">

                        {/* Job Title */}
                        <div className="flex items-center gap-3 rounded-xl px-4 py-3 border border-[#5F819040] bg-[#5F819010]">

                            <span className="text-xs font-bold tracking-wider shrink-0 text-[#5F8190] font-mono">
                                title ›
                            </span>

                            <input
                                onChange={(e) => { setJobTitle(e.target.value) }}
                                type="text"
                                name="jobTitle"
                                placeholder="e.g. Backend Engineer"
                                className="flex-1 bg-transparent outline-none text-sm text-[#E2F0F0]"
                            />
                        </div>

                        {/* Resume Upload */}
                        <div className="flex items-center gap-3 rounded-xl px-4 py-3 border border-[#5F819040] bg-[#5F819010]">

                            <span className="text-xs font-bold tracking-wider shrink-0 text-[#5F8190] font-mono">
                                resume ›
                            </span>

                            <input
                                ref={resumeInputRef}
                                type="file"
                                name="resume"
                                accept=".pdf"
                                className="flex-1 text-sm outline-none bg-transparent cursor-pointer text-[#5F8190]"
                            />
                        </div>

                        {/* Job Description */}
                        <textarea
                            name="jobDescription"
                            onChange={(e) => { setJobDescription(e.target.value) }}
                            placeholder="Paste the job description here..."
                            rows={7}
                            className="w-full rounded-xl px-4 py-3 text-sm outline-none resize-none border border-[#5F819040] bg-[#5F819010] text-[#E2F0F0]"
                        />

                        {/* Submit Button */}
                        <button
                            type="submit"
                            className="w-full py-3 rounded-xl font-semibold text-sm tracking-wide text-[#E2F0F0] bg-gradient-to-br from-[#36565F] to-[#5F8190] shadow-[0_4px_20px_rgba(54,86,95,0.4)] transition-all duration-200 hover:opacity-90 active:scale-95"
                        >
                            Analyse →
                        </button>

                    </form>
                </div>
            </div>
        </main>
    );
};

export default Input;