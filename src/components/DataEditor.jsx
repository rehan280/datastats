import React, { useContext } from 'react';
import { AppContext } from '../App';

function DataEditor() {
  const { chartData, setChartData, settings, updateSetting } = useContext(AppContext);

  const handleDataChange = (index, field, value) => {
    const newData = [...chartData];
    newData[index] = { ...newData[index] };
    newData[index][field] = value;
    setChartData(newData);
  };

  const addRow = () => {
    setChartData([...chartData, { label: 'New Label', value: 0, value2: 0 }]);
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
    const input = window.prompt("Paste CSV data (Label,Value1,Value2)\\nExample:\\nSales,120,90\\nMarketing,85,60");
    if (!input) return;
    
    const lines = input.trim().split('\\n');
    const newItems = lines.map(line => {
      const [label, val1Str, val2Str] = line.split(',');
      return {
        label: label ? label.trim() : 'Unknown',
        value: val1Str ? val1Str.trim() : 0,
        value2: val2Str ? val2Str.trim() : null
      };
    });
    
    if (newItems.length > 0) {
      setChartData(newItems);
      // Auto-enable secondary series if second value is found
      if (newItems.some(item => item.value2 !== null && item.value2 !== undefined)) {
        updateSetting('enableSecondarySeries', true);
      }
    }
  };

  return (
    <div className="data-editor">
      <div className="table-toolbar">
        <button className="btn btn-secondary" onClick={addRow}>+ Add Row</button>
        <button className="btn btn-secondary" onClick={importCSV}>Upload CSV</button>
        
        <label style={{ marginLeft: '12px', display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.9rem', cursor: 'pointer' }}>
          <input 
            type="checkbox" 
            checked={settings.enableSecondarySeries} 
            onChange={(e) => updateSetting('enableSecondarySeries', e.target.checked)} 
          />
          Dual Series
        </label>

        <button className="btn btn-secondary" style={{ marginLeft: 'auto' }} onClick={() => sortData('asc')}>Sort Low-High</button>
        <button className="btn btn-secondary" onClick={() => sortData('desc')}>Sort High-Low</button>
      </div>
      <div className="data-table-wrapper">
        <table className="data-table">
          <thead>
            <tr>
              <th style={{ width: '40px' }}>#</th>
              <th>Label (Text)</th>
              <th>
                <input 
                  type="text" 
                  value={settings.series1Name} 
                  onChange={(e) => updateSetting('series1Name', e.target.value)}
                  style={{ fontWeight: 'bold', border: '1px solid transparent', background: 'transparent', padding: '2px 4px', width: '100%', fontSize: '0.8rem', color: 'inherit' }}
                  title="Click to edit series name"
                />
              </th>
              {settings.enableSecondarySeries && (
                <th>
                  <input 
                    type="text" 
                    value={settings.series2Name} 
                    onChange={(e) => updateSetting('series2Name', e.target.value)}
                    style={{ fontWeight: 'bold', border: '1px solid transparent', background: 'transparent', padding: '2px 4px', width: '100%', fontSize: '0.8rem', color: 'inherit' }}
                    title="Click to edit series name"
                  />
                </th>
              )}
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
                {settings.enableSecondarySeries && (
                  <td>
                    <input
                      type="number"
                      value={row.value2 === undefined || row.value2 === '' ? '' : row.value2}
                      onChange={(e) => handleDataChange(index, 'value2', e.target.value)}
                    />
                  </td>
                )}
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
