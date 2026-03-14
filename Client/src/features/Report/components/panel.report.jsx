const Panel = ({ children }) => {
  return (
    <div className="h-full overflow-y-auto rounded-xl p-5 md:p-7
    bg-[rgba(20,20,20,0.78)] border border-slate-600/20 backdrop-blur-lg">
      {children}
    </div>
  );
};

export default Panel;