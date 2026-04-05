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

  // Formatting utilities
  const formatYAxis = (tickItem) => {
    if (tickItem >= 1000000) return (tickItem / 1000000).toFixed(1) + 'M';
    if (tickItem >= 1000) return (tickItem / 1000).toFixed(1) + 'k';
    return tickItem;
  };

  const formatDataLabel = (value) => {
    return `${value}${settings.valueSuffix || ''}`;
  };

  const processedData = chartData.map(item => ({
    ...item,
    value: parseFloat(item.value) || 0,
    value2: parseFloat(item.value2) || 0
  }));

  const getCellOpacity = (index) => {
    const total = processedData.length;
    if (total <= 1) return 1;
    // Scale opacity from 1.0 down to 0.3 based on index
    return 1 - (index * (0.7 / (total - 1)));
  };

  const renderChart = () => {
    if (settings.chartType === 'Bar') {
      const isHorizontal = settings.barLayout === 'horizontal';
      return (
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            layout={isHorizontal ? 'vertical' : 'horizontal'}
            data={processedData}
            margin={{ top: 30, right: 30, left: 20, bottom: 20 }}
          >
            <CartesianGrid strokeDasharray="3 3" vertical={!isHorizontal} horizontal={isHorizontal} stroke={settings.showGridLines ? "#eaeaea" : "transparent"} />

            {settings.showAxisLabels && (
              <XAxis
                type={isHorizontal ? 'number' : 'category'}
                dataKey={isHorizontal ? undefined : 'label'}
                axisLine={false}
                tickLine={false}
                tick={{ fill: settings.textColor, fontSize: 12, fontWeight: 500 }}
                dy={10}
                tickFormatter={isHorizontal ? formatYAxis : undefined}
              />
            )}
            {settings.showAxisLabels && (
              <YAxis
                type={isHorizontal ? 'category' : 'number'}
                dataKey={isHorizontal ? 'label' : undefined}
                axisLine={false}
                tickLine={false}
                tick={{ fill: settings.textColor, fontSize: 12 }}
                tickFormatter={isHorizontal ? undefined : formatYAxis}
                width={isHorizontal ? 100 : 60}
              />
            )}
            <Tooltip
              cursor={{ fill: 'transparent' }}
              contentStyle={{ borderRadius: '8px', border: '1px solid #ccc', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }}
            />

            {settings.showLegend && <Legend wrapperStyle={{ paddingTop: '20px' }} />}

            <Bar name={settings.series1Name || "Value 1"} dataKey="value" fill={settings.primaryColor} radius={isHorizontal ? [0, settings.barRoundness, settings.barRoundness, 0] : [settings.barRoundness, settings.barRoundness, 0, 0]} maxBarSize={60}>
              {settings.showDataLabels && (
                <LabelList dataKey="value" position={isHorizontal ? "right" : "top"} fill={settings.textColor} fontSize={12} offset={10} formatter={formatDataLabel} />
              )}
            </Bar>
            {settings.enableSecondarySeries && (
              <Bar name={settings.series2Name || "Value 2"} dataKey="value2" fill={settings.secondaryColor} radius={isHorizontal ? [0, settings.barRoundness, settings.barRoundness, 0] : [settings.barRoundness, settings.barRoundness, 0, 0]} maxBarSize={60}>
                {settings.showDataLabels && (
                  <LabelList dataKey="value2" position={isHorizontal ? "right" : "top"} fill={settings.textColor} fontSize={12} offset={10} formatter={formatDataLabel} />
                )}
              </Bar>
            )}
          </BarChart>
        </ResponsiveContainer>
      );
    } else if (settings.chartType === 'Progress') {
      const topValue = processedData.length > 0 ? processedData[0] : { label: 'Progress', value: 50 };
      const percentage = Math.min(Math.max(topValue.value, 0), 100);
      return (
        <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '0 40px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px', alignItems: 'flex-end' }}>
             <span style={{ fontSize: '1.2rem', fontWeight: 600, color: settings.textColor }}>{topValue.label}</span>
             <span style={{ fontSize: '2.5rem', fontWeight: 800, color: settings.primaryColor }}>{formatDataLabel(percentage)}</span>
          </div>
          <div style={{ width: '100%', height: '40px', background: `${settings.textColor}15`, borderRadius: `${settings.barRoundness || 0}px`, overflow: 'hidden' }}>
             <div style={{ width: `${percentage}%`, height: '100%', background: settings.primaryColor, transition: 'width 1s ease-in-out' }}></div>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '12px', color: settings.textColor, opacity: 0.5, fontSize: '0.9rem', fontWeight: 600 }}>
            <span>0</span>
            <span>100</span>
          </div>
        </div>
      );
    } else if (settings.chartType === 'Line') {
      return (
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={processedData} margin={{ top: 30, right: 30, left: 20, bottom: 20 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={settings.showGridLines ? "#eaeaea" : "transparent"} />
            {settings.showAxisLabels && (
              <XAxis dataKey="label" axisLine={true} tickLine={false} tick={{ fill: settings.textColor, fontSize: 12 }} dy={10} />
            )}
            {settings.showAxisLabels && (
              <YAxis axisLine={false} tickLine={false} tick={{ fill: settings.textColor, fontSize: 12 }} tickFormatter={formatYAxis} />
            )}
            <Tooltip contentStyle={{ borderRadius: '8px', border: '1px solid #ccc', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }} />
            {settings.showLegend && <Legend wrapperStyle={{ paddingTop: '20px' }} />}
            <Line type="monotone" dataKey="value" stroke={settings.primaryColor} strokeWidth={settings.lineThickness} dot={{ r: 5 }} activeDot={{ r: 8 }}>
              {settings.showDataLabels && (
                <LabelList dataKey="value" position="top" fill={settings.textColor} fontSize={12} offset={10} formatter={formatDataLabel} />
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
              <XAxis dataKey="label" axisLine={true} tickLine={false} tick={{ fill: settings.textColor, fontSize: 12 }} dy={10} />
            )}
            {settings.showAxisLabels && (
              <YAxis axisLine={false} tickLine={false} tick={{ fill: settings.textColor, fontSize: 12 }} tickFormatter={formatYAxis} />
            )}
            <Tooltip contentStyle={{ borderRadius: '8px', border: '1px solid #ccc', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }} />
            {settings.showLegend && <Legend wrapperStyle={{ paddingTop: '20px' }} />}
            <Area type="monotone" dataKey="value" stroke={settings.primaryColor} strokeWidth={settings.lineThickness} fill={settings.primaryColor} fillOpacity={0.3}>
              {settings.showDataLabels && (
                <LabelList dataKey="value" position="top" fill={settings.textColor} fontSize={12} offset={10} formatter={formatDataLabel} />
              )}
            </Area>
          </AreaChart>
        </ResponsiveContainer>
      );
    } else if (settings.chartType === 'Pie' || settings.chartType === 'Doughnut') {
      const isDoughnut = settings.chartType === 'Doughnut';
      const centerValue = processedData.length > 0 ? processedData[0].value : 0;
      return (
        <div style={{ position: 'relative', width: '100%', height: '100%' }}>
          {settings.showCenterText && isDoughnut && (
            <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', textAlign: 'center', pointerEvents: 'none', zIndex: 10 }}>
               <span style={{ fontSize: '3rem', fontWeight: 800, color: settings.textColor, lineHeight: 1 }}>{formatDataLabel(centerValue)}</span>
            </div>
          )}
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
                  <Cell key={`cell-${index}`} fill={index === 0 ? settings.primaryColor : '#E5E5E5'} fillOpacity={1} />
                ))}
              </Pie>
              <Tooltip contentStyle={{ borderRadius: '8px', border: '1px solid #ccc' }} />
              {settings.showLegend && <Legend />}
            </PieChart>
          </ResponsiveContainer>
        </div>
      );
    } else if (settings.chartType === 'Radar') {
      return (
        <ResponsiveContainer width="100%" height="100%">
          <RadarChart cx="50%" cy="50%" outerRadius="80%" data={processedData}>
            <PolarGrid />
            <PolarAngleAxis dataKey="label" tick={{ fill: settings.textColor, fontSize: 12 }} />
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
            {settings.showAxisLabels && <XAxis dataKey="label" tickLine={false} tick={{ fill: settings.textColor, fontSize: 12 }} dy={10} />}
            {settings.showAxisLabels && <YAxis tickLine={false} tick={{ fill: settings.textColor, fontSize: 12 }} tickFormatter={formatYAxis} />}
            <Tooltip contentStyle={{ borderRadius: '8px', border: '1px solid #ccc' }} />
            {settings.showLegend && <Legend wrapperStyle={{ paddingTop: '20px' }} />}
            <Bar dataKey="value" fill={settings.primaryColor} fillOpacity={0.4} radius={[settings.barRoundness, settings.barRoundness, 0, 0]} maxBarSize={60} />
            <Line type="monotone" dataKey="value" stroke={settings.secondaryColor} strokeWidth={settings.lineThickness} dot={{ r: 4 }} activeDot={{ r: 6 }}>
              {settings.showDataLabels && <LabelList dataKey="value" position="top" fill={settings.textColor} fontSize={12} offset={10} formatter={formatDataLabel} />}
            </Line>
          </ComposedChart>
        </ResponsiveContainer>
      );
    } else if (settings.chartType === 'Scatter') {
      return (
        <ResponsiveContainer width="100%" height="100%">
          <ScatterChart margin={{ top: 30, right: 30, left: 20, bottom: 20 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={settings.showGridLines ? "#eaeaea" : "transparent"} />
            {settings.showAxisLabels && <XAxis dataKey="label" type="category" tickLine={false} tick={{ fill: settings.textColor, fontSize: 12 }} dy={10} />}
            {settings.showAxisLabels && <YAxis dataKey="value" type="number" tickLine={false} tick={{ fill: settings.textColor, fontSize: 12 }} tickFormatter={formatYAxis} />}
            <ZAxis type="number" range={[100, 100]} />
            <Tooltip cursor={{ strokeDasharray: '3 3' }} contentStyle={{ borderRadius: '8px', border: '1px solid #ccc' }} />
            {settings.showLegend && <Legend />}
            <Scatter name={settings.title || "Data"} data={processedData} fill={settings.primaryColor}>
              {settings.showDataLabels && <LabelList dataKey="value" position="top" fill={settings.textColor} fontSize={12} offset={10} formatter={formatDataLabel} />}
            </Scatter>
          </ScatterChart>
        </ResponsiveContainer>
      );
    } else if (settings.chartType === 'RadialBar') {
      return (
        <ResponsiveContainer width="100%" height="100%">
          <RadialBarChart cx="50%" cy="50%" innerRadius="20%" outerRadius="90%" barSize={20} data={processedData}>
            <RadialBar minAngle={15} background={{ fill: settings.textColor, fillOpacity: 0.1 }} clockWise dataKey="value">
              {processedData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={settings.primaryColor} fillOpacity={getCellOpacity(index)} />
              ))}
              {settings.showDataLabels && <LabelList position="insideStart" fill={settings.canvasBgColor} fontSize={10} />}
            </RadialBar>
            {settings.showLegend && <Legend iconSize={10} layout="vertical" verticalAlign="middle" wrapperStyle={{ right: '5%' }} />}
            <Tooltip contentStyle={{ borderRadius: '8px', border: '1px solid #ccc' }} />
          </RadialBarChart>
        </ResponsiveContainer>
      );
    } else if (settings.chartType === 'Treemap') {
      // Map data for Treemap requirement
      const treeData = processedData.map((d, index) => ({ name: d.label, size: d.value, fillOpacity: getCellOpacity(index) }));

      const CustomizedContent = (props) => {
        const { root, depth, x, y, width, height, index, payload, colors, rank, name } = props;
        return (
          <g>
            <rect x={x} y={y} width={width} height={height} style={{ fill: settings.primaryColor, fillOpacity: payload.fillOpacity, stroke: '#fff', strokeWidth: 2 }} />
            {width > 30 && height > 30 && (
              <text x={x + width / 2} y={y + height / 2} textAnchor="middle" fill="#fff" fontSize={12} dominantBaseline="central">
                {name}
              </text>
            )}
          </g>
        );
      };

      return (
        <ResponsiveContainer width="100%" height="100%">
          <Treemap width={736} height={350} data={treeData} dataKey="size" content={<CustomizedContent />}>
            <Tooltip contentStyle={{ borderRadius: '8px', border: '1px solid #ccc' }} />
          </Treemap>
        </ResponsiveContainer>
      );
    } else if (settings.chartType === 'Leaderboard') {
      const topItems = [...processedData].sort((a, b) => b.value - a.value).slice(0, 5);
      return (
        <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', gap: '16px', padding: '10px 40px', overflowY: 'auto' }}>
          {topItems.map((item, index) => (
            <div key={index} style={{ display: 'flex', alignItems: 'center', background: settings.canvasBgColor, border: `1px solid ${settings.textColor}22`, padding: '16px 24px', borderRadius: '12px', boxShadow: '0 4px 12px rgba(0,0,0,0.06)' }}>
              <div style={{ fontSize: '1.5rem', fontWeight: 800, color: settings.textColor, opacity: 0.3, width: '40px' }}>#{index + 1}</div>
              <div style={{ flex: 1, fontSize: '1.1rem', fontWeight: 600, color: settings.textColor }}>{item.label}</div>
              <div style={{ fontSize: '1.3rem', fontWeight: 700, color: settings.primaryColor }}>{formatDataLabel(item.value)}</div>
            </div>
          ))}
        </div>
      );
    } else if (settings.chartType === 'Funnel') {
      return (
        <ResponsiveContainer width="100%" height="100%">
          <FunnelChart margin={{ top: 20, right: 20, left: 20, bottom: 20 }}>
            <Tooltip contentStyle={{ borderRadius: '8px', border: '1px solid #ccc' }} />
            <Funnel dataKey="value" data={processedData} isAnimationActive>
              {settings.showDataLabels && <LabelList position="inside" fill="#fff" stroke="none" dataKey="label" fontSize={14} />}
              {processedData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={settings.primaryColor} fillOpacity={getCellOpacity(index)} />
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
              <span style={{ fontSize: '1.2rem', fontWeight: 500, color: settings.textColor, opacity: 0.8, display: 'block', marginBottom: '8px' }}>
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
    <div id="canvas-export-area" className={`canvas ${settings.canvasBackground === 'Gradient' ? 'bg-gradient' : ''}`} style={settings.canvasBackground === 'Gradient' ? { background: `linear-gradient(135deg, ${settings.canvasBgColor} 0%, #ebedee 100%)`, fontFamily: settings.fontFamily || 'Inter' } : { background: settings.canvasBgColor, fontFamily: settings.fontFamily || 'Inter' }}>

      {/* Container for content above footer */}
      <div className="canvas-body" style={{ color: settings.textColor, padding: settings.theme === 'Backlinko Minimal' ? '40px 40px 10px 40px' : '32px 32px 20px 32px' }}>

        {settings.title && (
          <h2 className="canvas-title" style={{ 
            color: settings.textColor, 
            fontSize: settings.theme === 'Backlinko Minimal' ? '2.4rem' : '1.6rem',
            fontWeight: settings.theme === 'Backlinko Minimal' ? 800 : 700,
            marginBottom: settings.theme === 'Backlinko Minimal' ? '24px' : '8px',
            lineHeight: 1.2
          }}>
            {settings.title}
          </h2>
        )}
        {settings.subtitle && (
          <p style={{ textAlign: 'center', color: settings.textColor, opacity: 0.8, marginBottom: '20px' }}>{settings.subtitle}</p>
        )}

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
        
        {/* Backlinko Style Inline Footer Text */}
        {settings.theme === 'Backlinko Minimal' && settings.footerText && (
          <div style={{ textAlign: 'center', fontSize: '0.9rem', fontWeight: 700, color: settings.textColor, marginTop: '20px', paddingBottom: '10px' }}>
            {settings.footerText}
          </div>
        )}
      </div>

      {/* Standard Footer Area */}
      {settings.theme !== 'Backlinko Minimal' && (
        <div className="canvas-footer" style={{ background: settings.secondaryColor }}>
          <div style={{ color: 'white', fontWeight: 300, fontSize: '0.9rem' }}>
            {settings.footerText}
          </div>
          <div className="brand-logo" style={{ color: 'white', fontWeight: 600, letterSpacing: '-0.5px', fontSize: '1.2rem' }}>
            {settings.brandLogoText}
            <span style={{ color: settings.primaryColor }}>{settings.brandLogoHighlight}</span>
          </div>
        </div>
      )}
    </div>
  );
}

export default Canvas;
