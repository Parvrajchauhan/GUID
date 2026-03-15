import React, { useRef, useState } from "react";
import Cube from "../components/cube.input";

const InputCard = ({ onSubmit }) => {
    const [jobTitle, setJobTitle] = useState("");
    const [jobDescription, setJobDescription] = useState("");
    const resumeInputRef = useRef();

    const handleSubmit = (e) => {
        e.preventDefault();
        const resume = resumeInputRef.current.files[0];
        onSubmit({ jobTitle, jobDescription, resume });
    };

    return (
        <div className="flex flex-col md:flex-row
            w-full md:max-w-[960px] md:flex-shrink-0
            rounded-2xl overflow-hidden
            shadow-[0_0_80px_rgba(54,86,95,0.35)]
            border border-white/[0.05]">

            {/* Left decorative panel — desktop only */}
            <div className="hidden md:flex flex-col justify-between p-10 select-none
                w-[42%] flex-shrink-0
                bg-gradient-to-br from-[#36565F] to-[#141414]
                border-r border-white/[0.05]">
                <div>
                    <p className="text-xs tracking-widest uppercase mb-6 text-[#5F8190] font-mono">
                        Resume Assistant · AI
                    </p>
                    <h2 className="text-4xl font-bold leading-tight text-[#E2F0F0] font-serif">
                        Analyse Your Resume
                    </h2>
                    <p className="mt-4 text-sm leading-relaxed text-[#5F8190]">
                        Upload your resume and paste a job description. Let AI do the heavy lifting.
                    </p>
                </div>
                <Cube />
                <div />
            </div>

            {/* Form panel */}
            <div className="flex-1 p-6 md:p-10 bg-[#141414e0] backdrop-blur-xl">

                {/* Mobile-only heading */}
                <p className="md:hidden text-[10px] tracking-[0.2em] uppercase mb-1 text-[#5F8190] font-mono">
                    Resume Assistant · AI
                </p>

                <h3 className="text-2xl md:text-3xl font-semibold mb-6 text-[#E2F0F0] font-serif">
                    Job Details
                </h3>

                <form onSubmit={handleSubmit} className="space-y-4">

                    {/* Job Title */}
                    <div className="flex items-center gap-3 rounded-xl px-4 py-3
                        border border-[#5F819040] bg-[#5F819010]
                        focus-within:border-[#7ecfeb]/40 transition-all duration-200">
                        <span className="text-xs font-bold tracking-wider shrink-0 text-[#5F8190] font-mono">
                            title ›
                        </span>
                        <input
                            onChange={(e) => setJobTitle(e.target.value)}
                            type="text"
                            placeholder="e.g. Backend Engineer"
                            className="flex-1 bg-transparent outline-none text-sm text-[#E2F0F0] placeholder:text-[#5F8190]/50"
                        />
                    </div>

                    {/* Resume Upload */}
                    <div className="flex items-center gap-3 rounded-xl px-4 py-3
                        border border-[#5F819040] bg-[#5F819010]
                        focus-within:border-[#7ecfeb]/40 transition-all duration-200">
                        <span className="text-xs font-bold tracking-wider shrink-0 text-[#5F8190] font-mono">
                            resume ›
                        </span>
                        <input
                            ref={resumeInputRef}
                            type="file"
                            accept=".pdf"
                            className="flex-1 text-sm outline-none bg-transparent cursor-pointer text-[#5F8190]
                                file:mr-3 file:py-1 file:px-3 file:rounded-lg file:border-0
                                file:text-[11px] file:font-bold file:tracking-wide
                                file:bg-[#5F8190]/20 file:text-[#7ecfeb]
                                hover:file:bg-[#5F8190]/30 file:cursor-pointer file:transition-all"
                        />
                    </div>

                    {/* Job Description */}
                    <textarea
                        onChange={(e) => setJobDescription(e.target.value)}
                        placeholder="Paste the job description here..."
                        rows={7}
                        className="w-full rounded-xl px-4 py-3 text-sm outline-none resize-none
                            border border-[#5F819040] bg-[#5F819010]
                            focus:border-[#7ecfeb]/40 focus:bg-[#5F819015]
                            text-[#E2F0F0] placeholder:text-[#5F8190]/50
                            transition-all duration-200"
                    />

                    {/* Submit */}
                    <button
                        type="submit"
                        className="w-full py-3 rounded-xl font-semibold text-sm tracking-wide
                            text-[#E2F0F0]
                            bg-gradient-to-br from-[#36565F] to-[#5F8190]
                            shadow-[0_4px_20px_rgba(54,86,95,0.4)]
                            hover:opacity-90 active:scale-95 transition-all duration-200"
                    >
                        Analyse →
                    </button>
                </form>
            </div>
        </div>
    );
};

export default InputCard;