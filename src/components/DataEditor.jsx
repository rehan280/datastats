import React, { useContext } from 'react';
import { AppContext } from '../App';

function DataEditor() {
  const { chartData, setChartData } = useContext(AppContext);

  const handleDataChange = (index, field, value) => {
    const newData = [...chartData];
    // If value field, parse as float, else keep string
    if (field === 'value') {
      const num = parseFloat(value);
      newData[index][field] = isNaN(num) ? value : num;
    } else {
       newData[index][field] = value;
    }
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

  return (
    <div className="data-editor">
      <div className="table-toolbar">
        <button className="btn" style={{ background: '#e0e0e0', color: '#333' }} onClick={addRow}>+ Add Row</button>
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
