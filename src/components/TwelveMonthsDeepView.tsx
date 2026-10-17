import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { getTwelveMonthlyFortunes, getStarLabel } from '../engine/deepBaziAnalysis';
import { DetailedMonthlyFortune, MonthlyCategoryFortune, StarRating, CategoryKey } from '../types';
import {
  Calendar,
  Star,
  AlertTriangle,
  Sparkles,
  BookOpen,
  ChevronDown,
  ChevronUp,
  Coins,
  Briefcase,
  Heart,
  Home,
  Activity,
  CheckCircle2,
  SlidersHorizontal,
  Compass
} from 'lucide-react';

export const TwelveMonthsDeepView: React.FC = () => {
  const { activeClient, chartResult } = useApp();
  const [selectedMonthIndex, setSelectedMonthIndex] = useState<number>(5); // Default to 6th month (peak)
  const [viewMode, setViewMode] = useState<'detail' | 'matrix'>('detail');
  const [selectedCategoryFilter, setSelectedCategoryFilter] = useState<CategoryKey | 'all'>('all');
  const [expandedPdfMonthCat, setExpandedPdfMonthCat] = useState<string | null>(null);

  const fortunes = getTwelveMonthlyFortunes(activeClient, chartResult, 2025);
  const currentMonth = fortunes[selectedMonthIndex] || fortunes[0];

  const renderStars = (rating: StarRating, sizeClass = 'w-3.5 h-3.5') => {
    return (
      <div className="flex items-center gap-0.5" title={`${rating}星 · ${getStarLabel(rating)}`}>
        {[1, 2, 3, 4, 5].map((i) => (
          <Star
            key={i}
            className={`${sizeClass} ${
              i <= rating
                ? 'text-amber-400 fill-amber-400 drop-shadow-[0_0_4px_rgba(251,191,36,0.5)]'
                : 'text-slate-700'
            }`}
          />
        ))}
      </div>
    );
  };

  const getRatingBadgeClass = (rating: StarRating) => {
    switch (rating) {
      case 5:
        return 'bg-amber-500/15 text-amber-300 border-amber-500/40';
      case 4:
        return 'bg-emerald-500/15 text-emerald-300 border-emerald-500/40';
      case 3:
        return 'bg-blue-500/15 text-blue-300 border-blue-500/40';
      case 2:
        return 'bg-orange-500/15 text-orange-300 border-orange-500/40';
      case 1:
        return 'bg-rose-500/15 text-rose-300 border-rose-500/40';
      default:
        return 'bg-slate-500/15 text-slate-300 border-slate-500/40';
    }
  };

  const categoriesConfig: { key: CategoryKey; label: string; icon: any; color: string }[] = [
    { key: 'wealth', label: '财富运势', icon: Coins, color: 'text-amber-400' },
    { key: 'career', label: '事业功名', icon: Briefcase, color: 'text-blue-400' },
    { key: 'relationship', label: '婚恋感情', icon: Heart, color: 'text-pink-400' },
    { key: 'family', label: '家庭宅舍', icon: Home, color: 'text-indigo-400' },
    { key: 'health', label: '身心健康', icon: Activity, color: 'text-emerald-400' }
  ];

  return (
    <div className="space-y-4 select-none">
      {/* Top Banner */}
      <div className="p-4 rounded-2xl bg-gradient-to-r from-blue-950/40 via-[#0B142A] to-indigo-950/30 border border-blue-500/30 flex flex-col md:flex-row md:items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4 text-cyan-400" />
            <h3 className="text-sm font-bold text-white tracking-wide">
              十二流月五星运程精算 (Twelve Monthly Fortunes · 5-Star Ratings)
            </h3>
            <span className="text-[10px] bg-cyan-500/10 text-cyan-300 px-2 py-0.5 rounded border border-cyan-500/20">
              节气交节 · 逐月精断
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            以二十四节气换月为轴，系统评测财富、事业、感情、家庭与健康五维星级，并提供趋吉避凶对策。
          </p>
        </div>

        {/* View Mode Toggle */}
        <div className="flex items-center gap-2">
          <div className="flex items-center bg-[#081023] p-1 rounded-xl border border-[#16274B] text-xs">
            <button
              onClick={() => setViewMode('detail')}
              className={`px-3 py-1 rounded-lg transition font-medium ${
                viewMode === 'detail'
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              单月精断
            </button>
            <button
              onClick={() => setViewMode('matrix')}
              className={`px-3 py-1 rounded-lg transition font-medium ${
                viewMode === 'matrix'
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              全岁矩阵
            </button>
          </div>
        </div>
      </div>

      {/* 12-Month Horizontal Selector Strip */}
      <div className="grid grid-cols-3 sm:grid-cols-6 lg:grid-cols-12 gap-1.5">
        {fortunes.map((f, idx) => {
          const isSelected = selectedMonthIndex === idx;
          return (
            <button
              key={f.month}
              onClick={() => setSelectedMonthIndex(idx)}
              className={`p-2 rounded-xl border text-center transition flex flex-col justify-between relative ${
                isSelected
                  ? 'bg-gradient-to-b from-[#142C5B] to-[#0A1836] border-2 border-cyan-400 shadow-md shadow-cyan-900/40 scale-102'
                  : f.overallRating === 5
                  ? 'bg-[#0E1C3A] border-amber-500/40 hover:border-amber-400'
                  : 'bg-[#091124] border-[#16274E] hover:border-slate-500'
              }`}
            >
              {f.overallRating === 5 && (
                <span className="absolute -top-1.5 right-1 px-1 bg-amber-500 text-[8px] text-slate-900 font-bold rounded-sm">
                  峰值
                </span>
              )}
              <div className="text-[10px] font-bold text-slate-300">{f.monthName}</div>
              <div className="text-[11px] font-bold text-white font-serif my-0.5">{f.ganZhi}</div>
              <div className="flex justify-center my-0.5">
                {renderStars(f.overallRating, 'w-2 h-2')}
              </div>
              <span
                className={`text-[9px] px-1 py-0.2 rounded border font-semibold ${getRatingBadgeClass(
                  f.overallRating
                )}`}
              >
                {f.overallRatingLabel}
              </span>
            </button>
          );
        })}
      </div>

      {viewMode === 'detail' ? (
        /* DETAIL VIEW FOR SELECTED MONTH */
        <div className="space-y-4">
          {/* Selected Month Master Summary Header */}
          <div className="p-4 rounded-2xl bg-[#091226] border border-[#182B54] space-y-3">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-[#142343]">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-600/30 to-cyan-600/20 border border-cyan-500/40 flex flex-col items-center justify-center font-bold">
                  <span className="text-xs text-cyan-300">{currentMonth.monthName}</span>
                  <span className="text-[10px] text-slate-400 font-serif">{currentMonth.ganZhi}</span>
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h4 className="text-base font-bold text-white tracking-wide">
                      2025乙巳年 · 【{currentMonth.monthName} {currentMonth.ganZhi}】流月运程
                    </h4>
                    <span className="text-[11px] text-slate-400 bg-slate-800/80 px-2 py-0.5 rounded border border-slate-700">
                      节气：{currentMonth.solarTerm}
                    </span>
                  </div>
                  <p className="text-xs text-slate-300 mt-1">{currentMonth.monthlySummary}</p>
                </div>
              </div>

              {/* Overall Fortune Star Rating Badge */}
              <div className="flex flex-col items-end bg-[#070D1D] px-4 py-2 rounded-xl border border-[#16274B]">
                <div className="text-[10px] text-slate-400">综合月令运势</div>
                <div className="flex items-center gap-2 mt-0.5">
                  {renderStars(currentMonth.overallRating, 'w-4 h-4')}
                  <span
                    className={`text-xs px-2 py-0.5 rounded border font-bold ${getRatingBadgeClass(
                      currentMonth.overallRating
                    )}`}
                  >
                    {currentMonth.overallRating}星 · {currentMonth.overallRatingLabel}
                  </span>
                </div>
              </div>
            </div>

            {/* Caution & Useful God Guidance Dual Strip */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-1 text-xs">
              {/* Important Caution */}
              <div className="p-3 rounded-xl bg-amber-950/20 border border-amber-500/30 flex items-start gap-2.5">
                <AlertTriangle className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" />
                <div>
                  <div className="font-bold text-amber-300">本月重点告诫 (Key Caution)</div>
                  <p className="text-[11px] text-amber-200/90 mt-1 leading-relaxed">
                    {currentMonth.mostImportantCaution}
                  </p>
                </div>
              </div>

              {/* Useful God Guidance */}
              <div className="p-3 rounded-xl bg-blue-950/20 border border-blue-500/30 flex items-start gap-2.5">
                <Compass className="w-4 h-4 text-cyan-400 flex-shrink-0 mt-0.5" />
                <div>
                  <div className="font-bold text-cyan-300">喜用神调衡指导 (Personalized Guidance)</div>
                  <p className="text-[11px] text-cyan-200/90 mt-1 leading-relaxed">
                    {currentMonth.personalizedGuidance.usefulGodApplication}
                  </p>
                  <div className="flex flex-wrap items-center gap-2 mt-1.5 text-[10px]">
                    <span className="text-emerald-400">
                      ★ 增吉：{currentMonth.personalizedGuidance.enhancementTip}
                    </span>
                    <span className="text-rose-400">
                      ⚠ 防患：{currentMonth.personalizedGuidance.cautionTip}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* 5 Core Categories Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5">
            {categoriesConfig.map((cat) => {
              const Icon = cat.icon;
              const catData = currentMonth.categories[cat.key];
              const uniquePdfKey = `${currentMonth.month}-${cat.key}`;
              const isPdfOpen = expandedPdfMonthCat === uniquePdfKey;

              return (
                <div
                  key={cat.key}
                  className="p-4 rounded-xl bg-[#091226] border border-[#16274B] flex flex-col justify-between space-y-3 hover:border-slate-600 transition shadow-md"
                >
                  <div className="space-y-2">
                    {/* Category Title + Star Rating */}
                    <div className="flex items-center justify-between pb-2 border-b border-[#142343]">
                      <div className="flex items-center gap-2">
                        <Icon className={`w-4 h-4 ${cat.color}`} />
                        <span className="text-xs font-bold text-white">{cat.label}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        {renderStars(catData.rating, 'w-3 h-3')}
                        <span
                          className={`text-[10px] px-1.5 py-0.2 rounded border font-semibold ${getRatingBadgeClass(
                            catData.rating
                          )}`}
                        >
                          {catData.ratingLabel}
                        </span>
                      </div>
                    </div>

                    {/* Brief Explanation */}
                    <div>
                      <div className="text-[10px] text-slate-400 font-semibold">【月令解密】</div>
                      <p className="text-xs text-slate-300 mt-0.5 leading-relaxed">
                        {catData.explanation}
                      </p>
                    </div>

                    {/* Key Matters */}
                    <div className="p-2 rounded-lg bg-[#070D1D] border border-[#142343]">
                      <div className="text-[10px] font-semibold text-amber-300 flex items-center gap-1">
                        <span>⚠ 重点关注：</span>
                      </div>
                      <p className="text-[11px] text-slate-300 mt-0.5">{catData.keyMatters}</p>
                    </div>

                    {/* Practical Recommendations */}
                    <div>
                      <div className="text-[10px] font-semibold text-emerald-400">
                        【趋吉实操对策】
                      </div>
                      <ul className="mt-1 space-y-1">
                        {catData.practicalTips.map((tip, tIdx) => (
                          <li
                            key={tIdx}
                            className="text-[11px] text-slate-300 flex items-start gap-1.5"
                          >
                            <span className="text-emerald-500 font-bold mt-0.5">•</span>
                            <span>{tip}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Approved PDF Knowledge Reference Accordion */}
                  {catData.pdfReference && (
                    <div className="pt-2 border-t border-[#142343]">
                      <button
                        onClick={() => setExpandedPdfMonthCat(isPdfOpen ? null : uniquePdfKey)}
                        className="w-full flex items-center justify-between text-[10px] text-slate-400 hover:text-cyan-300 transition"
                      >
                        <span className="flex items-center gap-1">
                          <BookOpen className="w-3 h-3 text-cyan-400" />
                          <span>宗师认证知识依据 ({catData.pdfReference.chapter})</span>
                        </span>
                        {isPdfOpen ? (
                          <ChevronUp className="w-3 h-3" />
                        ) : (
                          <ChevronDown className="w-3 h-3" />
                        )}
                      </button>

                      {isPdfOpen && (
                        <div className="mt-2 p-2.5 rounded-lg bg-[#070D1D] border border-cyan-500/20 space-y-1 text-[10px]">
                          <div className="flex items-center justify-between text-cyan-400 font-semibold">
                            <span>
                              {catData.pdfReference.source} · 第 {catData.pdfReference.page} 页
                            </span>
                            <span className="text-emerald-400 flex items-center gap-0.5">
                              <CheckCircle2 className="w-3 h-3" /> 终审认可
                            </span>
                          </div>
                          <p className="text-slate-300 italic font-serif leading-relaxed">
                            "{catData.pdfReference.quote}"
                          </p>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        /* MATRIX OVERVIEW OF ALL 12 MONTHS */
        <div className="bg-[#091226] border border-[#16274B] rounded-2xl p-4 overflow-x-auto">
          <div className="min-w-[800px] space-y-3">
            <div className="flex items-center justify-between pb-3 border-b border-[#142343]">
              <h4 className="text-xs font-bold text-white">
                2025乙巳年 · 全年十二流月五星运程横向总览矩阵
              </h4>
              <span className="text-[11px] text-slate-400">
                点击任一月份卡片可返回单月精读
              </span>
            </div>

            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-[#142343] text-slate-400 text-[11px]">
                  <th className="py-2.5 px-3">月份</th>
                  <th className="py-2.5 px-3">干支 / 节气</th>
                  <th className="py-2.5 px-3">综合评级</th>
                  <th className="py-2.5 px-2">财富</th>
                  <th className="py-2.5 px-2">事业</th>
                  <th className="py-2.5 px-2">感情</th>
                  <th className="py-2.5 px-2">家庭</th>
                  <th className="py-2.5 px-2">健康</th>
                  <th className="py-2.5 px-3">核心提醒</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#122040]">
                {fortunes.map((f, idx) => (
                  <tr
                    key={f.month}
                    onClick={() => {
                      setSelectedMonthIndex(idx);
                      setViewMode('detail');
                    }}
                    className={`cursor-pointer transition hover:bg-[#0E1C38] ${
                      selectedMonthIndex === idx ? 'bg-blue-950/30' : ''
                    }`}
                  >
                    <td className="py-2.5 px-3 font-bold text-white whitespace-nowrap">
                      {f.monthName}
                    </td>
                    <td className="py-2.5 px-3 whitespace-nowrap">
                      <span className="text-cyan-300 font-serif font-bold">{f.ganZhi}</span>
                      <span className="text-[10px] text-slate-400 ml-1.5">({f.solarTerm})</span>
                    </td>
                    <td className="py-2.5 px-3 whitespace-nowrap">
                      <span
                        className={`text-[10px] px-2 py-0.5 rounded border font-semibold ${getRatingBadgeClass(
                          f.overallRating
                        )}`}
                      >
                        {f.overallRating}★ {f.overallRatingLabel}
                      </span>
                    </td>
                    <td className="py-2.5 px-2 whitespace-nowrap">
                      <span className="text-[10px] font-mono text-amber-300">
                        {f.categories.wealth.rating}★ {f.categories.wealth.ratingLabel}
                      </span>
                    </td>
                    <td className="py-2.5 px-2 whitespace-nowrap">
                      <span className="text-[10px] font-mono text-blue-300">
                        {f.categories.career.rating}★ {f.categories.career.ratingLabel}
                      </span>
                    </td>
                    <td className="py-2.5 px-2 whitespace-nowrap">
                      <span className="text-[10px] font-mono text-pink-300">
                        {f.categories.relationship.rating}★ {f.categories.relationship.ratingLabel}
                      </span>
                    </td>
                    <td className="py-2.5 px-2 whitespace-nowrap">
                      <span className="text-[10px] font-mono text-indigo-300">
                        {f.categories.family.rating}★ {f.categories.family.ratingLabel}
                      </span>
                    </td>
                    <td className="py-2.5 px-2 whitespace-nowrap">
                      <span className="text-[10px] font-mono text-emerald-300">
                        {f.categories.health.rating}★ {f.categories.health.ratingLabel}
                      </span>
                    </td>
                    <td className="py-2.5 px-3 text-[11px] text-slate-300 truncate max-w-[260px]">
                      {f.mostImportantCaution}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};
