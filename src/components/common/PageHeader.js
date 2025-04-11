

function PageHeader({label}) {


  return (
    <div className="bg-[#1B1A46] rounded border border-[#4d447a] w-full mx-auto mb-4">
    <div className="flex flex-row justify-center items-start">
      <label className="text-xl font-bold text-white p-2 block tracking-widest w-fit bg-[#34335A]">
        {label}
      </label>
    </div>
  </div>
  )
}

export default PageHeader;