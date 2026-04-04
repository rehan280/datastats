import React, { useState } from 'react';
import './App.css';
import Sidebar from './components/Sidebar';
import Canvas from './components/Canvas';
import DataEditor from './components/DataEditor';
import ExportButton from './components/ExportButton';

export const AppContext = React.createContext();

function App() {
  const [chartData, setChartData] = useState([
    { label: '2025', value: 1200 },
    { label: '2024', value: 1150 },
    { label: '2023', value: 1000 },
    { label: '2022', value: 875 },
    { label: '2021', value: 810 },
    { label: '2020', value: 722 },
    { label: '2019', value: 643 },
    { label: '2018', value: 582 },
    { label: '2017', value: 528 },
  ]);

  const [settings, setSettings] = useState({
    chartType: 'Bar', // Bar, Pie
    title: '',
    subtitle: '',
    xAxisTitle: '',
    yAxisTitle: '',
    footerText: 'Number Of LinkedIn Users',
    brandLogoText: 'demand',
    brandLogoHighlight: 'sage',
    valueSuffix: ' Million',
    watermarkText: '',
    showLegend: false,
    showAxisLabels: true,
    showDataLabels: true,
    primaryColor: '#6bcbc5', // Teal
    secondaryColor: '#1b1442', // Navy
    yAxisMin: 'auto',
    yAxisMax: 'auto',
    barRoundness: 4,
    lineThickness: 3,
    canvasBackground: 'Solid',
    canvasBgColor: '#ffffff',
    textColor: '#333333',
    showGridLines: true,
    fontFamily: 'Inter',
  });

  const updateSetting = (key, value) => {
    setSettings((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <AppContext.Provider value={{ chartData, setChartData, settings, updateSetting }}>
      <div className="app-container">
        {/* Left Sidebar */}
        <Sidebar />

        {/* Center Area */}
        <div className="main-area">
          <div className="top-toolbar">
            <div style={{ fontWeight: 600 }}>Visualization Maker</div>
            <ExportButton />
          </div>
          
          {/* Canvas Preview */}
          <div className="canvas-wrapper">
            <Canvas />
          </div>

          {/* Data Editor Drawer */}
          <DataEditor />
        </div>
      </div>
    </AppContext.Provider>
  );
}

export default App;
