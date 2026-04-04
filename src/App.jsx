import React, { useState, useEffect, useRef } from 'react';
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
    primaryColor: '#FF6A3D', // Orange
    secondaryColor: '#0B0B0D', // Dark Text
    yAxisMin: 'auto',
    yAxisMax: 'auto',
    barRoundness: 4,
    lineThickness: 3,
    canvasBackground: 'Solid',
    canvasBgColor: '#FFFFFF',
    textColor: '#0B0B0D',
    showGridLines: true,
    fontFamily: 'Inter',
  });

  const updateSetting = (key, value) => {
    setSettings((prev) => ({ ...prev, [key]: value }));
  };

  const [scale, setScale] = useState(1);
  const wrapperRef = useRef(null);

  useEffect(() => {
    const handleResize = () => {
      if (wrapperRef.current) {
        const availableWidth = wrapperRef.current.clientWidth - 40;
        const availableHeight = wrapperRef.current.clientHeight - 40;
        
        const scaleW = availableWidth / 800;
        const scaleH = availableHeight / 450;
        
        // Take the smallest scale to ensure it always fits entirely vertically and horizontally
        const newScale = Math.max(Math.min(scaleW, scaleH, 1), 0.2);
        setScale(newScale);
      }
    };
    
    window.addEventListener('resize', handleResize);
    setTimeout(handleResize, 10);
    
    return () => window.removeEventListener('resize', handleResize);
  }, []);

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
          <div className="canvas-wrapper" ref={wrapperRef} style={{ display: 'flex' }}>
            <div style={{ width: 800 * scale, height: 450 * scale, position: 'relative', margin: 'auto' }}>
              <div style={{ transform: `scale(${scale})`, transformOrigin: 'top left', width: 800, height: 450 }}>
                <Canvas />
              </div>
            </div>
          </div>

          {/* Data Editor Drawer */}
          <DataEditor />
        </div>
      </div>
    </AppContext.Provider>
  );
}

export default App;
