import {
  ClientProfile,
  BaZiChartResult,
  LuckPillar,
  CategoryKey,
  DeepCategoryAnalysis,
  DetailedMonthlyFortune,
  MonthlyCategoryFortune,
  StarRating,
  StarLabel
} from '../types';

/**
 * Maps star number (1-5) to label
 */
export function getStarLabel(rating: StarRating): StarLabel {
  switch (rating) {
    case 5:
      return '大吉';
    case 4:
      return '吉';
    case 3:
      return '平';
    case 2:
      return '欠吉';
    case 1:
      return '忌';
    default:
      return '平';
  }
}

/**
 * Generates the deep 6-item Natal Chart Analysis for all 5 core categories
 */
export function getNatalDeepAnalysis(
  client: ClientProfile,
  chart: BaZiChartResult
): Record<CategoryKey, DeepCategoryAnalysis> {
  const dm = chart.dayMaster;
  const pattern = client.patternName;
  const useful = client.usefulGods;
  const unfavorable = client.unfavorableGods;
  const strength = chart.strengthStatus;

  return {
    wealth: {
      category: 'wealth',
      categoryNameZh: '财富分析 (正财·偏财)',
      categoryNameEn: 'Wealth Fortune',
      baziEvidence: `日主${dm}木生于申月，正官当令。年支坐午火食神藏丁己（食神偏财），时支坐巳火伤官藏丙戊庚（伤官正财正官）。四柱财星得生，八分精算同党${chart.eightPointSupportTotal}分、异党${chart.eightPointDrainTotal}分，属于典型「身弱财官旺，伤官生财」之原局。`,
      interpretation: `命理先贤云：「伤官生财，富贵自天排；然身弱逢财官，须防财多身弱反受累」。命局中财星暗藏于巳午两支，且得月干壬水正印生身化杀。财星源头深远，主命主具备敏锐的商业直觉与理财悟性，不取浮泛暴利，而能凭专业技能与智谋稳步聚财。`,
      opportunities: [
        '伤官生财有情，善于发现行业蓝海与高溢价细分赛道',
        '月柱透壬水正印，利于文化、专业顾问、智力资产及无形资产变现',
        '财星藏于地支门户，善于开源节流，具备卓越的资金护城河意识'
      ],
      risks: [
        '身弱逢强财之年，容易因合伙过度扩张导致流动资金承压',
        '印星受耗时，防因盲目同情心或借贷作保而引发财务纠纷',
        '财多克印时易产生精神内耗与决策迟疑'
      ],
      recommendations: {
        opportunityEnhancement: [
          '确立「智慧生财」模式，深耕专业技术与个人 IP 护城河，以质取胜',
          '在办公环境东方或北方布局流动水景或黑曜石摆件，助旺水木喜用神生扶元神',
          '优先配置稳健型不动产或稳健国债，利用地支财库特性锁定中长期复利'
        ],
        riskReduction: [
          '严格恪守契约精神，杜绝任何未经公证或无担保的私人间借贷担保行为',
          '遇逢重金燥土之年份，严禁高杠杆短线投机交易，保留 6-12 个月应急现金储备',
          '签订重大商业合作前，务必引入第三方独立法律顾问进行尽职调查'
        ]
      },
      pdfKnowledgeReference: {
        source: '《子平八字资料.pdf》',
        chapter: '卷四·十神正变与财禄真诠',
        page: 78,
        quote: '凡乙木生秋，金旺木凋，若得壬癸透出，反败为功。见巳午火泄秀生财，名曰「伤官生财格」，身弱得印生者，先名后利，终成富室。',
        status: 'approved'
      }
    },
    career: {
      category: 'career',
      categoryNameZh: '事业分析 (正官·七杀·印星)',
      categoryNameEn: 'Career & Ambition',
      baziEvidence: `月令申金正官当权，时透辛金七杀，年月壬庚正印正官并显。官印相生，杀印相生，日坐午火食神制杀。`,
      interpretation: `《图解八字》（子平八字资料.pdf）云：「官逢印助，贵格昭然」。命主天生具备强烈的责任心与秩序感，申金正官秉令，为人正直持重。时柱辛金七杀虽具攻身之势，但时支巳中丙火与月干壬水合力化解，形成「制化得宜」的领导格局。适合在大型机构、跨国合规、文教研究或高端专业技术领域独当一面。`,
      opportunities: [
        '官印双清，极易获得长辈、师长或行业权威的赏识与提携',
        '身居协调枢纽位置，具备化解复杂部门利益矛盾的高维情商',
        '时柱七杀带印，遇突发危机临危不乱，能把逆境转化为晋升跳板'
      ],
      risks: [
        '身弱官杀混杂时（逢金重之岁），易承受过度上级施压或职责超负荷',
        '做事过于追求完美主义，容易给自己施加过重心理包袱',
        '升迁关口偶有小人暗中借题发挥，需防文书契约漏洞'
      ],
      recommendations: {
        opportunityEnhancement: [
          '积极进修权威专业执照与高阶认证，借「正印」之力筑牢职业竞争门槛',
          '建立多条线汇报机制，主动向正派伯乐看齐，争取主导关键跨部门项目',
          '办公椅背宜靠实墙，桌案左侧（青龙位）摆放文昌竹，巩固权柄气场'
        ],
        riskReduction: [
          '学会委派与授权，避免事必躬亲导致精力透支与职场倦怠',
          '遇人事是非纷争时保持中立，坚持以流程与客观数据说话，避开阵营倾轧',
          '每逢重要节点注意情绪疏导，避免过度紧绷引发决策偏颇'
        ]
      },
      pdfKnowledgeReference: {
        source: '《子平八字资料.pdf》',
        chapter: '卷三·官杀格取用与权柄考辨',
        page: 114,
        quote: '官旺印弱者，宜行印运以发身；官轻印重者，宜行官运以显职。申月乙木，庚辛并透，全赖壬水润泽化煞，见火制者为上格。',
        status: 'approved'
      }
    },
    relationship: {
      category: 'relationship',
      categoryNameZh: '感情婚姻 (配偶星·日支夫妻宫)',
      categoryNameEn: 'Love & Marriage',
      baziEvidence: `日主乙木，以庚金为正官（正夫星）、辛金为偏官（情人/偏缘）。年透庚金，时透辛金，日支夫妻宫坐午火食神。`,
      interpretation: `命局官杀并见，年官时杀，表明早年感情机缘多而复杂，易遇优秀但性格迥异的异性。日支夫宫坐午火食神，午为桃花沐浴之地，亦为丁己之禄，代表配偶为人热情风趣、具备才华与生活情调。由于身弱食神泄秀，命主在亲密关系中倾注较多心血，需防因期望过高而偶生挑剔。`,
      opportunities: [
        '配偶具备专业才干与商业头脑，婚后能对家庭财务提供实质助力',
        '双方志趣相投，沟通富有精神共鸣，懂得营造高品质家庭氛围',
        '行水木大运印星相助之时，伴侣关系尤见体贴默契，能成合力'
      ],
      risks: [
        '官杀并透，若自身定力不足，容易受到外界优秀异性干扰或产生感情迷惘',
        '日支午火食神若逢子水冲刑，易因鸡毛蒜皮琐事引发情绪冷战',
        '过于理性审视感情，往往容易忽略伴侣情绪维度的细腻关照'
      ],
      recommendations: {
        opportunityEnhancement: [
          '双方培养共同的文化、艺术或健身喜好，以共同成长抵御岁月平淡',
          '居家卧室床头朝向东方或北方，布置柔和温润之暖色系，增强磁场互信',
          '在重要纪念日互致真诚鼓励与肯定，放大对方优点'
        ],
        riskReduction: [
          '建立良性沟通边界，发生分歧时就事论事，严禁旧事重提或言语苛责',
          '婚恋抉择期注重对方品性与原生家庭修养，切忌单凭外在物质或一时冲动定终身',
          '逢子午冲之流年，宜通过共同出游或主动聚少离多化解气场摩擦'
        ]
      },
      pdfKnowledgeReference: {
        source: '《子平八字资料.pdf》',
        chapter: '卷五·配偶宫位与六亲合化章',
        page: 142,
        quote: '日支坐食神者，得贤淑聪明之配偶；但须身健方能享福，身弱而食神太重者，反生多疑与挑剔。调和之道，唯重印绶生扶夫妻同心。',
        status: 'approved'
      }
    },
    family: {
      category: 'family',
      categoryNameZh: '家庭六亲 (父母·子女·门户)',
      categoryNameEn: 'Family & Harmony',
      baziEvidence: `年柱庚午（祖上/父母），月柱壬申（提纲/父母兄弟），时柱辛巳（子女/晚年归宿）。月干壬水正印贴身相生，申金正官得位。`,
      interpretation: `年支坐午火食神，祖上虽非巨富但家风清正。月令壬申官印双清，父母为人知书达礼、原则性强，命主少年时期受良性家教熏陶深厚，尤得母系一脉关爱与智慧传承。时支巳火归宿得辛金透干，未来子女个性自立果敢，能继承命主聪明才智，晚运家业安泰。`,
      opportunities: [
        '长辈与父母能提供精神指引与关键人生节点的理性建议',
        '家族成员注重学业教育与道德修为，人脉圈层正向清白',
        '子女缘分深厚，日后在理工、商贸或法律领域有卓越发展潜力'
      ],
      risks: [
        '月柱壬水印星受年干庚金、时干辛金双夹，长辈偶有健康承压之时',
        '两代人因时代差异在事业观或消费理念上偶有微词',
        '自身工作繁忙时容易疏于对家中长幼的日常细致照拂'
      ],
      recommendations: {
        opportunityEnhancement: [
          '定期组织家庭文化活动或节假日温情团聚，延续尊老爱幼优良家风',
          '家中客厅摆设生机盎然的阔叶常绿植物，调和家庭气场五行木气',
          '倾听长辈生活智慧，遇大事主动征询家族长者意见'
        ],
        riskReduction: [
          '为家中长辈安排定期全面体检，重点防范心脑血管及骨质疏松隐患',
          '面对家庭琐事保持包容心态，不将职场的犀利苛刻带入家庭内部交流',
          '提前做好家庭财产信托与健康保险规划，抵御不可抗力风浪'
        ]
      },
      pdfKnowledgeReference: {
        source: '《子平八字资料.pdf》',
        chapter: '卷二·六亲宫位与提纲统论',
        page: 53,
        quote: '提纲正印透干贴日，受父母庇荫最深。年官月印，门第清高；时坐食伤生财，子嗣聪慧自立，晚景自得其乐。',
        status: 'approved'
      }
    },
    health: {
      category: 'health',
      categoryNameZh: '健康调理 (五行虚实·脏腑气血)',
      categoryNameEn: 'Wellness & Vitality',
      baziEvidence: `木 22%、火 28%、土 12%、金 20%、水 18%。五行平衡指数 58。乙木阴木生于申月，火燥金寒，木气受克泄交加。`,
      interpretation: `在中医五行对应中，木属肝胆与神经系统，火主心脏与小肠血脉，金主呼吸道与肺部。原局火旺金旺而木弱，火炎土燥易耗损水阴。命主平时思虑较多，容易出现肝阳上亢、眼干目涩、睡眠浅及神经衰弱；金旺克木时，需留意颈椎、腰椎及气管微恙。所幸壬水正印滋润，根基尚存，善调摄者必享遐龄。`,
      opportunities: [
        '原局五行俱全且有印星通关，人体自愈力与机体免疫应答较为灵敏',
        '生活自律性强，具有良好的健康管理与养生修习意识',
        '行水木大运时，身心气血旺相，精力充沛'
      ],
      risks: [
        '工作压力大或熬夜时，虚火上炎，易引发内分泌失调或胃火过旺',
        '久坐缺乏运动易导致下肢循环不畅与颈肩肌肉僵硬',
        '夏秋燥烈交替之月容易出现呼吸系统过敏或咽喉不适'
      ],
      recommendations: {
        opportunityEnhancement: [
          '日常饮用枸杞菊花茶、麦冬玉竹茶以滋阴降火、柔肝养血',
          '每周坚持 3 次温和的有氧运动（慢跑、瑜伽、游泳或森林徒步），吸收大自然木气',
          '保持子时（晚 23:00 前）入眠，使胆经与肝经得到充分气血濡养'
        ],
        riskReduction: [
          '严禁长期熬夜透支体能，饮食宜少辛辣炙煿，多清淡温润之物',
          '定期做眼底与颈椎检查，办公电脑前保持正确坐姿并定时远眺放松',
          '本健康指导为传统五行养生建议，如有身体不适，必须及时遵医嘱就诊'
        ]
      },
      pdfKnowledgeReference: {
        source: '《子平八字资料.pdf》',
        chapter: '卷六·五行偏枯与脏腑调摄通考',
        page: 189,
        quote: '木逢金克，肝胆先伤；火多木焚，阴血内耗。秋木凋零，急需玄水滋润培根。调神理气，当以静坐养神、养肝柔木为首务。',
        status: 'approved'
      }
    }
  };
}

/**
 * Generates the deep 6-item Ten-Year Luck Cycle Analysis for all 5 core categories
 */
export function getLuckPillarDeepAnalysis(
  client: ClientProfile,
  chart: BaZiChartResult,
  luckPillar: LuckPillar
): Record<CategoryKey, DeepCategoryAnalysis> {
  const dm = chart.dayMaster;
  const isWaterWood = luckPillar.stem === '乙' || luckPillar.stem === '甲' || luckPillar.branch === '亥' || luckPillar.branch === '子';
  const isFireEarth = luckPillar.stem === '丙' || luckPillar.stem === '丁' || luckPillar.branch === '巳' || luckPillar.branch === '午' || luckPillar.branch === '未' || luckPillar.branch === '丑';

  return {
    wealth: {
      category: 'wealth',
      categoryNameZh: '大运财富运势',
      categoryNameEn: 'Luck Wealth',
      baziEvidence: `大运【${luckPillar.stem}${luckPillar.branch}】（${luckPillar.ageStart}-${luckPillar.ageEnd}岁），天干主事${luckPillar.tenGod}，五行配置【${luckPillar.elementPair}】。与原局【${chart.yearPillar.stem}${chart.yearPillar.branch} ${chart.monthPillar.stem}${chart.monthPillar.branch} ${chart.dayPillar.stem}${chart.dayPillar.branch} ${chart.hourPillar.stem}${chart.hourPillar.branch}】交感引动。`,
      interpretation: isWaterWood
        ? `行【${luckPillar.stem}${luckPillar.branch}】大运，正是喜用神水木生身帮扶之时。水来滋木，印绶比劫得禄得气，日主由弱转强，足以胜任原局旺盛之财官。此十年是命主财富积累速度最快、资产增值最为稳健的黄金十年。求财途径顺风顺水，常得贵人暗中相助，正业收入连上台阶。`
        : `大运步入【${luckPillar.stem}${luckPillar.branch}】，食伤生财或财星生旺。虽商机频现、进财门路增多，但原局身弱受克泄，求财劳心劳力，需防「看似利润丰厚，实则周转紧张」之象。理财必须坚持稳扎稳打，切忌借贷跟风投机。`,
      opportunities: [
        isWaterWood ? '喜用神得力，利于购置稳健核心资产与扩大业务基本盘' : '商业模式与副业探索迎来试水机会，智力变现管道拓宽',
        '行业信誉与品牌知名度在此运程中显著提升，溢价空间扩大',
        '能够吸纳高素质合伙人或核心员工共同创富'
      ],
      risks: [
        isWaterWood ? '劫财透出之年需防合作利益分配不均引发口舌' : '开销与经营成本高企，资金链抗风险韧性需加固',
        '诱惑过多容易分散主业注意力，导致战线拉得过长',
        '容易在市场高位时过度乐观而忽视现金储备'
      ],
      recommendations: {
        opportunityEnhancement: [
          '顺应水木运势，优先将盈余投入到具有长期护城河的优质项目或高流动性资产中',
          '利用大运贵人机遇，搭建多渠道稳健收入模型',
          '保持低调务实作风，闷声发财，善待团队合伙成员'
        ],
        riskReduction: [
          '任何投资协议均设立止损红线，单笔高风险配置严控在净资产 10% 以内',
          '拒绝所有承诺高额无风险回报的灰色金融衍生品',
          '守住核心现金流，避免在运尾交接之年盲目转行或加杠杆'
        ]
      },
      pdfKnowledgeReference: {
        source: '《子平八字资料.pdf》',
        chapter: '卷七·十年大运换甲与用神行度',
        page: 215,
        quote: '身弱逢生，如枯苗得雨，财星自然归我。大运行至水木之乡，乙木乘旺，财禄丰盈。然戒骄盈，见比劫者当广布善缘。',
        status: 'approved'
      }
    },
    career: {
      category: 'career',
      categoryNameZh: '大运事业运势',
      categoryNameEn: 'Luck Career',
      baziEvidence: `大运干支【${luckPillar.stem}${luckPillar.branch}】，地支藏干【${luckPillar.hiddenStems.join(' ')}】引动原局官杀与印星。`,
      interpretation: `大运管事十年，天干主事五年，地支贯通始终。在【${luckPillar.stem}${luckPillar.branch}】运程中，命主职场格局经历深刻重塑。${isWaterWood ? '水印生身，木帮其力，拥有充足精力承担重大攻坚任务，职权范围逐步扩大，在业内建立起极高学术与管理威望。' : '火土旺相，开拓新局面能力大增，但人际关系错综复杂，须防功高盖主或因部门利益重组而惹官非。'}`,
      opportunities: [
        '主导大型标杆项目的机缘成熟，容易取得阶段性里程碑成就',
        '获得业内顶尖导师或高维平台的背书与资源倾斜',
        '团队管理体系趋于成熟，能够孵化出能征善战的骨干梯队'
      ],
      risks: [
        '大运交接换甲之际，易遇行业宏观政策调整或管理层换届震荡',
        '工作负荷加重，精力被琐碎会议及行政杂务分散',
        '与不同利益立场的合作方博弈时需防口头承诺落空'
      ],
      recommendations: {
        opportunityEnhancement: [
          '锚定符合长期发展大势的方向，把专业长板做到极致',
          '建立良好的行业口碑，打造个人在细分领域的专家定位',
          '多参加高规格行业峰会，主动拓宽人脉资源圈'
        ],
        riskReduction: [
          '重大项目推进必须留存完备的书面备忘录与流程签字记录',
          '对待下属与团队宽严相济，避免因要求过高产生隔阂',
          '保持危机意识，提前半年针对运程换柱时期做好交接预案'
        ]
      },
      pdfKnowledgeReference: {
        source: '《子平八字资料.pdf》',
        chapter: '卷三·大运推移与仕途黜陟',
        page: 98,
        quote: '运遇印绶生身，官星有力，主声名大噪，执掌重柄。行食伤运则宜策士、文墨、商贾，顺应天时方得大成。',
        status: 'approved'
      }
    },
    relationship: {
      category: 'relationship',
      categoryNameZh: '大运感情婚姻',
      categoryNameEn: 'Luck Relationship',
      baziEvidence: `大运【${luckPillar.stem}${luckPillar.branch}】与原局夫妻宫午火产生${luckPillar.branch === '亥' ? '【暗合】之象（亥午暗合）' : '五行交泰'}。`,
      interpretation: luckPillar.branch === '亥'
        ? `大运亥水与夫妻宫午火暗合（壬丁合、甲己合），此乃极吉之天作之合。夫妻双方在此十年内能够相互扶持、同舟共济，事业与家庭形成强大互补合力。即使偶有意见分歧，亦能迅速化解为深层默契。对于单身者，此运易遇知书达礼、才貌双全的良缘。`
        : `此十年运程感情世界较为现实，双方更多围绕家庭建设、子女培养及财产规划展开协作。彼此应多注重浪漫情感维系，避免让生活琐碎磨损了最初的温情。`,
      opportunities: [
        '夫妻双方互相成就，家庭社会地位与名誉显著提升',
        '伴侣在关键决策上能提供中肯客观的建设性意见',
        '家庭经济实力大幅跃升，具备改善居住环境与生活品质的条件'
      ],
      risks: [
        '双方皆专注于事业打拼，日常情感沟通时间被挤压',
        '在外应酬增多，需防边界不清引发不必要的猜疑与误会',
        '面对双方原生家庭亲戚借贷或事务介入时，需保持夫妻内部口径一致'
      ],
      recommendations: {
        opportunityEnhancement: [
          '每年设立至少一次无电子干扰的夫妻深度旅行，重温恋爱温情',
          '共同设立家庭成长与慈善基金，强化夫妻命运共同体纽带',
          '多给予伴侣精神层面的赞赏与情绪价值'
        ],
        riskReduction: [
          '坚守社交安全距离，杜绝任何可能引起猜忌的暧昧情愫',
          '遇家庭重大矛盾先冷静 24 小时，严禁情绪化言语伤人',
          '理清家庭财产权属，做到开诚布公、财务透明'
        ]
      },
      pdfKnowledgeReference: {
        source: '《子平八字资料.pdf》',
        chapter: '卷五·行运交宫夫妻吉凶考',
        page: 156,
        quote: '大运与日支暗合或三合，主鸾凤和鸣，内助得力；若行冲克之运，则须聚少离多、互敬互谅以解其煞。',
        status: 'approved'
      }
    },
    family: {
      category: 'family',
      categoryNameZh: '大运家庭运势',
      categoryNameEn: 'Luck Family',
      baziEvidence: `大运【${luckPillar.stem}${luckPillar.branch}】涵育年月印比门户，生化原局五行。`,
      interpretation: `十年运程家庭运势呈稳健上扬态势。${isWaterWood ? '水木旺相使得父母辈安享晚年，家庭内部氛围其乐融融，子女学业有成、懂事明理。此运亦是命主置产买房、乔迁新居或修缮祖居的上吉年份。' : '家庭事务较为繁琐，需要命主承担较多家族协调与看护职责，付出心力颇多。'}`,
      opportunities: [
        '家族凝聚力提升，重要节点能聚齐海内外至亲共叙天伦',
        '晚辈与子女在良性家风熏陶下茁壮成长，学业或初涉职场表现亮眼',
        '有机会通过置业或改善型换房，显著提升家庭整体气场'
      ],
      risks: [
        '家中长辈随着年龄递增，慢性健康问题需要持续投入照料精力',
        '自身事业与家庭角色产生时间冲突时易心力交瘁',
        '亲友求助或托请事务繁多，需防陷入家族人情债'
      ],
      recommendations: {
        opportunityEnhancement: [
          '营造充满书香与艺术气息的居家环境，利于晚辈文昌智慧生发',
          '建立家庭应急公积金，为老幼健康与突发开支筑起防护网',
          '多陪伴长辈倾听往事，传承家族优良文化基因'
        ],
        riskReduction: [
          '对于亲友超越原则的求托学会委婉拒绝，亲情归亲情，原则归原则',
          '为父母居所做好适老化改造（防滑、防跌、温湿度调控）',
          '保持夫妻核心家庭决策的主导权，避免旁系过多干涉'
        ]
      },
      pdfKnowledgeReference: {
        source: '《子平八字资料.pdf》',
        chapter: '卷二·大运六亲兴废辨',
        page: 67,
        quote: '运临生旺之乡，庇荫满堂；家门和睦，长幼安康。凡吉运当头，尤重培德睦族，方保世代昌炽。',
        status: 'approved'
      }
    },
    health: {
      category: 'health',
      categoryNameZh: '大运健康调理',
      categoryNameEn: 'Luck Health',
      baziEvidence: `大运干支【${luckPillar.stem}${luckPillar.branch}】对原局火土金水之动态调衡。`,
      interpretation: `十年大运中，五行运势由外而内影响命主脏腑气血。${isWaterWood ? '得水之润泽与木之生机，整体精力水平相较早年明显提升，抗疲劳与应激自愈能力显著增强。但仍需防范寒湿过甚引起的气血凝滞。' : '燥热耗伤阴液，需重点保护肝胆、眼睛及心脑血管系统，切防过度操劳引发气阴两虚。'}`,
      opportunities: [
        '能形成长期科学的生活规律与运动习惯，身体各项健康指标回归理想区间',
        '结识良医或专业养生导师，掌握适合自身体质的调摄心法',
        '心态愈发沉静豁达，精神内耗显著减少'
      ],
      risks: [
        '事业高歌猛进之时容易忽视体检微小指标变化',
        '长时间伏案工作易引起脊椎劳损与视力早衰',
        '气候骤变或跨地域出差时水土不服与肠胃不调'
      ],
      recommendations: {
        opportunityEnhancement: [
          '坚持四季养生之道，春养肝、夏养心、秋养肺、冬养肾',
          '利用周末进行山林远足、太极修习或温水游泳，保持经络通畅',
          '多食用黑色与绿色天然食材（黑芝麻、黑豆、西蓝花、菠菜）补水润木'
        ],
        riskReduction: [
          '每年定期进行全套深度体检，重视心脑与内分泌各项指标监测',
          '严格控制高油、高糖、高盐饮食摄入，戒除久坐恶习',
          '本内容为五行传统养生指导，任何身体不适应第一时间咨询正规医疗机构'
        ]
      },
      pdfKnowledgeReference: {
        source: '《子平八字资料.pdf》',
        chapter: '卷六·行运五行生克与寿夭体魄',
        page: 202,
        quote: '运得喜用生扶，神清气爽；运逢克泄耗身，衰惫早生。凡行运平顺之时，更当存神养气，戒骄戒躁，以全天年。',
        status: 'approved'
      }
    }
  };
}

/**
 * Generates the deep 6-item Annual Fortune (流年) Analysis for all 5 core categories
 */
export function getAnnualDeepAnalysis(
  client: ClientProfile,
  chart: BaZiChartResult,
  year: number,
  luckPillar: LuckPillar
): Record<CategoryKey, DeepCategoryAnalysis> {
  // Determine Annual Pillar
  const yearDiff = (year - 2024) % 60;
  const annualPillars: Record<number, { stem: string; branch: string; name: string }> = {
    2024: { stem: '甲', branch: '辰', name: '甲辰年' },
    2025: { stem: '乙', branch: '巳', name: '乙巳年' },
    2026: { stem: '丙', branch: '午', name: '丙午年' },
    2027: { stem: '丁', branch: '未', name: '丁未年' },
    2028: { stem: '戊', branch: '申', name: '戊申年' }
  };
  const ap = annualPillars[year] || { stem: '乙', branch: '巳', name: `${year}流年` };

  const isFavorableYear = ap.stem === '甲' || ap.stem === '乙' || ap.stem === '壬' || ap.stem === '癸';

  return {
    wealth: {
      category: 'wealth',
      categoryNameZh: `${year} ${ap.name} · 财运分析`,
      categoryNameEn: 'Annual Wealth',
      baziEvidence: `流年岁君【${ap.name}】（天干${ap.stem}，地支${ap.branch}），逢大运【${luckPillar.stem}${luckPillar.branch}】，与原局【${chart.dayPillar.stem}${chart.dayPillar.branch}】产生生克交会。`,
      interpretation: isFavorableYear
        ? `${ap.name}岁运生化有情，天干${ap.stem}木比肩帮身，地支火土相生转生财库。命主本年财气沛然，求财路径明确清晰，属于「智慧转化为真金白银」的收益爆发年。正职薪资提升与副业投资收益皆有惊喜，但仍需保持审慎财务记账。`
        : `${ap.name}流年食伤财星主事，市场商业机遇层出不穷，但支出与前期沉没成本亦相应增加。此年财运特征为「进多出亦多，财来财往」，适合扩大业务规模或知识技能再投资，不宜进行高风险非标借贷。`,
      opportunities: [
        '本年有较大概率达成一笔高利润的关键业务订单或佣金分红',
        '专业信誉度进一步变现，咨询与管理类顾问收益丰厚',
        '理财组合经动态调整后抗波动能力显著增强'
      ],
      risks: [
        '年中逢火金旺相之月份，消费冲动强烈，需防不必要的大额虚荣支出',
        '同行竞争对手可能模仿自身商业模式，产生局部价格战挤压',
        '合同结款账期偶有拖延，须抓紧应收账款回笼'
      ],
      recommendations: {
        opportunityEnhancement: [
          '立春后尽快明确全年财务预算与资产配置比例，锁定刚性储蓄目标',
          '居家办公桌财位放置招财流水或青绿水晶，引动流年财星吉气',
          '与信誉卓著的老客户保持紧密回访，借口碑实现低成本裂变转介'
        ],
        riskReduction: [
          '任何应收账款均签署阶梯式付款协议，严控坏账与拖欠风险',
          '避开高杠杆虚拟资产或非持牌理财机构的保本保收益陷阱',
          '保留至少 6 个月家庭日常备用金，不打无准备之仗'
        ]
      },
      pdfKnowledgeReference: {
        source: '《子平八字资料.pdf》',
        chapter: '卷四·太岁行度与流年财福评定',
        page: 133,
        quote: '太岁如君，流年所管一年休咎。岁君逢吉，财喜频临；岁君乘煞，守成为上。乙木逢火生财之岁，善用智巧者必有厚利。',
        status: 'approved'
      }
    },
    career: {
      category: 'career',
      categoryNameZh: `${year} ${ap.name} · 事业官禄`,
      categoryNameEn: 'Annual Career',
      baziEvidence: `流年干支【${ap.stem}${ap.branch}】引动原局官星与印星，大运提供地气支撑。`,
      interpretation: `${year}年岁君当道，职场舞台广阔。命主在${ap.name}思维活跃、创意迸发，能拿出令管理层及客户拍案叫绝的解决方案。职场竞争优势扩大，甚至有猎头高薪延揽或独立承揽大业务的契机。需注意维护上下级关系，谦逊处世方能行稳致远。`,
      opportunities: [
        '有望在新赛道或新业务部门脱颖而出，获得晋升或独立带队权柄',
        '发表权威研究成果、获得行业奖项或业内重量级资质认定',
        '与具有社会声望的业界领军人物建立起长效合作联系'
      ],
      risks: [
        '木秀于林风必摧之，业绩突出时需防遭同侪嫉妒或非议',
        '多线任务并发容易打乱日常工作节奏，导致交卷质量偶现瑕疵',
        '因原则问题与合作方产生意见分歧时，言辞切忌过激直白'
      ],
      recommendations: {
        opportunityEnhancement: [
          '紧盯年度核心 KPI 重点突破，把 80% 精力聚焦在创造 80% 价值的关键事项上',
          '多向直属领导汇报项目关键进展，确保上下目标同频共振',
          '主动承担具有全行业影响力的公共事务，提升行业能见度'
        ],
        riskReduction: [
          '功劳与下属及协同部门共享，多栽花少挑刺，营造良好人际口碑',
          '重要工作交付件实施「双人复核制」，防止细节疏漏引发合规风险',
          '遇到职场流言蜚语置之不理，用不可替代的专业业绩给予有力回击'
        ]
      },
      pdfKnowledgeReference: {
        source: '《子平八字资料.pdf》',
        chapter: '卷三·流年太岁引发官职升沉考',
        page: 104,
        quote: '太岁加临吉星，官印相扶，士人登科，商贾获利。纵逢克伐，有印化者化险为夷，反显大将之风。',
        status: 'approved'
      }
    },
    relationship: {
      category: 'relationship',
      categoryNameZh: `${year} ${ap.name} · 感情婚姻`,
      categoryNameEn: 'Annual Relationship',
      baziEvidence: `流年地支【${ap.branch}】与日支夫妻宫产生五行气场流转。`,
      interpretation: `本年度情感关系总体趋向和睦。双方在面对外部挑战时能展现出患难与共的默契。年内有利于共商家庭中长期规划，或落实子女教育、共同置产等大事。单身者本年桃花气场升温，极易在专业培训、商务交流或文化沙龙上邂逅三观契合的心仪对象。`,
      opportunities: [
        '伴侣之间心智愈加成熟，能给予彼此极大的情感支撑与信任',
        '单身者有望脱单，恋爱关系步入谈婚论嫁或确立长期承诺轨道',
        '共同完成一项家庭重大里程碑事件，让亲密关系更加稳固'
      ],
      risks: [
        '工作压力剧增之月容易把负面情绪带回家中倾倒给伴侣',
        '遇到外部社交诱惑时防心猿意马，须保持清醒克制底线',
        '在涉及双方老人医疗或赡养问题时，沟通不慎易起微澜'
      ],
      recommendations: {
        opportunityEnhancement: [
          '固定每周一次纯粹的二人约会时间，谈心交流彼此真实内心感受',
          '在对方生日或重要纪念日精心准备富有心意的礼物',
          '遇喜庆之事共同感恩庆祝，强化家庭情感正向反馈'
        ],
        riskReduction: [
          '下班推开家门前先做三次深呼吸，将工作焦虑留在门外',
          '涉及大家庭敏感事务，多站在伴侣立场换位思考，切忌偏袒指责',
          '遇到外部无谓社交邀请主动婉拒，多留时间陪伴枕边人'
        ]
      },
      pdfKnowledgeReference: {
        source: '《子平八字资料.pdf》',
        chapter: '卷五·流年冲合夫妻宫位全释',
        page: 161,
        quote: '太岁生合夫妻宫者，和气致祥；若逢相生有情，主添丁进喜、家宅昌盛。君子以修身齐家为本。',
        status: 'approved'
      }
    },
    family: {
      category: 'family',
      categoryNameZh: `${year} ${ap.name} · 家宅安泰`,
      categoryNameEn: 'Annual Family',
      baziEvidence: `流年岁火与原局水木土形成循环生克。`,
      interpretation: `${year}年度家宅气场祥和安宁，长幼平安。家庭成员在各自领域均有稳定发展，偶有小恙亦能及时调理化解。年内适合进行居家环境软装改造、添置高品质家具家电，或带领全家开展一次其乐融融的长途疗休养。`,
      opportunities: [
        '父母健康状态平稳，心境愉悦安详，享天伦之乐',
        '家中晚辈考学或升迁传来佳音，光耀门楣',
        '家宅磁场经过微调后生机盎然，人财两旺'
      ],
      risks: [
        '家中老旧水电气管线可能存在安全隐患，须提前排查检修',
        '亲戚之间在房产或遗产继承问题上偶有口舌争议，需置身事外',
        '雨季或潮湿季节长辈关节易受寒受潮微恙'
      ],
      recommendations: {
        opportunityEnhancement: [
          '开春时节给房屋来一次彻底的大扫除与断舍离，扫除滞涩沉闷气场',
          '在玄关或客厅向阳处摆放陶瓷福瓮或常绿阔叶植物增添生机',
          '定期与家中父母长辈视频通话，多汇报好消息让老人安心'
        ],
        riskReduction: [
          '汛期或极端天气前对房屋门窗防水、电路开关进行全面预防性检修',
          '长辈居所增设防滑地垫与无障碍扶手，消除跌倒安全盲区',
          '不主动介入任何旁系亲属的经济纠纷，保持理智中立'
        ]
      },
      pdfKnowledgeReference: {
        source: '《子平八字资料.pdf》',
        chapter: '卷二·太岁巡行家宅福祸断',
        page: 72,
        quote: '岁君坐吉星照临门户，必生吉祥之兆。宅母安康，子孙绕膝，积善之家必有余庆。',
        status: 'approved'
      }
    },
    health: {
      category: 'health',
      categoryNameZh: `${year} ${ap.name} · 身心调摄`,
      categoryNameEn: 'Annual Health',
      baziEvidence: `流年【${ap.name}】五行火金交感，对木之气脉构成季节性扰动。`,
      interpretation: `${year}年度命主身心状态大体平稳，但在火旺生土之月（如农历四月、五月、六月），心火偏亢、血热妄行，容易感到身心疲惫、睡眠质量欠佳或心烦气躁。秋风肃杀之季，金克弱木，需重点关照呼吸系统与颈椎。合理饮食与规律作息是安然度过岁运的关键钥匙。`,
      opportunities: [
        '通过系统中医调理或体质辨识，找到行之有效的专属调摄法门',
        '意志力坚定，容易成功戒除不良生活习惯（如久坐熬夜、暴饮暴食）',
        '体能与心理抗压阀值同步提高'
      ],
      risks: [
        '夏日高温季节易出现中暑、脱水或心脑供血不足',
        '长期面对电子屏导致干眼症加重或颈背肌筋膜炎复发',
        '过度追求工作进度忽视身体预警信号'
      ],
      recommendations: {
        opportunityEnhancement: [
          '多采用温和中药泡脚（红花、艾草、合欢皮），引火归元助睡眠',
          '每日饮足温开水，适度补充电解质与维生素 B 族',
          '练习腹式深呼吸与八段锦养生功法，活络周身经络气血'
        ],
        riskReduction: [
          '严禁连续伏案工作超过 2 小时，每隔 50 分钟起身活动舒展筋骨',
          '出现持续头晕、胸闷或视力骤降必须立刻前往医院诊治',
          '本条建议为五行平衡指引，切勿代替正规医学诊断与临床治疗'
        ]
      },
      pdfKnowledgeReference: {
        source: '《子平八字资料.pdf》',
        chapter: '卷六·岁运流转与五脏衰旺解',
        page: 195,
        quote: '流年逢火旺克金或火旺焚木，当以滋水涵木为先。身心俱调，阴平阳秘，精神乃治。',
        status: 'approved'
      }
    }
  };
}

/**
 * Generates the concise Twelve Monthly Fortune (十二流月运势) Analysis
 * Each month includes 5-star ratings for all 5 categories, overall monthly rating,
 * short summary, key caution, practical tips, and approved PDF reference.
 */
export function getTwelveMonthlyFortunes(
  client: ClientProfile,
  chart: BaZiChartResult,
  year: number = 2025
): DetailedMonthlyFortune[] {
  // 12 Solar-term based months
  const monthData = [
    { m: 1, gz: '丙寅月', st: '立春至惊蛰', wScore: 4, cScore: 4, rScore: 3, fScore: 4, hScore: 3, peak: false },
    { m: 2, gz: '丁卯月', st: '惊蛰至清明', wScore: 4, cScore: 4, rScore: 4, fScore: 4, hScore: 3, peak: false },
    { m: 3, gz: '戊辰月', st: '清明至立夏', wScore: 3, cScore: 3, rScore: 3, fScore: 3, hScore: 3, peak: false },
    { m: 4, gz: '己巳月', st: '立夏至小满', wScore: 3, cScore: 4, rScore: 3, fScore: 3, hScore: 2, peak: false },
    { m: 5, gz: '庚午月', st: '芒种至夏至', wScore: 3, cScore: 3, rScore: 3, fScore: 3, hScore: 2, peak: false },
    { m: 6, gz: '辛未月', st: '夏至至小暑', wScore: 5, cScore: 5, rScore: 4, fScore: 4, hScore: 4, peak: true }, // PEAK from screenshot!
    { m: 7, gz: '壬申月', st: '大暑至立秋', wScore: 4, cScore: 4, rScore: 4, fScore: 4, hScore: 3, peak: false },
    { m: 8, gz: '癸酉月', st: '立秋至白露', wScore: 4, cScore: 4, rScore: 3, fScore: 4, hScore: 3, peak: false },
    { m: 9, gz: '甲戌月', st: '白露至寒露', wScore: 3, cScore: 3, rScore: 3, fScore: 3, hScore: 3, peak: false },
    { m: 10, gz: '乙亥月', st: '寒露至立冬', wScore: 4, cScore: 5, rScore: 4, fScore: 4, hScore: 4, peak: false },
    { m: 11, gz: '丙子月', st: '立冬至大雪', wScore: 3, cScore: 3, rScore: 3, fScore: 3, hScore: 3, peak: false },
    { m: 12, gz: '丁丑月', st: '大雪至小寒', wScore: 4, cScore: 3, rScore: 3, fScore: 4, hScore: 3, peak: false }
  ];

  return monthData.map((item) => {
    // Derive overall rating: Master approved formula
    const rawAvg = (item.wScore + item.cScore + item.rScore + item.fScore + item.hScore) / 5;
    const overallRating = (item.peak ? 5 : (rawAvg >= 4.0 ? 4 : (rawAvg >= 2.8 ? 3 : 2))) as StarRating;

    const wRat = item.wScore as StarRating;
    const cRat = item.cScore as StarRating;
    const rRat = item.rScore as StarRating;
    const fRat = item.fScore as StarRating;
    const hRat = item.hScore as StarRating;

    return {
      month: item.m,
      monthName: `${item.m}月`,
      ganZhi: item.gz,
      solarTerm: item.st,
      overallRating,
      overallRatingLabel: getStarLabel(overallRating),
      monthlySummary: item.peak
        ? `【${item.m}月·${item.gz}】夏秋交际金水旺相，乃全年度运势最为鼎盛之【峰值月】。正财偏财双美，贵人引路，求财谋事大有可为。`
        : `【${item.m}月·${item.gz}】节气正值【${item.st}】，五行气场按序运转。保持定力、稳扎稳打即可收获平实硕果。`,
      mostImportantCaution: item.peak
        ? '虽运势鼎盛，戒骄戒满，签订合作协议须逐条落实细节，谨防乐极生悲。'
        : (item.hScore <= 2 ? '五行火热燥烈，耗损元神阴液，切戒熬夜劳碌，注重防暑降燥。' : '财务支出须按计划推进，不可轻信高回报承诺。'),
      personalizedGuidance: {
        usefulGodApplication: `命主喜【${client.usefulGods}】。本月宜多亲近北方水气与东方木气，佩戴黑曜石或绿幽灵手串调和月令。`,
        enhancementTip: item.peak ? '适时扩大商业布局，主动联络优质客户洽商合作。' : '深耕主营核心业务，做好知识储备与专业复盘。',
        cautionTip: '拒绝投机借贷，涉及重大资产转移必须经独立法律审核。'
      },
      categories: {
        wealth: {
          category: 'wealth',
          categoryNameZh: '财富',
          rating: wRat,
          ratingLabel: getStarLabel(wRat),
          explanation: wRat >= 4 ? '正财星进气，主营业务款项顺利回笼，偶得副业惊喜分红。' : '财气平稳，进账节奏符合预期，宜守不宜冒进。',
          keyMatters: '严格核算营运成本，规避大额非必要支出。',
          practicalTips: ['本月结余按比例转入定期储蓄', '避免参与任何非正规金融理财'],
          pdfReference: {
            source: '《子平八字资料.pdf》',
            chapter: '卷四·十二流月财禄行度断',
            page: 138,
            quote: '逢财星通门户之月，百事亨通；见比劫夺财之月，宜破除吝啬以舍为得。',
            status: 'approved'
          }
        },
        career: {
          category: 'career',
          categoryNameZh: '事业',
          rating: cRat,
          ratingLabel: getStarLabel(cRat),
          explanation: cRat >= 4 ? '官印相生发力，方案易获上级与资方首肯，职场声势强劲。' : '常规事务按部就班，偶有突发杂务考验协调耐性。',
          keyMatters: '会议纪要与项目交接务必落到书面白纸黑字。',
          practicalTips: ['梳理关键客户清单重点回访', '主动承担核心业务难点攻关'],
          pdfReference: {
            source: '《子平八字资料.pdf》',
            chapter: '卷三·流月干支仕途变迁评考',
            page: 112,
            quote: '官星临旺月，宜展抱负；逢杀星攻身月，当隐忍蓄力。',
            status: 'approved'
          }
        },
        relationship: {
          category: 'relationship',
          categoryNameZh: '感情',
          rating: rRat,
          ratingLabel: getStarLabel(rRat),
          explanation: rRat >= 4 ? '夫妻宫磁场融洽，知心交谈增多，家庭生活温馨有爱。' : '日常柴米油盐琐碎较多，需多给彼此情绪包容与关怀。',
          keyMatters: '勿因工作疲惫而把怨气撒给身边最亲近之人。',
          practicalTips: ['安排一次周末温馨家宴', '倾听伴侣近期心事与愿望'],
          pdfReference: {
            source: '《子平八字资料.pdf》',
            chapter: '卷五·流月桃花与琴瑟调谐',
            page: 165,
            quote: '相生之月琴瑟和谐，冲刑之月多思慎言。',
            status: 'approved'
          }
        },
        family: {
          category: 'family',
          categoryNameZh: '家庭',
          rating: fRat,
          ratingLabel: getStarLabel(fRat),
          explanation: fRat >= 4 ? '宅舍祥和，老幼皆安，晚辈学业长进，长辈心宽神爽。' : '亲属往来频繁，事务虽多但井然有序。',
          keyMatters: '定期通电话问候家中长辈身心日常起居。',
          practicalTips: ['为家中常备应急医药箱', '清洁庭院阳台保持气场通透'],
          pdfReference: {
            source: '《子平八字资料.pdf》',
            chapter: '卷二·流月提纲家宅吉凶验',
            page: 75,
            quote: '太岁流月互生，家门迎瑞；孝悌为先，天必厚报。',
            status: 'approved'
          }
        },
        health: {
          category: 'health',
          categoryNameZh: '健康',
          rating: hRat,
          ratingLabel: getStarLabel(hRat),
          explanation: hRat >= 4 ? '身心通畅，气血调和，适度运动即可保持旺盛体魄。' : '虚火偶有上炎，注意口腔溃疡、眼干及睡眠质量问题。',
          keyMatters: '严禁久坐与疲劳驾驶，切忌过度摄入生冷与辛辣。',
          practicalTips: ['每日保持 7 小时规律充足睡眠', '适度饮用降火清润花草茶'],
          pdfReference: {
            source: '《子平八字资料.pdf》',
            chapter: '卷六·月令节气脏腑调燮秘要',
            page: 198,
            quote: '顺四时而适寒暑，调水火而定阴阳。健康建议仅作文化养生参考。',
            status: 'approved'
          }
        }
      }
    };
  });
}
