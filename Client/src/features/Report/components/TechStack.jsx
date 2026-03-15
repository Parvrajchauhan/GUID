const TechStack = () => (
    <section className="px-6 md:px-16 lg:px-24 py-20 bg-[#141414] border-t border-[#36565F]/20">
        <div className="max-w-[1200px] mx-auto">
            <p className="text-center text-[10px] font-bold tracking-[0.3em] text-[#5F8190]/40 uppercase mb-10">
                Built with Modern MERN Architecture
            </p>
            <div className="flex flex-wrap items-center justify-center gap-10 md:gap-20">
                {["MongoDB", "Express", "React", "Node"].map((tech) => (
                    <span key={tech}
                        className="text-2xl md:text-3xl font-black tracking-[0.15em]
                            text-[#36565F]/40 uppercase
                            hover:text-[#5F8190] transition-colors duration-300">
                        {tech}
                    </span>
                ))}
            </div>
        </div>
    </section>
);

export default TechStack;