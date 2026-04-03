import React, { useContext } from 'react';
import { AppContext } from '../App';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LabelList,
  PieChart, Pie, Cell, LineChart, Line, AreaChart, Area
} from 'recharts';

function Canvas() {
  const { chartData, settings } = useContext(AppContext);

  // Customize tooltip and label formats
  const formatYAxis = (tickItem) => {
    return `${tickItem}${settings.valueSuffix || ''}`;
  };

  const formatDataLabel = (value) => {
    return `${value}${settings.valueSuffix || ''}`;
  };

  const renderChart = () => {
    if (settings.chartType === 'Bar') {
      return (
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={chartData}
            margin={{ top: 30, right: 30, left: 20, bottom: 20 }}
          >
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#eaeaea" />
            
            {settings.showAxisLabels && (
              <XAxis 
                dataKey="label" 
                axisLine={true}
                tickLine={false}
                tick={{ fill: '#666', fontSize: 12 }} 
                dy={10}
              />
            )}
            
            {settings.showAxisLabels && (
              <YAxis 
                axisLine={false}
                tickLine={false}
                tick={{ fill: '#666', fontSize: 12 }}
                tickFormatter={formatYAxis}
                domain={['auto', 'auto']}
              />
            )}
            
            <Tooltip 
              cursor={{fill: 'transparent'}}
              contentStyle={{ borderRadius: '8px', border: '1px solid #ccc', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }}
            />
            
            {settings.showLegend && <Legend wrapperStyle={{ paddingTop: '20px' }} />}
            
            <Bar dataKey="value" fill={settings.primaryColor} radius={[4, 4, 0, 0]} maxBarSize={60}>
              {settings.showDataLabels && (
                <LabelList dataKey="value" position="top" fill="#666" fontSize={12} offset={10} formatter={formatDataLabel} />
              )}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      );
    } else if (settings.chartType === 'Line') {
      return (
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={chartData} margin={{ top: 30, right: 30, left: 20, bottom: 20 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#eaeaea" />
            {settings.showAxisLabels && (
              <XAxis dataKey="label" axisLine={true} tickLine={false} tick={{ fill: '#666', fontSize: 12 }} dy={10} />
            )}
            {settings.showAxisLabels && (
              <YAxis axisLine={false} tickLine={false} tick={{ fill: '#666', fontSize: 12 }} tickFormatter={formatYAxis} />
            )}
            <Tooltip contentStyle={{ borderRadius: '8px', border: '1px solid #ccc', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }} />
            {settings.showLegend && <Legend wrapperStyle={{ paddingTop: '20px' }} />}
            <Line type="monotone" dataKey="value" stroke={settings.primaryColor} strokeWidth={3} dot={{ r: 5 }} activeDot={{ r: 8 }}>
              {settings.showDataLabels && (
                <LabelList dataKey="value" position="top" fill="#666" fontSize={12} offset={10} formatter={formatDataLabel} />
              )}
            </Line>
          </LineChart>
        </ResponsiveContainer>
      );
    } else if (settings.chartType === 'Area') {
      return (
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={chartData} margin={{ top: 30, right: 30, left: 20, bottom: 20 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#eaeaea" />
            {settings.showAxisLabels && (
              <XAxis dataKey="label" axisLine={true} tickLine={false} tick={{ fill: '#666', fontSize: 12 }} dy={10} />
            )}
            {settings.showAxisLabels && (
              <YAxis axisLine={false} tickLine={false} tick={{ fill: '#666', fontSize: 12 }} tickFormatter={formatYAxis} />
            )}
            <Tooltip contentStyle={{ borderRadius: '8px', border: '1px solid #ccc', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }} />
            {settings.showLegend && <Legend wrapperStyle={{ paddingTop: '20px' }} />}
            <Area type="monotone" dataKey="value" stroke={settings.primaryColor} fill={settings.primaryColor} fillOpacity={0.3}>
              {settings.showDataLabels && (
                <LabelList dataKey="value" position="top" fill="#666" fontSize={12} offset={10} formatter={formatDataLabel} />
              )}
            </Area>
          </AreaChart>
        </ResponsiveContainer>
      );
    } else if (settings.chartType === 'Pie' || settings.chartType === 'Doughnut') {
      const isDoughnut = settings.chartType === 'Doughnut';
      const pieColors = [settings.primaryColor, settings.secondaryColor, '#e0e0e0', '#3b82f6', '#8b5cf6', '#ec4899', '#f59e0b', '#10b981'];
      return (
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={chartData}
              cx="50%"
              cy="50%"
              innerRadius={isDoughnut ? 80 : 0}
              outerRadius={140}
              fill="#8884d8"
              paddingAngle={isDoughnut ? 2 : 0}
              dataKey="value"
              nameKey="label"
              label={settings.showDataLabels ? ({ name, value }) => `${name} (${value}${settings.valueSuffix || ''})` : false}
            >
              {chartData.map((entry, index) => (
                 <Cell key={`cell-${index}`} fill={pieColors[index % pieColors.length]} />
              ))}
            </Pie>
            <Tooltip />
            {settings.showLegend && <Legend />}
          </PieChart>
        </ResponsiveContainer>
      );
    }
    return <div>Select a valid chart type</div>;
  };

  return (
    <div id="canvas-export-area" className="canvas" style={{ background: '#ffffff' }}>
      
      {/* Container for content above footer */}
      <div className="canvas-body">
        
        {/* Title / Subtitle */}
        {settings.title && <div className="canvas-title">{settings.title}</div>}
        {settings.subtitle && <div style={{ textAlign: 'center', color: '#666', marginBottom: '16px' }}>{settings.subtitle}</div>}

        {/* The actual chart */}
        <div className="canvas-chart">
          {renderChart()}
          
          {/* Watermark overlay */}
          {settings.watermarkText && (
            <div className="watermark">
              {settings.watermarkText}
            </div>
          )}
        </div>
      </div>

      {/* Footer Area */}
      <div className="canvas-footer" style={{ background: settings.secondaryColor }}>
        <div style={{ color: 'white', fontWeight: 300, fontSize: '0.9rem' }}>
          {settings.footerText}
        </div>
        <div className="brand-logo" style={{ color: 'white', fontWeight: 600, letterSpacing: '-0.5px', fontSize: '1.2rem' }}>
          {settings.brandLogoText}
          <span style={{ color: settings.primaryColor }}>{settings.brandLogoHighlight}</span>
        </div>
      </div>
    </div>
  );
}

export default Canvas;
