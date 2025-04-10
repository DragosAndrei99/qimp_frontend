import OptionButton from "./OptionButton";

function OptionsButtons({
  title,
  bttns,
  setBttns,
  params,
  setParams,
  bttnContainerClasses = "ml-4 mt-4 flex",
}) {
  const handleOptionBttnClick = (id, algorithm) => {
    const updatedButtons = bttns.map((btn) => ({
      ...btn,
      isActive: btn.id === id,
    }));
    setBttns(updatedButtons);
    setParams({
      ...params,
      algorithm: algorithm,
    });
  };

  return (
    <div className="mb-2">
      <label htmlFor="" className="text-md font-bold ">
        {title}:
      </label>
      <span className={bttnContainerClasses}>
        {bttns.map((btn) => (
          <OptionButton
            key={btn.id}
            id={btn.id}
            label={btn.label}
            handleClick={() => handleOptionBttnClick(btn.id, btn.algorithm)}
            isActive={btn.isActive}
          />
        ))}
      </span>
    </div>
  );
}

export default OptionsButtons;
