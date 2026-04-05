import React, { useContext } from 'react';
import { AppContext } from '../App';

function Sidebar() {
  const { settings, updateSetting } = useContext(AppContext);

  const applyTheme = (themeName) => {
    updateSetting('theme', themeName);
    
    if (themeName === 'Default') {
      updateSetting('primaryColor', '#FF6A3D');
      updateSetting('secondaryColor', '#0B0B0D');
      updateSetting('canvasBgColor', '#FFFFFF');
      updateSetting('textColor', '#0B0B0D');
    } else if (themeName === 'Backlinko Minimal') {
      updateSetting('primaryColor', '#414DB0');
      updateSetting('secondaryColor', '#45C5E6');
      updateSetting('canvasBgColor', '#F8F9FA');
      updateSetting('textColor', '#111827');
      updateSetting('canvasBackground', 'Solid');
      updateSetting('fontFamily', 'Inter');
    } else if (themeName === 'Corporate Blue') {
      updateSetting('primaryColor', '#1E3A8A');
      updateSetting('secondaryColor', '#3B82F6');
      updateSetting('canvasBgColor', '#FFFFFF');
      updateSetting('textColor', '#1E40AF');
    } else if (themeName === 'Modern Dark') {
      updateSetting('primaryColor', '#10B981');
      updateSetting('secondaryColor', '#374151');
      updateSetting('canvasBgColor', '#111827');
      updateSetting('textColor', '#F3F4F6');
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
            <option value="Custom">Custom</option>
            <option value="Default">Default (Orange)</option>
            <option value="Backlinko Minimal">Backlinko Minimal (Light)</option>
            <option value="Corporate Blue">Corporate Blue</option>
            <option value="Modern Dark">Modern Dark</option>
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
