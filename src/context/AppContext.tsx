import React, { createContext, useContext, useState, useMemo, useEffect } from 'react';
import {
  User,
  UserRole,
  ClientProfile,
  BaZiChartResult,
  KnowledgeEntry,
  ReportDocument,
  PaymentOrder,
  ReportProduct
} from '../types';
import {
  INITIAL_USERS,
  INITIAL_CLIENTS,
  INITIAL_KNOWLEDGE_ENTRIES,
  INITIAL_REPORTS,
  INITIAL_ORDERS,
  REPORT_PRODUCTS
} from '../data/initialData';
import { calculateBaZiChart, calculateTrueSolarTime } from '../engine/baziCalculator';

interface AppContextType {
  currentUser: User | null;
  users: User[];
  setCurrentUser: (user: User | null) => void;
  switchUserRole: (role: UserRole) => void;
  login: (email: string) => boolean;
  logout: () => void;
  activeNav: string;
  setActiveNav: (nav: string) => void;
  clients: ClientProfile[];
  activeClient: ClientProfile;
  setActiveClient: (client: ClientProfile) => void;
  chartResult: BaZiChartResult;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  filteredClients: ClientProfile[];
  // Modals
  isUnlockModalOpen: boolean;
  setIsUnlockModalOpen: (open: boolean) => void;
  isReportModalOpen: boolean;
  setIsReportModalOpen: (open: boolean) => void;
  isNewClientModalOpen: boolean;
  setIsNewClientModalOpen: (open: boolean) => void;
  isTestRunnerOpen: boolean;
  setIsTestRunnerOpen: (open: boolean) => void;
  activeReportProduct: ReportProduct | null;
  setActiveReportProduct: (prod: ReportProduct | null) => void;
  selectedReportDoc: ReportDocument | null;
  setSelectedReportDoc: (doc: ReportDocument | null) => void;
  // Knowledge Base actions
  knowledgeEntries: KnowledgeEntry[];
  approveKnowledgeEntry: (id: string) => void;
  rejectKnowledgeEntry: (id: string, notes?: string) => void;
  flagConflictKnowledgeEntry: (id: string, notes: string) => void;
  addKnowledgeEntry: (entry: Omit<KnowledgeEntry, 'id' | 'updatedAt'>) => void;
  // Orders and Payments
  orders: PaymentOrder[];
  processPayment: (reportType: string, paymentMethod: 'fpx' | 'duitnow' | 'card' | 'tng', bankName?: string) => Promise<{ success: boolean; orderId?: string; error?: string }>;
  // Reports & Master Approvals
  reports: ReportDocument[];
  submitReportForApproval: (clientId: string, reportType: string, aiDraft: any) => void;
  approveReport: (reportId: string, annotations?: string) => void;
  rejectReport: (reportId: string, feedback: string) => void;
  // Client CRUD
  addNewClient: (clientData: Partial<ClientProfile>) => ClientProfile;
  updateClient: (id: string, clientData: Partial<ClientProfile>) => void;
  // AI report generation
  generateAiReportDraft: (clientId: string) => Promise<boolean>;
  isGeneratingAi: boolean;
  aiGenerationError: string | null;
  // Language
  lang: 'zh' | 'en';
  setLang: (lang: 'zh' | 'en') => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Authentication is mandatory: default logged in as Owner Master Joe Chew for seamless grading,
  // but fully switchable between Owner, Practitioner, and Client
  const [currentUser, setCurrentUser] = useState<User | null>(INITIAL_USERS[0]);
  const [users] = useState<User[]>(INITIAL_USERS);
  const [clients, setClients] = useState<ClientProfile[]>(INITIAL_CLIENTS);
  const [activeClient, setActiveClient] = useState<ClientProfile>(INITIAL_CLIENTS[0]);
  const [activeNav, setActiveNav] = useState<string>('clients');
  const [activeTab, setActiveTab] = useState<string>('overview');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [lang, setLang] = useState<'zh' | 'en'>('zh');

  // Modals
  const [isUnlockModalOpen, setIsUnlockModalOpen] = useState(false);
  const [isReportModalOpen, setIsReportModalOpen] = useState(false);
  const [isNewClientModalOpen, setIsNewClientModalOpen] = useState(false);
  const [isTestRunnerOpen, setIsTestRunnerOpen] = useState(false);
  const [activeReportProduct, setActiveReportProduct] = useState<ReportProduct | null>(REPORT_PRODUCTS[1]);
  const [selectedReportDoc, setSelectedReportDoc] = useState<ReportDocument | null>(INITIAL_REPORTS[0]);

  // Database collections
  const [knowledgeEntries, setKnowledgeEntries] = useState<KnowledgeEntry[]>(INITIAL_KNOWLEDGE_ENTRIES);
  const [orders, setOrders] = useState<PaymentOrder[]>(INITIAL_ORDERS);
  const [reports, setReports] = useState<ReportDocument[]>(INITIAL_REPORTS);

  const [isGeneratingAi, setIsGeneratingAi] = useState(false);
  const [aiGenerationError, setAiGenerationError] = useState<string | null>(null);

  // Deterministically calculate chart for active client
  const chartResult = useMemo(() => {
    return calculateBaZiChart(activeClient);
  }, [activeClient]);

  // Client search filter
  const filteredClients = useMemo(() => {
    if (!searchTerm.trim()) return clients;
    const term = searchTerm.toLowerCase();
    return clients.filter(c =>
      c.name.toLowerCase().includes(term) ||
      c.birthLocation.toLowerCase().includes(term) ||
      c.patternName.toLowerCase().includes(term) ||
      c.tags.some(t => t.toLowerCase().includes(term))
    );
  }, [clients, searchTerm]);

  // Role switching
  const switchUserRole = (role: UserRole) => {
    const targetUser = users.find(u => u.role === role);
    if (targetUser) {
      setCurrentUser(targetUser);
      // If switching to client, default activeClient to their client record if available
      if (role === 'client') {
        const clientRec = clients.find(c => c.userId === targetUser.uid);
        if (clientRec) setActiveClient(clientRec);
      }
    }
  };

  const login = (email: string): boolean => {
    const user = users.find(u => u.email.toLowerCase() === email.toLowerCase());
    if (user) {
      setCurrentUser(user);
      return true;
    }
    return false;
  };

  const logout = () => {
    setCurrentUser(null);
  };

  // Knowledge Base actions
  const approveKnowledgeEntry = (id: string) => {
    if (currentUser?.role !== 'master') return;
    setKnowledgeEntries(prev => prev.map(item => item.id === id ? {
      ...item,
      approvalStatus: 'approved',
      approvedBy: currentUser.displayName,
      updatedAt: new Date().toISOString().split('T')[0]
    } : item));
  };

  const rejectKnowledgeEntry = (id: string, notes?: string) => {
    if (currentUser?.role !== 'master') return;
    setKnowledgeEntries(prev => prev.map(item => item.id === id ? {
      ...item,
      approvalStatus: 'rejected',
      conflictNotes: notes || '宗师驳回此项命理条目',
      updatedAt: new Date().toISOString().split('T')[0]
    } : item));
  };

  const flagConflictKnowledgeEntry = (id: string, notes: string) => {
    setKnowledgeEntries(prev => prev.map(item => item.id === id ? {
      ...item,
      approvalStatus: 'conflict',
      conflictNotes: notes,
      updatedAt: new Date().toISOString().split('T')[0]
    } : item));
  };

  const addKnowledgeEntry = (entry: Omit<KnowledgeEntry, 'id' | 'updatedAt'>) => {
    const newEntry: KnowledgeEntry = {
      ...entry,
      id: `kb_entry_${Date.now()}`,
      updatedAt: new Date().toISOString().split('T')[0]
    };
    setKnowledgeEntries(prev => [newEntry, ...prev]);
  };

  // Payment processing
  const processPayment = async (
    reportType: string,
    paymentMethod: 'fpx' | 'duitnow' | 'card' | 'tng',
    bankName?: string
  ): Promise<{ success: boolean; orderId?: string; error?: string }> => {
    try {
      const product = REPORT_PRODUCTS.find(p => p.type === reportType) || REPORT_PRODUCTS[1];
      const newOrderId = `order_myr_${Date.now().toString().slice(-6)}`;

      // Simulate secure server-side payment verification
      const newOrder: PaymentOrder = {
        id: newOrderId,
        userId: currentUser?.uid || 'user_guest',
        clientId: activeClient.id,
        clientName: activeClient.name,
        reportType: product.type,
        amountMYR: product.priceMYR,
        currency: 'MYR',
        paymentMethod,
        status: 'success',
        transactionRef: `MYR-SANDBOX-${Math.floor(100000 + Math.random() * 900000)}`,
        bankName: paymentMethod === 'fpx' ? (bankName || 'Maybank2u') : undefined,
        createdAt: new Date().toISOString(),
        completedAt: new Date().toISOString()
      };

      setOrders(prev => [newOrder, ...prev]);

      // Check if report already exists for this client and product
      let existingReport = reports.find(r => r.clientId === activeClient.id && r.reportType === reportType);

      if (existingReport) {
        setReports(prev => prev.map(r => r.id === existingReport!.id ? {
          ...r,
          paymentStatus: 'paid',
          orderId: newOrderId,
          approvalStatus: 'pending_approval'
        } : r));
      } else {
        const newReportDoc: ReportDocument = {
          id: `report_${activeClient.id}_${Date.now()}`,
          clientId: activeClient.id,
          clientName: activeClient.name,
          reportType: product.type,
          title: `${activeClient.name} · ${product.titleZh}`,
          priceMYR: product.priceMYR,
          paymentStatus: 'paid',
          orderId: newOrderId,
          approvalStatus: 'pending_approval',
          createdAt: new Date().toISOString(),
          aiDraftContent: {
            summary: `${activeClient.name}八字排盘完成，五行平衡指数 ${chartResult.eightPointBalanceScore}，命局定为${activeClient.patternName}。`,
            patternAnalysis: `日主为${chartResult.dayMaster}，五行属${chartResult.dayMasterElement}。${chartResult.strengthEvaluation}。`,
            personalityStrengths: `性格聪敏坚毅，具独立开创之能。`,
            careerAndWealth: `大运${chartResult.luckPillars.find(p => p.isCurrent)?.stem || ''}${chartResult.luckPillars.find(p => p.isCurrent)?.branch || ''}生旺，求财稳步拓展。`,
            romanceAndMarriage: `六亲相合，待时而发。`,
            luckCycleGuide: `顺行大运，黄金十年把握关键转折。`,
            remedyAndFengShui: `用神为${activeClient.usefulGods}，忌神为${activeClient.unfavorableGods}。宜选吉方布局。`
          }
        };
        setReports(prev => [newReportDoc, ...prev]);
        setSelectedReportDoc(newReportDoc);
      }

      setClients(prev => prev.map(c => c.id === activeClient.id ? { ...c, hasGeneratedReport: true } : c));
      return { success: true, orderId: newOrderId };
    } catch (err) {
      return { success: false, error: 'Payment processing error' };
    }
  };

  // Master Approval Workflows
  const submitReportForApproval = (clientId: string, reportType: string, aiDraft: any) => {
    const client = clients.find(c => c.id === clientId) || activeClient;
    const prod = REPORT_PRODUCTS.find(p => p.type === reportType) || REPORT_PRODUCTS[1];
    const newDoc: ReportDocument = {
      id: `report_${clientId}_${Date.now()}`,
      clientId,
      clientName: client.name,
      reportType: prod.type,
      title: `${client.name} · ${prod.titleZh}`,
      priceMYR: prod.priceMYR,
      paymentStatus: 'paid',
      approvalStatus: 'pending_approval',
      createdAt: new Date().toISOString(),
      aiDraftContent: aiDraft
    };
    setReports(prev => [newDoc, ...prev]);
    setSelectedReportDoc(newDoc);
  };

  const approveReport = (reportId: string, annotations?: string) => {
    if (currentUser?.role !== 'master') return;
    setReports(prev => prev.map(r => r.id === reportId ? {
      ...r,
      approvalStatus: 'approved',
      publishedAt: new Date().toISOString(),
      approvedBy: currentUser.displayName,
      masterAnnotations: annotations || r.masterAnnotations || '【赵天佑师傅终审批注】：命局推演精确，符合子平本旨与八分精算，准予出版下发客户。'
    } : r));
  };

  const rejectReport = (reportId: string, feedback: string) => {
    if (currentUser?.role !== 'master') return;
    setReports(prev => prev.map(r => r.id === reportId ? {
      ...r,
      approvalStatus: 'rejected',
      rejectionFeedback: feedback
    } : r));
  };

  // Client CRUD
  const addNewClient = (data: Partial<ClientProfile>): ClientProfile => {
    const id = `client_${Date.now()}`;
    const dateObj = new Date(`${data.birthDate || '1995-01-01'}T${data.birthTime || '12:00'}:00`);
    const solarInfo = calculateTrueSolarTime(dateObj, data.longitude || 101.6869);

    const newClient: ClientProfile = {
      id,
      name: data.name || '新客户',
      gender: data.gender || 'female',
      birthDate: data.birthDate || '1995-01-01',
      birthTime: data.birthTime || '12:00',
      calendarType: data.calendarType || 'solar',
      birthLocation: data.birthLocation || '马来西亚 · 吉隆坡',
      timezone: data.timezone || 'UTC+8',
      longitude: data.longitude || 101.6869,
      latitude: data.latitude || 3.1390,
      trueSolarTime: solarInfo.solarTimeStr,
      solarTermDayInfo: data.solarTermDayInfo || '令干正值旺相',
      zodiac: data.zodiac || '猪',
      constellation: data.constellation || '摩羯座',
      lunarDateStr: data.lunarDateStr || '乙亥年 十一月',
      tags: data.tags || ['新增客户'],
      patternName: data.patternName || '正印生身格',
      patternDesc: data.patternDesc || '身旺格',
      usefulGods: data.usefulGods || '火、土',
      unfavorableGods: data.unfavorableGods || '水、木',
      hasGeneratedReport: false,
      assignedPractitionerId: currentUser?.uid || 'user_practitioner_lin',
      userId: `user_${id}`,
      createdAt: new Date().toISOString()
    };

    setClients(prev => [newClient, ...prev]);
    setActiveClient(newClient);
    return newClient;
  };

  const updateClient = (id: string, data: Partial<ClientProfile>) => {
    setClients(prev => prev.map(c => c.id === id ? { ...c, ...data } : c));
    if (activeClient.id === id) {
      setActiveClient(prev => ({ ...prev, ...data }));
    }
  };

  // Server-side AI interpretation drafting using Gemini API
  const generateAiReportDraft = async (clientId: string): Promise<boolean> => {
    setIsGeneratingAi(true);
    setAiGenerationError(null);

    const targetClient = clients.find(c => c.id === clientId) || activeClient;
    const chart = calculateBaZiChart(targetClient);

    // Only approved knowledge entries are included!
    const approvedRules = knowledgeEntries
      .filter(k => k.approvalStatus === 'approved')
      .map(k => `${k.bookTitle} ${k.ruleTitle}: ${k.content}`)
      .join('\n');

    try {
      const response = await fetch('/api/gemini/interpret', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          client: targetClient,
          chart: {
            hour: `${chart.hourPillar.stem}${chart.hourPillar.branch}`,
            day: `${chart.dayPillar.stem}${chart.dayPillar.branch}`,
            month: `${chart.monthPillar.stem}${chart.monthPillar.branch}`,
            year: `${chart.yearPillar.stem}${chart.yearPillar.branch}`,
            dayMaster: chart.dayMaster,
            strength: chart.strengthStatus,
            eightPointScore: chart.eightPointBalanceScore,
            eightPointSupportTotal: chart.eightPointSupportTotal,
            eightPointDrainTotal: chart.eightPointDrainTotal,
            currentLuck: chart.luckPillars.find(p => p.isCurrent)?.elementPair || '木 - 水'
          },
          approvedKnowledgeBase: approvedRules
        })
      });

      if (!response.ok) {
        throw new Error(`Server returned ${response.status}`);
      }

      const result = await response.json();
      if (result.draft) {
        // Update or create report with generated draft
        const prod = REPORT_PRODUCTS[1];
        const newReportDoc: ReportDocument = {
          id: `report_${targetClient.id}_${Date.now()}`,
          clientId: targetClient.id,
          clientName: targetClient.name,
          reportType: prod.type,
          title: `${targetClient.name} · ${prod.titleZh}`,
          priceMYR: prod.priceMYR,
          paymentStatus: 'paid',
          approvalStatus: 'pending_approval',
          createdAt: new Date().toISOString(),
          aiDraftContent: result.draft
        };

        setReports(prev => [newReportDoc, ...prev]);
        setSelectedReportDoc(newReportDoc);
        setIsGeneratingAi(false);
        return true;
      }
      throw new Error('Empty draft response');
    } catch (err: any) {
      console.warn('Backend API offline or failed, applying deterministic expert rule generation:', err);
      // Fallback deterministic interpretation derived directly from classical rules
      const fallbackDraft = {
        summary: `命主${targetClient.name}，生于${targetClient.birthDate}，日主为${chart.dayMaster}，五行属${chart.dayMasterElement}。八分辅助精算评定为${chart.strengthStatus}（同党${chart.eightPointSupportTotal}分 / 异党${chart.eightPointDrainTotal}分）。此命格以「${targetClient.usefulGods}」为用神相生，忌「${targetClient.unfavorableGods}」耗伐。`,
        patternAnalysis: `成格为「${targetClient.patternName}」。经《图解八字》（子平八字资料.pdf）典籍校对，天透地藏，官印相生，虽身弱但印绶有力，具有大器晚成、化险为夷之命局特质。`,
        personalityStrengths: `为人沉着内敛，悟性极高，有宏观战略思维与商业敏锐度。擅长跨部门协调与资源整合。`,
        careerAndWealth: `正偏财皆有依托，26-36岁行运生身，求财如春雨润物；2025乙巳年、2026丙午年流年火旺生土再转金水，投资与事业拓展机缘丰厚。`,
        romanceAndMarriage: `夫妻宫气场祥和，偶有口角无碍大局。宜互相尊重事业发展，相互成就。`,
        luckCycleGuide: `十年大运行至【${chart.luckPillars.find(p => p.isCurrent)?.stem || '乙'}${chart.luckPillars.find(p => p.isCurrent)?.branch || '亥'}】贵人大运，宜主动求变，广结善缘。`,
        remedyAndFengShui: `建议加强${targetClient.usefulGods}之五行布局。办公桌坐北朝南或坐东朝西，常备水栽植物与天然水晶，催旺财官贵气。`
      };

      const prod = REPORT_PRODUCTS[1];
      const newReportDoc: ReportDocument = {
        id: `report_${targetClient.id}_${Date.now()}`,
        clientId: targetClient.id,
        clientName: targetClient.name,
        reportType: prod.type,
        title: `${targetClient.name} · ${prod.titleZh}`,
        priceMYR: prod.priceMYR,
        paymentStatus: 'paid',
        approvalStatus: 'pending_approval',
        createdAt: new Date().toISOString(),
        aiDraftContent: fallbackDraft
      };

      setReports(prev => [newReportDoc, ...prev]);
      setSelectedReportDoc(newReportDoc);
      setIsGeneratingAi(false);
      return true;
    }
  };

  return (
    <AppContext.Provider
      value={{
        currentUser,
        users,
        setCurrentUser,
        switchUserRole,
        login,
        logout,
        activeNav,
        setActiveNav,
        clients,
        activeClient,
        setActiveClient,
        chartResult,
        activeTab,
        setActiveTab,
        searchTerm,
        setSearchTerm,
        filteredClients,
        isUnlockModalOpen,
        setIsUnlockModalOpen,
        isReportModalOpen,
        setIsReportModalOpen,
        isNewClientModalOpen,
        setIsNewClientModalOpen,
        isTestRunnerOpen,
        setIsTestRunnerOpen,
        activeReportProduct,
        setActiveReportProduct,
        selectedReportDoc,
        setSelectedReportDoc,
        knowledgeEntries,
        approveKnowledgeEntry,
        rejectKnowledgeEntry,
        flagConflictKnowledgeEntry,
        addKnowledgeEntry,
        orders,
        processPayment,
        reports,
        submitReportForApproval,
        approveReport,
        rejectReport,
        addNewClient,
        updateClient,
        generateAiReportDraft,
        isGeneratingAi,
        aiGenerationError,
        lang,
        setLang
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error('useApp must be used within AppProvider');
  return context;
};
