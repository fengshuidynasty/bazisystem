import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { getLuckPillarDeepAnalysis } from '../engine/deepBaziAnalysis';
import { DeepCategorySection } from './DeepCategorySection';
import { LuckPillar } from '../types';
import { Clock, ShieldCheck, CheckCircle2 } from 'lucide-react';

export const LuckCycleDeepView: React.FC = () => {
  const { activeClient, chartResult } = useApp();
  const { luckPillars } = chartResult;

  // Default to current active luck pillar (e.g. 26-36 乙亥)
  const [selectedPillar, setSelectedPillar] = useState<LuckPillar>(
    luckPillars.find(p => p.isCurrent) || luckPillars[2] || luckPillars[0]
  );

  const analyses = getLuckPillarDeepAnalysis(activeClient, chartResult, selectedPillar);

  return (
    <div className="space-y-4 select-none">
      {/* Header Banner */}
      <div className="p-4 rounded-2xl bg-gradient-to-r from-blue-950/40 via-[#0B142A] to-indigo-950/30 border border-blue-500/30 flex flex-col md:flex-row md:items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-cyan-400" />
            <h3 className="text-sm font-bold text-white tracking-wide">
              十年大运五维深度推演 (Ten-Year Luck Cycle Deep Analysis)
            </h3>
            <span className="text-[10px] bg-red-500/10 text-red-400 px-2 py-0.5 rounded border border-red-500/20">
              点击下方运柱即时切换推演十年阶段
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            将本命原局与所选大运干支、十神引动、地支藏干合化深度结合，研判十年机遇与风水布局对策。
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs bg-[#081023] px-3 py-1.5 rounded-xl border border-[#16274B]">
          <span className="text-slate-400">当前研判大运：</span>
          <span className="font-bold text-cyan-300">
            {selectedPillar.ageStart}-{selectedPillar.ageEnd}岁【{selectedPillar.stem}{selectedPillar.branch}】
          </span>
          {selectedPillar.isCurrent && (
            <span className="text-[10px] px-1.5 py-0.2 rounded bg-blue-600 text-white font-bold">
              现行运程
            </span>
          )}
        </div>
      </div>

      {/* Selectable 8 Luck Pillar Cards Strip */}
      <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-8 gap-2">
        {luckPillars.map((p) => {
          const isSelected = selectedPillar.ageStart === p.ageStart;
          return (
            <div
              key={p.ageStart}
              onClick={() => setSelectedPillar(p)}
              className={`rounded-xl p-2.5 text-center cursor-pointer transition flex flex-col justify-between relative ${
                isSelected
                  ? 'bg-gradient-to-b from-[#132B5B] to-[#0A1836] border-2 border-cyan-400 glow-active shadow-lg shadow-cyan-900/50 scale-102'
                  : p.isCurrent
                  ? 'bg-[#0E1B38] border border-blue-500/60 hover:border-blue-400'
                  : 'bg-[#091124] border border-[#16274E] hover:border-slate-500'
              }`}
            >
              {p.isCurrent && (
                <div className="absolute -top-2 left-1/2 -translate-x-1/2 bg-blue-600 text-white text-[8px] px-1 rounded-full font-bold">
                  当前大运
                </div>
              )}
              <div>
                <div className="text-[10px] font-bold text-slate-300">
                  {p.ageStart} - {p.ageEnd}岁
                </div>
                <div className="text-[9px] text-slate-500 font-mono">
                  {p.yearStart} - {p.yearEnd}
                </div>
                <div className="mt-1 text-[11px] font-semibold text-rose-400">
                  {p.tenGod}
                </div>
                <div className="my-1 py-1 bg-black/40 rounded-lg">
                  <div className="text-base font-bold text-white">{p.stem}{p.branch}</div>
                </div>
                <div className="text-[9px] text-slate-400">{p.elementPair}</div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Deep Category Analysis for the selected Luck Pillar */}
      <DeepCategorySection
        analyses={analyses}
        titleSuffix={`· ${selectedPillar.ageStart}-${selectedPillar.ageEnd}岁【${selectedPillar.stem}${selectedPillar.branch}】大运`}
      />
    </div>
  );
};
