import React from 'react';
import { useApp } from '../context/AppContext';

export const TenGodsDistribution: React.FC = () => {
  const { chartResult, setActiveTab } = useApp();
  const { eightPointBreakdown } = chartResult;

  // Split into 2 columns of 5 gods each
  const leftCol = eightPointBreakdown.filter((_, idx) => idx % 2 === 0);
  const rightCol = eightPointBreakdown.filter((_, idx) => idx % 2 === 1);

  return (
    <div
      className="bg-[#0B142A]/90 rounded-2xl border border-[#16274B] p-4 shadow-lg shadow-black/20 select-none"
      data-purpose="shishen-analysis"
    >
      <div className="flex items-center justify-between pb-2 border-b border-[#142343]">
        <div>
          <span className="text-xs font-semibold text-slate-200">十神力量分配</span>
          <span className="text-[10px] text-slate-400 ml-1">(八分辅助精算)</span>
        </div>
        <button
          onClick={() => setActiveTab('shishen')}
          className="text-[11px] text-blue-400 hover:text-blue-300 flex items-center gap-0.5 transition"
        >
          查看详情 →
        </button>
      </div>

      {/* Ten Gods 10-Dimensional Dual Column Bar Compare */}
      <div className="grid grid-cols-2 gap-x-4 gap-y-2 mt-3 text-[11px]">
        {/* Left column */}
        <div className="space-y-2">
          {leftCol.map((item) => (
            <div key={item.god} className="flex items-center justify-between">
              <span className="text-slate-400 w-7">{item.god}</span>
              <div className="flex-1 mx-2 bg-slate-800 rounded-full h-1.5 overflow-hidden">
                <div
                  className="h-1.5 rounded-full transition-all duration-500"
                  style={{
                    width: `${item.percentage}%`,
                    backgroundColor: item.color
                  }}
                />
              </div>
              <span className={`font-mono w-7 text-right ${item.value > 0 ? 'text-slate-300' : 'text-slate-500'}`}>
                {item.value.toFixed(2)}
              </span>
            </div>
          ))}
        </div>

        {/* Right column */}
        <div className="space-y-2">
          {rightCol.map((item) => (
            <div key={item.god} className="flex items-center justify-between">
              <span className="text-slate-400 w-7">{item.god}</span>
              <div className="flex-1 mx-2 bg-slate-800 rounded-full h-1.5 overflow-hidden">
                <div
                  className="h-1.5 rounded-full transition-all duration-500"
                  style={{
                    width: `${item.percentage}%`,
                    backgroundColor: item.color
                  }}
                />
              </div>
              <span className={`font-mono w-7 text-right ${item.value > 0 ? 'text-slate-300' : 'text-slate-500'}`}>
                {item.value.toFixed(2)}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
