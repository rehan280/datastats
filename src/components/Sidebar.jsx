import React, { useContext } from 'react';
import { AppContext } from '../App';

function Sidebar() {
  const { settings, updateSetting } = useContext(AppContext);

  return (
    <div className="sidebar">
      <div className="sidebar-header">Chart Setup</div>

      <div className="panel-section">
        <h3>Main Properties</h3>
        <div className="input-group">
          <label>Chart Type</label>
          <select value={settings.chartType} onChange={(e) => updateSetting('chartType', e.target.value)}>
            <option value="Bar">Column/Bar Chart</option>
            <option value="Line">Line Chart</option>
            <option value="Area">Area Chart</option>
            <option value="Pie">Pie Chart</option>
            <option value="Doughnut">Doughnut Chart</option>
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
        <h3>Colors</h3>
        <div className="input-group" style={{ flexDirection: 'row', alignItems: 'center', gap: '8px' }}>
          <input type="color" value={settings.primaryColor} onChange={(e) => updateSetting('primaryColor', e.target.value)} style={{ padding: 0, width: '40px', height: '40px', border: 'none' }} />
          <label style={{ margin: 0 }}>Primary (Chart Color)</label>
        </div>
        <div className="input-group" style={{ flexDirection: 'row', alignItems: 'center', gap: '8px', marginTop: '12px' }}>
          <input type="color" value={settings.secondaryColor} onChange={(e) => updateSetting('secondaryColor', e.target.value)} style={{ padding: 0, width: '40px', height: '40px', border: 'none' }} />
          <label style={{ margin: 0 }}>Secondary (Navy Footer)</label>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
