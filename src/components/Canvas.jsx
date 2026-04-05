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

  const processedData = chartData
    .map(item => ({
      ...item,
      value: parseFloat(item.value) || 0,
      value2: parseFloat(item.value2) || 0
    }))
    .filter(item => {
      // Filter out rows with empty/default labels or where both values are 0
      const hasLabel = item.label && item.label.trim() !== '' && item.label.trim().toLowerCase() !== 'new label';
      const hasValue = item.value !== 0 || item.value2 !== 0;
      return hasLabel && hasValue;
    });

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
    return <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', color: settings.textColor, opacity: 0.4 }}>Select a chart type</div>;
  };

  // ─────────────────────────────────────────────────────────────────────────────
  // THEME ENGINE
  // ─────────────────────────────────────────────────────────────────────────────
  const t = settings.theme || 'Default';

  // ── Infographic Pop: full custom layout ────────────────────────────────────
  if (t === 'Infographic Pop') {
    return (
      <div id="canvas-export-area" className="canvas" style={{ background: settings.canvasBgColor, fontFamily: settings.fontFamily || 'Inter', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
        <div style={{ background: `linear-gradient(135deg, ${settings.primaryColor}, ${settings.secondaryColor})`, padding: '20px 32px 18px', flexShrink: 0 }}>
          {settings.title && <h2 style={{ color: '#FFFFFF', fontSize: '1.35rem', fontWeight: 800, margin: 0, lineHeight: 1.25 }}>{settings.title}</h2>}
          {settings.subtitle && <p style={{ color: 'rgba(255,255,255,0.85)', fontSize: '0.85rem', margin: '5px 0 0' }}>{settings.subtitle}</p>}
        </div>
        <div style={{ flex: 1, position: 'relative', overflow: 'hidden' }}>
          <div className="canvas-chart" style={{ position: 'absolute', inset: 0 }}>{renderChart()}</div>
          {settings.watermarkText && <div className="watermark">{settings.watermarkText}</div>}
        </div>
        <div style={{ padding: '8px 32px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: `2px solid ${settings.primaryColor}25`, background: `${settings.primaryColor}0C`, flexShrink: 0 }}>
          <span style={{ color: settings.textColor, fontSize: '0.8rem', opacity: 0.6 }}>{settings.footerText}</span>
          <span style={{ color: settings.primaryColor, fontSize: '0.95rem', fontWeight: 800 }}>{settings.brandLogoText}<span style={{ color: settings.secondaryColor }}>{settings.brandLogoHighlight}</span></span>
        </div>
      </div>
    );
  }

  // ── Canvas background ──────────────────────────────────────────────────────
  const getCanvasStyle = () => {
    const fontFamily = settings.fontFamily || 'Inter';
    if (t === 'Startup Gradient') {
      return { background: `linear-gradient(145deg, ${settings.primaryColor} 0%, ${settings.secondaryColor} 100%)`, fontFamily };
    }
    if (t === 'Modern Dark') {
      return {
        background: settings.canvasBgColor, fontFamily,
        backgroundImage: `radial-gradient(ellipse at 18% 25%, ${settings.primaryColor}22 0%, transparent 55%), radial-gradient(ellipse at 80% 75%, ${settings.secondaryColor}18 0%, transparent 55%)`
      };
    }
    if (t === 'Neon Cyber') {
      return {
        background: settings.canvasBgColor, fontFamily,
        backgroundImage: `linear-gradient(${settings.primaryColor}07 1px, transparent 1px), linear-gradient(90deg, ${settings.primaryColor}07 1px, transparent 1px)`,
        backgroundSize: '28px 28px'
      };
    }
    if (settings.canvasBackground === 'Gradient') {
      return { background: `linear-gradient(135deg, ${settings.canvasBgColor} 0%, #ebedee 100%)`, fontFamily };
    }
    return { background: settings.canvasBgColor, fontFamily };
  };

  // ── Top decorations ────────────────────────────────────────────────────────
  const renderTopDecoration = () => {
    if (t === 'Corporate Blue') {
      return <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: '5px', background: settings.primaryColor, zIndex: 5 }} />;
    }
    if (t === 'Magazine Editorial') {
      return <div style={{ position: 'absolute', left: 0, top: 0, right: 0, height: '5px', background: settings.primaryColor, zIndex: 5 }} />;
    }
    if (t === 'Bloomberg Terminal') {
      return (
        <>
          <div style={{ position: 'absolute', left: 0, top: 0, right: 0, height: '2px', background: settings.primaryColor, zIndex: 5 }} />
          <div style={{ position: 'absolute', top: 10, right: 20, color: settings.primaryColor, fontSize: '0.6rem', fontFamily: 'Courier New,monospace', letterSpacing: '0.18em', opacity: 0.5, zIndex: 5 }}>ANALYTICS</div>
        </>
      );
    }
    if (t === 'Neon Cyber') {
      return (
        <div style={{ position: 'absolute', inset: 6, border: `1px solid ${settings.primaryColor}20`, pointerEvents: 'none', zIndex: 5 }}>
          {[['top:0,left:0,borderTop,borderLeft'], ['top:0,right:0,borderTop,borderRight'], ['bottom:0,left:0,borderBottom,borderLeft'], ['bottom:0,right:0,borderBottom,borderRight']].map((item, i) => {
            const positions = [
              { top: -1, left: -1, borderTop: `2px solid ${settings.primaryColor}`, borderLeft: `2px solid ${settings.primaryColor}` },
              { top: -1, right: -1, borderTop: `2px solid ${settings.primaryColor}`, borderRight: `2px solid ${settings.primaryColor}` },
              { bottom: -1, left: -1, borderBottom: `2px solid ${settings.primaryColor}`, borderLeft: `2px solid ${settings.primaryColor}` },
              { bottom: -1, right: -1, borderBottom: `2px solid ${settings.primaryColor}`, borderRight: `2px solid ${settings.primaryColor}` },
            ];
            return <div key={i} style={{ position: 'absolute', width: 16, height: 16, ...positions[i] }} />;
          })}
        </div>
      );
    }
    if (t === 'Research Report') {
      return <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: '4px', background: settings.primaryColor, zIndex: 5 }} />;
    }
    return null;
  };

  // ── Title style ────────────────────────────────────────────────────────────
  const getTitleStyle = () => {
    const base = { margin: 0, lineHeight: 1.25 };
    switch (t) {
      case 'Backlinko Minimal':      return { ...base, color: settings.textColor, fontSize: '2.1rem', fontWeight: 900, textAlign: 'left', marginBottom: '14px', letterSpacing: '-0.025em' };
      case 'Bloomberg Terminal':     return { ...base, color: settings.primaryColor, fontSize: '0.9rem', fontWeight: 700, textAlign: 'left', textTransform: 'uppercase', letterSpacing: '0.1em', fontFamily: 'Courier New,monospace', marginBottom: '4px' };
      case 'Neon Cyber':             return { ...base, color: settings.primaryColor, fontSize: '1.1rem', fontWeight: 700, textAlign: 'left', textTransform: 'uppercase', letterSpacing: '0.12em', textShadow: `0 0 16px ${settings.primaryColor}80`, marginBottom: '4px' };
      case 'Magazine Editorial':     return { ...base, color: settings.textColor, fontSize: '1.85rem', fontWeight: 900, textAlign: 'left', letterSpacing: '-0.02em', paddingBottom: '12px', marginBottom: '12px', borderBottom: `3px solid ${settings.primaryColor}` };
      case 'Startup Gradient':       return { ...base, color: '#FFFFFF', fontSize: '1.55rem', fontWeight: 800, textAlign: 'center', textShadow: '0 2px 24px rgba(0,0,0,0.5)', letterSpacing: '-0.01em', marginBottom: '6px' };
      case 'Apple Minimal':          return { ...base, color: settings.textColor, fontSize: '1.5rem', fontWeight: 600, textAlign: 'center', letterSpacing: '-0.03em', marginBottom: '4px' };
      case 'Corporate Blue':         return { ...base, color: settings.textColor, fontSize: '1.4rem', fontWeight: 700, textAlign: 'left', paddingLeft: '20px', letterSpacing: '-0.01em', marginBottom: '6px' };
      case 'Research Report':        return { ...base, color: settings.textColor, fontSize: '1.25rem', fontWeight: 700, textAlign: 'left', paddingLeft: '24px', letterSpacing: '-0.005em', marginBottom: '4px' };
      case 'Warm Earth':             return { ...base, color: settings.textColor, fontSize: '1.55rem', fontWeight: 700, textAlign: 'center', letterSpacing: '0.005em', marginBottom: '8px' };
      case 'Modern Dark':            return { ...base, color: settings.textColor, fontSize: '1.5rem', fontWeight: 700, textAlign: 'center', letterSpacing: '-0.015em', marginBottom: '8px' };
      default:                       return { ...base, color: settings.textColor, fontSize: '1.6rem', fontWeight: 700, textAlign: 'center', letterSpacing: '-0.02em', marginBottom: '8px' };
    }
  };

  // ── Body padding ───────────────────────────────────────────────────────────
  const getBodyPadding = () => {
    switch (t) {
      case 'Backlinko Minimal':    return '40px 44px 10px';
      case 'Bloomberg Terminal':   return '20px 28px 10px';
      case 'Neon Cyber':           return '32px 34px 10px';
      case 'Magazine Editorial':   return '28px 34px 10px';
      case 'Corporate Blue':       return '26px 28px 10px';
      case 'Research Report':      return '26px 34px 10px';
      case 'Startup Gradient':     return '26px 32px 10px';
      case 'Apple Minimal':        return '28px 32px 8px';
      case 'Warm Earth':           return '28px 32px 10px';
      case 'Modern Dark':          return '26px 32px 10px';
      default:                     return '32px 32px 18px';
    }
  };

  // ── Footer ─────────────────────────────────────────────────────────────────
  const renderFooter = () => {
    const brand = <>{settings.brandLogoText}<span style={{ color: settings.primaryColor }}>{settings.brandLogoHighlight}</span></>;
    const brandMonospace = <span style={{ fontFamily: 'Courier New,monospace', letterSpacing: '0.08em' }}>{settings.brandLogoText.toUpperCase()} · {settings.brandLogoHighlight.toUpperCase()}</span>;

    switch (t) {
      case 'Backlinko Minimal':
        return (
          <div style={{ textAlign: 'center', padding: '4px 40px 18px', fontSize: '0.77rem', color: settings.textColor, opacity: 0.42, fontWeight: 600, letterSpacing: '0.07em', textTransform: 'uppercase' }}>
            {settings.footerText}
          </div>
        );

      case 'Neon Cyber':
        return (
          <div style={{ padding: '8px 24px', borderTop: `1px solid ${settings.primaryColor}30`, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ color: settings.primaryColor, fontSize: '0.72rem', fontFamily: 'Courier New,monospace', opacity: 0.7 }}>&gt;_ {settings.footerText}</span>
            <span style={{ color: settings.primaryColor, fontSize: '0.82rem', fontFamily: 'Courier New,monospace', fontWeight: 700, textShadow: `0 0 10px ${settings.primaryColor}` }}>
              {settings.brandLogoText}<span style={{ color: settings.secondaryColor }}>{settings.brandLogoHighlight}</span>
            </span>
          </div>
        );

      case 'Bloomberg Terminal':
        return (
          <div style={{ padding: '7px 28px', borderTop: `1px solid ${settings.primaryColor}45`, display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'rgba(0,0,0,0.5)' }}>
            <span style={{ color: settings.primaryColor, fontSize: '0.67rem', fontFamily: 'Courier New,monospace', letterSpacing: '0.08em', textTransform: 'uppercase' }}>SRC: {settings.footerText}</span>
            {brandMonospace}
          </div>
        );

      case 'Magazine Editorial':
        return (
          <div style={{ padding: '9px 34px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid #dadad0' }}>
            <span style={{ color: settings.textColor, fontSize: '0.77rem', opacity: 0.5, fontStyle: 'italic' }}>{settings.footerText}</span>
            <span style={{ color: settings.primaryColor, fontSize: '0.8rem', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.08em' }}>{settings.brandLogoText}{settings.brandLogoHighlight}</span>
          </div>
        );

      case 'Corporate Blue':
        return (
          <div style={{ padding: '11px 28px 11px 30px', borderTop: `3px solid ${settings.primaryColor}`, display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: `${settings.primaryColor}09` }}>
            <span style={{ color: settings.textColor, fontSize: '0.82rem', fontWeight: 500, opacity: 0.62 }}>{settings.footerText}</span>
            <span style={{ color: settings.primaryColor, fontSize: '0.9rem', fontWeight: 800 }}>{settings.brandLogoText}<span style={{ color: settings.secondaryColor }}>{settings.brandLogoHighlight}</span></span>
          </div>
        );

      case 'Startup Gradient':
        return (
          <div style={{ padding: '9px 32px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'rgba(0,0,0,0.3)', backdropFilter: 'blur(4px)' }}>
            <span style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.8rem' }}>{settings.footerText}</span>
            <span style={{ color: '#FFFFFF', fontSize: '0.9rem', fontWeight: 700 }}>{settings.brandLogoText}<span style={{ opacity: 0.65 }}>{settings.brandLogoHighlight}</span></span>
          </div>
        );

      case 'Apple Minimal':
        return (
          <div style={{ padding: '7px 32px 14px', textAlign: 'center', borderTop: '0.5px solid #DADADF' }}>
            <span style={{ color: settings.textColor, fontSize: '0.72rem', opacity: 0.36, letterSpacing: '0.015em' }}>{settings.footerText} · {settings.brandLogoText}{settings.brandLogoHighlight}</span>
          </div>
        );

      case 'Warm Earth':
        return (
          <div style={{ padding: '11px 32px', background: settings.primaryColor, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ color: '#FDF6EC', fontSize: '0.84rem' }}>{settings.footerText}</span>
            <span style={{ color: '#FDF6EC', fontSize: '0.9rem', fontWeight: 700 }}>{settings.brandLogoText}<span style={{ opacity: 0.6 }}>{settings.brandLogoHighlight}</span></span>
          </div>
        );

      case 'Modern Dark':
        return (
          <div style={{ padding: '10px 32px', background: `${settings.secondaryColor}DD`, borderTop: `1px solid ${settings.primaryColor}35`, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ color: settings.textColor, fontSize: '0.82rem', opacity: 0.42 }}>{settings.footerText}</span>
            <span style={{ color: settings.primaryColor, fontSize: '0.9rem', fontWeight: 700 }}>{settings.brandLogoText}<span style={{ color: '#fff', opacity: 0.75 }}>{settings.brandLogoHighlight}</span></span>
          </div>
        );

      case 'Research Report':
        return (
          <div style={{ padding: '8px 34px 8px 28px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid #d0d0d8', background: '#EAEAEF' }}>
            <span style={{ color: settings.textColor, fontSize: '0.72rem', opacity: 0.52, fontStyle: 'italic' }}>Source: {settings.footerText}</span>
            <span style={{ color: settings.primaryColor, fontSize: '0.72rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.07em' }}>{settings.brandLogoText}{settings.brandLogoHighlight}</span>
          </div>
        );

      default:
        return (
          <div className="canvas-footer" style={{ background: settings.secondaryColor }}>
            <div style={{ color: 'white', fontWeight: 300, fontSize: '0.9rem' }}>{settings.footerText}</div>
            <div className="brand-logo" style={{ color: 'white', fontWeight: 600, letterSpacing: '-0.5px', fontSize: '1.2rem' }}>
              {settings.brandLogoText}
              <span style={{ color: settings.primaryColor }}>{settings.brandLogoHighlight}</span>
            </div>
          </div>
        );
    }
  };

  // ── Subtitle alignment helpers ─────────────────────────────────────────────
  const leftAlignedThemes = ['Backlinko Minimal', 'Corporate Blue', 'Research Report', 'Magazine Editorial', 'Bloomberg Terminal', 'Neon Cyber'];
  const subtitlePL = t === 'Corporate Blue' ? '20px' : t === 'Research Report' ? '24px' : '0';

  return (
    <div id="canvas-export-area" className="canvas" style={getCanvasStyle()}>
      {renderTopDecoration()}

      <div className="canvas-body" style={{ color: settings.textColor, padding: getBodyPadding() }}>
        {settings.title && <h2 style={getTitleStyle()}>{settings.title}</h2>}

        {settings.subtitle && (
          <p style={{ margin: 0, marginBottom: '10px', textAlign: leftAlignedThemes.includes(t) ? 'left' : 'center', paddingLeft: subtitlePL, color: settings.textColor, opacity: 0.68, fontSize: '0.88rem' }}>
            {settings.subtitle}
          </p>
        )}

        <div className="canvas-chart">
          {renderChart()}
          {settings.watermarkText && <div className="watermark">{settings.watermarkText}</div>}
        </div>
      </div>

      {renderFooter()}
    </div>
  );
}

export default Canvas;


