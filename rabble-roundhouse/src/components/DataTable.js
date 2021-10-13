const DataTable = () => {
  const appData = [

    {name: 'smss.exe', device: 'Stark', path: '\\Device\\HarddiskVolume2\\Windows\\System32\\smss.exe', status: 'scheduled'},
    
    {name: 'netsh.exe', device: 'Targaryen', path: '\\Device\\HarddiskVolume2\\Windows\\System32\\netsh.exe', status: 'available'},
    
    {name: 'uxtheme.dll', device: 'Lannister', path: '\\Device\\HarddiskVolume1\\Windows\\System32\\uxtheme.dll', status: 'available'},
    
    {name: 'cryptbase.dll', device: 'Martell', path: '\\Device\\HarddiskVolume1\\Windows\\System32\\cryptbase.dll', status: 'scheduled'},
    
    {name: '7za.exe', device: 'Baratheon', path: '\\Device\\HarddiskVolume1\\temp\\7za.exe', status: 'scheduled'}
    ]
    
    const showDownloads = () => {
        alert("hi");
    }
   

  return (
    <div className='dataTable'>
      <h2><input type="checkbox"/>None Selected </h2>
      <h2  onClick={showDownloads} >&#10515; Download Selected</h2>
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
              <td><input type='checkbox'></input></td>
              <td>{item.name}</td>
              <td>{item.device}</td>
              <td>{item.path}</td>
              <td className={`${item.status==='available'?'available':'scheduled'}`}>{item.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DataTable;
