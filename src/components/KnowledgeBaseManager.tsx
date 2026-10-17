import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  BookOpen,
  CheckCircle2,
  AlertTriangle,
  XCircle,
  Plus,
  Search,
  Filter,
  FileText,
  ShieldAlert,
  Sparkles
} from 'lucide-react';
import { KnowledgeEntry } from '../types';

export const KnowledgeBaseManager: React.FC = () => {
  const {
    knowledgeEntries,
    approveKnowledgeEntry,
    rejectKnowledgeEntry,
    flagConflictKnowledgeEntry,
    addKnowledgeEntry,
    currentUser
  } = useApp();

  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [searchKb, setSearchKb] = useState('');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  // Form state for adding new book entry
  const [newBook, setNewBook] = useState('《图解八字》（子平八字资料.pdf）');
  const [newChapter, setNewChapter] = useState('');
  const [newPage, setNewPage] = useState<number>(1);
  const [newCategory, setNewCategory] = useState<KnowledgeEntry['ruleCategory']>('旺衰篇');
  const [newTitle, setNewTitle] = useState('');
  const [newContent, setNewContent] = useState('');

  const isMaster = currentUser?.role === 'master';

  const categories = [
    { id: 'all', label: '全部典籍' },
    { id: '旺衰篇', label: '旺衰篇' },
    { id: '格局篇', label: '格局篇' },
    { id: '用神篇', label: '用神篇' },
    { id: '十神篇', label: '十神篇' },
    { id: '调候篇', label: '调候篇' },
    { id: '大运流年篇', label: '大运流年篇' }
  ];

  const filteredEntries = knowledgeEntries.filter(entry => {
    const matchesCategory = activeCategory === 'all' || entry.ruleCategory === activeCategory;
    const matchesSearch =
      entry.ruleTitle.toLowerCase().includes(searchKb.toLowerCase()) ||
      entry.content.toLowerCase().includes(searchKb.toLowerCase()) ||
      entry.bookTitle.toLowerCase().includes(searchKb.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleCreateEntry = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim() || !newContent.trim()) {
      alert('请完整填写条目标题与典籍引文内容');
      return;
    }

    addKnowledgeEntry({
      bookTitle: newBook,
      chapter: newChapter || '正文节选',
      sourcePage: newPage || 1,
      ruleCategory: newCategory,
      ruleTitle: newTitle,
      content: newContent,
      approvalStatus: isMaster ? 'approved' : 'pending',
      approvedBy: isMaster ? currentUser?.displayName : undefined
    });

    setIsAddModalOpen(false);
    setNewTitle('');
    setNewContent('');
  };

  return (
    <div className="p-6 space-y-6 select-none max-w-7xl mx-auto">
      {/* Top Banner & Stats */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-[#142343]">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-lg font-bold text-white tracking-wide flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-amber-400" />
              子平八字古典知识库与典籍管理
            </h2>
            <span className="text-[11px] bg-amber-500/10 text-amber-300 px-2 py-0.5 rounded border border-amber-500/20 font-semibold">
              《图解八字》权威索引
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            仅经过宗师严格审核准入的古典条目方可作为 AI 智能命理研判的 Prompt 知识依据，严禁未审核文本污染计算核心。
          </p>
        </div>

        <button
          onClick={() => setIsAddModalOpen(true)}
          className="inline-flex items-center gap-1.5 px-4 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white text-xs font-semibold rounded-lg shadow-md transition self-start md:self-auto"
        >
          <Plus className="w-4 h-4" />
          录入典籍规则 / 篇章
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="flex items-center gap-1 overflow-x-auto w-full sm:w-auto text-xs">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-3 py-1.5 rounded-lg whitespace-nowrap transition font-medium ${
                activeCategory === cat.id
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'bg-[#0E1A36] text-slate-400 hover:text-white border border-[#1C2C50]'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        <div className="relative w-full sm:w-64">
          <Search className="w-3.5 h-3.5 absolute left-3 top-2.5 text-slate-500" />
          <input
            type="text"
            value={searchKb}
            onChange={(e) => setSearchKb(e.target.value)}
            placeholder="检索典籍、条目或原著页码..."
            className="w-full bg-[#0E1B38] border border-[#1E305C] rounded-lg py-1.5 pl-8 pr-3 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
        </div>
      </div>

      {/* Knowledge Entries Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredEntries.map((entry) => {
          const isApproved = entry.approvalStatus === 'approved';
          const isConflict = entry.approvalStatus === 'conflict';
          const isPending = entry.approvalStatus === 'pending';
          const isRejected = entry.approvalStatus === 'rejected';

          return (
            <div
              key={entry.id}
              className={`p-4 rounded-2xl border bg-[#0B142A]/90 shadow-md transition flex flex-col justify-between ${
                isConflict
                  ? 'border-rose-500/50 bg-rose-950/10'
                  : isApproved
                  ? 'border-[#16274B] hover:border-blue-500/40'
                  : 'border-amber-500/40'
              }`}
            >
              <div>
                {/* Book Source & Status Header */}
                <div className="flex items-center justify-between pb-2 border-b border-[#142343]">
                  <div className="flex items-center gap-1.5 text-xs font-semibold text-amber-300">
                    <FileText className="w-3.5 h-3.5 text-amber-400" />
                    <span>{entry.bookTitle}</span>
                    <span className="text-slate-400 font-normal">· 第 {entry.sourcePage} 页</span>
                  </div>

                  <div>
                    {isApproved && (
                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 font-medium flex items-center gap-1">
                        <CheckCircle2 className="w-3 h-3" /> 宗师核准
                      </span>
                    )}
                    {isConflict && (
                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-rose-500/10 text-rose-400 border border-rose-500/30 font-medium flex items-center gap-1">
                        <AlertTriangle className="w-3 h-3" /> 规则冲突
                      </span>
                    )}
                    {isPending && (
                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/30 font-medium">
                        待复核
                      </span>
                    )}
                    {isRejected && (
                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-slate-800 text-slate-400 border border-slate-700 font-medium">
                        已驳回
                      </span>
                    )}
                  </div>
                </div>

                {/* Chapter and Title */}
                <div className="mt-2.5">
                  <div className="text-[10px] text-blue-400 font-medium">{entry.chapter}</div>
                  <h4 className="text-xs font-bold text-white mt-0.5">{entry.ruleTitle}</h4>
                  <p className="text-xs text-slate-300 leading-relaxed mt-2 bg-[#070D1D] p-3 rounded-xl border border-[#152342] font-serif">
                    “{entry.content}”
                  </p>
                </div>

                {/* Conflict Alert Box if present */}
                {entry.conflictNotes && (
                  <div className="mt-2 p-2.5 rounded-lg bg-rose-950/30 border border-rose-500/30 text-[11px] text-rose-300 flex items-start gap-1.5">
                    <ShieldAlert className="w-4 h-4 text-rose-400 flex-shrink-0 mt-0.5" />
                    <span>{entry.conflictNotes}</span>
                  </div>
                )}
              </div>

              {/* Master Review Action Controls */}
              <div className="mt-4 pt-3 border-t border-[#142343] flex items-center justify-between text-[11px] text-slate-400">
                <span>更新日期：{entry.updatedAt}</span>

                {isMaster ? (
                  <div className="flex items-center gap-1.5">
                    {!isApproved && (
                      <button
                        onClick={() => approveKnowledgeEntry(entry.id)}
                        className="px-2.5 py-1 rounded bg-emerald-600/20 text-emerald-300 hover:bg-emerald-600/40 border border-emerald-500/30 transition"
                      >
                        准入使用
                      </button>
                    )}
                    {!isConflict && (
                      <button
                        onClick={() => {
                          const note = prompt('请填写冲突原因 (例如: 与《图解八字》旺衰定局法则相悖):');
                          if (note) flagConflictKnowledgeEntry(entry.id, note);
                        }}
                        className="px-2.5 py-1 rounded bg-amber-600/20 text-amber-300 hover:bg-amber-600/40 border border-amber-500/30 transition"
                      >
                        标记冲突
                      </button>
                    )}
                    {!isRejected && (
                      <button
                        onClick={() => rejectKnowledgeEntry(entry.id)}
                        className="px-2 py-1 rounded bg-rose-950/30 text-rose-400 hover:bg-rose-900/40 border border-rose-500/20 transition"
                      >
                        驳回
                      </button>
                    )}
                  </div>
                ) : (
                  <span className="text-[10px] text-slate-500">
                    {isApproved ? `审核人：${entry.approvedBy || '宗师'}` : '仅宗师有权裁定'}
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Add New Knowledge Entry Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="w-full max-w-lg bg-[#0A1329] border border-[#1E335C] rounded-2xl shadow-2xl overflow-hidden p-6 space-y-4 text-xs">
            <div className="flex items-center justify-between pb-3 border-b border-[#142343]">
              <h3 className="text-sm font-bold text-white flex items-center gap-1.5">
                <BookOpen className="w-4 h-4 text-amber-400" />
                录入八字经典释例与规则条目
              </h3>
              <button
                onClick={() => setIsAddModalOpen(false)}
                className="text-slate-400 hover:text-white"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleCreateEntry} className="space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-400 mb-1">典籍书名：</label>
                  <select
                    value={newBook}
                    onChange={(e) => setNewBook(e.target.value)}
                    className="w-full bg-[#0E1A36] border border-[#1E325E] rounded-lg p-2 text-white text-xs"
                  >
                    <option value="《图解八字》（子平八字资料.pdf）">《图解八字》（子平八字资料.pdf）</option>
                    <option value="《滴天髓阐微》">《滴天髓阐微》</option>
                    <option value="《穷通宝鉴》">《穷通宝鉴》</option>
                    <option value="《渊海子平》">《渊海子平》</option>
                    <option value="《三命通会》">《三命通会》</option>
                  </select>
                </div>
                <div>
                  <label className="block text-slate-400 mb-1">规则分类：</label>
                  <select
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value as any)}
                    className="w-full bg-[#0E1A36] border border-[#1E325E] rounded-lg p-2 text-white text-xs"
                  >
                    <option value="旺衰篇">旺衰篇 (八分法)</option>
                    <option value="格局篇">格局篇</option>
                    <option value="用神篇">用神篇</option>
                    <option value="十神篇">十神篇 (神煞纳音)</option>
                    <option value="调候篇">调候篇</option>
                    <option value="大运流年篇">大运流年篇</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-400 mb-1">章节卷目：</label>
                  <input
                    type="text"
                    value={newChapter}
                    onChange={(e) => setNewChapter(e.target.value)}
                    placeholder="例如: 第三章：旺衰评定"
                    className="w-full bg-[#0E1A36] border border-[#1E325E] rounded-lg p-2 text-white text-xs"
                  />
                </div>
                <div>
                  <label className="block text-slate-400 mb-1">原书页码：</label>
                  <input
                    type="number"
                    value={newPage}
                    onChange={(e) => setNewPage(parseInt(e.target.value, 10))}
                    className="w-full bg-[#0E1A36] border border-[#1E325E] rounded-lg p-2 text-white text-xs"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-400 mb-1">规则标题：</label>
                <input
                  type="text"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="例如: 乙木秋生月令印绶化官之要"
                  className="w-full bg-[#0E1A36] border border-[#1E325E] rounded-lg p-2 text-white text-xs"
                />
              </div>

              <div>
                <label className="block text-slate-400 mb-1">典籍正文 / 判词精义：</label>
                <textarea
                  value={newContent}
                  onChange={(e) => setNewContent(e.target.value)}
                  placeholder="录入原典句段..."
                  rows={4}
                  className="w-full bg-[#0E1A36] border border-[#1E325E] rounded-lg p-2 text-white text-xs font-serif leading-relaxed"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2 border-t border-[#142343]">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-3 py-1.5 rounded text-slate-400 hover:text-white"
                >
                  取消
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 rounded bg-blue-600 hover:bg-blue-500 text-white font-semibold shadow"
                >
                  保存并录入
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
