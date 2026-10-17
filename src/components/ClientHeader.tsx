import React from 'react';
import { useApp } from '../context/AppContext';

export const ClientHeader: React.FC = () => {
  const {
    activeClient,
    activeTab,
    setActiveTab,
    setActiveNav,
    updateClient,
    setIsUnlockModalOpen,
    setIsReportModalOpen
  } = useApp();

  const tabs = [
    { id: 'overview', label: '命盘总览' },
    { id: 'wuxing', label: '五行分析' },
    { id: 'shishen', label: '十神分析' },
    { id: 'relationships', label: '命局关系' },
    { id: 'dayun', label: '大运分析' },
    { id: 'annual', label: '流年运势' },
    { id: 'monthly', label: '十二流月' },
    { id: 'synthesis', label: '综合解读' },
    { id: 'report_preview', label: '报告预览' }
  ];

  const handleAddTag = () => {
    const newTag = prompt('输入新标签 (例如: 事业转型、婚恋咨询):');
    if (newTag && newTag.trim()) {
      updateClient(activeClient.id, {
        tags: [...activeClient.tags, newTag.trim()]
      });
    }
  };

  return (
    <section className="px-6 pt-5 pb-0 select-none" data-purpose="client-profile-hero">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-[#142343]">
        <div className="flex items-center gap-4">
          {/* Client Avatar with active indicator */}
          <div className="relative">
            <div className="w-14 h-14 rounded-full overflow-hidden ring-2 ring-blue-500/50 shadow-md shadow-blue-900/30 bg-slate-800">
              <img
                alt={activeClient.name}
                className="w-full h-full object-cover"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuBzxQU6h8w7Ud8VObsX4How_zYQh7QxPl5wtDY1AcAH0sLFZOogx37ArTia0u-HIcL3Scs3VGToa2CGmKjmsGvZ7KvtWuh_FFl6v-_lF7NHvhudyObJm5WoLmFhHHdx1PbqMqbfPBBNuVJWpeQ3J1lvqHY89oHFBPw9iWsS4j9qFQx32SQ_iD-UJf421WU_S356Pb3EmlxRTs6kvG0F8fwQI-ZhxzARcun2QftIMqrz-B3a_j12K8yD4A"
                onError={(e) => {
                  e.currentTarget.src = '';
                  e.currentTarget.className = 'hidden';
                }}
              />
              <div className="w-full h-full bg-gradient-to-tr from-slate-800 to-indigo-900 flex items-center justify-center font-bold text-slate-300">
                {activeClient.name.slice(0, 1)}
              </div>
            </div>
            <span
              className="absolute bottom-0 right-0 w-3.5 h-3.5 rounded-full bg-emerald-500 ring-2 ring-[#0B132B]"
              title="有效客户状态"
            />
          </div>

          {/* Key demographic info */}
          <div>
            <div className="flex items-center gap-3">
              <h2 className="text-lg font-bold text-white tracking-wide">
                {activeClient.name}{' '}
                <span className="text-xs font-normal text-slate-400">
                  {activeClient.id === 'client_chen_meiling' ? '（客户示例）' : ''}
                </span>
              </h2>
              <span
                className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-medium border ${
                  activeClient.gender === 'female'
                    ? 'bg-pink-500/10 text-pink-400 border-pink-500/20'
                    : 'bg-blue-500/10 text-blue-400 border-blue-500/20'
                }`}
              >
                {activeClient.gender === 'female' ? '女 ♀' : '男 ♂'}
              </span>
            </div>

            <div className="flex flex-wrap items-center gap-y-1 gap-x-2 text-xs text-slate-400 mt-1">
              <span>
                出生公历：<span className="text-slate-200">{activeClient.birthDate} {activeClient.birthTime}</span>
              </span>
              <span>·</span>
              <span>标准时间</span>
              <span>·</span>
              <span className="text-slate-300">{activeClient.birthLocation}</span>
              <span className="text-blue-400 bg-blue-950/60 px-1 rounded text-[10px] border border-blue-800/40">
                {activeClient.timezone}
              </span>
            </div>

            {/* Tag pills */}
            <div className="flex flex-wrap items-center gap-1.5 mt-2">
              {activeClient.hasGeneratedReport ? (
                <button
                  onClick={() => setIsReportModalOpen(true)}
                  className="px-2 py-0.5 text-[10px] rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 flex items-center gap-1 font-medium hover:bg-emerald-500/20 transition"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  已生成报告 (点击查看)
                </button>
              ) : (
                <button
                  onClick={() => setIsUnlockModalOpen(true)}
                  className="px-2 py-0.5 text-[10px] rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/30 flex items-center gap-1 font-medium hover:bg-amber-500/20 transition"
                >
                  免费体验版 · 未解锁
                </button>
              )}

              {activeClient.tags.map((tag, idx) => (
                <span
                  key={idx}
                  className="px-2 py-0.5 text-[10px] rounded-full bg-blue-500/10 text-blue-300 border border-blue-500/20"
                >
                  {tag}
                </span>
              ))}

              <button
                onClick={handleAddTag}
                className="px-2 py-0.5 text-[10px] rounded-full bg-slate-800 text-slate-400 hover:text-white border border-slate-700/60 hover:border-slate-500 transition"
              >
                + 添加标签
              </button>
            </div>
          </div>
        </div>

        {/* Right side pattern badge */}
        <div className="flex items-center gap-2">
          <div className="text-right hidden sm:block">
            <div className="text-[11px] text-slate-400">八字格局推定</div>
            <div className="text-xs font-semibold text-amber-400">{activeClient.patternName}</div>
          </div>
        </div>
      </div>

      {/* Analysis Tabs */}
      <nav aria-label="命盘多维分析导航" className="flex items-center space-x-1 sm:space-x-4 mt-3 border-b border-transparent overflow-x-auto text-xs">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => {
                setActiveTab(tab.id);
                if (tab.id === 'overview') setActiveNav('bazi_chart');
                else if (tab.id === 'dayun') setActiveNav('ten_years_luck');
                else if (tab.id === 'annual') setActiveNav('annual_luck');
                else if (tab.id === 'monthly') setActiveNav('twelve_months');
                else if (tab.id === 'report_preview') {
                  setActiveNav('reports');
                  setIsReportModalOpen(true);
                } else {
                  setActiveNav('fate_analysis');
                }
              }}
              className={`py-2.5 px-3 whitespace-nowrap transition rounded-t-md font-medium ${
                isActive
                  ? 'border-b-2 border-blue-500 text-blue-400 font-semibold bg-blue-500/5'
                  : 'text-slate-400 hover:text-slate-200 hover:border-b-2 hover:border-slate-600'
              }`}
            >
              {tab.label}
            </button>
          );
        })}
      </nav>
    </section>
  );
};
