import React, { useState } from 'react';
import { useApp } from '../context/AppContext';

export const FourPillarsTable: React.FC = () => {
  const { chartResult } = useApp();
  const [viewMode, setViewMode] = useState<'horizontal' | 'vertical'>('horizontal');

  const {
    hourPillar,
    dayPillar,
    monthPillar,
    yearPillar,
    strengthEvaluation,
    dayMaster
  } = chartResult;

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

  const getElementColor = (el: string) => {
    switch (el) {
      case '木':
        return 'text-emerald-400';
      case '火':
        return 'text-rose-400';
      case '土':
        return 'text-yellow-400';
      case '金':
        return 'text-slate-300';
      case '水':
        return 'text-sky-400';
      default:
        return 'text-slate-300';
    }
  };

  return (
    <section
      className="lg:col-span-5 bg-[#0B142A]/90 rounded-2xl border border-[#16274B] p-4 flex flex-col justify-between shadow-lg shadow-black/20 select-none"
      data-purpose="bazi-chart"
    >
      <div>
        {/* Header & Mode Switch */}
        <div className="flex items-center justify-between pb-3 border-b border-[#142343]">
          <div className="flex items-center gap-2">
            <h3 className="text-xs font-bold text-white tracking-wide">四柱八字命盘</h3>
            <span className="text-[10px] bg-blue-500/10 text-blue-400 px-1.5 py-0.5 rounded border border-blue-500/20">
              子平真诠法则
            </span>
          </div>

          {/* Toggle buttons */}
          <div className="inline-flex p-0.5 rounded-lg bg-[#070D1F] border border-[#16264A] text-[11px]">
            <button
              onClick={() => setViewMode('horizontal')}
              className={`px-2.5 py-1 rounded transition ${
                viewMode === 'horizontal'
                  ? 'bg-blue-600 text-white font-medium shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              横向排盘 (客户版)
            </button>
            <button
              onClick={() => setViewMode('vertical')}
              className={`px-2.5 py-1 rounded transition ${
                viewMode === 'vertical'
                  ? 'bg-blue-600 text-white font-medium shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              竖向排盘 (专业版)
            </button>
          </div>
        </div>

        {/* Four Pillars Chart: Standard order [Hour | Day(Day Master) | Month | Year] */}
        <div className="mt-3 overflow-hidden rounded-xl border border-[#192B54]">
          <table className="w-full text-center border-collapse text-xs">
            <thead>
              <tr className="text-[11px] font-semibold text-slate-300">
                <th className="py-1.5 px-1 bg-slate-800/80 border-r border-b border-[#192B54] w-1/4">
                  <span className="block text-slate-300">时柱</span>
                  <span className="text-[9px] font-normal text-slate-400">Hour</span>
                </th>
                <th className="py-1.5 px-1 bg-pink-950/70 border-r border-b border-[#192B54] w-1/4 text-pink-300">
                  <span className="block font-bold">日柱</span>
                  <span className="text-[9px] font-normal text-pink-400">Day (命主)</span>
                </th>
                <th className="py-1.5 px-1 bg-emerald-950/70 border-r border-b border-[#192B54] w-1/4 text-emerald-300">
                  <span className="block">月柱</span>
                  <span className="text-[9px] font-normal text-emerald-400">Month</span>
                </th>
                <th className="py-1.5 px-1 bg-amber-950/70 border-b border-[#192B54] w-1/4 text-amber-300">
                  <span className="block">年柱</span>
                  <span className="text-[9px] font-normal text-amber-400">Year</span>
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#16274B] bg-[#0A1226]/60">
              {/* Ten Gods Row */}
              <tr>
                <td className="py-1.5 border-r border-[#16274B] text-slate-300 font-medium">
                  {hourPillar.tenGod}
                </td>
                <td className="py-1.5 border-r border-[#16274B] text-yellow-300 font-bold bg-pink-950/30">
                  命主
                </td>
                <td className="py-1.5 border-r border-[#16274B] text-slate-300 font-medium">
                  {monthPillar.tenGod}
                </td>
                <td className="py-1.5 text-slate-300 font-medium">
                  {yearPillar.tenGod}
                </td>
              </tr>

              {/* Heavenly Stems Row */}
              <tr className="bg-[#0D1833]">
                {/* Hour Stem */}
                <td className="py-2.5 border-r border-[#16274B]">
                  <span className={`text-xl font-bold ${getStemColor(hourPillar.stem)}`}>
                    {hourPillar.stem}
                  </span>
                  <span className="text-[10px] text-amber-300 font-mono ml-0.5">
                    ({hourPillar.stemElementZh})
                  </span>
                </td>
                {/* Day Stem (命主) */}
                <td className="py-2.5 border-r border-[#16274B] bg-emerald-950/20">
                  <span className={`text-xl font-bold ${getStemColor(dayPillar.stem)}`}>
                    {dayPillar.stem}
                  </span>
                  <span className="text-[10px] text-emerald-300 font-mono ml-0.5">
                    ({dayPillar.stemElementZh})
                  </span>
                </td>
                {/* Month Stem */}
                <td className="py-2.5 border-r border-[#16274B]">
                  <span className={`text-xl font-bold ${getStemColor(monthPillar.stem)}`}>
                    {monthPillar.stem}
                  </span>
                  <span className="text-[10px] text-sky-300 font-mono ml-0.5">
                    ({monthPillar.stemElementZh})
                  </span>
                </td>
                {/* Year Stem */}
                <td className="py-2.5">
                  <span className={`text-xl font-bold ${getStemColor(yearPillar.stem)}`}>
                    {yearPillar.stem}
                  </span>
                  <span className="text-[10px] text-amber-300 font-mono ml-0.5">
                    ({yearPillar.stemElementZh})
                  </span>
                </td>
              </tr>

              {/* Earthly Branches Row */}
              <tr className="bg-[#0B152E]">
                {/* Hour Branch */}
                <td className="py-2.5 border-r border-[#16274B]">
                  <span className={`text-xl font-bold ${getBranchColor(hourPillar.branch)}`}>
                    {hourPillar.branch}
                  </span>
                  <span className="text-[10px] text-rose-400 font-mono ml-0.5">
                    ({hourPillar.branchElementZh})
                  </span>
                </td>
                {/* Day Branch */}
                <td className="py-2.5 border-r border-[#16274B] bg-rose-950/20">
                  <span className={`text-xl font-bold ${getBranchColor(dayPillar.branch)}`}>
                    {dayPillar.branch}
                  </span>
                  <span className="text-[10px] text-rose-400 font-mono ml-0.5">
                    ({dayPillar.branchElementZh})
                  </span>
                </td>
                {/* Month Branch */}
                <td className="py-2.5 border-r border-[#16274B]">
                  <span className={`text-xl font-bold ${getBranchColor(monthPillar.branch)}`}>
                    {monthPillar.branch}
                  </span>
                  <span className="text-[10px] text-amber-300 font-mono ml-0.5">
                    ({monthPillar.branchElementZh})
                  </span>
                </td>
                {/* Year Branch */}
                <td className="py-2.5">
                  <span className={`text-xl font-bold ${getBranchColor(yearPillar.branch)}`}>
                    {yearPillar.branch}
                  </span>
                  <span className="text-[10px] text-rose-400 font-mono ml-0.5">
                    ({yearPillar.branchElementZh})
                  </span>
                </td>
              </tr>

              {/* Hidden Stems Row */}
              <tr className="text-[11px] text-slate-300">
                <td className="py-1.5 border-r border-[#16274B]">
                  {hourPillar.hiddenStems.join(' ')}
                </td>
                <td className="py-1.5 border-r border-[#16274B] bg-pink-950/10">
                  {dayPillar.hiddenStems.join(' ')}
                </td>
                <td className="py-1.5 border-r border-[#16274B]">
                  {monthPillar.hiddenStems.join(' ')}
                </td>
                <td className="py-1.5">
                  {yearPillar.hiddenStems.join(' ')}
                </td>
              </tr>

              {/* Hidden Ten Gods Row */}
              <tr className="text-[10px] text-slate-400">
                <td className="py-1.5 border-r border-[#16274B]">
                  {hourPillar.hiddenTenGods.join(' ')}
                </td>
                <td className="py-1.5 border-r border-[#16274B] bg-pink-950/10">
                  {dayPillar.hiddenTenGods.join(' ')}
                </td>
                <td className="py-1.5 border-r border-[#16274B]">
                  {monthPillar.hiddenTenGods.join(' ')}
                </td>
                <td className="py-1.5">
                  {yearPillar.hiddenTenGods.join(' ')}
                </td>
              </tr>

              {/* Branch Elements Row */}
              <tr className="text-[11px] font-medium">
                <td className="py-1.5 border-r border-[#16274B]">
                  {hourPillar.branchElements.map((el, i) => (
                    <span key={i} className={`${getElementColor(el)} mr-1`}>{el}</span>
                  ))}
                </td>
                <td className="py-1.5 border-r border-[#16274B] bg-pink-950/10">
                  {dayPillar.branchElements.map((el, i) => (
                    <span key={i} className={`${getElementColor(el)} mr-1`}>{el}</span>
                  ))}
                </td>
                <td className="py-1.5 border-r border-[#16274B]">
                  {monthPillar.branchElements.map((el, i) => (
                    <span key={i} className={`${getElementColor(el)} mr-1`}>{el}</span>
                  ))}
                </td>
                <td className="py-1.5">
                  {yearPillar.branchElements.map((el, i) => (
                    <span key={i} className={`${getElementColor(el)} mr-1`}>{el}</span>
                  ))}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Pattern & Useful God Callout Footer */}
      <div className="mt-3 flex items-center justify-between text-[11px] px-2.5 py-1.5 rounded-lg bg-blue-950/30 border border-blue-900/40 text-blue-200">
        <span>{strengthEvaluation}</span>
        <span className="text-amber-400 font-medium">
          用神：水、木 ｜ 忌神：金、土
        </span>
      </div>
    </section>
  );
};
