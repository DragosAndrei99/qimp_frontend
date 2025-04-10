function InputNumber({
  label,
  paramKey,
  paramErrKey,
  value,
  params,
  setParams,
  paramsErrors,
  setParamsErros,
  errorMessage,
  isDisabled,
  inputPlaceholder,
  errorCondition,
  successCondition,
}) {
  const handleKernelSizeChange = (e) => {
    const inputValue = e.target.value;
    const numericValue = parseInt(inputValue, 10);
    setParams({
      ...params,
      [paramKey]: inputValue,
    });
    if (inputValue === "" || errorCondition(inputValue)) {
      setParamsErros({
        ...paramsErrors,
        [paramErrKey]: errorMessage,
      });
    } else if (successCondition(numericValue)) {
      setParams({
        ...params,
        [paramKey]: numericValue,
      });

      setParamsErros({
        ...paramsErrors,
        [paramErrKey]: "",
      });
    } else {
      setParamsErros({
        ...paramsErrors,
        [paramErrKey]: errorMessage,
      });
    }
  };

  return (
    <span>
      <label htmlFor={paramKey} className="text-md font-bold">
        {label}
      </label>
      <input
        id={paramKey}
        type="number"
        placeholder={inputPlaceholder}
        value={value || ""}
        onChange={handleKernelSizeChange}
        className="bg-[#131333] p-1 ml-4 rounded-md font-bold text-white w-[60px]"
        disabled={isDisabled}
      />
      {paramsErrors[paramErrKey] && (
        <div className="text-sm text-red-600">{paramsErrors[paramErrKey]}</div>
      )}
    </span>
  );
}

export default InputNumber;
