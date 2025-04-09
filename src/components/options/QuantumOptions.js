function QuantumOptions({
  rootPixelsForTile,
  handleRootPixelsForTileChange,
  rootPixelsForTileError,
  setThreshold
}) {
  return (
    <>
      <div className="mb-2">
        <label htmlFor="powerOf2Input" className="text-md font-bold ">
          Width/ Height for each tile:
        </label>
        <input
          id="powerOf2Input"
          type="number"
          min="2"
          max="128"
          value={rootPixelsForTile}
          onChange={handleRootPixelsForTileChange}
          placeholder="0 - 128"
          className="bg-[#131333] p-1 ml-4 rounded-md font-bold text-white"
        />
        {rootPixelsForTileError && (
          <div className="text-sm text-red-600">{rootPixelsForTileError}</div>
        )}
      </div>

      <div className="mb-2">
        <label htmlFor="" className="text-md font-bold ">
          Threshold:
        </label>

        <button
          className="bg-[#131333] hover:bg-[#323159] 
                    text-sm text-white
                    py-1 px-4
                    shadow-md hover:shadow-lg 
                    focus:outline-none focus:ring-2
                    cursor-pointer disabled:cursor-not-allowed
                    ml-4"
          onClick={setThreshold}
        >
          No Threshold
        </button>

        <button
          className="bg-[#131333] hover:bg-[#323159] 
                    text-sm text-white
                    py-1 px-4
                    shadow-md hover:shadow-lg 
                    focus:outline-none focus:ring-2
                    cursor-pointer disabled:cursor-not-allowed"
          onClick={setThreshold}
        >
          Normal Threshold
        </button>

        <button
          className="bg-[#131333] hover:bg-[#323159] 
                    text-sm text-white
                    py-1 px-4
                    shadow-md hover:shadow-lg 
                    focus:outline-none focus:ring-2
                    cursor-pointer disabled:cursor-not-allowed"
          onClick={setThreshold}
        >
          x2 Threshold
        </button>
      </div>

      <div className="mb-2">
        <label htmlFor="" className="text-md font-bold ">
          Replace margins of the tiles:
        </label>
        <input
          type="checkbox"
          className="form-checkbox h-5 w-5 ml-4"
          checked={true}
          onChange={() => {}}
        />
      </div>

      <div className="mb-2">
        <label htmlFor="" className="text-md font-bold ">
          Highlight edges:
        </label>
        <input
          type="checkbox"
          className="form-checkbox h-5 w-5 ml-4"
          checked={false}
          onChange={() => {}}
        />
      </div>

      <div className="mb-2">
        <label htmlFor="" className="text-md font-bold ">
          Run Gaussian Blur:
        </label>
        <input
          type="checkbox"
          className="form-checkbox h-5 w-5 ml-4"
          checked={false}
          onChange={() => {}}
        />

        <span className="opacity-20">
          <label htmlFor="kernelSize" className="text-md font-bold ml-5">
            Kernel Size:
          </label>
          <input
            id="kernelSize"
            type="number"
            min="3"
            max="20"
            placeholder="0 - 20"
            className="bg-[#131333] p-1 ml-4 rounded-md font-bold text-white"
            disabled={true}
          />

          <label htmlFor="sigma" className="text-md font-bold ml-5">
            Sigma:
          </label>
          <input
            id="sigma"
            type="number"
            min="1"
            max="5"
            placeholder="0 - 5"
            className="bg-[#131333] p-1 ml-4 rounded-md font-bold text-white"
            disabled={true}
          />
        </span>
      </div>
    </>
  );
}

export default QuantumOptions;
