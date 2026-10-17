import React, { useState } from 'react';
import { useApp } from '../context/AppContext';

export const MonthlyFortuneChart: React.FC = () => {
  const { chartResult, setActiveTab } = useApp();
  const [activeDimension, setActiveDimension] = useState<'wealth' | 'career' | 'romance' | 'family' | 'health'>('wealth');
  const [hoveredMonth, setHoveredMonth] = useState<number | null>(6);

  const { monthlyTrends, annualYear, annualPillar, peakMonthNote } = chartResult;
  const currentTrend = monthlyTrends[activeDimension];

  const dimensions = [
    { id: 'wealth', label: '财富' },
    { id: 'career', label: '事业' },
    { id: 'romance', label: '感情' },
    { id: 'family', label: '家庭' },
    { id: 'health', label: '健康' }
  ] as const;

  // SVG Coordinates mapping:
  // X: 10 + (month - 1) * 27.27 (Total width ~ 330)
  // Y: Score 0 -> 100, Score 10 -> 15 (Height 110)
  const getCoordinates = (month: number, score: number) => {
    const x = 12 + (month - 1) * 27.5;
    const y = 95 - (score / 10) * 80;
    return { x, y };
  };

  const points = currentTrend.map((item) => getCoordinates(item.month, item.score));
  const pointsStr = points.map(p => `${p.x},${p.y}`).join(' ');
  const polygonStr = `12,100 ${pointsStr} ${points[points.length - 1].x},100`;

  const activePoint = hoveredMonth !== null
    ? currentTrend.find(m => m.month === hoveredMonth) || currentTrend[5]
    : currentTrend[5];
  const activeCoord = getCoordinates(activePoint.month, activePoint.score);

  return (
    <section
      className="lg:col-span-4 bg-[#0B142A]/90 rounded-2xl border border-[#16274B] p-4 flex flex-col justify-between shadow-lg shadow-black/20 select-none"
      data-purpose="monthly-trend-card"
    >
      <div>
        {/* Title & View Details */}
        <div className="flex items-center justify-between pb-2 border-b border-[#142343]">
          <h3 className="text-xs font-semibold text-slate-200">
            {annualYear} {annualPillar}年 · 十二流月运势
          </h3>
          <button
            onClick={() => setActiveTab('monthly')}
            className="text-[11px] text-blue-400 hover:text-blue-300 flex items-center gap-0.5 transition"
          >
            查看详情 →
          </button>
        </div>

        {/* Dimension selector pills */}
        <div className="flex items-center gap-1 mt-3 overflow-x-auto pb-1 text-[11px]">
          {dimensions.map((dim) => {
            const isActive = activeDimension === dim.id;
            return (
              <button
                key={dim.id}
                onClick={() => setActiveDimension(dim.id)}
                className={`px-2.5 py-1 rounded-md transition font-medium ${
                  isActive
                    ? 'bg-blue-600 text-white shadow-sm'
                    : 'bg-[#0F1B36] text-slate-400 hover:text-white border border-[#1C2C50]'
                }`}
              >
                {dim.label}
              </button>
            );
          })}
        </div>

        {/* 1-12 Month Interactive Trend Chart */}
        <div className="relative mt-3 h-36 w-full">
          {/* Y Axis indicator */}
          <div className="absolute left-0 top-0 bottom-6 flex flex-col justify-between text-[9px] text-slate-500 font-mono">
            <span>10</span>
            <span>8</span>
            <span>6</span>
            <span>2</span>
            <span>0</span>
          </div>

          {/* Line and Grid Container */}
          <div className="ml-5 h-28 relative">
            {/* Grid horizontal guidelines */}
            <div className="absolute inset-x-0 top-0 border-b border-slate-800/40" />
            <div className="absolute inset-x-0 top-1/4 border-b border-slate-800/40" />
            <div className="absolute inset-x-0 top-2/4 border-b border-slate-800/40" />
            <div className="absolute inset-x-0 top-3/4 border-b border-slate-800/40" />
            <div className="absolute inset-x-0 bottom-0 border-b border-slate-700/60" />

            {/* Peak Month Floating Callout Bubble */}
            <div
              className="absolute -translate-x-1/2 flex flex-col items-center z-10 transition-all duration-300 pointer-events-none"
              style={{
                left: `${(activeCoord.x / 330) * 100}%`,
                top: `${Math.max(0, (activeCoord.y / 110) * 100 - 32)}%`
              }}
            >
              <span className="px-1.5 py-0.5 bg-slate-900 border border-blue-400 text-cyan-300 text-[9px] font-bold rounded shadow-lg whitespace-nowrap">
                {activePoint.month}月运势 {activePoint.score}
              </span>
              <div className="w-1.5 h-1.5 bg-slate-900 border-r border-b border-blue-400 transform rotate-45 -mt-0.5" />
              {/* Vertical dashed guideline */}
              <div className="w-[1px] h-10 border-l border-dashed border-blue-400/70 mt-0.5" />
            </div>

            {/* SVG Vector Polyline & Area */}
            <svg
              className="w-full h-full overflow-visible"
              viewBox="0 0 330 110"
              preserveAspectRatio="none"
            >
              <defs>
                <linearGradient id="lineGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.3" />
                  <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.0" />
                </linearGradient>
              </defs>

              {/* Area polygon */}
              <polygon fill="url(#lineGrad)" points={polygonStr} />

              {/* Trend Polyline */}
              <polyline
                fill="none"
                stroke="#60a5fa"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                points={pointsStr}
              />

              {/* Month Data Circles */}
              {currentTrend.map((item, idx) => {
                const coord = points[idx];
                const isSelected = item.month === activePoint.month;
                return (
                  <circle
                    key={item.month}
                    cx={coord.x}
                    cy={coord.y}
                    r={isSelected ? 4.5 : 3}
                    fill={isSelected ? '#38bdf8' : '#0A1836'}
                    stroke={isSelected ? '#ffffff' : '#93c5fd'}
                    strokeWidth="2"
                    className="cursor-pointer transition-all duration-200"
                    onMouseEnter={() => setHoveredMonth(item.month)}
                  />
                );
              })}
            </svg>
          </div>

          {/* Month X-Axis (1月 - 12月) */}
          <div className="ml-5 flex justify-between text-[9px] text-slate-400 font-mono pt-1">
            {currentTrend.map((m) => (
              <span
                key={m.month}
                onClick={() => setHoveredMonth(m.month)}
                className={`cursor-pointer transition ${
                  m.month === activePoint.month ? 'text-cyan-300 font-bold scale-110' : 'hover:text-slate-200'
                }`}
              >
                {m.month}月
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Summary Footer */}
      <div className="mt-2 pt-2 border-t border-[#142343] flex items-center justify-between text-[11px] text-slate-400">
        <span className="truncate pr-2">夏秋交际金水旺相，求财大利</span>
        <span className="text-emerald-400 font-medium whitespace-nowrap">峰值区间：芒种至小暑</span>
      </div>
    </section>
  );
};
