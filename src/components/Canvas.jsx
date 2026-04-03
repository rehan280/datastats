import React, { useContext } from 'react';
import { AppContext } from '../App';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LabelList,
  PieChart, Pie, Cell, LineChart, Line, AreaChart, Area,
  RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar,
  ComposedChart, ScatterChart, Scatter, RadialBarChart, RadialBar, Treemap, ZAxis,
  FunnelChart, Funnel
} from 'recharts';
import { Users } from 'lucide-react';

function Canvas() {
  const { chartData, settings } = useContext(AppContext);

  // Customize tooltip and label formats
  const formatYAxis = (tickItem) => {
    return `${tickItem}${settings.valueSuffix || ''}`;
  };

  const formatDataLabel = (value) => {
    return `${value}${settings.valueSuffix || ''}`;
  };

  const processedData = chartData.map(item => ({
    ...item,
    value: parseFloat(item.value) || 0
  }));

  const renderChart = () => {
    if (settings.chartType === 'Bar') {
      return (
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={processedData}
            margin={{ top: 30, right: 30, left: 20, bottom: 20 }}
          >
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={settings.showGridLines ? "#eaeaea" : "transparent"} />
            
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
            
            <Bar dataKey="value" fill={settings.primaryColor} radius={[settings.barRoundness, settings.barRoundness, 0, 0]} maxBarSize={60}>
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
          <LineChart data={processedData} margin={{ top: 30, right: 30, left: 20, bottom: 20 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={settings.showGridLines ? "#eaeaea" : "transparent"} />
            {settings.showAxisLabels && (
              <XAxis dataKey="label" axisLine={true} tickLine={false} tick={{ fill: '#666', fontSize: 12 }} dy={10} />
            )}
            {settings.showAxisLabels && (
              <YAxis axisLine={false} tickLine={false} tick={{ fill: '#666', fontSize: 12 }} tickFormatter={formatYAxis} />
            )}
            <Tooltip contentStyle={{ borderRadius: '8px', border: '1px solid #ccc', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }} />
            {settings.showLegend && <Legend wrapperStyle={{ paddingTop: '20px' }} />}
            <Line type="monotone" dataKey="value" stroke={settings.primaryColor} strokeWidth={settings.lineThickness} dot={{ r: 5 }} activeDot={{ r: 8 }}>
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
          <AreaChart data={processedData} margin={{ top: 30, right: 30, left: 20, bottom: 20 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={settings.showGridLines ? "#eaeaea" : "transparent"} />
            {settings.showAxisLabels && (
              <XAxis dataKey="label" axisLine={true} tickLine={false} tick={{ fill: '#666', fontSize: 12 }} dy={10} />
            )}
            {settings.showAxisLabels && (
              <YAxis axisLine={false} tickLine={false} tick={{ fill: '#666', fontSize: 12 }} tickFormatter={formatYAxis} />
            )}
            <Tooltip contentStyle={{ borderRadius: '8px', border: '1px solid #ccc', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }} />
            {settings.showLegend && <Legend wrapperStyle={{ paddingTop: '20px' }} />}
            <Area type="monotone" dataKey="value" stroke={settings.primaryColor} strokeWidth={settings.lineThickness} fill={settings.primaryColor} fillOpacity={0.3}>
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
              data={processedData}
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
              {processedData.map((entry, index) => (
                 <Cell key={`cell-${index}`} fill={pieColors[index % pieColors.length]} />
              ))}
            </Pie>
            <Tooltip />
            {settings.showLegend && <Legend />}
          </PieChart>
        </ResponsiveContainer>
      );
    } else if (settings.chartType === 'Radar') {
      return (
        <ResponsiveContainer width="100%" height="100%">
          <RadarChart cx="50%" cy="50%" outerRadius="80%" data={processedData}>
            <PolarGrid />
            <PolarAngleAxis dataKey="label" tick={{ fill: '#666', fontSize: 12 }} />
            <PolarRadiusAxis angle={30} domain={['auto', 'auto']} tick={false} />
            <Radar name={settings.title || "Subject"} dataKey="value" stroke={settings.primaryColor} fill={settings.primaryColor} fillOpacity={0.6} />
            <Tooltip />
            {settings.showLegend && <Legend />}
          </RadarChart>
        </ResponsiveContainer>
      );
    } else if (settings.chartType === 'Combo') {
      return (
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart data={processedData} margin={{ top: 30, right: 30, left: 20, bottom: 20 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={settings.showGridLines ? "#eaeaea" : "transparent"} />
            {settings.showAxisLabels && <XAxis dataKey="label" tickLine={false} tick={{ fill: '#666', fontSize: 12 }} dy={10} />}
            {settings.showAxisLabels && <YAxis tickLine={false} tick={{ fill: '#666', fontSize: 12 }} tickFormatter={formatYAxis} />}
            <Tooltip contentStyle={{ borderRadius: '8px', border: '1px solid #ccc' }} />
            {settings.showLegend && <Legend wrapperStyle={{ paddingTop: '20px' }} />}
            <Bar dataKey="value" fill={settings.primaryColor} fillOpacity={0.4} radius={[settings.barRoundness, settings.barRoundness, 0, 0]} maxBarSize={60} />
            <Line type="monotone" dataKey="value" stroke={settings.secondaryColor} strokeWidth={settings.lineThickness} dot={{ r: 4 }} activeDot={{ r: 6 }}>
              {settings.showDataLabels && <LabelList dataKey="value" position="top" fill="#666" fontSize={12} offset={10} formatter={formatDataLabel} />}
            </Line>
          </ComposedChart>
        </ResponsiveContainer>
      );
    } else if (settings.chartType === 'Scatter') {
      return (
        <ResponsiveContainer width="100%" height="100%">
          <ScatterChart margin={{ top: 30, right: 30, left: 20, bottom: 20 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={settings.showGridLines ? "#eaeaea" : "transparent"} />
            {settings.showAxisLabels && <XAxis dataKey="label" type="category" tickLine={false} tick={{ fill: '#666', fontSize: 12 }} dy={10} />}
            {settings.showAxisLabels && <YAxis dataKey="value" type="number" tickLine={false} tick={{ fill: '#666', fontSize: 12 }} tickFormatter={formatYAxis} />}
            <ZAxis type="number" range={[100, 100]} />
            <Tooltip cursor={{ strokeDasharray: '3 3' }} contentStyle={{ borderRadius: '8px', border: '1px solid #ccc' }} />
            {settings.showLegend && <Legend />}
            <Scatter name={settings.title || "Data"} data={processedData} fill={settings.primaryColor}>
              {settings.showDataLabels && <LabelList dataKey="value" position="top" fill="#666" fontSize={12} offset={10} formatter={formatDataLabel} />}
            </Scatter>
          </ScatterChart>
        </ResponsiveContainer>
      );
    } else if (settings.chartType === 'RadialBar') {
      return (
        <ResponsiveContainer width="100%" height="100%">
          <RadialBarChart cx="50%" cy="50%" innerRadius="20%" outerRadius="90%" barSize={15} data={processedData}>
            <RadialBar minAngle={15} background clockWise dataKey="value" fill={settings.primaryColor}>
              {settings.showDataLabels && <LabelList position="insideStart" fill="#fff" fontSize={10} />}
            </RadialBar>
            {settings.showLegend && <Legend iconSize={10} layout="vertical" verticalAlign="middle" wrapperStyle={{ right: '5%' }} />}
            <Tooltip />
          </RadialBarChart>
        </ResponsiveContainer>
      );
    } else if (settings.chartType === 'Treemap') {
      // Map data for Treemap requirement
      const treeData = processedData.map(d => ({ name: d.label, size: d.value }));
      return (
        <ResponsiveContainer width="100%" height="100%">
          <Treemap width={736} height={350} data={treeData} dataKey="size" stroke="#fff" fill={settings.primaryColor}>
             <Tooltip />
          </Treemap>
        </ResponsiveContainer>
      );
    } else if (settings.chartType === 'Leaderboard') {
      const topItems = [...processedData].sort((a,b) => b.value - a.value).slice(0, 5);
      return (
        <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', gap: '16px', padding: '10px 40px', overflowY: 'auto' }}>
          {topItems.map((item, index) => (
            <div key={index} style={{ display: 'flex', alignItems: 'center', background: 'white', padding: '16px 24px', borderRadius: '12px', boxShadow: '0 4px 12px rgba(0,0,0,0.06)' }}>
              <div style={{ fontSize: '1.5rem', fontWeight: 800, color: '#ccc', width: '40px' }}>#{index + 1}</div>
              <div style={{ flex: 1, fontSize: '1.1rem', fontWeight: 600, color: '#333' }}>{item.label}</div>
              <div style={{ fontSize: '1.3rem', fontWeight: 700, color: settings.primaryColor }}>{formatDataLabel(item.value)}</div>
            </div>
          ))}
        </div>
      );
    } else if (settings.chartType === 'Funnel') {
      return (
        <ResponsiveContainer width="100%" height="100%">
          <FunnelChart margin={{ top: 20, right: 20, left: 20, bottom: 20 }}>
            <Tooltip />
            <Funnel dataKey="value" data={processedData} isAnimationActive>
              {settings.showDataLabels && <LabelList position="inside" fill="#fff" stroke="none" dataKey="label" fontSize={14} />}
              {processedData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={index === 0 ? settings.primaryColor : settings.secondaryColor} fillOpacity={1 - (index * 0.15)} />
              ))}
            </Funnel>
          </FunnelChart>
        </ResponsiveContainer>
      );
    } else if (settings.chartType === 'StatCard') {
      const topValue = processedData.length > 0 ? processedData[0] : { label: 'Empty', value: 0 };
      return (
        <div className="stat-card-view">
          <div className="stat-circle" style={{ background: settings.primaryColor }}>
            <Users size={72} strokeWidth={1.5} />
          </div>
          <div className="stat-text">
            <h2 style={{ color: settings.secondaryColor }}>
              <span style={{ fontSize: '1.2rem', fontWeight: 500, color: '#6b7280', display: 'block', marginBottom: '8px' }}>
                {topValue.label}
              </span>
              <span style={{ color: settings.primaryColor, display: 'inline' }}>{topValue.value}</span>
              {settings.valueSuffix}
            </h2>
          </div>
        </div>
      );
    }
    return <div>Select a valid chart type</div>;
  };

  return (
    <div id="canvas-export-area" className={`canvas ${settings.canvasBackground === 'Gradient' ? 'bg-gradient' : ''}`}>
      
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
