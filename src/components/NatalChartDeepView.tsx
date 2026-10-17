import React from 'react';
import { useApp } from '../context/AppContext';
import { getNatalDeepAnalysis } from '../engine/deepBaziAnalysis';
import { DeepCategorySection } from './DeepCategorySection';
import { Sparkles, ShieldCheck } from 'lucide-react';

export const NatalChartDeepView: React.FC = () => {
  const { activeClient, chartResult } = useApp();
  const natalAnalyses = getNatalDeepAnalysis(activeClient, chartResult);

  return (
    <div className="space-y-4">
      {/* Overview Banner */}
      <div className="p-4 rounded-2xl bg-gradient-to-r from-blue-950/40 via-[#0B142A] to-indigo-950/30 border border-blue-500/30 flex flex-col md:flex-row md:items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-amber-400" />
            <h3 className="text-sm font-bold text-white tracking-wide">
              本命命局五维深度研判 (Natal Chart In-Depth Analysis)
            </h3>
            <span className="text-[10px] bg-amber-500/10 text-amber-300 px-2 py-0.5 rounded border border-amber-500/20">
              终身格局定评
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            基于日元旺衰、四柱十神原局配置、月令当令真神、五行衰旺与《子平八字资料.pdf》深度推演。
          </p>
        </div>

        <div className="flex items-center gap-3 text-xs bg-[#081023] px-3 py-1.5 rounded-xl border border-[#16274B]">
          <div>
            <span className="text-slate-400">格局：</span>
            <span className="font-semibold text-amber-300">{activeClient.patternName}</span>
          </div>
          <span>·</span>
          <div>
            <span className="text-slate-400">用神：</span>
            <span className="font-semibold text-emerald-400">{activeClient.usefulGods}</span>
          </div>
        </div>
      </div>

      {/* Deep Category Section */}
      <DeepCategorySection analyses={natalAnalyses} titleSuffix="· 原局定论" />
    </div>
  );
};
