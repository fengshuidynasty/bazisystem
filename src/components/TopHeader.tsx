import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  Menu,
  Search,
  Bell,
  Edit3,
  RotateCw,
  Sparkles,
  MoreVertical,
  Plus,
  Lock,
  ChevronDown,
  UserCheck
} from 'lucide-react';

export const TopHeader: React.FC = () => {
  const {
    searchTerm,
    setSearchTerm,
    clients,
    activeClient,
    setActiveClient,
    setIsNewClientModalOpen,
    setIsUnlockModalOpen,
    generateAiReportDraft,
    isGeneratingAi,
    currentUser,
    setSelectedReportDoc,
    reports,
    setIsReportModalOpen
  } = useApp();

  const [isClientDropdownOpen, setIsClientDropdownOpen] = useState(false);
  const [showNotificationToast, setShowNotificationToast] = useState(false);

  const handleGenerateReportClick = () => {
    // If client role and hasn't unlocked paid report, prompt to unlock
    if (currentUser?.role === 'client' && !activeClient.hasGeneratedReport) {
      setIsUnlockModalOpen(true);
      return;
    }

    // Check if an existing report document exists
    const existing = reports.find(r => r.clientId === activeClient.id);
    if (existing) {
      setSelectedReportDoc(existing);
      setIsReportModalOpen(true);
    } else {
      generateAiReportDraft(activeClient.id);
    }
  };

  return (
    <header
      className="h-16 px-6 bg-[#081023]/90 backdrop-blur-md border-b border-[#142343] flex items-center justify-between sticky top-0 z-30 select-none"
      data-purpose="top-header"
    >
      {/* Search Bar & Client Quick Selector */}
      <div className="flex items-center gap-4 flex-1 max-w-xl">
        <button
          onClick={() => setIsClientDropdownOpen(!isClientDropdownOpen)}
          className="text-slate-400 hover:text-white p-1.5 rounded-lg hover:bg-slate-800/60 transition"
          title="切换测试客户档案"
        >
          <Menu className="w-5 h-5" />
        </button>

        <div className="relative w-full max-w-md">
          <span className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-slate-500">
            <Search className="w-4 h-4" />
          </span>
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="搜索客户姓名、手机号或备注..."
            className="w-full bg-[#0E1B38] border border-[#1E305C] rounded-lg py-1.5 pl-9 pr-14 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 transition"
          />
          <kbd className="absolute right-2.5 top-2 text-[10px] bg-slate-800 border border-slate-700 text-slate-400 px-1.5 py-0.5 rounded">
            ⌘ K
          </kbd>
        </div>

        {/* Quick Client Switcher Dropdown */}
        <div className="relative">
          <button
            onClick={() => setIsClientDropdownOpen(!isClientDropdownOpen)}
            className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-1.5 bg-[#0F1B38] hover:bg-[#162952] border border-[#1F3361] rounded-lg text-xs text-slate-300 transition"
          >
            <span className="text-slate-400">客户:</span>
            <span className="font-semibold text-white">{activeClient.name}</span>
            <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
          </button>

          {isClientDropdownOpen && (
            <div className="absolute top-full left-0 mt-2 w-72 bg-[#0C152B] border border-[#1C2C52] rounded-xl shadow-2xl p-2 z-50 text-xs">
              <div className="flex items-center justify-between pb-1.5 mb-1.5 border-b border-[#182645] px-2 text-slate-400">
                <span className="font-semibold">选择客户排盘</span>
                <button
                  onClick={() => { setIsNewClientModalOpen(true); setIsClientDropdownOpen(false); }}
                  className="text-blue-400 hover:text-blue-300 flex items-center gap-0.5 text-[11px]"
                >
                  <Plus className="w-3 h-3" /> 新增客户
                </button>
              </div>
              <div className="space-y-1 max-h-60 overflow-y-auto">
                {clients.map((c) => (
                  <button
                    key={c.id}
                    onClick={() => { setActiveClient(c); setIsClientDropdownOpen(false); }}
                    className={`w-full p-2 rounded-lg text-left flex items-center justify-between hover:bg-slate-800/80 transition ${
                      activeClient.id === c.id ? 'bg-blue-600/20 border border-blue-500/40 text-white' : 'text-slate-300'
                    }`}
                  >
                    <div>
                      <div className="font-medium flex items-center gap-1.5">
                        {c.name}
                        <span className={`text-[10px] px-1 rounded ${c.gender === 'female' ? 'bg-pink-500/20 text-pink-300' : 'bg-blue-500/20 text-blue-300'}`}>
                          {c.gender === 'female' ? '女' : '男'}
                        </span>
                        {c.hasGeneratedReport && (
                          <span className="text-[9px] bg-emerald-500/20 text-emerald-300 px-1 rounded">已解锁</span>
                        )}
                      </div>
                      <div className="text-[10px] text-slate-400 mt-0.5">
                        {c.birthDate} · {c.birthLocation.split('·')[1]?.trim() || c.birthLocation}
                      </div>
                    </div>
                    {activeClient.id === c.id && <UserCheck className="w-4 h-4 text-blue-400" />}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Action Buttons & Notifications */}
      <div className="flex items-center gap-3">
        {/* Notification Bell (3 Badges) */}
        <div className="relative">
          <button
            onClick={() => setShowNotificationToast(!showNotificationToast)}
            className="relative p-2 text-slate-400 hover:text-white hover:bg-slate-800/50 rounded-lg transition"
            title="通知中心"
          >
            <Bell className="w-4 h-4" />
            <span className="absolute top-1 right-1 w-4 h-4 bg-red-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center animate-pulse">
              3
            </span>
          </button>

          {showNotificationToast && (
            <div className="absolute right-0 top-full mt-2 w-80 bg-[#0C152B] border border-[#1C2C52] rounded-xl shadow-2xl p-3 z-50 text-xs">
              <div className="font-bold text-white border-b border-[#182645] pb-2 flex items-center justify-between">
                <span>系统通知 (3条待处理)</span>
                <span className="text-[10px] text-blue-400 font-normal">标为已读</span>
              </div>
              <div className="divide-y divide-[#182645] mt-1 space-y-2">
                <div className="pt-2 text-slate-300">
                  <div className="font-semibold text-amber-300 text-[11px]">【宗师审批提醒】</div>
                  <p className="text-[11px] text-slate-400 mt-0.5">黄伟杰的深度命理精批报告已由林法师提交，等待赵师傅复核。</p>
                </div>
                <div className="pt-2 text-slate-300">
                  <div className="font-semibold text-emerald-300 text-[11px]">【支付到账成功】</div>
                  <p className="text-[11px] text-slate-400 mt-0.5">陈美玲已完成 RM 288 专项报告 FPX 在线支付。</p>
                </div>
                <div className="pt-2 text-slate-300">
                  <div className="font-semibold text-rose-300 text-[11px]">【知识库冲突提示】</div>
                  <p className="text-[11px] text-slate-400 mt-0.5">《民间秘传断诀》从格判定条目与《图解八字》冲突，已标记。</p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Edit Profile Button */}
        <button
          onClick={() => setIsNewClientModalOpen(true)}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#122042] hover:bg-[#182A56] text-slate-300 text-xs rounded-lg border border-[#22386A] transition"
        >
          <Edit3 className="w-3.5 h-3.5" />
          编辑资料
        </button>

        {/* Recalculate Button */}
        <button
          onClick={() => {
            // Re-trigger calculation
            setActiveClient({ ...activeClient });
          }}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#122042] hover:bg-[#182A56] text-slate-300 text-xs rounded-lg border border-[#22386A] transition active:scale-95"
        >
          <RotateCw className="w-3.5 h-3.5" />
          重新排盘
        </button>

        {/* Primary CTA: Generate / View Destiny Report */}
        <button
          onClick={handleGenerateReportClick}
          disabled={isGeneratingAi}
          className="inline-flex items-center gap-1.5 px-4 py-1.5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white text-xs font-semibold rounded-lg shadow-md shadow-blue-800/40 transition disabled:opacity-50"
        >
          <Sparkles className={`w-3.5 h-3.5 ${isGeneratingAi ? 'animate-spin' : ''}`} />
          {isGeneratingAi ? 'AI 研判生成中...' : (activeClient.hasGeneratedReport ? '查看命理报告' : '生成命理报告')}
        </button>

        {/* Unlock Paid Report Button for Client role */}
        {!activeClient.hasGeneratedReport && (
          <button
            onClick={() => setIsUnlockModalOpen(true)}
            className="inline-flex items-center gap-1 px-3 py-1.5 bg-gradient-to-r from-amber-600 to-yellow-600 hover:from-amber-500 hover:to-yellow-500 text-slate-900 font-bold text-xs rounded-lg shadow-md transition"
          >
            <Lock className="w-3 h-3 text-slate-900" />
            解锁全析报告
          </button>
        )}

        {/* More Actions */}
        <button
          onClick={() => setIsNewClientModalOpen(true)}
          className="text-slate-400 hover:text-white p-1.5 rounded-lg hover:bg-slate-800/60"
          title="更多选项"
        >
          <MoreVertical className="w-4 h-4" />
        </button>
      </div>
    </header>
  );
};
