import React from 'react';
import { useApp } from '../context/AppContext';

export const TenYearLuckPillars: React.FC = () => {
  const { chartResult, setActiveTab } = useApp();
  const { luckPillars, luckStartAgeDesc } = chartResult;

  const getStemColor = (stem: string) => {
    switch (stem) {
      case '甲':
      case '乙':
        return 'text-emerald-400';
      case '丙':
      case '丁':
        return 'text-rose-500';
      case '戊':
      case '己':
        return 'text-yellow-400';
      case '庚':
      case '辛':
        return 'text-amber-200';
      case '壬':
      case '癸':
        return 'text-sky-400';
      default:
        return 'text-white';
    }
  };

  const getBranchColor = (branch: string) => {
    switch (branch) {
      case '寅':
      case '卯':
        return 'text-emerald-400';
      case '巳':
      case '午':
        return 'text-rose-500';
      case '辰':
      case '戌':
      case '丑':
      case '未':
        return 'text-yellow-400';
      case '申':
      case '酉':
        return 'text-amber-200';
      case '亥':
      case '子':
        return 'text-sky-400';
      default:
        return 'text-white';
    }
  };

  return (
    <section
      className="lg:col-span-8 bg-[#0B142A]/90 rounded-2xl border-2 border-red-500/80 p-4 shadow-xl shadow-red-950/20 relative select-none"
      data-purpose="ten-year-luck-pillars"
    >
      {/* Title & View all */}
      <div className="flex items-center justify-between pb-3 border-b border-[#142343]">
        <div className="flex items-center gap-2">
          <h3 className="text-xs font-bold text-white tracking-wide">
            十年大运 <span className="font-normal text-slate-400">（大运排盘）</span>
          </h3>
          <span className="text-[10px] bg-red-500/10 text-red-400 px-2 py-0.5 rounded border border-red-500/20">
            {luckStartAgeDesc}
          </span>
        </div>
        <button
          onClick={() => setActiveTab('dayun')}
          className="text-[11px] text-blue-400 hover:text-blue-300 flex items-center gap-1 font-medium transition"
        >
          查看全部 →
        </button>
      </div>

      {/* Grid of 8 Horizontal Luck Pillars */}
      <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-8 gap-2 mt-3.5">
        {luckPillars.map((pillar) => {
          if (pillar.isCurrent) {
            return (
              <div
                key={pillar.ageStart}
                className="rounded-xl p-2 bg-gradient-to-b from-[#132B5B] to-[#0A1836] border-2 border-blue-500 text-center flex flex-col justify-between glow-active relative transform -translate-y-1 shadow-lg shadow-blue-900/50"
              >
                {/* Active Luck Badge */}
                <div className="absolute -top-2.5 left-1/2 transform -translate-x-1/2 bg-blue-600 text-white text-[9px] px-1.5 py-0.2 rounded-full font-bold whitespace-nowrap shadow-sm border border-blue-400/40">
                  当前大运
                </div>
                <div className="pt-1">
                  <div className="text-[10px] font-bold text-cyan-300">
                    {pillar.ageStart} - {pillar.ageEnd}岁
                  </div>
                  <div className="text-[9px] text-blue-200 font-mono">
                    {pillar.yearStart} - {pillar.yearEnd}
                  </div>
                  <div className="mt-1.5 text-[11px] font-bold text-rose-400">
                    {pillar.tenGod}
                  </div>

                  {/* Stem & Branch big stack */}
                  <div className="my-1.5 py-1 bg-[#1A3772] rounded-lg shadow-inner">
                    <div className="text-lg font-bold text-emerald-300">{pillar.stem}</div>
                    <div className="text-lg font-bold text-sky-300">{pillar.branch}</div>
                  </div>
                  <div className="text-[10px] text-cyan-200 font-mono font-medium">
                    {pillar.elementPair}
                  </div>
                </div>

                <div className="mt-2 pt-1 border-t border-blue-400/30 text-[9px] text-slate-200 leading-tight">
                  <span className="text-sky-300 font-medium">{pillar.hiddenStems.join(' ')}</span>
                  <br />
                  <span className="text-blue-300 text-[8px]">({pillar.hiddenTenGods.join(' ')})</span>
                </div>
              </div>
            );
          }

          return (
            <div
              key={pillar.ageStart}
              className="rounded-xl p-2 bg-[#091124] border border-[#16274E] text-center flex flex-col justify-between hover:border-slate-500 transition"
            >
              <div>
                <div className="text-[10px] font-medium text-slate-300">
                  {pillar.ageStart} - {pillar.ageEnd}岁
                </div>
                <div className="text-[9px] text-slate-500 font-mono">
                  {pillar.yearStart} - {pillar.yearEnd}
                </div>
                <div className="mt-2 text-[11px] font-semibold text-rose-400">
                  {pillar.tenGod}
                </div>

                {/* Stem & Branch stack */}
                <div className="my-1.5 py-1 bg-[#0D1936] rounded-lg">
                  <div className={`text-base font-bold ${getStemColor(pillar.stem)}`}>
                    {pillar.stem}
                  </div>
                  <div className={`text-base font-bold ${getBranchColor(pillar.branch)}`}>
                    {pillar.branch}
                  </div>
                </div>
                <div className="text-[10px] text-slate-400 font-mono">
                  {pillar.elementPair}
                </div>
              </div>

              <div className="mt-2 pt-1 border-t border-[#142344] text-[9px] text-slate-400 leading-tight">
                <span className="text-amber-300">{pillar.hiddenStems.join(' ')}</span>
                <br />
                <span className="text-slate-500">({pillar.hiddenTenGods.join(' ')})</span>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
