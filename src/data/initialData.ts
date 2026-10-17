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
    bookTitle: '《图解八字》（子平八字资料.pdf）',
    chapter: '卷一·第三章：旺衰派日主强弱评定',
    sourcePage: 68,
    ruleCategory: '旺衰篇',
    ruleTitle: '八分辅助精算权重总纲',
    content: '月令当权，得令为先。月支占总分之四成（40%），日支得气占二成（20%），天干年时各占其余。八分法以四分为中和基准，同党（印星、比劫）低于四分者判定为身弱，当以印星相生、比劫相助为核心用神。',
    approvalStatus: 'approved',
    approvedBy: '赵天佑师傅',
    updatedAt: '2026-10-17'
  },
  {
    id: 'kb_tujie_02',
    bookTitle: '《图解八字》（子平八字资料.pdf）',
    chapter: '卷一·第二章：天干地支相生相克与刑冲会合',
    sourcePage: 48,
    ruleCategory: '旺衰篇',
    ruleTitle: '天干五合与地支三合局气机转化法则',
    content: '天干五合有化与不化之分，必观月令气势与地支化神。地支三合申子辰水局、亥卯未木局、寅午戌火局、巳酉丑金局，汇聚长生、帝旺、墓库三元之气，合化成局则五行气势专一，克耗转化神速。',
    approvalStatus: 'approved',
    approvedBy: '赵天佑师傅',
    updatedAt: '2026-10-17'
  },
  {
    id: 'kb_tujie_03',
    bookTitle: '《图解八字》（子平八字资料.pdf）',
    chapter: '卷一·第三章：节气深浅与月令分日用事',
    sourcePage: 54,
    ruleCategory: '旺衰篇',
    ruleTitle: '月令提纲主事与得气深浅分界',
    content: '月令乃八字之提纲，如人君之执政。申月立秋之后，前七日戊土余气当权，次七日壬水长生引动，后十六日庚金正气专令。查知日主生于节气后第几日，方能精准厘定八分强弱与纳音气机。',
    approvalStatus: 'approved',
    approvedBy: '赵天佑师傅',
    updatedAt: '2026-10-17'
  },
  {
    id: 'kb_tujie_04',
    bookTitle: '《图解八字》（子平八字资料.pdf）',
    chapter: '卷二·第五章：六十甲子纳音五行与夫妻六亲纳音互化',
    sourcePage: 96,
    ruleCategory: '十神篇',
    ruleTitle: '六十甲子纳音五行与年日互配机要',
    content: '干禄为天，支命为地，纳音为人。庚午辛未路旁土、壬申癸酉剑锋金、甲戌乙亥山头火。纳音五行互为表里，天干克而纳音生者，表凶而实吉；日柱纳音与配偶年命相生者，夫妻情深谊长，家道昌盛。',
    approvalStatus: 'approved',
    approvedBy: '赵天佑师傅',
    updatedAt: '2026-10-17'
  },
  {
    id: 'kb_tujie_05',
    bookTitle: '《图解八字》（子平八字资料.pdf）',
    chapter: '卷二·第六章：吉神凶煞吉凶断验',
    sourcePage: 108,
    ruleCategory: '十神篇',
    ruleTitle: '天乙贵人与文昌贵人化煞显贵法则',
    content: '天乙贵人乃后天至尊之吉神，丙丁猪鸡位，壬癸兔蛇藏。凡四柱带天乙者，遇危难自有贵人解救。文昌贵人主文思泉涌、考试升学与高端学术专长；逢冲刑破害则减力，逢官印生扶则名显四海。',
    approvalStatus: 'approved',
    approvedBy: '赵天佑师傅',
    updatedAt: '2026-10-17'
  },
  {
    id: 'kb_tujie_06',
    bookTitle: '《图解八字》（子平八字资料.pdf）',
    chapter: '卷二·第七章：十神心性与六亲配置',
    sourcePage: 126,
    ruleCategory: '十神篇',
    ruleTitle: '十神正变与性格潜能全息映射',
    content: '正官端庄正直守纪律，七杀机警刚毅善决断；正印仁慈博爱得庇护，偏印孤僻敏锐通玄学；食神温文儒雅重享受，伤官才华横溢善生财；正财勤俭守成得正禄，偏财豪爽慷慨善投机。四柱配合得宜，则性情纯正。',
    approvalStatus: 'approved',
    approvedBy: '赵天佑师傅',
    updatedAt: '2026-10-17'
  },
  {
    id: 'kb_tujie_07',
    bookTitle: '《图解八字》（子平八字资料.pdf）',
    chapter: '卷三·第八章：论富贵吉凶与格局神髓',
    sourcePage: 146,
    ruleCategory: '格局篇',
    ruleTitle: '伤官生财格与财气通门户致富机要',
    content: '伤官本为泄身克官之神，然若四柱通财星，伤官转而化生财源，财复滋生官禄，形成「伤官生财格」。凡乙木生秋身弱，若得壬癸水印星透出护卫生身，火泄秀以生财，金生水以生木，先名后利，终成巨富商贾。',
    approvalStatus: 'approved',
    approvedBy: '赵天佑师傅',
    updatedAt: '2026-10-17'
  },
  {
    id: 'kb_tujie_08',
    bookTitle: '《图解八字》（子平八字资料.pdf）',
    chapter: '卷三·第八章：论富贵吉凶与格局神髓',
    sourcePage: 158,
    ruleCategory: '格局篇',
    ruleTitle: '官印相生与杀印相生权柄考辨',
    content: '官旺印弱者，宜行印运以发身；官轻印重者，宜行官运以显职。申月乙木，庚辛金并透克身，全赖壬水正印润泽化煞生身，见午巳火食伤制金者为上等格局。以印化杀者文武兼备，于大机构或专业合规领域能独当一面。',
    approvalStatus: 'approved',
    approvedBy: '赵天佑师傅',
    updatedAt: '2026-10-17'
  },
  {
    id: 'kb_tujie_09',
    bookTitle: '《图解八字》（子平八字资料.pdf）',
    chapter: '卷三·第九章：论婚恋家庭与配偶宫位',
    sourcePage: 182,
    ruleCategory: '格局篇',
    ruleTitle: '日支配偶宫坐食神之夫妻相处机要',
    content: '日支为配偶之宫位。日坐食神且为喜用者，得贤淑才智超群之配偶；若身弱而日支食伤太旺者，易因要求严苛多疑而生波澜。调和之道唯在以正印生扶日元，夫妻彼此坦诚相待、同心协力。',
    approvalStatus: 'approved',
    approvedBy: '赵天佑师傅',
    updatedAt: '2026-10-17'
  },
  {
    id: 'kb_tujie_10',
    bookTitle: '《图解八字》（子平八字资料.pdf）',
    chapter: '卷三·第十章：论事业用神与行业五行适性',
    sourcePage: 198,
    ruleCategory: '用神篇',
    ruleTitle: '五行用神喜忌与现代行业方位指引',
    content: '命局以水木为用神者，宜投身文教、出版、绿色环保、水务物流、咨询咨询及跨国商贸；方位以北方（坎水）与东方（震木）最为得利。忌金土者，慎投重资产矿业、固定地产投机及高杠杆金融。',
    approvalStatus: 'approved',
    approvedBy: '赵天佑师傅',
    updatedAt: '2026-10-17'
  },
  {
    id: 'kb_tujie_11',
    bookTitle: '《图解八字》（子平八字资料.pdf）',
    chapter: '卷三·第十一章：论五行健康与脏腑调摄',
    sourcePage: 212,
    ruleCategory: '调候篇',
    ruleTitle: '木逢金克肝胆调摄与玄水滋润培根法则',
    content: '木主肝胆经络，金主肺肠骨骼。秋木凋零逢金克制，肝胆易现虚耗疲劳；若火炎耗木，阴血亦虚。急宜玄水（壬癸水）滋润养木培根。日常宜静坐敛神、作息规律以柔养肝木。此项专作中国传统五行文化养生参考。',
    approvalStatus: 'approved',
    approvedBy: '赵天佑师傅',
    updatedAt: '2026-10-17'
  },
  {
    id: 'kb_tujie_12',
    bookTitle: '《图解八字》（子平八字资料.pdf）',
    chapter: '卷三·第十二章：论十年大运换甲与用神行度',
    sourcePage: 236,
    ruleCategory: '大运流年篇',
    ruleTitle: '十年大运干支分管与换甲交接守则',
    content: '十年大运，前五年天干当政管事，后五年地支统摄气数。逢交运脱运（换甲之期），气机变迁动荡，不可盲目大额举债或草率变道。身弱逢生行水木大运者，如旱苗得雨，财禄守成丰厚。',
    approvalStatus: 'approved',
    approvedBy: '赵天佑师傅',
    updatedAt: '2026-10-17'
  },
  {
    id: 'kb_tujie_13',
    bookTitle: '《图解八字》（子平八字资料.pdf）',
    chapter: '卷三·第十二章：论十二流月吉凶与五星定级法',
    sourcePage: 252,
    ruleCategory: '大运流年篇',
    ruleTitle: '十二流月五星吉凶评定总规（宗师核准准则）',
    content: '流月评级须综合岁君、流月月令与原局生克：五星（大吉）为用神得令且吉星扶持；四星（吉）为干支顺生无伤；三星（平）为吉凶互济稳扎稳打；二星（欠吉）为耗克较重需守慎；一星（忌）为冲克用神需防破耗。',
    approvalStatus: 'approved',
    approvedBy: '赵天佑师傅',
    updatedAt: '2026-10-17'
  },
  {
    id: 'kb_tujie_14',
    bookTitle: '《图解八字》（子平八字资料.pdf）',
    chapter: '卷三·第十二章：岁运并临与天克地冲趋避法',
    sourcePage: 268,
    ruleCategory: '大运流年篇',
    ruleTitle: '岁运并临与逢冲克关口修德趋避法则',
    content: '经云：「岁运并临，吉凶由用神定夺」。若岁运并临为用神水木，反主添丁进禄、事业登峰；若为忌神，则需居安思危、谨言慎行，多行善举布施，以德化煞，方保家泰人安。',
    approvalStatus: 'approved',
    approvedBy: '赵天佑师傅',
    updatedAt: '2026-10-17'
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
    conflictNotes: '与《图解八字》（子平八字资料.pdf）正统旺衰法则冲突！陈美玲命盘月干壬水正印通根透干有气，绝不可断为从格。赵天佑宗师标注：驳回并警示。',
    updatedAt: '2026-10-17'
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
    updatedAt: '2026-10-17'
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
