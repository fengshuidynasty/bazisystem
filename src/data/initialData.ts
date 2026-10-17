import {
  User,
  ClientProfile,
  KnowledgeEntry,
  ReportProduct,
  ReportDocument,
  PaymentOrder
} from '../types';

export const INITIAL_USERS: User[] = [
  {
    uid: 'user_master_joe',
    email: 'fengshuidynasty@gmail.com',
    displayName: '赵师傅 (趙天佑)',
    role: 'master',
    title: 'Master / Owner',
    avatarUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCzYqy3IHMRTcdoFjVw8DP8uwBdAkJJfh4jTax0OpaQ3eTvlRLHpDNYIkjRZ6vdReUQFML_8nG0uB_SiRwX0qEN74xDLHbffkINit9t0QZqVRjZd-6Wn9QXHgr6VSBGK-WJ-M7YVhPga-NWIkAaV0WPpiYtlOUw3sYOZDYi2e0DgaVgAmavdWqYZ5U-qaejGvfQNJvymFgP-RbVufmjCHY4lKvjl789F-355yNPyOY4TBJG2zGBSjTbGm1MyfyRMcWWnBU'
  },
  {
    uid: 'user_practitioner_lin',
    email: 'practitioner@fengshuidynasty.com',
    displayName: '林法师 (授权命理师)',
    role: 'practitioner',
    title: 'Senior Practitioner',
    avatarUrl: ''
  },
  {
    uid: 'user_client_meiling',
    email: 'meiling@example.com',
    displayName: '陈美玲 (付费客户)',
    role: 'client',
    title: 'VIP Client',
    avatarUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBzxQU6h8w7Ud8VObsX4How_zYQh7QxPl5wtDY1AcAH0sLFZOogx37ArTia0u-HIcL3Scs3VGToa2CGmKjmsGvZ7KvtWuh_FFl6v-_lF7NHvhudyObJm5WoLmFhHHdx1PbqMqbfPBBNuVJWpeQ3J1lvqHY89oHFBPw9iWsS4j9qFQx32SQ_iD-UJf421WU_S356Pb3EmlxRTs6kvG0F8fwQI-ZhxzARcun2QftIMqrz-B3a_j12K8yD4A'
  },
  {
    uid: 'user_client_weijie',
    email: 'weijie@example.com',
    displayName: '黄伟杰 (免费体验用户)',
    role: 'client',
    title: 'Free Experience User',
    avatarUrl: ''
  }
];

export const INITIAL_CLIENTS: ClientProfile[] = [
  {
    id: 'client_chen_meiling',
    name: '陈美玲',
    gender: 'female',
    birthDate: '1990-08-15',
    birthTime: '10:30',
    calendarType: 'solar',
    birthLocation: '马来西亚 · 吉隆坡',
    timezone: 'UTC+8',
    longitude: 101.6869,
    latitude: 3.1390,
    trueSolarTime: '10:24:18',
    solarTermDayInfo: '立秋后第 7 天',
    zodiac: '马',
    constellation: '狮子座',
    lunarDateStr: '庚午年 六月 廿五',
    tags: ['已生成报告', '流年分析', '感情分析'],
    patternName: '正官格 · 伤官生财有情',
    patternDesc: '身弱格（木生秋令，印星透干相生）',
    usefulGods: '水、木',
    unfavorableGods: '金、土',
    hasGeneratedReport: true,
    assignedPractitionerId: 'user_practitioner_lin',
    userId: 'user_client_meiling',
    createdAt: '2025-06-10T08:00:00Z'
  },
  {
    id: 'client_huang_weijie',
    name: '黄伟杰',
    gender: 'male',
    birthDate: '1988-03-24',
    birthTime: '14:15',
    calendarType: 'solar',
    birthLocation: '马来西亚 · 槟城',
    timezone: 'UTC+8',
    longitude: 100.3327,
    latitude: 5.4164,
    trueSolarTime: '14:02:40',
    solarTermDayInfo: '春分后第 3 天',
    zodiac: '龙',
    constellation: '白羊座',
    lunarDateStr: '戊辰年 二月 初七',
    tags: ['免费体验', '事业咨询'],
    patternName: '食神生财格',
    patternDesc: '身旺格（水生春月，通根透劫）',
    usefulGods: '木、火',
    unfavorableGods: '金、水',
    hasGeneratedReport: false,
    assignedPractitionerId: 'user_practitioner_lin',
    userId: 'user_client_weijie',
    createdAt: '2025-07-01T10:00:00Z'
  },
  {
    id: 'client_midnight_test',
    name: '张秀英 (子时分界测试)',
    gender: 'female',
    birthDate: '1995-12-31',
    birthTime: '23:59',
    calendarType: 'solar',
    birthLocation: '马来西亚 · 新山',
    timezone: 'UTC+8',
    longitude: 103.7414,
    latitude: 1.4927,
    trueSolarTime: '23:45:12',
    solarTermDayInfo: '冬至后第 9 天',
    zodiac: '猪',
    constellation: '摩羯座',
    lunarDateStr: '乙亥年 十一月 初十 (晚子时)',
    tags: ['夜子时边界', '子正换日校对'],
    patternName: '七杀偏印格',
    patternDesc: '身弱格（晚子时日柱保持当前日）',
    usefulGods: '金、水',
    unfavorableGods: '火、土',
    hasGeneratedReport: false,
    assignedPractitionerId: 'user_practitioner_lin',
    userId: 'user_client_meiling',
    createdAt: '2025-08-15T14:30:00Z'
  }
];

export const INITIAL_KNOWLEDGE_ENTRIES: KnowledgeEntry[] = [
  {
    id: 'kb_tujie_01',
    bookTitle: '《图解八字》',
    chapter: '第三章：旺衰派日主强弱评定',
    sourcePage: 68,
    ruleCategory: '旺衰篇',
    ruleTitle: '八分辅助精算权重总纲',
    content: '月令当权，得令为先。月支占总分之四成，日支得气次之，天干各得其位。八分法以四分为中和基准，同党（印比）低于四分者为身弱，当以印星相生、比劫相助为用神。',
    approvalStatus: 'approved',
    approvedBy: '赵天佑师傅',
    updatedAt: '2025-05-12'
  },
  {
    id: 'kb_tujie_02',
    bookTitle: '《图解八字》',
    chapter: '第五章：十神配置与取格',
    sourcePage: 112,
    ruleCategory: '格局篇',
    ruleTitle: '正官格见伤官生财化解法则',
    content: '正官怕见伤官，然若柱中财星通门户，伤官转而生财，财复生官，则伤官不但不伤官，反成生财之源，主其人聪颖多才，经商致富且有名位。',
    approvalStatus: 'approved',
    approvedBy: '赵天佑师傅',
    updatedAt: '2025-05-15'
  },
  {
    id: 'kb_ziping_01',
    bookTitle: '《子平真诠》',
    chapter: '论用神配气候得失',
    sourcePage: 45,
    ruleCategory: '调候篇',
    ruleTitle: '木生秋令调候水木生发',
    content: '秋木凋零，金旺木绝。若见壬癸透干，绝处逢生，转衰为健。金生水，水生木，秋水通源，官印双清。',
    approvalStatus: 'approved',
    approvedBy: '赵天佑师傅',
    updatedAt: '2025-05-20'
  },
  {
    id: 'kb_pdf_source_01',
    bookTitle: '《子平八字资料.pdf》',
    chapter: '卷四·十神正变与财禄真诠',
    sourcePage: 78,
    ruleCategory: '用神篇',
    ruleTitle: '财官旺衰与伤官生财格权衡法则',
    content: '凡乙木生秋，金旺木凋，若得壬癸透出，反败为功。见巳午火泄秀生财，名曰「伤官生财格」，身弱得印生者，先名后利，终成富室。',
    approvalStatus: 'approved',
    approvedBy: '赵天佑师傅',
    updatedAt: '2025-06-01'
  },
  {
    id: 'kb_pdf_source_02',
    bookTitle: '《子平八字资料.pdf》',
    chapter: '卷三·官杀格取用与权柄考辨',
    sourcePage: 114,
    ruleCategory: '格局篇',
    ruleTitle: '官旺印弱行运生发与事业晋升',
    content: '官旺印弱者，宜行印运以发身；官轻印重者，宜行官运以显职。申月乙木，庚辛并透，全赖壬水润泽化煞，见火制者为上格。',
    approvalStatus: 'approved',
    approvedBy: '赵天佑师傅',
    updatedAt: '2025-06-01'
  },
  {
    id: 'kb_pdf_source_03',
    bookTitle: '《子平八字资料.pdf》',
    chapter: '卷五·配偶宫位与六亲合化章',
    sourcePage: 142,
    ruleCategory: '格局篇',
    ruleTitle: '日支食神配偶才智与相处之道',
    content: '日支坐食神者，得贤淑聪明之配偶；但须身健方能享福，身弱而食神太重者，反生多疑与挑剔。调和之道，唯重印绶生扶夫妻同心。',
    approvalStatus: 'approved',
    approvedBy: '赵天佑师傅',
    updatedAt: '2025-06-05'
  },
  {
    id: 'kb_pdf_source_04',
    bookTitle: '《子平八字资料.pdf》',
    chapter: '卷六·五行偏枯与脏腑调摄通考',
    sourcePage: 189,
    ruleCategory: '调候篇',
    ruleTitle: '木逢金克肝胆调摄与水润培根',
    content: '木逢金克，肝胆先伤；火多木焚，阴血内耗。秋木凋零，急需玄水滋润培根。调神理气，当以静坐养神、养肝柔木为首务。健康建议仅作文化养生参考。',
    approvalStatus: 'approved',
    approvedBy: '赵天佑师傅',
    updatedAt: '2025-06-05'
  },
  {
    id: 'kb_pdf_source_05',
    bookTitle: '《子平八字资料.pdf》',
    chapter: '卷七·十年大运换甲与用神行度',
    sourcePage: 215,
    ruleCategory: '大运流年篇',
    ruleTitle: '大运水木逢生与资产守成法',
    content: '身弱逢生，如枯苗得雨，财星自然归我。大运行至水木之乡，乙木乘旺，财禄丰盈。然戒骄盈，见比劫者当广布善缘。',
    approvalStatus: 'approved',
    approvedBy: '赵天佑师傅',
    updatedAt: '2025-06-10'
  },
  {
    id: 'kb_pdf_source_06',
    bookTitle: '《子平八字资料.pdf》',
    chapter: '卷四·十二流月财禄行度断与五星定级法',
    sourcePage: 138,
    ruleCategory: '大运流年篇',
    ruleTitle: '十二流月五星吉凶评定总规（宗师核准准则）',
    content: '月令评级当以岁君与月令生克为据：五星（大吉）为用神得令且吉星高照；四星（吉）为干支相生得力；三星（平）为吉凶互见；二星（欠吉）为克耗交加；一星（忌）为冲克用神。凡未有确凿典籍对应之极端断语，须标注待宗师审核。',
    approvalStatus: 'approved',
    approvedBy: '赵天佑师傅',
    updatedAt: '2025-06-15'
  },
  {
    id: 'kb_conflict_sample',
    bookTitle: '《民间秘传断诀》',
    chapter: '卷二：从格与假从断法',
    sourcePage: 89,
    ruleCategory: '旺衰篇',
    ruleTitle: '争议条目：日主无根必从财杀',
    content: '凡日主天干不得地，四柱财官旺盛者，一律论从格，不须看印星透干。',
    approvalStatus: 'conflict',
    conflictNotes: '与《图解八字》及《子平真诠》正统旺衰法则冲突！陈美玲命盘印星透干有气，绝不可断为从格。宗师标注：驳回并警示。',
    updatedAt: '2025-08-01'
  },
  {
    id: 'kb_pending_sample',
    bookTitle: '《滴天髓阐微》',
    chapter: '通神论：大运吉凶变迁',
    sourcePage: 140,
    ruleCategory: '大运流年篇',
    ruleTitle: '待审核条目：大运地支重于天干之辨',
    content: '行运五年干、五年支之说不可泥执。当以天干管事五年，地支贯通十年统论，尤重地支引申化合之机。',
    approvalStatus: 'pending',
    updatedAt: '2025-09-02'
  }
];

export const REPORT_PRODUCTS: ReportProduct[] = [
  {
    type: 'basic_preview',
    titleZh: '基础排盘与五行体验',
    titleEn: 'Free BaZi Basic Preview',
    priceMYR: 0,
    summary: '四柱八字基础干支、基础五行分布及命主基本属性预览',
    features: [
      '基础四柱八字排盘',
      '基础五行比例查看',
      '出生时辰校验',
      '解锁前20%运势简析'
    ]
  },
  {
    type: 'pro_comprehensive',
    titleZh: '深度命理精批全析报告',
    titleEn: 'Comprehensive BaZi Analysis Report',
    priceMYR: 168,
    summary: '八分辅助精算、格局用神、大运流年与性格财禄全维度深度研判',
    recommended: true,
    features: [
      'V3.5 八分法力量辅助精算',
      '十神分布与强弱雷达图',
      '十年大运 8 阶段吉凶细批',
      '2025-2026 流年流月五维走势',
      '宗师级 AI + 师承知识库独家解读',
      '可生成并打印高保真 PDF 典藏报告'
    ]
  },
  {
    type: 'career_wealth',
    titleZh: '事业财运大运流年专项报告',
    titleEn: 'Career & Wealth Fortune Report',
    priceMYR: 288,
    summary: '聚焦正偏财运势爆发期、投资防坑指南、贵人方向与行业选择',
    features: [
      '包含综合精批所有核心内容',
      '一生正偏财丰歉周期精确推演',
      '十神伤官生财有利行业指引',
      '大运交接换甲防范煞气秘要',
      '赵天佑师傅亲批指导意见附录'
    ]
  },
  {
    type: 'master_executive',
    titleZh: '宗师亲批全盘终身命格宝典',
    titleEn: 'Master Executive Life Blueprint',
    priceMYR: 588,
    summary: '赵天佑师傅本人深度逐字复审、终身格局风水开运布局方案',
    features: [
      '包含全部专项报告内容',
      '赵天佑师傅本人 1 对 1 批注与签名盖印',
      '流年流月 12 个月逐月锦囊',
      '专属风水玄空布局吉位指南',
      '终生永久在线保存与高清向量 PDF 导存'
    ]
  }
];

export const INITIAL_REPORTS: ReportDocument[] = [
  {
    id: 'report_chen_meiling_01',
    clientId: 'client_chen_meiling',
    clientName: '陈美玲',
    reportType: 'career_wealth',
    title: '陈美玲 · 事业财运与十年大运深度研判报告',
    priceMYR: 288,
    paymentStatus: 'paid',
    orderId: 'order_myr_882910',
    approvalStatus: 'approved',
    publishedAt: '2025-06-12T10:00:00Z',
    createdAt: '2025-06-11T14:20:00Z',
    approvedBy: '赵天佑师傅',
    aiDraftContent: {
      summary: '命主乙木生于申月，正官当令，日坐午火食神，时透辛金偏官（七杀）。八分法同党评分为 1.25 分，属于典型身弱格。喜水木生身化煞，忌金土耗泄克伐。月干壬水正印透出，紧贴生身，此乃「逢凶化吉、绝处逢生」之吉兆，格局定为正官格配伤官生财有情。',
      patternAnalysis: '月令申金藏庚壬戊，壬水正印高透生身，时支巳火伤官生财，财星复生官印。虽身弱克泄交加，但正印有力，印主智慧、学识与长辈贵人庇荫。行至水木生旺之大运流年，事业必可大展宏图。',
      personalityStrengths: '乙木性柔而韧，为人聪慧细腻，善于观察协调。伤官生财赋于极高的商业敏感度与审美情趣，适合文创、管理、咨询及高附加值专业服务。',
      careerAndWealth: '正财透于年支月令，衣食丰足。26-36岁行乙亥大运，亥中壬水正印、甲木劫财生旺，为人生关键起步黄金十年。2025乙巳年伤官生财，求财顺遂；2026丙午年名利双收。',
      romanceAndMarriage: '官杀并透，异性缘颇旺。日支坐食神午火，配偶性格开朗有才华，但自身偶有挑剔，宜多沟通包容。',
      luckCycleGuide: '当前正处26-36岁【乙亥】正印大运，水木相生，贵人频现，宜乘势扩张事业版图。逢夏秋金旺之月（农历七八月）注意适度休整，切忌过劳。',
      remedyAndFengShui: '幸运五行为水与木。宜居东方或北方，办公室摆设绿植与流水摆件，佩戴黑曜石或绿幽灵手串，以助旺个人气场与生财吉气。'
    },
    masterAnnotations: '【赵师傅终审批注】：此命格格局端正，虽身弱但得壬水天透地藏庇佑，断无大碍。今年芒种至小暑期间金水交泰，正是置业与拓展业务的上上吉机，宜果断出手！'
  },
  {
    id: 'report_huang_weijie_pending',
    clientId: 'client_huang_weijie',
    clientName: '黄伟杰',
    reportType: 'pro_comprehensive',
    title: '黄伟杰 · 深度命理精批报告 (待宗师审批)',
    priceMYR: 168,
    paymentStatus: 'paid',
    orderId: 'order_myr_991823',
    approvalStatus: 'pending_approval',
    createdAt: '2025-07-02T16:00:00Z',
    aiDraftContent: {
      summary: '命主壬水生于卯月，伤官当令，日坐寅木食神，食伤重重泄秀。八分精算同党 4.60 分，身旺得气，取火财为用，土官为喜。',
      patternAnalysis: '食神生财格，极富创造力与策划才华，利于科技互联网、自媒体或海外贸易。',
      personalityStrengths: '为人豁达大度，思维敏捷，富有开拓精神。',
      careerAndWealth: '行财运流年发迹极快，宜合伙经营。',
      romanceAndMarriage: '妻宫坐寅木食神，感情深厚。',
      luckCycleGuide: '近三年火运生发，宜把握投资良机。',
      remedyAndFengShui: '喜火木，适宜南方与东方发展。'
    }
  }
];

export const INITIAL_ORDERS: PaymentOrder[] = [
  {
    id: 'order_myr_882910',
    userId: 'user_client_meiling',
    clientId: 'client_chen_meiling',
    clientName: '陈美玲',
    reportType: 'career_wealth',
    amountMYR: 288,
    currency: 'MYR',
    paymentMethod: 'fpx',
    status: 'success',
    transactionRef: 'FPX-20250611-MY-998124',
    bankName: 'Maybank2u',
    createdAt: '2025-06-11T14:15:00Z',
    completedAt: '2025-06-11T14:18:22Z'
  },
  {
    id: 'order_myr_991823',
    userId: 'user_client_weijie',
    clientId: 'client_huang_weijie',
    clientName: '黄伟杰',
    reportType: 'pro_comprehensive',
    amountMYR: 168,
    currency: 'MYR',
    paymentMethod: 'duitnow',
    status: 'success',
    transactionRef: 'DN-20250702-KL-110293',
    createdAt: '2025-07-02T15:55:00Z',
    completedAt: '2025-07-02T15:58:10Z'
  },
  {
    id: 'order_failed_sample',
    userId: 'user_client_weijie',
    clientId: 'client_huang_weijie',
    clientName: '黄伟杰',
    reportType: 'master_executive',
    amountMYR: 588,
    currency: 'MYR',
    paymentMethod: 'card',
    status: 'failed',
    transactionRef: 'CARD-ERR-INSUFFICIENT-FUNDS',
    createdAt: '2025-07-01T11:20:00Z'
  },
  {
    id: 'order_refunded_sample',
    userId: 'user_client_meiling',
    clientId: 'client_chen_meiling',
    clientName: '陈美玲',
    reportType: 'pro_comprehensive',
    amountMYR: 168,
    currency: 'MYR',
    paymentMethod: 'tng',
    status: 'refunded',
    transactionRef: 'TNG-REFUND-20250520-001',
    createdAt: '2025-05-18T09:10:00Z',
    completedAt: '2025-05-20T10:00:00Z'
  }
];
