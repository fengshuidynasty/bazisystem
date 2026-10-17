import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  X,
  Printer,
  Download,
  ShieldCheck,
  CheckCircle2,
  Sparkles,
  Award,
  AlertTriangle,
  Send,
  MessageSquare
} from 'lucide-react';

export const ReportViewModal: React.FC = () => {
  const {
    isReportModalOpen,
    setIsReportModalOpen,
    selectedReportDoc,
    activeClient,
    chartResult,
    currentUser,
    approveReport,
    rejectReport
  } = useApp();

  const [masterNote, setMasterNote] = useState('');
  const [rejectFeedback, setRejectFeedback] = useState('');
  const [isRejecting, setIsRejecting] = useState(false);

  if (!isReportModalOpen || !selectedReportDoc) return null;

  const isApproved = selectedReportDoc.approvalStatus === 'approved';
  const isMaster = currentUser?.role === 'master';
  const isPractitioner = currentUser?.role === 'practitioner';

  const handlePrint = () => {
    window.print();
  };

  const handleApprove = () => {
    approveReport(selectedReportDoc.id, masterNote);
  };

  const handleReject = () => {
    if (!rejectFeedback.trim()) {
      alert('请填写驳回原因与修改指示');
      return;
    }
    rejectReport(selectedReportDoc.id, rejectFeedback);
    setIsRejecting(false);
  };

  const { aiDraftContent } = selectedReportDoc;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md">
      <div className="relative w-full max-w-4xl bg-[#091226] border border-[#1E335C] rounded-2xl shadow-2xl flex flex-col max-h-[95vh] overflow-hidden">
        {/* Top Header Bar (No Print) */}
        <div className="no-print px-6 py-3.5 border-b border-[#152342] bg-[#070D1D] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-1.5 rounded-lg bg-amber-500/10 border border-amber-500/30 text-amber-400">
              <Award className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-white tracking-wide">
                {selectedReportDoc.title}
              </h3>
              <div className="flex items-center gap-2 text-[11px] text-slate-400">
                <span>状态：</span>
                {isApproved ? (
                  <span className="text-emerald-400 font-semibold flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" /> 宗师已审核出版 (终审合格)
                  </span>
                ) : selectedReportDoc.approvalStatus === 'pending_approval' ? (
                  <span className="text-amber-400 font-semibold flex items-center gap-1">
                    <AlertTriangle className="w-3.5 h-3.5" /> 待赵天佑师傅复核终审
                  </span>
                ) : (
                  <span className="text-rose-400 font-semibold">
                    已驳回需修改
                  </span>
                )}
                <span>·</span>
                <span className="text-slate-300 font-mono">RM {selectedReportDoc.priceMYR}</span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#122042] hover:bg-[#182A56] text-slate-300 text-xs rounded-lg border border-[#22386A] transition"
            >
              <Printer className="w-3.5 h-3.5 text-blue-400" />
              打印 / 导出 PDF
            </button>
            <button
              onClick={() => setIsReportModalOpen(false)}
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Master Approval Toolstrip (Only visible for Master if report is pending) */}
        {isMaster && !isApproved && (
          <div className="no-print p-3 bg-amber-950/30 border-b border-amber-600/30 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-2 text-amber-200">
              <ShieldCheck className="w-4 h-4 text-amber-400" />
              <span>当前为【赵天佑师傅】管理权限：请逐段审阅本份 AI 命理草案。</span>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setIsRejecting(!isRejecting)}
                className="px-3 py-1 rounded bg-rose-950/60 hover:bg-rose-900 border border-rose-500/40 text-rose-300 text-xs font-medium transition"
              >
                驳回批注
              </button>
              <button
                onClick={handleApprove}
                className="px-4 py-1 rounded bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-semibold shadow transition"
              >
                核准并签名盖印出版
              </button>
            </div>
          </div>
        )}

        {/* Rejection input box */}
        {isRejecting && (
          <div className="no-print p-4 bg-[#140E1B] border-b border-rose-500/30 space-y-2 text-xs">
            <label className="text-rose-300 font-semibold flex items-center gap-1">
              <MessageSquare className="w-3.5 h-3.5" />
              填写驳回原因与修改意见 (将同步至林法师待办工作台)：
            </label>
            <textarea
              value={rejectFeedback}
              onChange={(e) => setRejectFeedback(e.target.value)}
              placeholder="例如：调候用神需强调壬水透干之功，不可单论身弱，请补强此点后再呈交。"
              className="w-full bg-[#0E0A17] border border-rose-500/30 rounded-lg p-2.5 text-slate-200 text-xs focus:outline-none focus:ring-1 focus:ring-rose-500"
              rows={2}
            />
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setIsRejecting(false)}
                className="px-3 py-1 rounded text-slate-400 hover:text-white"
              >
                取消
              </button>
              <button
                onClick={handleReject}
                className="px-4 py-1 rounded bg-rose-600 hover:bg-rose-500 text-white font-semibold"
              >
                提交驳回
              </button>
            </div>
          </div>
        )}

        {/* Notice for Client if Pending Approval */}
        {!isMaster && !isApproved && (
          <div className="no-print p-3 bg-blue-950/40 border-b border-blue-500/30 flex items-center justify-between text-xs text-blue-200">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-cyan-300 animate-pulse" />
              <span>
                报告已生成！当前正在由【趙天佑师傅】进行最终学术复核与开运注解，完成后即可永久下载收藏。
              </span>
            </div>
          </div>
        )}

        {/* Printable Official Document Body */}
        <div className="flex-1 overflow-y-auto p-6 sm:p-10 space-y-8 bg-[#070D1D] text-slate-200 print:bg-white print:text-slate-900 print:p-0">
          {/* Document Header with Master Joe Chew Seal */}
          <div className="text-center pb-6 border-b border-amber-500/30 print:border-amber-600">
            <div className="flex justify-center mb-2">
              <img
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuCzYqy3IHMRTcdoFjVw8DP8uwBdAkJJfh4jTax0OpaQ3eTvlRLHpDNYIkjRZ6vdReUQFML_8nG0uB_SiRwX0qEN74xDLHbffkINit9t0QZqVRjZd-6Wn9QXHgr6VSBGK-WJ-M7YVhPga-NWIkAaV0WPpiYtlOUw3sYOZDYi2e0DgaVgAmavdWqYZ5U-qaejGvfQNJvymFgP-RbVufmjCHY4lKvjl789F-355yNPyOY4TBJG2zGBSjTbGm1MyfyRMcWWnBU"
                alt="Logo"
                className="h-16 w-auto object-contain mx-auto"
              />
            </div>
            <h1 className="text-xl font-bold font-serif text-amber-400 print:text-amber-800 tracking-wider">
              天佑风水 · 子平八字正统命理研判全书
            </h1>
            <p className="text-xs text-slate-400 print:text-slate-600 mt-1">
              FENG SHUI DYNASTY · MASTER JOE CHEW BAZI ANALYSIS SYSTEM
            </p>
            <div className="inline-block mt-2 px-3 py-0.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 print:text-amber-900 text-[11px] font-semibold">
              权威鉴定编号：FSD-{activeClient.id.toUpperCase()}-{new Date().getFullYear()}
            </div>
          </div>

          {/* Client Demographic Header */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-4 rounded-xl bg-[#0B142A] border border-[#1A2D56] print:bg-slate-50 print:border-slate-300 text-xs">
            <div>
              <span className="text-slate-400 print:text-slate-600">命主姓名：</span>
              <span className="font-bold text-white print:text-black ml-1">{activeClient.name}</span>
            </div>
            <div>
              <span className="text-slate-400 print:text-slate-600">性别：</span>
              <span className="font-bold text-white print:text-black ml-1">
                {activeClient.gender === 'female' ? '坤造 (女)' : '乾造 (男)'}
              </span>
            </div>
            <div>
              <span className="text-slate-400 print:text-slate-600">公历出生：</span>
              <span className="font-bold text-white print:text-black ml-1">
                {activeClient.birthDate} {activeClient.birthTime}
              </span>
            </div>
            <div>
              <span className="text-slate-400 print:text-slate-600">出生时辰：</span>
              <span className="font-bold text-blue-300 print:text-blue-700 ml-1">
                {chartResult.hourPillar.branch}时 ({activeClient.birthTime})
              </span>
            </div>
          </div>

          {/* Four Pillars Summary Table */}
          <div className="p-4 rounded-xl bg-[#0B142A] border border-[#1A2D56] print:bg-slate-50 print:border-slate-300">
            <h3 className="text-xs font-bold text-amber-300 print:text-amber-800 mb-3 uppercase tracking-wider">
              【四柱八字与十神原局】
            </h3>
            <div className="grid grid-cols-4 text-center divide-x divide-[#16274B] print:divide-slate-300 text-xs">
              <div className="p-2">
                <span className="text-slate-400 print:text-slate-600 text-[11px]">时柱</span>
                <div className="text-sm font-bold text-amber-200 print:text-slate-800 mt-1">
                  {chartResult.hourPillar.stem}{chartResult.hourPillar.branch}
                </div>
                <div className="text-[10px] text-slate-400 print:text-slate-600 mt-0.5">
                  {chartResult.hourPillar.tenGod}
                </div>
              </div>
              <div className="p-2 bg-pink-950/20 print:bg-pink-50">
                <span className="text-pink-300 print:text-pink-700 text-[11px] font-bold">日柱 (命主)</span>
                <div className="text-sm font-bold text-emerald-400 print:text-emerald-700 mt-1">
                  {chartResult.dayPillar.stem}{chartResult.dayPillar.branch}
                </div>
                <div className="text-[10px] text-yellow-300 print:text-yellow-700 mt-0.5">
                  元神日主
                </div>
              </div>
              <div className="p-2">
                <span className="text-slate-400 print:text-slate-600 text-[11px]">月柱</span>
                <div className="text-sm font-bold text-sky-400 print:text-blue-700 mt-1">
                  {chartResult.monthPillar.stem}{chartResult.monthPillar.branch}
                </div>
                <div className="text-[10px] text-slate-400 print:text-slate-600 mt-0.5">
                  {chartResult.monthPillar.tenGod}
                </div>
              </div>
              <div className="p-2">
                <span className="text-slate-400 print:text-slate-600 text-[11px]">年柱</span>
                <div className="text-sm font-bold text-amber-200 print:text-slate-800 mt-1">
                  {chartResult.yearPillar.stem}{chartResult.yearPillar.branch}
                </div>
                <div className="text-[10px] text-slate-400 print:text-slate-600 mt-0.5">
                  {chartResult.yearPillar.tenGod}
                </div>
              </div>
            </div>

            <div className="mt-3 pt-3 border-t border-[#18284C] print:border-slate-300 flex flex-wrap items-center justify-between text-xs text-slate-300 print:text-slate-700">
              <div>
                格局定论：<span className="font-bold text-amber-400 print:text-amber-800">{activeClient.patternName}</span>
              </div>
              <div>
                旺衰定局：<span className="font-bold text-blue-300 print:text-blue-800">{chartResult.strengthStatus}</span>
              </div>
              <div>
                喜用神：<span className="font-bold text-emerald-400 print:text-emerald-700">{activeClient.usefulGods}</span>
              </div>
              <div>
                忌仇神：<span className="font-bold text-rose-400 print:text-rose-700">{activeClient.unfavorableGods}</span>
              </div>
            </div>
          </div>

          {/* Section 1: Summary */}
          <div className="space-y-2">
            <h3 className="text-sm font-bold text-amber-300 print:text-amber-800 flex items-center gap-2">
              <span className="w-1.5 h-4 bg-amber-400 rounded-sm" />
              一、命局总纲与八分精算旺衰判定
            </h3>
            <p className="text-xs text-slate-300 print:text-slate-800 leading-relaxed indent-6">
              {aiDraftContent.summary}
            </p>
          </div>

          {/* Section 2: Pattern Analysis */}
          <div className="space-y-2">
            <h3 className="text-sm font-bold text-amber-300 print:text-amber-800 flex items-center gap-2">
              <span className="w-1.5 h-4 bg-amber-400 rounded-sm" />
              二、格局清浊与十神配合深度解密
            </h3>
            <p className="text-xs text-slate-300 print:text-slate-800 leading-relaxed indent-6">
              {aiDraftContent.patternAnalysis}
            </p>
          </div>

          {/* Section 3: Personality & Strengths */}
          <div className="space-y-2">
            <h3 className="text-sm font-bold text-amber-300 print:text-amber-800 flex items-center gap-2">
              <span className="w-1.5 h-4 bg-amber-400 rounded-sm" />
              三、先天性情与天赋潜能指引
            </h3>
            <p className="text-xs text-slate-300 print:text-slate-800 leading-relaxed indent-6">
              {aiDraftContent.personalityStrengths}
            </p>
          </div>

          {/* Section 4: Career & Wealth */}
          <div className="space-y-2">
            <h3 className="text-sm font-bold text-amber-300 print:text-amber-800 flex items-center gap-2">
              <span className="w-1.5 h-4 bg-amber-400 rounded-sm" />
              四、事业运势与一生正偏财禄机缘
            </h3>
            <p className="text-xs text-slate-300 print:text-slate-800 leading-relaxed indent-6">
              {aiDraftContent.careerAndWealth}
            </p>
          </div>

          {/* Section 5: Romance & Marriage */}
          <div className="space-y-2">
            <h3 className="text-sm font-bold text-amber-300 print:text-amber-800 flex items-center gap-2">
              <span className="w-1.5 h-4 bg-amber-400 rounded-sm" />
              五、情感婚姻与六亲家庭缘分
            </h3>
            <p className="text-xs text-slate-300 print:text-slate-800 leading-relaxed indent-6">
              {aiDraftContent.romanceAndMarriage}
            </p>
          </div>

          {/* Section 6: Luck Cycle */}
          <div className="space-y-2">
            <h3 className="text-sm font-bold text-amber-300 print:text-amber-800 flex items-center gap-2">
              <span className="w-1.5 h-4 bg-amber-400 rounded-sm" />
              六、十年大运与流年转折关键节点
            </h3>
            <p className="text-xs text-slate-300 print:text-slate-800 leading-relaxed indent-6">
              {aiDraftContent.luckCycleGuide}
            </p>
          </div>

          {/* Section 7: Remedies & Feng Shui */}
          <div className="space-y-2">
            <h3 className="text-sm font-bold text-amber-300 print:text-amber-800 flex items-center gap-2">
              <span className="w-1.5 h-4 bg-amber-400 rounded-sm" />
              七、趋吉避凶与专属风水开运锦囊
            </h3>
            <p className="text-xs text-slate-300 print:text-slate-800 leading-relaxed indent-6">
              {aiDraftContent.remedyAndFengShui}
            </p>
          </div>

          {/* Master Final Annotation Box */}
          {selectedReportDoc.masterAnnotations && (
            <div className="p-4 rounded-xl bg-gradient-to-br from-amber-950/40 via-amber-900/20 to-black/60 border border-amber-500/40 print:bg-amber-50 print:border-amber-300 space-y-1.5">
              <div className="text-xs font-bold text-amber-400 print:text-amber-900 flex items-center gap-2">
                <Award className="w-4 h-4 text-amber-400" />
                赵天佑师傅 · 亲批御笔指导意见
              </div>
              <p className="text-xs text-amber-200 print:text-slate-900 leading-relaxed">
                {selectedReportDoc.masterAnnotations}
              </p>
            </div>
          )}

          {/* Official Seal and Sign-off */}
          <div className="pt-8 border-t border-[#142343] print:border-slate-300 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400 print:text-slate-600 gap-4">
            <div>
              <p>天佑风水易经命理学会 · 官方学术认证</p>
              <p className="text-[10px] mt-0.5">马来西亚吉隆坡 · 子平八字旺衰派正统传承</p>
            </div>

            {/* Red traditional seal badge */}
            <div className="flex items-center gap-3">
              <div className="w-20 h-20 rounded-full border-2 border-red-500 text-red-500 flex flex-col items-center justify-center font-serif text-[10px] leading-tight font-bold transform -rotate-12 select-none shadow-inner print:border-red-700 print:text-red-700">
                <span>趙天佑</span>
                <span>命理宗師</span>
                <span>之印</span>
              </div>
              <div>
                <div className="font-bold text-slate-200 print:text-black">主审命理宗师：趙天佑</div>
                <div className="text-[10px] text-slate-400 print:text-slate-500">
                  出版日期：{selectedReportDoc.publishedAt ? selectedReportDoc.publishedAt.split('T')[0] : '待定'}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
