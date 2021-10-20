const SelectAllSwitch = (props) => {
  // Output JSX for Component
  return (
    <>
      <input
        name="Select All Checkbox"
        type="checkbox"
        ref={props.checkboxRef}
        onClick={props.selectAll}
      />
    </>
  );
};

export default SelectAllSwitch;
