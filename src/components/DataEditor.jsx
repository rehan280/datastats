import React, { useContext } from 'react';
import { AppContext } from '../App';

function DataEditor() {
  const { chartData, setChartData } = useContext(AppContext);

  const handleDataChange = (index, field, value) => {
    const newData = [...chartData];
    newData[index] = { ...newData[index] };
    newData[index][field] = value;
    setChartData(newData);
  };

  const addRow = () => {
    setChartData([...chartData, { label: 'New Label', value: 0 }]);
  };

  const deleteRow = (index) => {
    const newData = [...chartData];
    newData.splice(index, 1);
    setChartData(newData);
  };

  const sortData = (direction) => {
    const sorted = [...chartData].sort((a, b) => {
      const valA = parseFloat(a.value) || 0;
      const valB = parseFloat(b.value) || 0;
      return direction === 'asc' ? valA - valB : valB - valA;
    });
    setChartData(sorted);
  };

  const importCSV = () => {
    const input = window.prompt("Paste CSV data (Label,Value)\\nExample:\\nSales,120\\nMarketing,85");
    if (!input) return;
    
    const lines = input.trim().split('\\n');
    const newItems = lines.map(line => {
      const [label, ...valParts] = line.split(',');
      const valStr = valParts.join(',').trim();
      return {
        label: label ? label.trim() : 'Unknown',
        value: valStr ? valStr : 0
      };
    });
    
    if (newItems.length > 0) {
      setChartData(newItems);
    }
  };

  return (
    <div className="data-editor">
      <div className="table-toolbar">
        <button className="btn btn-secondary" onClick={addRow}>+ Add Row</button>
        <button className="btn btn-secondary" onClick={importCSV}>Upload CSV</button>
        <button className="btn btn-secondary" style={{ marginLeft: 'auto' }} onClick={() => sortData('asc')}>Sort Low-High</button>
        <button className="btn btn-secondary" onClick={() => sortData('desc')}>Sort High-Low</button>
      </div>
      <div className="data-table-wrapper">
        <table className="data-table">
          <thead>
            <tr>
              <th style={{ width: '40px' }}>#</th>
              <th>Label (Text)</th>
              <th>Value (Number)</th>
              <th style={{ width: '60px', textAlign: 'center' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {chartData.map((row, index) => (
              <tr key={index}>
                <td style={{ color: '#888', textAlign: 'center' }}>{index + 1}</td>
                <td>
                  <input
                    type="text"
                    value={row.label}
                    onChange={(e) => handleDataChange(index, 'label', e.target.value)}
                  />
                </td>
                <td>
                  <input
                    type="number"
                    value={row.value === '' ? '' : row.value}
                    onChange={(e) => handleDataChange(index, 'value', e.target.value)}
                  />
                </td>
                <td style={{ textAlign: 'center' }}>
                  <button
                    onClick={() => deleteRow(index)}
                    style={{ background: 'transparent', border: 'none', color: '#ff4d4f', cursor: 'pointer', fontWeight: 'bold' }}
                    title="Delete row"
                  >
                    ×
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default DataEditor;
