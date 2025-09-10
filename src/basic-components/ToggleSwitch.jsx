const ToggleSwitch = (props) => {
  const {
    label1,
    label2,
    isTrue = false,
    handleToggle = () => {},
    bgColor = "bg-blue-500",
    disabled = false
  } = props;

  return (
    <div className="flex items-center gap-2">
      {/* Label1 */}
      {label1 && <span className={`text-sm font-medium`}>{label1}</span>}

      {/* Toggle Switch */}
      <div
        onClick={!disabled ? handleToggle : null}
        disabled={disabled}
        className={`relative inline-flex items-center h-[18px] w-[32px] transition-colors duration-300 ${
          disabled ? "cursor-not-allowed" : "cursor-pointer"
        } ${isTrue ? bgColor : "bg-[#E4E4E7]"} rounded-full`}
      >
        <span
          className={`inline-block w-[14px] h-[14px] transform transition-transform duration-300 bg-white shadow-lg rounded-full ${
            isTrue ? "translate-x-[16px]" : "translate-x-[2px]"
          }`}
        ></span>
      </div>

      {/* Label2 */}
      {label2 && (
        <span
          className={`text-sm font-medium ${
            isTrue ? "text-black" : "text-gray-400"
          }`}
        >
          {label2}
        </span>
      )}
    </div>
  );
};

export default ToggleSwitch;
