import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { getAnnualDeepAnalysis } from '../engine/deepBaziAnalysis';
import { DeepCategorySection } from './DeepCategorySection';
import { Calendar, Sparkles, Clock, ShieldCheck } from 'lucide-react';

export const AnnualLuckDeepView: React.FC = () => {
  const { activeClient, chartResult } = useApp();
  const [selectedYear, setSelectedYear] = useState<number>(2025);

  const currentLuckPillar =
    chartResult.luckPillars.find(p => p.isCurrent) || chartResult.luckPillars[2];

  const availableYears = [
    { year: 2024, ganzhi: '甲辰', desc: '木土相感 · 偏印主事' },
    { year: 2025, ganzhi: '乙巳', desc: '当前流年 · 比肩生伤', current: true },
    { year: 2026, ganzhi: '丙午', desc: '火气鼎盛 · 伤官生财' },
    { year: 2027, ganzhi: '丁未', desc: '火土交辉 · 食神吐秀' },
    { year: 2028, ganzhi: '戊申', desc: '金土两旺 · 财官相生' }
  ];

  const analyses = getAnnualDeepAnalysis(
    activeClient,
    chartResult,
    selectedYear,
    currentLuckPillar
  );

  const activeYearObj = availableYears.find(y => y.year === selectedYear) || availableYears[1];

  return (
    <div className="space-y-4 select-none">
      {/* Top Banner */}
      <div className="p-4 rounded-2xl bg-gradient-to-r from-blue-950/40 via-[#0B142A] to-indigo-950/30 border border-blue-500/30 flex flex-col md:flex-row md:items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4 text-emerald-400" />
            <h3 className="text-sm font-bold text-white tracking-wide">
              每年流年五维深度研判 (Annual Fortune Deep Analysis)
            </h3>
            <span className="text-[10px] bg-emerald-500/10 text-emerald-300 px-2 py-0.5 rounded border border-emerald-500/20">
              岁运交感 · 逐年推演
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            将本命原局、现行十年大运【{currentLuckPillar.stem}{currentLuckPillar.branch}】与所选流年太岁结合，研判财富、事业、感情、家庭与健康。
          </p>
        </div>

        <div className="flex items-center gap-3 text-xs bg-[#081023] px-3 py-1.5 rounded-xl border border-[#16274B]">
          <div className="flex items-center gap-1.5">
            <span className="text-slate-400">现行大运：</span>
            <span className="font-semibold text-cyan-300">
              {currentLuckPillar.ageStart}-{currentLuckPillar.ageEnd}岁【{currentLuckPillar.stem}{currentLuckPillar.branch}】
            </span>
          </div>
          <span>·</span>
          <div className="flex items-center gap-1.5">
            <span className="text-slate-400">研判流年：</span>
            <span className="font-bold text-amber-300">
              {selectedYear} {activeYearObj.ganzhi}年
            </span>
          </div>
        </div>
      </div>

      {/* Selectable Year Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5">
        {availableYears.map((item) => {
          const isSelected = selectedYear === item.year;
          return (
            <button
              key={item.year}
              onClick={() => setSelectedYear(item.year)}
              className={`p-3 rounded-xl border text-center transition flex flex-col justify-between relative ${
                isSelected
                  ? 'bg-gradient-to-b from-[#162B57] to-[#0A1733] border-2 border-emerald-400 shadow-lg shadow-emerald-900/30'
                  : 'bg-[#091124] border-[#16274E] hover:border-slate-500'
              }`}
            >
              {item.current && (
                <span className="absolute -top-2 left-1/2 -translate-x-1/2 px-1.5 py-0.2 bg-emerald-600 text-[9px] text-white font-bold rounded-full">
                  当前年份
                </span>
              )}
              <div className="text-xs font-bold text-slate-200">{item.year}年</div>
              <div className="text-base font-serif font-bold text-white my-1">
                {item.ganzhi}
              </div>
              <div className="text-[10px] text-slate-400 truncate">{item.desc}</div>
            </button>
          );
        })}
      </div>

      {/* Deep 5-Category Analysis Component */}
      <DeepCategorySection
        analyses={analyses}
        titleSuffix={`· ${selectedYear} ${activeYearObj.ganzhi}年`}
      />
    </div>
  );
};
