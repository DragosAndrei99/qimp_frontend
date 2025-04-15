import Tooltip from "./Tooltip";

function Checkbox({ label, paramKey, params, setParams, toolTipText = "" }) {
  const handleCheckbox = () => {
    setParams({
      ...params,
      [paramKey]: !params[paramKey],
    });
  };

  return (
    <div className="mb-2">
      <label htmlFor={paramKey} className="text-md font-bold ">
        {label}
      </label>
      {toolTipText && <Tooltip toolTipText={toolTipText} toolTipId={paramKey}/>}
      <input
        id={paramKey}
        type="checkbox"
        className="form-checkbox h-5 w-5 ml-4"
        checked={params[paramKey]}
        onChange={handleCheckbox}
      />
    </div>
  );
}

export default Checkbox;
