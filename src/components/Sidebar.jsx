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
        <div className="input-group" style={{ marginTop: '16px' }}>
          <label>Canvas Background</label>
          <select value={settings.canvasBackground} onChange={(e) => updateSetting('canvasBackground', e.target.value)}>
            <option value="Solid">Solid White</option>
            <option value="Gradient">Premium Gradient</option>
          </select>
        </div>
        {settings.chartType === 'Bar' && (
          <div className="input-group">
            <label>Bar Roundness ({settings.barRoundness}px)</label>
            <input type="range" min="0" max="24" value={settings.barRoundness} onChange={(e) => updateSetting('barRoundness', Number(e.target.value))} />
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
