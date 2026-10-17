import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { calculateTrueSolarTime, getHourBranch } from '../engine/baziCalculator';
import { UserPlus, X, Clock, MapPin, Calendar, Sparkles } from 'lucide-react';

export const NewClientModal: React.FC = () => {
  const {
    isNewClientModalOpen,
    setIsNewClientModalOpen,
    addNewClient
  } = useApp();

  const [name, setName] = useState('');
  const [gender, setGender] = useState<'female' | 'male'>('female');
  const [birthDate, setBirthDate] = useState('1992-06-18');
  const [birthTime, setBirthTime] = useState('10:30');
  const [city, setCity] = useState('吉隆坡');
  const [calendarType, setCalendarType] = useState<'solar' | 'lunar'>('solar');

  if (!isNewClientModalOpen) return null;

  const cityCoordinates: Record<string, { lng: number; lat: number }> = {
    '吉隆坡': { lng: 101.6869, lat: 3.1390 },
    '槟城': { lng: 100.3327, lat: 5.4164 },
    '新山': { lng: 103.7414, lat: 1.4927 },
    '怡保': { lng: 101.0901, lat: 4.5975 },
    '马六甲': { lng: 102.2501, lat: 2.1896 },
    '古晋': { lng: 110.3592, lat: 1.5533 },
    '亚庇': { lng: 116.0735, lat: 5.9804 }
  };

  const coords = cityCoordinates[city] || cityCoordinates['吉隆坡'];

  // Real-time solar time preview
  const dateObj = new Date(`${birthDate}T${birthTime}:00`);
  const solarTimeResult = calculateTrueSolarTime(dateObj, coords.lng);
  const [hoursStr, minsStr] = birthTime.split(':');
  const hours = parseInt(hoursStr, 10);
  const branchInfo = getHourBranch(hours);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      alert('请填写客户姓名');
      return;
    }

    addNewClient({
      name: name.trim(),
      gender,
      birthDate,
      birthTime,
      calendarType,
      birthLocation: `马来西亚 · ${city}`,
      timezone: 'UTC+8',
      longitude: coords.lng,
      latitude: coords.lat,
      trueSolarTime: solarTimeResult.solarTimeStr,
      tags: ['新录入档案', '待深度批断']
    });

    setIsNewClientModalOpen(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm select-none">
      <div className="w-full max-w-lg bg-[#091226] border border-[#1E335C] rounded-2xl shadow-2xl overflow-hidden p-6 space-y-4 text-xs">
        <div className="flex items-center justify-between pb-3 border-b border-[#142343]">
          <h3 className="text-sm font-bold text-white flex items-center gap-2">
            <UserPlus className="w-4 h-4 text-blue-400" />
            新建客户出生资料与八字排盘
          </h3>
          <button
            onClick={() => setIsNewClientModalOpen(false)}
            className="text-slate-400 hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-slate-300 font-medium mb-1">客户姓名：</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="例如: 林美华"
                required
                className="w-full bg-[#0E1A36] border border-[#1E325E] rounded-lg p-2 text-white text-xs focus:ring-1 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-slate-300 font-medium mb-1">性别：</label>
              <select
                value={gender}
                onChange={(e) => setGender(e.target.value as any)}
                className="w-full bg-[#0E1A36] border border-[#1E325E] rounded-lg p-2 text-white text-xs focus:ring-1 focus:ring-blue-500"
              >
                <option value="female">女 ♀ (坤造)</option>
                <option value="male">男 ♂ (乾造)</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-slate-300 font-medium mb-1 flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5 text-blue-400" />
                出生日期 (公历)：
              </label>
              <input
                type="date"
                value={birthDate}
                onChange={(e) => setBirthDate(e.target.value)}
                required
                className="w-full bg-[#0E1A36] border border-[#1E325E] rounded-lg p-2 text-white text-xs focus:ring-1 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-slate-300 font-medium mb-1 flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-blue-400" />
                出生时间 (标准时间)：
              </label>
              <input
                type="time"
                value={birthTime}
                onChange={(e) => setBirthTime(e.target.value)}
                required
                className="w-full bg-[#0E1A36] border border-[#1E325E] rounded-lg p-2 text-white text-xs focus:ring-1 focus:ring-blue-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-slate-300 font-medium mb-1 flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-amber-400" />
                出生地区 (马来西亚)：
              </label>
              <select
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className="w-full bg-[#0E1A36] border border-[#1E325E] rounded-lg p-2 text-white text-xs focus:ring-1 focus:ring-blue-500"
              >
                {Object.keys(cityCoordinates).map(c => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-slate-300 font-medium mb-1">时区设定：</label>
              <input
                type="text"
                disabled
                value="马来西亚标准时 (UTC+8)"
                className="w-full bg-[#0E1A36]/60 border border-[#1E325E]/60 rounded-lg p-2 text-slate-400 text-xs cursor-not-allowed"
              />
            </div>
          </div>

          {/* Time & Branch Verification Box */}
          <div className="p-3 bg-[#070D1D] border border-blue-900/40 rounded-xl space-y-2">
            <div className="text-[11px] font-semibold text-blue-300 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-cyan-300" />
              出生时辰与子正换日校对：
            </div>
            <div className="grid grid-cols-2 gap-2 text-[11px] text-slate-400">
              <div>
                <span>出生时间：</span>
                <span className="text-slate-200 font-mono">{birthTime}</span>
              </div>
              <div>
                <span>对应时柱地支：</span>
                <span className="text-amber-300 font-bold ml-1">{branchInfo.branch}时</span>
                {branchInfo.isLateZi && (
                  <span className="text-rose-400 text-[10px] ml-1">(夜子时，00:00换日)</span>
                )}
              </div>
            </div>
          </div>

          <div className="flex justify-end gap-2 pt-2 border-t border-[#142343]">
            <button
              type="button"
              onClick={() => setIsNewClientModalOpen(false)}
              className="px-4 py-2 rounded-lg text-slate-400 hover:text-white transition"
            >
              取消
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-semibold shadow-md transition"
            >
              确认识别并生成命盘
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
