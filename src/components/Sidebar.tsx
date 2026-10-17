import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  LayoutDashboard,
  Users,
  Grid,
  TrendingUp,
  ShieldCheck,
  Clock,
  Calendar,
  FileText,
  BookOpen,
  Settings,
  CheckCircle2,
  TestTube2,
  ChevronDown,
  LogOut,
  UserCheck
} from 'lucide-react';
import { UserRole } from '../types';

export const Sidebar: React.FC = () => {
  const {
    activeNav,
    setActiveNav,
    setActiveTab,
    setIsReportModalOpen,
    currentUser,
    switchUserRole,
    logout,
    setIsTestRunnerOpen,
    reports
  } = useApp();

  const [isRoleDropdownOpen, setIsRoleDropdownOpen] = useState(false);

  const pendingApprovalsCount = reports.filter(r => r.approvalStatus === 'pending_approval').length;

  const navItems = [
    { id: 'dashboard', labelZh: '首页仪表板', labelEn: 'Dashboard', icon: LayoutDashboard },
    { id: 'clients', labelZh: '客户管理', labelEn: 'Clients', icon: Users },
    { id: 'bazi_chart', labelZh: '八字排盘', labelEn: 'BaZi Chart', icon: Grid },
    { id: 'fate_analysis', labelZh: '命局分析', labelEn: 'Fate Analysis', icon: TrendingUp },
    { id: 'ten_years_luck', labelZh: '十年大运', labelEn: '10-Year Luck', icon: ShieldCheck },
    { id: 'annual_luck', labelZh: '流年运势', labelEn: 'Annual Luck', icon: Clock },
    { id: 'twelve_months', labelZh: '十二流月', labelEn: 'Monthly Luck', icon: Calendar },
    { id: 'reports', labelZh: '命理报告', labelEn: 'Destiny Reports', icon: FileText },
    { id: 'knowledge_base', labelZh: '知识库管理', labelEn: 'Knowledge Base', icon: BookOpen },
    { id: 'system_settings', labelZh: '系统设置', labelEn: 'System Settings', icon: Settings },
  ];

  return (
    <aside
      className="w-64 flex-shrink-0 bg-[#070D1D]/95 backdrop-blur-md border-r border-[#152342] flex flex-col justify-between z-20 min-h-screen select-none"
      data-purpose="sidebar"
    >
      <div className="p-4 flex flex-col">
        {/* Official Master Joe Chew Logo */}
        <div className="px-2 pt-1 pb-4 border-b border-[#1A2A4C] flex flex-col items-center text-center">
          <div className="w-48 h-auto p-1.5 rounded-lg bg-black/50 border border-amber-500/30 shadow-inner flex flex-col items-center justify-center relative overflow-hidden group">
            <img
              alt="趙天佑 MASTER JOE CHEW"
              className="max-h-20 w-auto object-contain drop-shadow-[0_2px_8px_rgba(234,179,8,0.3)] transition-transform duration-300 group-hover:scale-105"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuCzYqy3IHMRTcdoFjVw8DP8uwBdAkJJfh4jTax0OpaQ3eTvlRLHpDNYIkjRZ6vdReUQFML_8nG0uB_SiRwX0qEN74xDLHbffkINit9t0QZqVRjZd-6Wn9QXHgr6VSBGK-WJ-M7YVhPga-NWIkAaV0WPpiYtlOUw3sYOZDYi2e0DgaVgAmavdWqYZ5U-qaejGvfQNJvymFgP-RbVufmjCHY4lKvjl789F-355yNPyOY4TBJG2zGBSjTbGm1MyfyRMcWWnBU"
              onError={(e) => {
                e.currentTarget.style.display = 'none';
              }}
            />
          </div>
        </div>

        {/* Master Role badge & Master Review Tab for Owner */}
        {currentUser?.role === 'master' && (
          <div className="mt-3 px-1">
            <button
              onClick={() => setActiveNav('master_approvals')}
              className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold border transition ${
                activeNav === 'master_approvals'
                  ? 'bg-amber-500/20 text-amber-300 border-amber-500/50 shadow-md shadow-amber-900/30'
                  : 'bg-[#0E1B38] text-amber-400 border-amber-500/20 hover:border-amber-500/40'
              }`}
            >
              <span className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-amber-400" />
                宗师审批中心
              </span>
              {pendingApprovalsCount > 0 && (
                <span className="px-1.5 py-0.5 rounded-full text-[10px] bg-red-500 text-white font-bold">
                  {pendingApprovalsCount}
                </span>
              )}
            </button>
          </div>
        )}

        {/* Primary Navigation Menu */}
        <nav aria-label="侧边栏主导航" className="mt-3 space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeNav === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  setActiveNav(item.id);
                  if (item.id === 'fate_analysis') setActiveTab('synthesis');
                  else if (item.id === 'ten_years_luck') setActiveTab('dayun');
                  else if (item.id === 'annual_luck') setActiveTab('annual');
                  else if (item.id === 'twelve_months') setActiveTab('monthly');
                  else if (item.id === 'bazi_chart' || item.id === 'dashboard') setActiveTab('overview');
                  else if (item.id === 'reports') {
                    setActiveTab('report_preview');
                    setIsReportModalOpen(true);
                  }
                }}
                className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs transition text-left group ${
                  isActive
                    ? 'bg-gradient-to-r from-blue-600/90 to-indigo-600/80 text-white shadow-lg shadow-blue-900/30 font-semibold border-l-4 border-cyan-300'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
                }`}
              >
                <Icon
                  className={`w-4 h-4 transition ${
                    isActive ? 'text-cyan-200' : 'text-slate-400 group-hover:text-blue-400'
                  }`}
                />
                <span className="tracking-wide">{item.labelZh}</span>
              </button>
            );
          })}
        </nav>

        {/* Algorithm Test Runner button */}
        <div className="mt-3 px-1">
          <button
            onClick={() => setIsTestRunnerOpen(true)}
            className="w-full flex items-center justify-center gap-2 px-3 py-1.5 rounded-lg text-[11px] text-cyan-300 bg-cyan-950/40 hover:bg-cyan-900/40 border border-cyan-500/30 transition"
          >
            <TestTube2 className="w-3.5 h-3.5 text-cyan-400" />
            算法与子时边界测试
          </button>
        </div>
      </div>

      {/* Sidebar Footer with Promo Card and User Account Switcher */}
      <div className="p-3 border-t border-[#152342] bg-[#070D1F]/90">
        <div className="p-3 rounded-xl bg-gradient-to-br from-blue-950/40 via-indigo-950/30 to-slate-900/60 border border-blue-800/30 mb-2">
          <div className="text-[11px] font-bold text-blue-300">AI 智能命理系统</div>
          <p className="text-[10px] text-slate-400 mt-0.5 leading-relaxed">
            传承经典·智慧分析<br />
            助您掌握人生方向
          </p>
        </div>

        {/* User Account / Role Switcher */}
        <div className="relative">
          <button
            onClick={() => setIsRoleDropdownOpen(!isRoleDropdownOpen)}
            className="w-full flex items-center justify-between px-2 py-1.5 rounded-lg hover:bg-slate-800/50 transition border border-transparent hover:border-slate-700"
          >
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-amber-500 to-yellow-300 p-0.5 flex items-center justify-center overflow-hidden">
                {currentUser?.avatarUrl ? (
                  <img src={currentUser.avatarUrl} alt="Avatar" className="w-full h-full object-cover rounded-full" />
                ) : (
                  <span className="text-[10px] font-bold text-slate-900">
                    {currentUser?.displayName?.[0] || '用'}
                  </span>
                )}
              </div>
              <div className="text-left">
                <div className="text-xs font-medium text-slate-200 truncate max-w-[100px]">
                  {currentUser?.displayName || '未登录'}
                </div>
                <span className="inline-block px-1.5 py-0.2 text-[9px] bg-blue-600/30 text-blue-400 rounded border border-blue-500/20">
                  {currentUser?.title || '访客'}
                </span>
              </div>
            </div>
            <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
          </button>

          {/* Role Switching Dropdown */}
          {isRoleDropdownOpen && (
            <div className="absolute bottom-full left-0 w-full mb-2 bg-[#0C152B] border border-[#1C2C52] rounded-xl shadow-xl overflow-hidden z-50 text-xs py-1">
              <div className="px-3 py-1.5 text-[10px] font-semibold text-slate-400 border-b border-[#182645] uppercase tracking-wider">
                切换角色体验 (3 primary roles)
              </div>
              <button
                onClick={() => { switchUserRole('master'); setIsRoleDropdownOpen(false); }}
                className={`w-full px-3 py-2 text-left flex items-center justify-between hover:bg-slate-800 transition ${
                  currentUser?.role === 'master' ? 'text-amber-400 font-bold bg-amber-500/10' : 'text-slate-300'
                }`}
              >
                <span>赵师傅 (Master / Owner)</span>
                {currentUser?.role === 'master' && <UserCheck className="w-3.5 h-3.5 text-amber-400" />}
              </button>
              <button
                onClick={() => { switchUserRole('practitioner'); setIsRoleDropdownOpen(false); }}
                className={`w-full px-3 py-2 text-left flex items-center justify-between hover:bg-slate-800 transition ${
                  currentUser?.role === 'practitioner' ? 'text-blue-400 font-bold bg-blue-500/10' : 'text-slate-300'
                }`}
              >
                <span>林法师 (Practitioner)</span>
                {currentUser?.role === 'practitioner' && <UserCheck className="w-3.5 h-3.5 text-blue-400" />}
              </button>
              <button
                onClick={() => { switchUserRole('client'); setIsRoleDropdownOpen(false); }}
                className={`w-full px-3 py-2 text-left flex items-center justify-between hover:bg-slate-800 transition ${
                  currentUser?.role === 'client' ? 'text-emerald-400 font-bold bg-emerald-500/10' : 'text-slate-300'
                }`}
              >
                <span>陈美玲 (Client / Paid)</span>
                {currentUser?.role === 'client' && <UserCheck className="w-3.5 h-3.5 text-emerald-400" />}
              </button>
              <div className="border-t border-[#182645] mt-1 pt-1">
                <button
                  onClick={() => { logout(); setIsRoleDropdownOpen(false); }}
                  className="w-full px-3 py-1.5 text-left text-rose-400 hover:bg-rose-950/20 transition flex items-center gap-1.5"
                >
                  <LogOut className="w-3 h-3" />
                  退出登录
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </aside>
  );
};
