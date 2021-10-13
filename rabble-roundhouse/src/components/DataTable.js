import React, { useState } from 'react';
const DataTable = ({appData}) => {
  const [selectedCount, setSelectedCount] = useState(0);
  const showDownloads = () => {
    alert("hi");
  };
  const updateCount = (checked) => {
      checked===true?setSelectedCount(selectedCount+1):setSelectedCount(selectedCount-1);
  }
  return (
    <div className="dataTable">
      <h2>
        <input type="checkbox" />
        {selectedCount===0?'None Selected':`Selected ${selectedCount}`}
      </h2>
      <h2 onClick={showDownloads}>&#10515; Download Selected</h2>
      <table>
        <tbody>
          <td>
            <th></th>
            <th>Name</th>
            <th>Device</th>
            <th>Path</th>
          </td>
          {appData.map((item, i) => (
            <tr key={i}>
              <td>
                <input
                  type="checkbox"
                  onChange={(e)=>updateCount(e.currentTarget.checked)} 
                  {...(item.status === "available"
                    ? { disabled: false }
                    : { disabled: true })}
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
