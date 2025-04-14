import OptionButton from "./OptionButton";

function OptionsButtons({
  title,
  bttns,
  setBttns,
  params,
  setParams,
  keyToUpdate,
  bttnContainerClasses = "ml-4 mt-4 flex",
}) {
  const handleOptionBttnClick = (id, value) => {
    const updatedButtons = bttns.map((btn) => ({
      ...btn,
      isActive: btn.id === id,
    }));
    setBttns(updatedButtons);
    setParams({
      ...params,
      [keyToUpdate]: value,
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
            handleClick={() => handleOptionBttnClick(btn.id, btn[keyToUpdate])}
            isActive={btn.isActive}
          />
        ))}
      </span>
    </div>
  );
}

export default OptionsButtons;
