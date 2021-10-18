import React, { useState, useEffect } from "react";
const DataTable = ({ appData }) => {
  // SHOW DOWNLOADS FUNCTIONALITY
  // Clicking "Download Selected" when some or all items are displayed
  // should generate an alert box with the path and device of all selected files.
  const showDownloads = () => {
    let downloadItems = '';
    appData.forEach((obj, index) => {
      if (obj.status === 'available' && checkedState[index] === true) {
        downloadItems +=
          '\nPath: ' + obj.path + '\nDevice: ' + obj.device + '\n';
      }
    });
    if (downloadItems === '') {
      alert('No items selected and available for download.');
    } else {
      alert('Items selected & available for download: \n' + downloadItems);
    }
  };

  // Creates an array to for the storing check box inputs checked state
  const [checkedState, setCheckedState] = useState(
    new Array(appData.length).fill(false)
  );
  // Total number of check boxes available
  const totalSelectable = checkedState.length;
  // Store the current number of checked
  let numChecked = 0;
  useEffect(() => {
    numChecked = checkedState.reduce((a, b) => a + b);
  });

  // SELECT ALL FUNCTIONALITY
  const selectAll = () => {
    let updatedCheckedState = [];    
    // Clicking the select-all checkbox should select all items if none or some are selected.
    // Clicking the select-all checkbox should de-select all items if all are currently selected.
      if (numChecked < totalSelectable) {
        updatedCheckedState = new Array(appData.length).fill(true)
      } else {
        updatedCheckedState = new Array(appData.length).fill(false)
      }
    setCheckedState(updatedCheckedState);
  };

  // Handling SelectAll State
  const checkboxRef = React.useRef();
  
  useEffect(() => {
    handleSelectAllChange();
  });
  const handleSelectAllChange = () => {
    // The select-all checkbox should be in an unselected state 
    // if no items are selected.
    if (numChecked === 0) {
      checkboxRef.current.checked = false;
      checkboxRef.current.indeterminate = false;
    }
    // The select-all checkbox should be in an indeterminate state 
    // if some but not all items are selected.
    else if (numChecked < totalSelectable) {
      checkboxRef.current.checked = false;
      checkboxRef.current.indeterminate = true;
    } 
    //The select-all checkbox should be in a selected state 
    // if all items are selected.
    else {
      checkboxRef.current.checked = true;
      checkboxRef.current.indeterminate = false;
    }
  };

  // Update array storing checked states
  const handleCheckboxChange = (position) => {
    const updatedCheckedState = checkedState.map((item, index) =>
      index === position ? !item : item
    );
    setCheckedState(updatedCheckedState);
  };

  
  // Output JSX for Component
  return (
    <div className="dataTable">
      <input name="Select All Checkbox" type="checkbox" ref={checkboxRef} onClick={selectAll} />
      <h2>
        {checkedState.reduce((a, b) => a + b) === 0
          ? "None Selected"
          : `Selected ${checkedState.reduce((a, b) => a + b)}`}
      </h2>
      <h2 onClick={showDownloads}>&#10515;&nbsp;Download Selected</h2>
      <table>
        <thead>
          <tr>
            <th></th>
            <th>Name</th>
            <th>Device</th>
            <th>Path</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {appData.map((item, i) => (
            <tr key={i} className={checkedState[i] ? "selected" : ""}>
              <td>
                <input
                  type="checkbox"
                  value={item.path}
                  checked={checkedState[i]}
                  onChange={() => handleCheckboxChange(i)}
                ></input>
              </td>
              <td>{item.name}</td>
              <td>{item.device}</td>
              <td>{item.path}</td>
              <td
                className={`${
                  item.status === "available" ? "available" : "scheduled"
                }`}
              >
                {item.status}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DataTable;
