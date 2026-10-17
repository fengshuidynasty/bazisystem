import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { REPORT_PRODUCTS } from '../data/initialData';
import {
  X,
  CheckCircle2,
  Lock,
  CreditCard,
  QrCode,
  Building,
  Smartphone,
  ShieldCheck,
  Sparkles
} from 'lucide-react';
import { ReportType } from '../types';

export const ReportUnlockModal: React.FC = () => {
  const {
    isUnlockModalOpen,
    setIsUnlockModalOpen,
    activeClient,
    processPayment,
    setIsReportModalOpen
  } = useApp();

  const [selectedProductType, setSelectedProductType] = useState<ReportType>('career_wealth');
  const [paymentMethod, setPaymentMethod] = useState<'fpx' | 'duitnow' | 'card' | 'tng'>('fpx');
  const [selectedBank, setSelectedBank] = useState<string>('Maybank2u');
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);

  if (!isUnlockModalOpen) return null;

  const selectedProduct = REPORT_PRODUCTS.find(p => p.type === selectedProductType) || REPORT_PRODUCTS[2];

  const malaysianBanks = [
    'Maybank2u',
    'CIMB Clicks',
    'Public Bank',
    'Hong Leong Connect',
    'RHB Now',
    'AmOnline'
  ];

  const handlePayNow = async () => {
    setIsProcessing(true);
    const res = await processPayment(selectedProductType, paymentMethod, selectedBank);
    setIsProcessing(false);
    if (res.success) {
      setPaymentSuccess(true);
      setTimeout(() => {
        setIsUnlockModalOpen(false);
        setPaymentSuccess(false);
        setIsReportModalOpen(true);
      }, 1500);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm select-none">
      <div className="relative w-full max-w-2xl bg-[#091226] border border-[#1E335C] rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[92vh]">
        {/* Modal Header */}
        <div className="px-6 py-4 border-b border-[#152342] bg-[#070D1D] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="p-1.5 rounded-lg bg-amber-500/10 border border-amber-500/30 text-amber-400">
              <Lock className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-white tracking-wide">
                解锁命理全析报告 · 单次授权购买
              </h3>
              <p className="text-[11px] text-slate-400">
                专属客户：<span className="text-amber-300 font-medium">{activeClient.name}</span> (非按月订阅，单次付费永久生效)
              </p>
            </div>
          </div>
          <button
            onClick={() => setIsUnlockModalOpen(false)}
            className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-5 text-xs">
          {paymentSuccess ? (
            <div className="py-12 flex flex-col items-center justify-center text-center space-y-3">
              <div className="w-16 h-16 rounded-full bg-emerald-500/20 border-2 border-emerald-500 text-emerald-400 flex items-center justify-center animate-bounce">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h4 className="text-base font-bold text-white">支付验证成功！已授权解锁</h4>
              <p className="text-slate-400 text-xs max-w-sm">
                订单已记录至系统，AI 命理深度研判报告已就绪并送呈宗师复核，即将为您载入报告...
              </p>
            </div>
          ) : (
            <>
              {/* Report Product Selection (MYR Pricing) */}
              <div>
                <label className="block text-slate-300 font-semibold mb-2">
                  1. 选择命理研判报告规格 (MYR)
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {REPORT_PRODUCTS.filter(p => p.priceMYR > 0).map((prod) => {
                    const isSelected = selectedProductType === prod.type;
                    return (
                      <div
                        key={prod.type}
                        onClick={() => setSelectedProductType(prod.type)}
                        className={`p-3 rounded-xl border cursor-pointer transition relative flex flex-col justify-between ${
                          isSelected
                            ? 'bg-[#12244B] border-blue-500 shadow-md shadow-blue-900/40 text-white'
                            : 'bg-[#0A1329] border-[#18284C] hover:border-slate-600 text-slate-300'
                        }`}
                      >
                        {prod.recommended && (
                          <span className="absolute -top-2 right-2 bg-gradient-to-r from-amber-500 to-yellow-400 text-slate-900 font-bold text-[9px] px-1.5 py-0.2 rounded-full shadow">
                            师傅推荐
                          </span>
                        )}
                        <div>
                          <div className="font-bold text-xs">{prod.titleZh}</div>
                          <div className="text-[10px] text-slate-400 mt-1 line-clamp-2">{prod.summary}</div>
                        </div>
                        <div className="mt-3 pt-2 border-t border-[#1C2C50] flex items-baseline justify-between">
                          <span className="text-[11px] text-slate-400">单次购买</span>
                          <span className="text-base font-bold font-mono text-amber-300">
                            RM {prod.priceMYR}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Product Feature Inclusions */}
              <div className="p-3 bg-[#081023] border border-[#16274B] rounded-xl">
                <span className="font-semibold text-slate-300 text-[11px] flex items-center gap-1.5 mb-2">
                  <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                  已包含服务项目 ({selectedProduct.titleZh}):
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 text-[11px] text-slate-400">
                  {selectedProduct.features.map((feat, i) => (
                    <div key={i} className="flex items-center gap-1.5">
                      <CheckCircle2 className="w-3 h-3 text-emerald-400 flex-shrink-0" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Malaysian Payment Gateways */}
              <div>
                <label className="block text-slate-300 font-semibold mb-2">
                  2. 选择马来西亚安全支付通道 (Sandbox Sandbox Tested)
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {/* FPX */}
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('fpx')}
                    className={`p-2.5 rounded-xl border flex flex-col items-center justify-center gap-1.5 transition ${
                      paymentMethod === 'fpx'
                        ? 'bg-blue-600/20 border-blue-500 text-white shadow-sm'
                        : 'bg-[#0A1329] border-[#18284C] text-slate-400 hover:text-white'
                    }`}
                  >
                    <Building className="w-4 h-4 text-blue-400" />
                    <span className="font-semibold text-[11px]">FPX 网银转账</span>
                  </button>

                  {/* DuitNow QR */}
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('duitnow')}
                    className={`p-2.5 rounded-xl border flex flex-col items-center justify-center gap-1.5 transition ${
                      paymentMethod === 'duitnow'
                        ? 'bg-blue-600/20 border-blue-500 text-white shadow-sm'
                        : 'bg-[#0A1329] border-[#18284C] text-slate-400 hover:text-white'
                    }`}
                  >
                    <QrCode className="w-4 h-4 text-pink-400" />
                    <span className="font-semibold text-[11px]">DuitNow QR</span>
                  </button>

                  {/* Credit Card */}
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('card')}
                    className={`p-2.5 rounded-xl border flex flex-col items-center justify-center gap-1.5 transition ${
                      paymentMethod === 'card'
                        ? 'bg-blue-600/20 border-blue-500 text-white shadow-sm'
                        : 'bg-[#0A1329] border-[#18284C] text-slate-400 hover:text-white'
                    }`}
                  >
                    <CreditCard className="w-4 h-4 text-amber-400" />
                    <span className="font-semibold text-[11px]">信用卡 / 借记卡</span>
                  </button>

                  {/* Touch 'n Go eWallet */}
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('tng')}
                    className={`p-2.5 rounded-xl border flex flex-col items-center justify-center gap-1.5 transition ${
                      paymentMethod === 'tng'
                        ? 'bg-blue-600/20 border-blue-500 text-white shadow-sm'
                        : 'bg-[#0A1329] border-[#18284C] text-slate-400 hover:text-white'
                    }`}
                  >
                    <Smartphone className="w-4 h-4 text-cyan-400" />
                    <span className="font-semibold text-[11px]">TNG eWallet</span>
                  </button>
                </div>
              </div>

              {/* Sub-options for selected payment method */}
              {paymentMethod === 'fpx' && (
                <div className="p-3 bg-[#081023] border border-[#16274B] rounded-xl space-y-2">
                  <label className="text-[11px] text-slate-400">选择马来西亚合作银行：</label>
                  <select
                    value={selectedBank}
                    onChange={(e) => setSelectedBank(e.target.value)}
                    className="w-full bg-[#0E1A36] border border-[#1E325E] rounded-lg p-2 text-xs text-white focus:outline-none focus:ring-1 focus:ring-blue-500"
                  >
                    {malaysianBanks.map(b => (
                      <option key={b} value={b}>{b}</option>
                    ))}
                  </select>
                </div>
              )}

              {paymentMethod === 'duitnow' && (
                <div className="p-4 bg-[#081023] border border-[#16274B] rounded-xl flex items-center justify-center flex-col text-center space-y-2">
                  <div className="w-28 h-28 bg-white p-2 rounded-lg flex items-center justify-center">
                    {/* Visual QR simulation */}
                    <div className="w-full h-full border-2 border-dashed border-pink-600 flex flex-col items-center justify-center text-pink-700 font-bold text-[10px]">
                      <span>DuitNow</span>
                      <span className="font-mono text-[9px]">RM {selectedProduct.priceMYR}</span>
                    </div>
                  </div>
                  <span className="text-[10px] text-slate-400">支持 Maybank, CIMB, TNG, GrabPay 扫码支付</span>
                </div>
              )}

              {/* Security & Order Summary */}
              <div className="pt-2 border-t border-[#152342] flex items-center justify-between text-xs">
                <div className="flex items-center gap-1.5 text-slate-400 text-[11px]">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  <span>256-bit SSL 银行级加密沙盒支付</span>
                </div>
                <div className="text-right">
                  <div className="text-[11px] text-slate-400">应付总额 (MYR)：</div>
                  <div className="text-xl font-bold font-mono text-amber-300">
                    RM {selectedProduct.priceMYR}.00
                  </div>
                </div>
              </div>
            </>
          )}
        </div>

        {/* Modal Footer */}
        {!paymentSuccess && (
          <div className="px-6 py-3 border-t border-[#152342] bg-[#070D1D] flex items-center justify-between">
            <span className="text-[11px] text-slate-500">
              单次付费，不产生自动续费
            </span>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setIsUnlockModalOpen(false)}
                className="px-4 py-1.5 rounded-lg text-slate-300 hover:bg-slate-800 transition"
              >
                取消
              </button>
              <button
                type="button"
                onClick={handlePayNow}
                disabled={isProcessing}
                className="px-5 py-1.5 rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-semibold transition disabled:opacity-50 shadow-md shadow-blue-900/40"
              >
                {isProcessing ? '处理中...' : `立即支付 RM ${selectedProduct.priceMYR}`}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
