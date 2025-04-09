

function DetectEdgesButton({ isDisabled, handleClick, error }) {

  return (
    <div className="fixed bottom-0 left-0 md:left-64 right-0 flex justify-center p-6 bg-[##010031]">
    <button
        disabled={isDisabled}
        onClick={handleClick}
        className="bg-emerald-500 hover:bg-emerald-600 
                  text-lg text-white font-bold
                  py-2 px-12
                  rounded-lg 
                  shadow-md hover:shadow-lg 
                  transition-all duration-200 
                  transform hover:scale-105 disabled:transform-none
                  focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:ring-opacity-75
                  active:scale-95 disabled:active:scale-100
                  cursor-pointer disabled:cursor-not-allowed"
      >
        {isDisabled ? "Processing..." : "Detect Edges"}
      </button>
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  )
}

export default DetectEdgesButton;