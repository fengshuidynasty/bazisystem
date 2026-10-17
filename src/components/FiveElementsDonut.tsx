import React from 'react';
import { useApp } from '../context/AppContext';

export const FiveElementsDonut: React.FC = () => {
  const { chartResult, setActiveTab } = useApp();
  const { wuxingPercentages, eightPointBalanceScore } = chartResult;

  // Circumference of circle r=38 is 2 * Math.PI * 38 = 238.76
  const circumference = 238.76;

  const woodOffset = 0;
  const woodDash = (wuxingPercentages.wood / 100) * circumference;

  const fireOffset = -woodDash;
  const fireDash = (wuxingPercentages.fire / 100) * circumference;

  const earthOffset = fireOffset - fireDash;
  const earthDash = (wuxingPercentages.earth / 100) * circumference;

  const metalOffset = earthOffset - earthDash;
  const metalDash = (wuxingPercentages.metal / 100) * circumference;

  const waterOffset = metalOffset - metalDash;
  const waterDash = (wuxingPercentages.water / 100) * circumference;

  return (
    <div className="bg-[#0B142A]/90 rounded-2xl border border-[#16274B] p-4 shadow-lg shadow-black/20 select-none">
      <div className="flex items-center justify-between pb-2 border-b border-[#142343]">
        <span className="text-xs font-semibold text-slate-200">五行分布</span>
        <button
          onClick={() => setActiveTab('wuxing')}
          className="text-[11px] text-blue-400 hover:text-blue-300 flex items-center gap-0.5 transition"
        >
          查看详情 →
        </button>
      </div>

      <div className="flex items-center justify-between mt-3 px-2">
        {/* SVG Circular Donut Ring */}
        <div className="relative w-28 h-28 flex items-center justify-center flex-shrink-0">
          <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
            {/* Background ring */}
            <circle
              cx="50"
              cy="50"
              r="38"
              fill="transparent"
              stroke="#101D38"
              strokeWidth="12"
            />
            {/* Wood (Green) */}
            <circle
              cx="50"
              cy="50"
              r="38"
              fill="transparent"
              stroke="#22c55e"
              strokeWidth="12"
              strokeDasharray={`${woodDash} ${circumference}`}
              strokeDashoffset={woodOffset}
            />
            {/* Fire (Red) */}
            <circle
              cx="50"
              cy="50"
              r="38"
              fill="transparent"
              stroke="#ef4444"
              strokeWidth="12"
              strokeDasharray={`${fireDash} ${circumference}`}
              strokeDashoffset={fireOffset}
            />
            {/* Earth (Yellow) */}
            <circle
              cx="50"
              cy="50"
              r="38"
              fill="transparent"
              stroke="#eab308"
              strokeWidth="12"
              strokeDasharray={`${earthDash} ${circumference}`}
              strokeDashoffset={earthOffset}
            />
            {/* Metal (Silver) */}
            <circle
              cx="50"
              cy="50"
              r="38"
              fill="transparent"
              stroke="#cbd5e1"
              strokeWidth="12"
              strokeDasharray={`${metalDash} ${circumference}`}
              strokeDashoffset={metalOffset}
            />
            {/* Water (Sky Blue) */}
            <circle
              cx="50"
              cy="50"
              r="38"
              fill="transparent"
              stroke="#38bdf8"
              strokeWidth="12"
              strokeDasharray={`${waterDash} ${circumference}`}
              strokeDashoffset={waterOffset}
            />
          </svg>

          {/* Center Balance Score */}
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
            <span className="text-xl font-bold text-white tracking-tight">{eightPointBalanceScore}</span>
            <span className="text-[9px] text-slate-400">五行平衡指数</span>
          </div>
        </div>

        {/* Five Elements Breakdown List */}
        <div className="space-y-1.5 text-xs flex-1 pl-5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
              <span className="text-slate-300">木</span>
            </div>
            <span className="font-mono text-slate-200">{wuxingPercentages.wood}%</span>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-rose-500" />
              <span className="text-slate-300">火</span>
            </div>
            <span className="font-mono text-slate-200">{wuxingPercentages.fire}%</span>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-yellow-500" />
              <span className="text-slate-300">土</span>
            </div>
            <span className="font-mono text-slate-200">{wuxingPercentages.earth}%</span>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-slate-300" />
              <span className="text-slate-300">金</span>
            </div>
            <span className="font-mono text-slate-200">{wuxingPercentages.metal}%</span>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-sky-400" />
              <span className="text-slate-300">水</span>
            </div>
            <span className="font-mono text-slate-200">{wuxingPercentages.water}%</span>
          </div>
        </div>
      </div>
    </div>
  );
};
