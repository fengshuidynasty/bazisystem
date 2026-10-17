export type UserRole = 'master' | 'practitioner' | 'client';

export type Gender = 'female' | 'male';

export interface User {
  uid: string;
  email: string;
  displayName: string;
  role: UserRole;
  title: string;
  avatarUrl?: string;
  assignedPractitionerId?: string;
}

export interface ClientProfile {
  id: string;
  name: string;
  gender: Gender;
  birthDate: string; // YYYY-MM-DD
  birthTime: string; // HH:mm
  calendarType: 'solar' | 'lunar';
  birthLocation: string;
  timezone: string;
  longitude: number;
  latitude: number;
  trueSolarTime: string; // HH:mm:ss
  solarTermDayInfo: string; // e.g. "立秋后第 7 天"
  zodiac: string;
  constellation: string;
  lunarDateStr: string; // e.g. "庚午年 六月 廿五"
  tags: string[];
  patternName: string;
  patternDesc: string;
  usefulGods: string;
  unfavorableGods: string;
  hasGeneratedReport: boolean;
  assignedPractitionerId: string;
  userId: string;
  createdAt: string;
}

export type WuXing = 'wood' | 'fire' | 'earth' | 'metal' | 'water';

export interface PillarData {
  nameZh: string;
  nameEn: string;
  tenGod: string;
  stem: string;
  stemElement: string;
  stemElementZh: string;
  branch: string;
  branchElement: string;
  branchElementZh: string;
  hiddenStems: string[];
  hiddenTenGods: string[];
  branchElements: string[];
}

export interface LuckPillar {
  ageStart: number;
  ageEnd: number;
  yearStart: number;
  yearEnd: number;
  tenGod: string;
  stem: string;
  branch: string;
  elementPair: string;
  hiddenStems: string[];
  hiddenTenGods: string[];
  isCurrent: boolean;
}

export interface EightPointDetail {
  god: string;
  value: number;
  percentage: number;
  color: string;
}

export interface MonthlyTrendPoint {
  month: number;
  monthName: string;
  solarTermName: string;
  score: number;
  description: string;
}

export interface BaZiChartResult {
  hourPillar: PillarData;
  dayPillar: PillarData;
  monthPillar: PillarData;
  yearPillar: PillarData;
  dayMaster: string;
  dayMasterElement: string;
  dayMasterDesc: string;
  strengthStatus: '身弱' | '身旺' | '从格' | '专旺';
  strengthEvaluation: string;
  eightPointBalanceScore: number; // e.g. 58
  eightPointSupportTotal: number; // e.g. 1.25 / 8
  eightPointDrainTotal: number;   // e.g. 6.75 / 8
  wuxingPercentages: {
    wood: number;
    fire: number;
    earth: number;
    metal: number;
    water: number;
  };
  eightPointBreakdown: EightPointDetail[];
  luckDirection: '顺行' | '逆行';
  luckStartAgeDesc: string; // e.g. "顺行大运 · 起运约 6 岁"
  luckPillars: LuckPillar[];
  annualYear: number;
  annualPillar: string;
  monthlyTrends: {
    wealth: MonthlyTrendPoint[];
    career: MonthlyTrendPoint[];
    romance: MonthlyTrendPoint[];
    family: MonthlyTrendPoint[];
    health: MonthlyTrendPoint[];
  };
  peakMonthNote: string;
}

export interface KnowledgeEntry {
  id: string;
  bookTitle: string; // e.g. 《图解八字》, 《子平真诠》
  chapter: string;
  sourcePage: number;
  ruleCategory: '格局篇' | '旺衰篇' | '用神篇' | '十神篇' | '调候篇' | '大运流年篇';
  ruleTitle: string;
  content: string;
  approvalStatus: 'approved' | 'pending' | 'conflict' | 'rejected';
  conflictNotes?: string;
  approvedBy?: string;
  updatedAt: string;
}

export type ReportType = 'basic_preview' | 'pro_comprehensive' | 'career_wealth' | 'master_executive';

export interface ReportProduct {
  type: ReportType;
  titleZh: string;
  titleEn: string;
  priceMYR: number;
  summary: string;
  features: string[];
  recommended?: boolean;
}

export interface ReportDocument {
  id: string;
  clientId: string;
  clientName: string;
  reportType: ReportType;
  title: string;
  priceMYR: number;
  paymentStatus: 'unpaid' | 'paid' | 'refunded';
  orderId?: string;
  approvalStatus: 'draft' | 'pending_approval' | 'approved' | 'rejected';
  rejectionFeedback?: string;
  aiDraftContent: {
    summary: string;
    patternAnalysis: string;
    personalityStrengths: string;
    careerAndWealth: string;
    romanceAndMarriage: string;
    luckCycleGuide: string;
    remedyAndFengShui: string;
  };
  masterAnnotations?: string;
  approvedBy?: string;
  publishedAt?: string;
  createdAt: string;
}

export interface PaymentOrder {
  id: string;
  userId: string;
  clientId: string;
  clientName: string;
  reportType: ReportType;
  amountMYR: number;
  currency: 'MYR';
  paymentMethod: 'fpx' | 'duitnow' | 'card' | 'tng';
  status: 'pending' | 'success' | 'failed' | 'refunded';
  transactionRef: string;
  bankName?: string;
  createdAt: string;
  completedAt?: string;
}

// 5 Core Analysis Categories
export type CategoryKey = 'wealth' | 'career' | 'relationship' | 'family' | 'health';

// Mandatory Deep Analysis Structure for Natal, Luck Cycle, and Annual Fortune
export interface DeepCategoryAnalysis {
  category: CategoryKey;
  categoryNameZh: string;
  categoryNameEn: string;
  baziEvidence: string;          // 1. 命理依据
  interpretation: string;        // 2. 命理推演
  opportunities: string[];       // 3. 优势与机会
  risks: string[];               // 4. 风险与挑战
  recommendations: {             // 5. 趋吉避凶建议
    opportunityEnhancement: string[]; // 趋吉 (Opportunity Enhancement)
    riskReduction: string[];          // 避凶 (Risk Reduction)
  };
  pdfKnowledgeReference: {       // 6. 宗师认证知识依据
    source: string;              // e.g. 《子平八字资料.pdf》
    chapter: string;             // Chapter name
    page: number;                // Page number
    quote: string;               // Classical reference citation
    status: 'approved' | 'insufficient_evidence';
  };
}

export type StarRating = 1 | 2 | 3 | 4 | 5;
export type StarLabel = '忌' | '欠吉' | '平' | '吉' | '大吉';

// Concise Monthly Category Fortune Structure
export interface MonthlyCategoryFortune {
  category: CategoryKey;
  categoryNameZh: string;
  rating: StarRating;
  ratingLabel: StarLabel;
  explanation: string;
  keyMatters: string;
  practicalTips: string[];
  pdfReference?: {
    source: string;
    chapter: string;
    page: number;
    quote: string;
    status: 'approved' | 'insufficient_evidence';
  };
}

// Concise Twelve Monthly Fortune Structure
export interface DetailedMonthlyFortune {
  month: number;
  monthName: string;            // e.g. "6月"
  ganZhi: string;               // e.g. "辛未月"
  solarTerm: string;            // e.g. "芒种至小暑"
  overallRating: StarRating;
  overallRatingLabel: StarLabel;
  monthlySummary: string;       // 流月提要
  mostImportantCaution: string; // 最关切之忌宜警戒
  personalizedGuidance: {
    usefulGodApplication: string; // 用神调候运用
    enhancementTip: string;       // 趋吉对策
    cautionTip: string;           // 避凶对策
  };
  categories: Record<CategoryKey, MonthlyCategoryFortune>;
}

