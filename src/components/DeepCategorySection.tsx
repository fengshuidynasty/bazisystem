import React, { useState } from 'react';
import { DeepCategoryAnalysis, CategoryKey } from '../types';
import {
  Coins,
  Briefcase,
  Heart,
  Home,
  Activity,
  ChevronDown,
  ChevronUp,
  BookOpen,
  CheckCircle2,
  AlertTriangle,
  Sparkles,
  ShieldCheck,
  Compass
} from 'lucide-react';

interface Props {
  analyses: Record<CategoryKey, DeepCategoryAnalysis>;
  titleSuffix?: string;
}

export const DeepCategorySection: React.FC<Props> = ({ analyses, titleSuffix = '' }) => {
  const [selectedCategory, setSelectedCategory] = useState<CategoryKey>('wealth');
  const [isPdfExpanded, setIsPdfExpanded] = useState(false);

  const categories: { key: CategoryKey; label: string; icon: any }[] = [
    { key: 'wealth', label: '财富 (正财·偏财)', icon: Coins },
    { key: 'career', label: '事业 (正官·七杀)', icon: Briefcase },
    { key: 'relationship', label: '感情 (配偶·夫妻宫)', icon: Heart },
    { key: 'family', label: '家庭 (父母·子女)', icon: Home },
    { key: 'health', label: '健康 (五行·脏腑)', icon: Activity }
  ];

  const current = analyses[selectedCategory];

  return (
    <div className="bg-[#0B142A]/90 rounded-2xl border border-[#16274B] p-5 shadow-lg select-none space-y-4">
      {/* Category Selection Tabs */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 border-b border-[#142343]">
        {categories.map((c) => {
          const Icon = c.icon;
          const isActive = selectedCategory === c.key;
          return (
            <button
              key={c.key}
              onClick={() => setSelectedCategory(c.key)}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition ${
                isActive
                  ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md shadow-blue-900/40 border border-blue-400/40'
                  : 'bg-[#091124] text-slate-400 hover:text-white border border-[#16274E]'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{c.label}</span>
            </button>
          );
        })}
      </div>

      {/* 6 Mandatory In-Depth Analysis Items */}
      <div className="space-y-4 pt-1">
        {/* Header */}
        <div className="flex items-center justify-between pb-2 border-b border-[#142343]">
          <div className="flex items-center gap-2">
            <span className="text-sm font-bold text-white">
              {current.categoryNameZh} {titleSuffix}
            </span>
            <span className="text-[10px] bg-blue-500/10 text-blue-300 px-2 py-0.5 rounded border border-blue-500/20">
              六重宗师认证推演
            </span>
          </div>
          <span className="text-[11px] text-slate-400 font-mono">
            {current.categoryNameEn}
          </span>
        </div>

        {/* 1. 命理依据 (BaZi Evidence) */}
        <div className="p-3.5 rounded-xl bg-[#081023] border border-[#16274B] space-y-1.5">
          <div className="text-[11px] font-bold text-amber-300 flex items-center gap-1.5">
            <Compass className="w-3.5 h-3.5 text-amber-400" />
            一、命理依据 (BaZi Evidence)
          </div>
          <p className="text-xs text-slate-300 leading-relaxed font-mono">
            {current.baziEvidence}
          </p>
        </div>

        {/* 2. 命理推演 (Interpretation and Reasoning) */}
        <div className="p-3.5 rounded-xl bg-[#081023] border border-[#16274B] space-y-1.5">
          <div className="text-[11px] font-bold text-cyan-300 flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
            二、命理推演 (Interpretation & Classical Reasoning)
          </div>
          <p className="text-xs text-slate-300 leading-relaxed font-serif text-justify">
            {current.interpretation}
          </p>
        </div>

        {/* 3 & 4. 优势与机会 vs 风险与挑战 (Two Columns) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
          {/* Opportunities */}
          <div className="p-3.5 rounded-xl bg-emerald-950/20 border border-emerald-500/30 space-y-2">
            <div className="text-[11px] font-bold text-emerald-300 flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
              三、优势与机会 (Opportunities & Strengths)
            </div>
            <ul className="space-y-1.5 text-xs text-slate-300">
              {current.opportunities.map((opp, idx) => (
                <li key={idx} className="flex items-start gap-1.5">
                  <span className="text-emerald-400 font-bold">·</span>
                  <span>{opp}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Risks */}
          <div className="p-3.5 rounded-xl bg-rose-950/20 border border-rose-500/30 space-y-2">
            <div className="text-[11px] font-bold text-rose-300 flex items-center gap-1.5">
              <AlertTriangle className="w-3.5 h-3.5 text-rose-400" />
              四、风险与挑战 (Risks & Challenges)
            </div>
            <ul className="space-y-1.5 text-xs text-slate-300">
              {current.risks.map((risk, idx) => (
                <li key={idx} className="flex items-start gap-1.5">
                  <span className="text-rose-400 font-bold">·</span>
                  <span>{risk}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* 5. Personalized Recommendations (趋吉 vs 避凶 明确区分) */}
        <div className="p-4 rounded-xl bg-[#091124] border border-blue-900/40 space-y-3">
          <div className="text-xs font-bold text-white flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-blue-400" />
            五、专属趋吉避凶对策建议 (Personalized Action Plan)
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {/* 趋吉 (Opportunity Enhancement) */}
            <div className="p-3 rounded-lg bg-blue-950/30 border border-blue-500/30 space-y-1.5">
              <span className="text-[11px] font-bold text-blue-300 flex items-center gap-1">
                【趋吉 · 顺势而为】(Opportunity Enhancement)
              </span>
              <ul className="space-y-1 text-xs text-slate-300">
                {current.recommendations.opportunityEnhancement.map((tip, idx) => (
                  <li key={idx} className="flex items-start gap-1">
                    <span className="text-blue-400 font-semibold">✓</span>
                    <span>{tip}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* 避凶 (Risk Reduction) */}
            <div className="p-3 rounded-lg bg-amber-950/30 border border-amber-500/30 space-y-1.5">
              <span className="text-[11px] font-bold text-amber-300 flex items-center gap-1">
                【避凶 · 防患未然】(Risk Reduction)
              </span>
              <ul className="space-y-1 text-xs text-slate-300">
                {current.recommendations.riskReduction.map((tip, idx) => (
                  <li key={idx} className="flex items-start gap-1">
                    <span className="text-amber-400 font-semibold">⚠</span>
                    <span>{tip}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="text-[10px] text-slate-500">
            注：上述对策为传统五行与心理规划建议，不承诺保证收益，健康养生建议切勿代替临床医疗。
          </div>
        </div>

        {/* 6. Approved PDF Knowledge References (Collapsible) */}
        <div className="rounded-xl border border-[#16274B] bg-[#070D1D] overflow-hidden">
          <button
            onClick={() => setIsPdfExpanded(!isPdfExpanded)}
            className="w-full p-3 flex items-center justify-between text-left hover:bg-slate-800/40 transition"
          >
            <div className="flex items-center gap-2">
              <BookOpen className="w-3.5 h-3.5 text-amber-400" />
              <span className="text-xs font-semibold text-amber-300">
                六、宗师认证知识依据 (Approved PDF Knowledge Reference)
              </span>
              <span className="text-[10px] text-slate-400">
                源自《子平八字资料.pdf》第 {current.pdfKnowledgeReference.page} 页
              </span>
            </div>
            {isPdfExpanded ? (
              <ChevronUp className="w-4 h-4 text-slate-400" />
            ) : (
              <ChevronDown className="w-4 h-4 text-slate-400" />
            )}
          </button>

          {isPdfExpanded && (
            <div className="p-4 pt-1 border-t border-[#142343] space-y-2 text-xs">
              {current.pdfKnowledgeReference.status === 'insufficient_evidence' ? (
                <div className="p-3 rounded-lg bg-rose-950/30 border border-rose-500/30 text-rose-300">
                  知识库依据不足，待趙天佑师傅审核。
                </div>
              ) : (
                <div className="p-3 rounded-lg bg-slate-900/60 border border-[#1C2C50] space-y-1.5 font-serif text-slate-300">
                  <div className="text-[11px] font-bold text-amber-400">
                    典籍出处：{current.pdfKnowledgeReference.source} · {current.pdfKnowledgeReference.chapter} (P.{current.pdfKnowledgeReference.page})
                  </div>
                  <p className="leading-relaxed italic text-slate-200">
                    “{current.pdfKnowledgeReference.quote}”
                  </p>
                  <div className="text-[10px] text-emerald-400 flex items-center gap-1 font-sans not-italic">
                    <CheckCircle2 className="w-3 h-3" />
                    已通过趙天佑师傅权威终审核准，列为合法研判准则
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
