import React from 'react';
import { useApp } from '../context/AppContext';
import {
  Award,
  DollarSign,
  FileCheck,
  AlertCircle,
  Eye,
  CheckCircle2,
  XCircle,
  TrendingUp,
  Clock,
  ShieldCheck,
  Building
} from 'lucide-react';

export const MasterApprovalDashboard: React.FC = () => {
  const {
    reports,
    orders,
    approveReport,
    rejectReport,
    setSelectedReportDoc,
    setIsReportModalOpen,
    setActiveClient,
    clients
  } = useApp();

  const pendingReports = reports.filter(r => r.approvalStatus === 'pending_approval');
  const approvedReports = reports.filter(r => r.approvalStatus === 'approved');

  const totalRevenueMYR = orders
    .filter(o => o.status === 'success')
    .reduce((sum, o) => sum + o.amountMYR, 0);

  const handleOpenReport = (doc: any) => {
    setSelectedReportDoc(doc);
    const client = clients.find(c => c.id === doc.clientId);
    if (client) setActiveClient(client);
    setIsReportModalOpen(true);
  };

  return (
    <div className="p-6 space-y-6 select-none max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-[#142343]">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-lg font-bold text-white tracking-wide flex items-center gap-2">
              <Award className="w-5 h-5 text-amber-400" />
              趙天佑师傅 · 宗师终审与运营中控台
            </h2>
            <span className="text-[10px] bg-amber-500/10 text-amber-300 px-2 py-0.5 rounded border border-amber-500/30 font-bold">
              Master Admin Mode
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            审核经由授权命理师提交的客户报告草稿、监管 MYR 付款流水，并把控知识库正统命理规则准入。
          </p>
        </div>
      </div>

      {/* KPI Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Total Revenue */}
        <div className="p-4 rounded-2xl bg-[#0B142A]/90 border border-[#16274B] shadow-md flex items-center justify-between">
          <div>
            <div className="text-xs text-slate-400 font-medium">累计报告营收 (MYR)</div>
            <div className="text-2xl font-bold font-mono text-amber-300 mt-1">
              RM {totalRevenueMYR.toFixed(2)}
            </div>
            <div className="text-[10px] text-emerald-400 mt-1 flex items-center gap-1">
              <TrendingUp className="w-3 h-3" /> 沙盒实收入账正常
            </div>
          </div>
          <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
            <DollarSign className="w-5 h-5" />
          </div>
        </div>

        {/* Pending Approvals */}
        <div className="p-4 rounded-2xl bg-[#0B142A]/90 border border-amber-500/40 shadow-md flex items-center justify-between">
          <div>
            <div className="text-xs text-slate-400 font-medium">待审核报告</div>
            <div className="text-2xl font-bold font-mono text-white mt-1">
              {pendingReports.length} <span className="text-xs font-normal text-slate-400">份</span>
            </div>
            <div className="text-[10px] text-amber-300 mt-1 flex items-center gap-1">
              <Clock className="w-3 h-3" /> 等待宗师审阅盖印
            </div>
          </div>
          <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
            <FileCheck className="w-5 h-5" />
          </div>
        </div>

        {/* Published Reports */}
        <div className="p-4 rounded-2xl bg-[#0B142A]/90 border border-[#16274B] shadow-md flex items-center justify-between">
          <div>
            <div className="text-xs text-slate-400 font-medium">已批准出版报告</div>
            <div className="text-2xl font-bold font-mono text-emerald-400 mt-1">
              {approvedReports.length} <span className="text-xs font-normal text-slate-400">份</span>
            </div>
            <div className="text-[10px] text-slate-400 mt-1">客户已获 PDF 导出权益</div>
          </div>
          <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
            <CheckCircle2 className="w-5 h-5" />
          </div>
        </div>

        {/* Total Orders */}
        <div className="p-4 rounded-2xl bg-[#0B142A]/90 border border-[#16274B] shadow-md flex items-center justify-between">
          <div>
            <div className="text-xs text-slate-400 font-medium">系统交易订单数</div>
            <div className="text-2xl font-bold font-mono text-blue-300 mt-1">
              {orders.length} <span className="text-xs font-normal text-slate-400">单</span>
            </div>
            <div className="text-[10px] text-slate-400 mt-1">含支付成功、退款与失败</div>
          </div>
          <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/30 flex items-center justify-center text-blue-400">
            <Building className="w-5 h-5" />
          </div>
        </div>
      </div>

      {/* Pending Reports Queue */}
      <div className="bg-[#0B142A]/90 rounded-2xl border border-[#16274B] p-5 shadow-lg space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-[#142343]">
          <h3 className="text-xs font-bold text-white flex items-center gap-2">
            <Clock className="w-4 h-4 text-amber-400" />
            待审阅报告队列 ({pendingReports.length})
          </h3>
          <span className="text-[11px] text-slate-400">按提交时间倒序排布</span>
        </div>

        {pendingReports.length === 0 ? (
          <div className="py-8 text-center text-slate-400 text-xs">
            暂无待审阅报告，所有提报均已处理完毕。
          </div>
        ) : (
          <div className="space-y-3">
            {pendingReports.map((report) => (
              <div
                key={report.id}
                className="p-4 rounded-xl bg-[#070D1D] border border-amber-500/30 flex flex-col md:flex-row md:items-center justify-between gap-4"
              >
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-white text-xs">{report.clientName}</span>
                    <span className="text-[10px] px-2 py-0.5 rounded bg-blue-500/10 text-blue-300 border border-blue-500/20">
                      {report.title}
                    </span>
                    <span className="text-amber-400 font-mono font-bold text-xs">
                      RM {report.priceMYR}
                    </span>
                  </div>
                  <p className="text-xs text-slate-300 mt-2 line-clamp-2 leading-relaxed font-serif bg-slate-900/50 p-2.5 rounded-lg border border-slate-800">
                    “{report.aiDraftContent.summary}”
                  </p>
                  <div className="text-[10px] text-slate-500 mt-2 flex items-center gap-3">
                    <span>提报时间：{report.createdAt.replace('T', ' ').slice(0, 16)}</span>
                    <span>·</span>
                    <span>状态：<span className="text-amber-400 font-medium">已付款等待终审</span></span>
                  </div>
                </div>

                <div className="flex items-center gap-2 flex-shrink-0">
                  <button
                    onClick={() => handleOpenReport(report)}
                    className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-[#122042] hover:bg-[#182A56] text-blue-300 border border-[#22386A] text-xs transition"
                  >
                    <Eye className="w-3.5 h-3.5" />
                    逐段审阅
                  </button>
                  <button
                    onClick={() => approveReport(report.id)}
                    className="inline-flex items-center gap-1 px-4 py-1.5 rounded-lg bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-semibold text-xs shadow transition"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    核准下发
                  </button>
                  <button
                    onClick={() => {
                      const reason = prompt('请输入驳回原因:');
                      if (reason) rejectReport(report.id, reason);
                    }}
                    className="px-3 py-1.5 rounded-lg bg-rose-950/40 hover:bg-rose-900/40 border border-rose-500/30 text-rose-300 text-xs transition"
                  >
                    驳回
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Order Transaction Audit Log Table */}
      <div className="bg-[#0B142A]/90 rounded-2xl border border-[#16274B] p-5 shadow-lg space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-[#142343]">
          <h3 className="text-xs font-bold text-white flex items-center gap-2">
            <DollarSign className="w-4 h-4 text-emerald-400" />
            系统订单支付与财务审计流水 (MYR)
          </h3>
          <span className="text-[11px] text-slate-400">马来西亚 Ringgit 实收沙盒记录</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-[#182645] text-slate-400 text-[11px]">
                <th className="py-2 px-3">订单编号</th>
                <th className="py-2 px-3">客户姓名</th>
                <th className="py-2 px-3">报告类别</th>
                <th className="py-2 px-3">支付金额</th>
                <th className="py-2 px-3">支付方式</th>
                <th className="py-2 px-3">流水参考号</th>
                <th className="py-2 px-3 text-right">交易状态</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#14223E] text-slate-300">
              {orders.map((order) => {
                const isSuccess = order.status === 'success';
                const isFailed = order.status === 'failed';
                const isRefunded = order.status === 'refunded';

                return (
                  <tr key={order.id} className="hover:bg-slate-800/30 transition">
                    <td className="py-2.5 px-3 font-mono text-slate-400">{order.id}</td>
                    <td className="py-2.5 px-3 font-medium text-white">{order.clientName}</td>
                    <td className="py-2.5 px-3">{order.reportType}</td>
                    <td className="py-2.5 px-3 font-mono font-bold text-amber-300">
                      RM {order.amountMYR}.00
                    </td>
                    <td className="py-2.5 px-3 uppercase text-[11px] text-slate-400">
                      {order.paymentMethod} {order.bankName ? `(${order.bankName})` : ''}
                    </td>
                    <td className="py-2.5 px-3 font-mono text-[10px] text-slate-400">
                      {order.transactionRef}
                    </td>
                    <td className="py-2.5 px-3 text-right">
                      {isSuccess && (
                        <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 font-medium">
                          支付成功
                        </span>
                      )}
                      {isFailed && (
                        <span className="text-[10px] px-2 py-0.5 rounded-full bg-rose-500/10 text-rose-400 border border-rose-500/30 font-medium">
                          交易失败
                        </span>
                      )}
                      {isRefunded && (
                        <span className="text-[10px] px-2 py-0.5 rounded-full bg-slate-800 text-slate-400 border border-slate-700 font-medium">
                          已原路退款
                        </span>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
