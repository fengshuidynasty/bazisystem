import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Sidebar } from './components/Sidebar';
import { TopHeader } from './components/TopHeader';
import { ClientHeader } from './components/ClientHeader';
import { ClientInfoCard } from './components/ClientInfoCard';
import { FourPillarsTable } from './components/FourPillarsTable';
import { FiveElementsDonut } from './components/FiveElementsDonut';
import { TenGodsDistribution } from './components/TenGodsDistribution';
import { TenYearLuckPillars } from './components/TenYearLuckPillars';
import { MonthlyFortuneChart } from './components/MonthlyFortuneChart';
import { ReportUnlockModal } from './components/ReportUnlockModal';
import { ReportViewModal } from './components/ReportViewModal';
import { NewClientModal } from './components/NewClientModal';
import { KnowledgeBaseManager } from './components/KnowledgeBaseManager';
import { MasterApprovalDashboard } from './components/MasterApprovalDashboard';
import { SystemTestRunnerModal } from './components/SystemTestRunnerModal';
import { NatalChartDeepView } from './components/NatalChartDeepView';
import { LuckCycleDeepView } from './components/LuckCycleDeepView';
import { AnnualLuckDeepView } from './components/AnnualLuckDeepView';
import { TwelveMonthsDeepView } from './components/TwelveMonthsDeepView';
import {
  Lock,
  Sparkles,
  ShieldCheck,
  CheckCircle2,
  FileText,
  CreditCard,
  User,
  LogIn,
  TrendingUp,
  Clock,
  Calendar
} from 'lucide-react';

const MainLayout: React.FC = () => {
  const {
    currentUser,
    login,
    activeNav,
    setActiveNav,
    activeTab,
    setActiveTab,
    activeClient,
    chartResult,
    setIsUnlockModalOpen,
    setIsReportModalOpen,
    reports
  } = useApp();

  // Authentication is mandatory: if not authenticated, show sign-in gate
  if (!currentUser) {
    return (
      <div className="min-h-screen bg-[#060B17] flex items-center justify-center p-4">
        <div className="w-full max-w-md bg-[#091226] border border-[#1E335C] rounded-2xl shadow-2xl p-8 space-y-6 text-center select-none">
          <div className="flex justify-center">
            <img
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuCzYqy3IHMRTcdoFjVw8DP8uwBdAkJJfh4jTax0OpaQ3eTvlRLHpDNYIkjRZ6vdReUQFML_8nG0uB_SiRwX0qEN74xDLHbffkINit9t0QZqVRjZd-6Wn9QXHgr6VSBGK-WJ-M7YVhPga-NWIkAaV0WPpiYtlOUw3sYOZDYi2e0DgaVgAmavdWqYZ5U-qaejGvfQNJvymFgP-RbVufmjCHY4lKvjl789F-355yNPyOY4TBJG2zGBSjTbGm1MyfyRMcWWnBU"
              alt="趙天佑 MASTER JOE CHEW"
              className="max-h-24 w-auto object-contain mx-auto"
            />
          </div>
          <div>
            <h2 className="text-base font-bold text-amber-400 uppercase tracking-widest">
              AI 智能子平八字命理系统
            </h2>
            <p className="text-xs text-slate-400 mt-1">
              天佑风水 · 访问本系统须先登录身份凭证
            </p>
          </div>

          <div className="space-y-3 pt-2">
            <p className="text-xs text-slate-400 text-left">
              快捷测试账号选择登录：
            </p>
            <button
              onClick={() => login('fengshuidynasty@gmail.com')}
              className="w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-amber-600 to-yellow-600 hover:from-amber-500 hover:to-yellow-500 text-slate-900 font-bold text-xs flex items-center justify-between shadow-lg shadow-amber-900/30 transition"
            >
              <span>以 趙天佑师傅 (Master / Owner) 登录</span>
              <LogIn className="w-4 h-4 text-slate-900" />
            </button>
            <button
              onClick={() => login('practitioner@fengshuidynasty.com')}
              className="w-full py-2.5 px-4 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs flex items-center justify-between shadow transition"
            >
              <span>以 林法师 (Practitioner / 命理师) 登录</span>
              <LogIn className="w-4 h-4" />
            </button>
            <button
              onClick={() => login('meiling@example.com')}
              className="w-full py-2.5 px-4 rounded-xl bg-[#12244B] hover:bg-[#183063] border border-[#23407B] text-slate-200 font-semibold text-xs flex items-center justify-between transition"
            >
              <span>以 陈美玲 (Client / 付费客户) 登录</span>
              <LogIn className="w-4 h-4 text-blue-400" />
            </button>
          </div>

          <div className="text-[11px] text-slate-500 border-t border-[#152342] pt-4">
            系统具备严格数据隔离与角色授权防护 · 马来西亚官方命理平台
          </div>
        </div>
      </div>
    );
  }

  // Render navigation views
  return (
    <div className="text-slate-200 text-sm antialiased flex min-h-screen overflow-x-hidden">
      {/* Left Sidebar */}
      <Sidebar />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 overflow-y-auto">
        {/* Top Header */}
        <TopHeader />

        {/* View Routing */}
        {activeNav === 'master_approvals' && <MasterApprovalDashboard />}
        {activeNav === 'knowledge_base' && <KnowledgeBaseManager />}

        {/* Client Management / BaZi Chart Dashboard & Deep Analysis Hub */}
        {(activeNav === 'clients' ||
          activeNav === 'bazi_chart' ||
          activeNav === 'fate_analysis' ||
          activeNav === 'ten_years_luck' ||
          activeNav === 'annual_luck' ||
          activeNav === 'twelve_months' ||
          activeNav === 'reports' ||
          activeNav === 'dashboard' ||
          activeNav === 'system_settings') && (
          <>
            {/* Client Profile Header */}
            <ClientHeader />

            {/* Dashboard Content */}
            <main className="px-6 py-5 space-y-5 flex-1">
              {/* Tab: Overview (命盘总览) -> Screenshot Masterpiece + In-Depth Analysis Drawer */}
              {activeTab === 'overview' && (
                <>
                  {/* Row 1: Three Columns */}
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
                    <ClientInfoCard />
                    <FourPillarsTable />
                    <section className="lg:col-span-4 flex flex-col gap-4">
                      <FiveElementsDonut />
                      <TenGodsDistribution />
                    </section>
                  </div>

                  {/* Row 2: 10-Year Luck Cycle + 12 Monthly Fortune Chart */}
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
                    <TenYearLuckPillars />
                    <MonthlyFortuneChart />
                  </div>

                  {/* In-Depth Metaphysical Analyses Section */}
                  <div className="pt-2 border-t border-[#142343] space-y-4">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                      <div className="flex items-center gap-2">
                        <Sparkles className="w-4 h-4 text-amber-400" />
                        <h3 className="text-sm font-bold text-white tracking-wide">
                          宗师深度研判专区 (Deep Metaphysical Analysis Hub)
                        </h3>
                        <span className="text-[10px] bg-blue-500/10 text-cyan-300 px-2 py-0.5 rounded border border-blue-500/20">
                          五维全息精论
                        </span>
                      </div>
                      <div className="flex flex-wrap items-center gap-1.5 text-xs">
                        <button
                          onClick={() => setActiveTab('synthesis')}
                          className="px-3 py-1.5 rounded-lg bg-[#0E1B38] hover:bg-[#132752] text-amber-300 border border-amber-500/30 flex items-center gap-1 transition"
                        >
                          <TrendingUp className="w-3.5 h-3.5 text-amber-400" />
                          <span>本命原局深度解密 →</span>
                        </button>
                        <button
                          onClick={() => setActiveTab('dayun')}
                          className="px-3 py-1.5 rounded-lg bg-[#0E1B38] hover:bg-[#132752] text-cyan-300 border border-cyan-500/30 flex items-center gap-1 transition"
                        >
                          <Clock className="w-3.5 h-3.5 text-cyan-400" />
                          <span>十年大运推演 →</span>
                        </button>
                        <button
                          onClick={() => setActiveTab('annual')}
                          className="px-3 py-1.5 rounded-lg bg-[#0E1B38] hover:bg-[#132752] text-emerald-300 border border-emerald-500/30 flex items-center gap-1 transition"
                        >
                          <Calendar className="w-3.5 h-3.5 text-emerald-400" />
                          <span>流年运势分析 →</span>
                        </button>
                        <button
                          onClick={() => setActiveTab('monthly')}
                          className="px-3 py-1.5 rounded-lg bg-[#0E1B38] hover:bg-[#132752] text-purple-300 border border-purple-500/30 flex items-center gap-1 transition"
                        >
                          <Sparkles className="w-3.5 h-3.5 text-purple-400" />
                          <span>十二流月五星精算 →</span>
                        </button>
                      </div>
                    </div>

                    {/* Default preview of Natal Chart Deep View on Overview */}
                    <NatalChartDeepView />
                  </div>
                </>
              )}

              {/* Tab: Natal Chart Deep Analysis (本命命局 / 五行 / 十神 / 命局关系 / 综合解读) */}
              {(activeTab === 'synthesis' ||
                activeTab === 'wuxing' ||
                activeTab === 'shishen' ||
                activeTab === 'relationships') && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <button
                      onClick={() => setActiveTab('overview')}
                      className="text-xs text-blue-400 hover:text-blue-300 transition flex items-center gap-1"
                    >
                      ← 返回命盘总览排盘
                    </button>
                  </div>
                  <NatalChartDeepView />
                </div>
              )}

              {/* Tab: Ten-Year Luck Cycle Deep Analysis (大运分析) */}
              {activeTab === 'dayun' && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <button
                      onClick={() => setActiveTab('overview')}
                      className="text-xs text-blue-400 hover:text-blue-300 transition flex items-center gap-1"
                    >
                      ← 返回命盘总览排盘
                    </button>
                  </div>
                  <LuckCycleDeepView />
                </div>
              )}

              {/* Tab: Annual Luck Deep Analysis (流年运势) */}
              {activeTab === 'annual' && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <button
                      onClick={() => setActiveTab('overview')}
                      className="text-xs text-blue-400 hover:text-blue-300 transition flex items-center gap-1"
                    >
                      ← 返回命盘总览排盘
                    </button>
                  </div>
                  <AnnualLuckDeepView />
                </div>
              )}

              {/* Tab: Twelve Monthly Fortunes (十二流月) */}
              {activeTab === 'monthly' && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <button
                      onClick={() => setActiveTab('overview')}
                      className="text-xs text-blue-400 hover:text-blue-300 transition flex items-center gap-1"
                    >
                      ← 返回命盘总览排盘
                    </button>
                  </div>
                  <TwelveMonthsDeepView />
                </div>
              )}

              {/* Additional Contextual Card for Locked Report (if client is in Free tier) */}
              {!activeClient.hasGeneratedReport && (
                <div className="p-4 rounded-2xl bg-gradient-to-r from-amber-950/30 via-[#0B142A] to-blue-950/30 border border-amber-500/40 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
                      <Lock className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-white">
                        当前客户处于【免费基础体验】阶段
                      </h4>
                      <p className="text-[11px] text-slate-400 mt-0.5">
                        已免费体验基础排盘与五行指数。解锁【深度命理精批报告】即可查阅一生正偏财禄、十年大运精解及赵天佑师傅终审批注。
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => setIsUnlockModalOpen(true)}
                    className="px-4 py-2 rounded-xl bg-gradient-to-r from-amber-500 to-yellow-400 hover:from-amber-400 hover:to-yellow-300 text-slate-900 font-bold text-xs shadow-lg transition whitespace-nowrap"
                  >
                    单次解锁 RM 168 起
                  </button>
                </div>
              )}
            </main>
          </>
        )}

        {/* Dashboard Footer */}
        <footer
          className="px-6 py-3 border-t border-[#142343] bg-[#070D1D] text-center text-xs text-slate-500 flex flex-col sm:flex-row items-center justify-between gap-2 select-none"
          data-purpose="dashboard-footer"
        >
          <div>
            <span>趙天佑 MASTER JOE CHEW AI 智能子平八字命理系统 © 2025</span>
            <span className="mx-2">·</span>
            <span>马来西亚专业命理师尊享版 (Pro Desktop)</span>
          </div>
          <div className="flex items-center gap-3 text-slate-400 text-[11px]">
            <span className="flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              系统引擎运行正常
            </span>
            <span>数据加密安全防护</span>
          </div>
        </footer>
      </div>

      {/* Interactive Modals */}
      <ReportUnlockModal />
      <ReportViewModal />
      <NewClientModal />
      <SystemTestRunnerModal />
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <MainLayout />
    </AppProvider>
  );
}
