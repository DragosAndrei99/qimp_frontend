function Options({ title, children }) {
  return (
    <div className="bg-[#1B1A46] p-4 rounded border border-[#4d447a] w-full max-w-3xl mx-auto text-[#B6B5C3]">
      <label className="text-xs font-bold text-white mb-2 p-2 block tracking-widest w-fit whitespace-nowrap bg-[#34335A]">
        {title || "OPTIONS"}
      </label>
      {children}
    </div>
  );
}

export default Options;
