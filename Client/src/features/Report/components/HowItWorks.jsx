const steps = [
    {
        num: "01",
        title: "Upload Resume",
        desc: "Securely upload your CV in PDF or DOCX format for parsing.",
    },
    {
        num: "02",
        title: "Paste Job Description",
        desc: "Paste the target JD to let GUID find the specific requirements.",
    },
    {
        num: "03",
        title: "Get Analysis",
        desc: "Receive a detailed breakdown of your match score and skill gaps.",
    },
    {
        num: "04",
        title: "Prep for Interview",
        desc: "Generate targeted questions based on the JD's specific tech stack.",
    },
];

const HowItWorks = () => (
    <section id="how-it-works" className="px-6 md:px-16 lg:px-24 py-28 bg-[#0d1a1f]">
        <div className="max-w-[1200px] mx-auto">

            <div className="text-center mb-16">
                <p className="text-[11px] font-bold tracking-[0.25em] text-[#5F8190] uppercase mb-3">
                    01 · Process
                </p>
                <h2 className="text-4xl md:text-5xl font-extrabold text-[#E2F0F0] tracking-tight">
                    How GUID Works
                </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {steps.map((step) => (
                    <div key={step.num}
                        className="rounded-2xl p-7
                            bg-[#141414] border border-[#36565F]/30
                            hover:border-[#5F8190]/50 hover:bg-[#1a2830]
                            transition-all duration-300 group">
                        <p className="text-3xl font-black text-[#36565F] mb-5
                            group-hover:text-[#5F8190] transition-colors duration-300 font-mono">
                            {step.num}
                        </p>
                        <h3 className="text-base font-bold text-[#E2F0F0] mb-3">{step.title}</h3>
                        <p className="text-sm text-[#E2F0F0]/35 leading-relaxed">{step.desc}</p>
                    </div>
                ))}
            </div>
        </div>
    </section>
);

export default HowItWorks;