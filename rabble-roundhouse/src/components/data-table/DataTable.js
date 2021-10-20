import React, { useState, useEffect } from "react";
import ItemData from "../ItemData";
import SelectAllCheckbox from "./SelectAllSwitch";

const DataTable = ({ appData }) => {
  // SHOW DOWNLOADS FUNCTIONALITY
  // Clicking "Download Selected" when some or all items are displayed
  // should generate an alert box with the path and device of all selected files.
  const showDownloads = () => {
    let downloadItems = "";
    appData.forEach((obj, index) => {
      if (obj.status === "available" && obj.checked === true) {
        downloadItems +=
          "\nPath: " + obj.path + "\nDevice: " + obj.device + "\n";
      }
    });
    if (downloadItems === "") {
      alert("No items selected and available for download.");
    } else {
      alert("Items selected & available for download: \n" + downloadItems);
    }
  };

  // Convert App Data to App Data State
  const [appDataState, setAppDataState] = useState(appData);

  // Function that sets all checked key value pairs in appDataState to boolVal parameter
  const setAllChecked = (boolVal) => {
    let tempObjArr = [];
    appDataState.forEach((obj, index) => {
      obj["checked"] = boolVal;
      tempObjArr.push(obj);
    });
    setAppDataState(tempObjArr);
  };
  // Add Key Value Pair for Checked State to appDataState, only run once to initialize
  useState(() => {
    setAllChecked(false);
  }, []);

  // Variable for the total number of check boxes available
  const totalSelectable = appDataState.length;

  // Stores the current number of checked checkboxes
  const [numChecked, setNumChecked] = useState(0);
  useEffect(() => {
    let totalChecked = 0;
    appDataState.forEach((obj, index) => {
      if (obj.checked === true) totalChecked++;
    });
    setNumChecked(totalChecked);
  }, [appDataState]);

  // Select All Switch Functionality
  const selectAll = () => {
    // Clicking the select-all checkbox selects all items if none or some are selected.
    // Clicking the select-all checkbox de-selects all items if all are currently selected.
    if (numChecked < totalSelectable) {
      setAllChecked(true);
    } else {
      setAllChecked(false);
    }
  };

  // Handles the SelectAll Reference
  const checkboxRef = React.useRef();

  useEffect((numChecked) => {
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

  // Update checked states on change of checkbox
  const handleCheckboxChange = (position) => {
    let tempObjArr = [];
    appDataState.forEach((obj, index) => {
      if (index===position) obj.checked = !obj.checked;
      tempObjArr.push(obj);
    });
    setAppDataState(tempObjArr);
  };


  // Output JSX for Component
  return (
    <div className="dataTable">
      <SelectAllCheckbox checkboxRef={checkboxRef} selectAll={selectAll} />
      <h2>{numChecked === 0 ? "None Selected" : `Selected ${numChecked}`}</h2>
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
          {appDataState.map((item, i) => (
            <tr key={i} className={item.checked ? "selected" : ""}>
              <ItemData
                type="checkbox"
                item={item}                
                onChange={() => handleCheckboxChange(i)}
              />
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DataTable;
