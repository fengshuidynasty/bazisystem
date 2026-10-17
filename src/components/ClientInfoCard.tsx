import React from 'react';
import { useApp } from '../context/AppContext';
import { UserCheck, Edit2 } from 'lucide-react';

export const ClientInfoCard: React.FC = () => {
  const { activeClient, setIsNewClientModalOpen } = useApp();

  return (
    <section
      className="lg:col-span-3 bg-[#0B142A]/90 rounded-2xl border border-[#16274B] p-4 flex flex-col justify-between shadow-lg shadow-black/20 select-none"
      data-purpose="customer-info-card"
    >
      <div>
        <div className="flex items-center justify-between pb-3 border-b border-[#142343]">
          <span className="text-xs font-semibold text-slate-200 flex items-center gap-1.5">
            <UserCheck className="w-3.5 h-3.5 text-blue-400" />
            客户资料
          </span>
          <button
            onClick={() => setIsNewClientModalOpen(true)}
            className="text-[11px] text-blue-400 hover:text-blue-300 flex items-center gap-0.5 transition"
          >
            <Edit2 className="w-3 h-3" />
            编辑
          </button>
        </div>

        {/* Detailed Natal Metadata List */}
        <div className="mt-3.5 space-y-2.5 text-xs">
          <div className="flex justify-between items-center py-0.5">
            <span className="text-slate-400">姓名：</span>
            <span className="text-slate-200 font-medium">{activeClient.name}</span>
          </div>
          <div className="flex justify-between items-center py-0.5">
            <span className="text-slate-400">性别：</span>
            <span className="text-slate-200 font-medium">
              {activeClient.gender === 'female' ? '女' : '男'}
            </span>
          </div>
          <div className="flex justify-between items-center py-0.5">
            <span className="text-slate-400">出生日期：</span>
            <span className="text-slate-200 font-medium">
              {activeClient.birthDate.replace(/-/g, '年').replace(/(\d{4})年(\d{2})年(\d{2})/, '$1年$2月$3日')}
            </span>
          </div>
          <div className="flex justify-between items-center py-0.5">
            <span className="text-slate-400">出生时间：</span>
            <span className="text-slate-200 font-medium">{activeClient.birthTime} (标准时间)</span>
          </div>
          <div className="flex justify-between items-center py-0.5">
            <span className="text-slate-400">出生地点：</span>
            <span className="text-slate-200 font-medium">{activeClient.birthLocation}</span>
          </div>
          <div className="flex justify-between items-center py-0.5">
            <span className="text-slate-400">时区：</span>
            <span className="text-slate-200 font-medium">{activeClient.timezone}</span>
          </div>
          <div className="flex justify-between items-center py-0.5">
            <span className="text-slate-400">农历日期：</span>
            <span className="text-amber-300 font-medium font-serif">{activeClient.lunarDateStr}</span>
          </div>
          <div className="flex justify-between items-center py-0.5">
            <span className="text-slate-400">生肖：</span>
            <span className="text-slate-200 font-medium">
              {activeClient.zodiac} {activeClient.zodiac === '马' ? '🐴' : activeClient.zodiac === '龙' ? '🐉' : '🐗'}
            </span>
          </div>
          <div className="flex justify-between items-center py-0.5">
            <span className="text-slate-400">星座：</span>
            <span className="text-slate-200 font-medium">{activeClient.constellation}</span>
          </div>
        </div>
      </div>

      {/* Solar Time and Solar Term calculation box */}
      <div className="mt-4 p-2.5 rounded-xl bg-[#081023] border border-[#16274B] text-[11px] space-y-1">
        <div className="text-slate-400 flex justify-between">
          <span>真太阳时：</span>
          <span className="text-blue-300 font-mono font-medium">{activeClient.trueSolarTime}</span>
        </div>
        <div className="text-slate-400 flex justify-between">
          <span>节气令干：</span>
          <span className="text-slate-200">{activeClient.solarTermDayInfo}</span>
        </div>
      </div>
    </section>
  );
};
