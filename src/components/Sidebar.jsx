import React, { useContext } from 'react';
import { AppContext } from '../App';

function Sidebar() {
  const { settings, updateSetting } = useContext(AppContext);

  const THEMES = {
    'Default':             { primary: '#FF6A3D', secondary: '#0B0B0D', bg: '#FFFFFF', text: '#0B0B0D',  font: 'Inter' },
    'Backlinko Minimal':   { primary: '#414DB0', secondary: '#45C5E6', bg: '#F8F9FA', text: '#111827',  font: 'Inter' },
    'Corporate Blue':      { primary: '#2563EB', secondary: '#1E3A8A', bg: '#FFFFFF', text: '#0F172A',  font: 'Inter' },
    'Modern Dark':         { primary: '#58A6FF', secondary: '#21262D', bg: '#0D1117', text: '#E6EDF3',  font: 'Inter' },
    'Bloomberg Terminal':  { primary: '#F59E0B', secondary: '#1C1200', bg: '#0D0A00', text: '#FDE68A',  font: 'Courier New' },
    'Startup Gradient':    { primary: '#A855F7', secondary: '#6D28D9', bg: '#6D28D9', text: '#FFFFFF',  font: 'Inter' },
    'Neon Cyber':          { primary: '#00FF88', secondary: '#00CCFF', bg: '#050510', text: '#00FF88',  font: 'Courier New' },
    'Magazine Editorial':  { primary: '#DC2626', secondary: '#7F1D1D', bg: '#FAFAF5', text: '#111111',  font: 'Georgia' },
    'Warm Earth':          { primary: '#C0622F', secondary: '#92400E', bg: '#FAF7F0', text: '#3B2006',  font: 'Inter' },
    'Apple Minimal':       { primary: '#007AFF', secondary: '#F5F5F7', bg: '#FFFFFF', text: '#1D1D1F',  font: 'Inter' },
    'Infographic Pop':     { primary: '#FF6B6B', secondary: '#4ECDC4', bg: '#FFFFFF', text: '#2C3E50',  font: 'Inter' },
    'Research Report':     { primary: '#374151', secondary: '#6B7280', bg: '#F4F4F8', text: '#111827',  font: 'Inter' },
  };

  const applyTheme = (themeName) => {
    updateSetting('theme', themeName);
    const theme = THEMES[themeName];
    if (theme) {
      updateSetting('primaryColor', theme.primary);
      updateSetting('secondaryColor', theme.secondary);
      updateSetting('canvasBgColor', theme.bg);
      updateSetting('textColor', theme.text);
      updateSetting('fontFamily', theme.font);
      updateSetting('canvasBackground', 'Solid');
    }
  };


  return (
    <div className="sidebar">
      <div className="sidebar-header">Chart Setup</div>

      <div className="panel-section">
        <h3>Main Properties</h3>
        <div className="input-group">
          <label>Design Theme</label>
          <select value={settings.theme} onChange={(e) => applyTheme(e.target.value)}>
            <option value="Custom">— Custom —</option>
            <option value="Default">Default (Orange)</option>
            <option value="Backlinko Minimal">Backlinko Minimal</option>
            <option value="Corporate Blue">Corporate Blue</option>
            <option value="Modern Dark">Modern Dark</option>
            <option value="Bloomberg Terminal">Bloomberg Terminal</option>
            <option value="Startup Gradient">Startup Gradient</option>
            <option value="Neon Cyber">Neon Cyber</option>
            <option value="Magazine Editorial">Magazine Editorial</option>
            <option value="Warm Earth">Warm Earth</option>
            <option value="Apple Minimal">Apple Minimal</option>
            <option value="Infographic Pop">Infographic Pop</option>
            <option value="Research Report">Research Report</option>
          </select>
        </div>
        <div className="input-group">
          <label>Chart Type</label>
          <select value={settings.chartType} onChange={(e) => updateSetting('chartType', e.target.value)}>
            <option value="Bar">Column/Bar Chart</option>
            <option value="Progress">Progress Bar</option>
            <option value="Line">Line Chart</option>
            <option value="Area">Area Chart</option>
            <option value="Pie">Pie (Solid) Chart</option>
            <option value="Doughnut">Doughnut Chart</option>
            <option value="Radar">Radar (Spider) Chart</option>
            <option value="RadialBar">Radial Bar Chart</option>
            <option value="Treemap">Treemap Chart</option>
            <option value="Scatter">Scatter Plot</option>
            <option value="Combo">Combo (Bar+Line)</option>
            <option value="Funnel">Funnel Chart</option>
            <option value="Leaderboard">Leaderboard List</option>
            <option value="StatCard">Stat / Value Card</option>
          </select>
        </div>
      </div>

      <div className="panel-section">
        <h3>Text</h3>
        <div className="toggle-group">
          <span>Legend</span>
          <label className="switch">
            <input type="checkbox" checked={settings.showLegend} onChange={(e) => updateSetting('showLegend', e.target.checked)} />
            <span className="slider"></span>
          </label>
        </div>
        <div className="toggle-group">
          <span>Axis labels</span>
          <label className="switch">
            <input type="checkbox" checked={settings.showAxisLabels} onChange={(e) => updateSetting('showAxisLabels', e.target.checked)} />
            <span className="slider"></span>
          </label>
        </div>
        <div className="toggle-group">
          <span>Data labels</span>
          <label className="switch">
            <input type="checkbox" checked={settings.showDataLabels} onChange={(e) => updateSetting('showDataLabels', e.target.checked)} />
            <span className="slider"></span>
          </label>
        </div>
        <div className="toggle-group">
          <span>Grid lines</span>
          <label className="switch">
            <input type="checkbox" checked={settings.showGridLines} onChange={(e) => updateSetting('showGridLines', e.target.checked)} />
            <span className="slider"></span>
          </label>
        </div>

        <div className="input-group" style={{ marginTop: '12px' }}>
          <label>Title</label>
          <input type="text" placeholder="Add title" value={settings.title} onChange={(e) => updateSetting('title', e.target.value)} />
        </div>
        <div className="input-group">
          <label>Subtitle</label>
          <input type="text" placeholder="Add subtitle" value={settings.subtitle} onChange={(e) => updateSetting('subtitle', e.target.value)} />
        </div>
      </div>

      <div className="panel-section">
        <h3>X Axis</h3>
        <div className="input-group">
          <label>X axis title</label>
          <input type="text" placeholder="Add X axis title" value={settings.xAxisTitle} onChange={(e) => updateSetting('xAxisTitle', e.target.value)} />
        </div>
      </div>

      <div className="panel-section">
        <h3>Y Axis</h3>
        <div className="input-group">
          <label>Y axis title</label>
          <input type="text" placeholder="Add Y axis title" value={settings.yAxisTitle} onChange={(e) => updateSetting('yAxisTitle', e.target.value)} />
        </div>
        <div className="input-group">
          <label>Value Suffix (e.g. Million, %)</label>
          <input type="text" placeholder="e.g. Million" value={settings.valueSuffix} onChange={(e) => updateSetting('valueSuffix', e.target.value)} />
        </div>
      </div>

      <div className="panel-section">
        <h3>Branding & Footer</h3>
        <div className="input-group">
          <label>Footer Text</label>
          <input type="text" placeholder="e.g. Number Of LinkedIn Users" value={settings.footerText} onChange={(e) => updateSetting('footerText', e.target.value)} />
        </div>
        <div className="input-group">
          <label>Brand Logo (White)</label>
          <input type="text" placeholder="e.g. demand" value={settings.brandLogoText} onChange={(e) => updateSetting('brandLogoText', e.target.value)} />
        </div>
        <div className="input-group">
          <label>Brand Logo Highlight (Primary Color)</label>
          <input type="text" placeholder="e.g. sage" value={settings.brandLogoHighlight} onChange={(e) => updateSetting('brandLogoHighlight', e.target.value)} />
        </div>
        <div className="input-group">
          <label>Watermark</label>
          <input type="text" placeholder="e.g. CONFIDENTIAL" value={settings.watermarkText} onChange={(e) => updateSetting('watermarkText', e.target.value)} />
        </div>
      </div>

      <div className="panel-section">
        <h3>Colors & Appearance</h3>
        <div className="input-group" style={{ flexDirection: 'row', alignItems: 'center', gap: '12px' }}>
          <input type="color" value={settings.primaryColor} onChange={(e) => updateSetting('primaryColor', e.target.value)} style={{ padding: 0, width: '40px', height: '40px', border: 'none', borderRadius: '4px' }} />
          <label style={{ margin: 0 }}>Primary (Chart Color)</label>
        </div>
        <div className="input-group" style={{ flexDirection: 'row', alignItems: 'center', gap: '12px', marginTop: '12px' }}>
          <input type="color" value={settings.secondaryColor} onChange={(e) => updateSetting('secondaryColor', e.target.value)} style={{ padding: 0, width: '40px', height: '40px', border: 'none', borderRadius: '4px' }} />
          <label style={{ margin: 0 }}>Secondary (Navy Footer)</label>
        </div>
        <div className="input-group" style={{ flexDirection: 'row', alignItems: 'center', gap: '12px', marginTop: '12px' }}>
          <input type="color" value={settings.canvasBgColor} onChange={(e) => updateSetting('canvasBgColor', e.target.value)} style={{ padding: 0, width: '40px', height: '40px', border: 'none', borderRadius: '4px' }} />
          <label style={{ margin: 0 }}>Canvas Background</label>
        </div>
        <div className="input-group" style={{ flexDirection: 'row', alignItems: 'center', gap: '12px', marginTop: '12px' }}>
          <input type="color" value={settings.textColor} onChange={(e) => updateSetting('textColor', e.target.value)} style={{ padding: 0, width: '40px', height: '40px', border: 'none', borderRadius: '4px' }} />
          <label style={{ margin: 0 }}>Chart Text & Grid</label>
        </div>
        <div className="input-group" style={{ marginTop: '16px' }}>
          <label>Background Style</label>
          <select value={settings.canvasBackground} onChange={(e) => updateSetting('canvasBackground', e.target.value)}>
            <option value="Solid">Solid Color</option>
            <option value="Gradient">Premium Gradient</option>
          </select>
        </div>
        {settings.chartType === 'Bar' && (
          <>
            <div className="input-group">
              <label>Bar Roundness ({settings.barRoundness}px)</label>
              <input type="range" min="0" max="24" value={settings.barRoundness} onChange={(e) => updateSetting('barRoundness', Number(e.target.value))} />
            </div>
            <div className="input-group">
              <label>Bar Orientation</label>
              <select value={settings.barLayout} onChange={(e) => updateSetting('barLayout', e.target.value)}>
                <option value="vertical">Vertical (Column)</option>
                <option value="horizontal">Horizontal (Bar)</option>
              </select>
            </div>
          </>
        )}
        {(settings.chartType === 'Pie' || settings.chartType === 'Doughnut') && (
          <div className="toggle-group" style={{ marginTop: '16px' }}>
            <span>Show Center Text</span>
            <label className="switch">
              <input type="checkbox" checked={settings.showCenterText} onChange={(e) => updateSetting('showCenterText', e.target.checked)} />
              <span className="slider"></span>
            </label>
          </div>
        )}
        {(settings.chartType === 'Line' || settings.chartType === 'Area' || settings.chartType === 'Combo') && (
          <div className="input-group">
            <label>Line Thickness ({settings.lineThickness}px)</label>
            <input type="range" min="1" max="10" value={settings.lineThickness} onChange={(e) => updateSetting('lineThickness', Number(e.target.value))} />
          </div>
        )}
      </div>
    </div>
  );
}

export default Sidebar;
