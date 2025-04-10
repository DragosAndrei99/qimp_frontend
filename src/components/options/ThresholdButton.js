
function ThresholdButton({id, label, handleClick, isActive}) {

  return (
    <button
    id={id}
    className={`bg-[#131333] 
              text-sm text-white
              py-1 px-4
              shadow-md hover:shadow-lg 
              focus:outline-none focus:ring-2
              cursor-pointer disabled:cursor-not-allowed
              ${isActive ? 'bg-[#323159]' : 'bg-[#131333]'}`}
    onClick={handleClick}
  >
    {label}
  </button>
  )
}

export default ThresholdButton;