function Button({
  isDisabled,
  handleClick,
  error,
  isProcessing,
  buttonText,
  containerClasses,
  bttnClasses
}) {
  return (
    <div className={containerClasses}>
      <button
        disabled={isDisabled}
        onClick={handleClick}
        className={bttnClasses}
      >
        {isProcessing ? "Processing..." : buttonText}
      </button>
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
}

export default Button;
