export const HEAVENLY_STEMS = ['甲', '乙', '丙', '丁', '戊', '己', '庚', '辛', '壬', '癸'] as const;
export type HeavenlyStem = typeof HEAVENLY_STEMS[number];

export const EARTHLY_BRANCHES = ['子', '丑', '寅', '卯', '辰', '巳', '午', '未', '申', '酉', '戌', '亥'] as const;
export type EarthlyBranch = typeof EARTHLY_BRANCHES[number];

export const FIVE_ELEMENTS = ['wood', 'fire', 'earth', 'metal', 'water'] as const;
export type FiveElement = typeof FIVE_ELEMENTS[number];

export const ELEMENT_NAMES_ZH: Record<FiveElement, string> = {
  wood: '木',
  fire: '火',
  earth: '土',
  metal: '金',
  water: '水'
};

export const ELEMENT_COLORS: Record<FiveElement, { text: string; bg: string; border: string }> = {
  wood: { text: '#22c55e', bg: 'rgba(34, 197, 94, 0.15)', border: 'rgba(34, 197, 94, 0.3)' },
  fire: { text: '#ef4444', bg: 'rgba(239, 68, 68, 0.15)', border: 'rgba(239, 68, 68, 0.3)' },
  earth: { text: '#eab308', bg: 'rgba(234, 179, 8, 0.15)', border: 'rgba(234, 179, 8, 0.3)' },
  metal: { text: '#cbd5e1', bg: 'rgba(203, 213, 225, 0.15)', border: 'rgba(203, 213, 225, 0.3)' },
  water: { text: '#38bdf8', bg: 'rgba(56, 189, 248, 0.15)', border: 'rgba(56, 189, 248, 0.3)' }
};

export const STEM_INFO: Record<HeavenlyStem, { element: FiveElement; yinYang: 'yang' | 'yin' }> = {
  甲: { element: 'wood', yinYang: 'yang' },
  乙: { element: 'wood', yinYang: 'yin' },
  丙: { element: 'fire', yinYang: 'yang' },
  丁: { element: 'fire', yinYang: 'yin' },
  戊: { element: 'earth', yinYang: 'yang' },
  己: { element: 'earth', yinYang: 'yin' },
  庚: { element: 'metal', yinYang: 'yang' },
  辛: { element: 'metal', yinYang: 'yin' },
  壬: { element: 'water', yinYang: 'yang' },
  癸: { element: 'water', yinYang: 'yin' }
};

export const BRANCH_INFO: Record<EarthlyBranch, {
  element: FiveElement;
  yinYang: 'yang' | 'yin';
  zodiac: string;
  hiddenStems: HeavenlyStem[];
  hiddenStemWeights: number[]; // relative weights totaling 1.0
}> = {
  子: { element: 'water', yinYang: 'yang', zodiac: '鼠', hiddenStems: ['癸'], hiddenStemWeights: [1.0] },
  丑: { element: 'earth', yinYang: 'yin', zodiac: '牛', hiddenStems: ['己', '癸', '辛'], hiddenStemWeights: [0.6, 0.3, 0.1] },
  寅: { element: 'wood', yinYang: 'yang', zodiac: '虎', hiddenStems: ['甲', '丙', '戊'], hiddenStemWeights: [0.6, 0.3, 0.1] },
  卯: { element: 'wood', yinYang: 'yin', zodiac: '兔', hiddenStems: ['乙'], hiddenStemWeights: [1.0] },
  辰: { element: 'earth', yinYang: 'yang', zodiac: '龙', hiddenStems: ['戊', '乙', '癸'], hiddenStemWeights: [0.6, 0.3, 0.1] },
  巳: { element: 'fire', yinYang: 'yin', zodiac: '蛇', hiddenStems: ['丙', '戊', '庚'], hiddenStemWeights: [0.6, 0.2, 0.2] },
  午: { element: 'fire', yinYang: 'yang', zodiac: '马', hiddenStems: ['丁', '己'], hiddenStemWeights: [0.7, 0.3] },
  未: { element: 'earth', yinYang: 'yin', zodiac: '羊', hiddenStems: ['己', '丁', '乙'], hiddenStemWeights: [0.6, 0.3, 0.1] },
  申: { element: 'metal', yinYang: 'yang', zodiac: '猴', hiddenStems: ['庚', '壬', '戊'], hiddenStemWeights: [0.6, 0.3, 0.1] },
  酉: { element: 'metal', yinYang: 'yin', zodiac: '鸡', hiddenStems: ['辛'], hiddenStemWeights: [1.0] },
  戌: { element: 'earth', yinYang: 'yang', zodiac: '狗', hiddenStems: ['戊', '辛', '丁'], hiddenStemWeights: [0.6, 0.2, 0.2] },
  亥: { element: 'water', yinYang: 'yin', zodiac: '猪', hiddenStems: ['壬', '甲'], hiddenStemWeights: [0.7, 0.3] }
};

export const TEN_GODS = ['比肩', '劫财', '食神', '伤官', '偏财', '正财', '七杀', '正官', '偏印', '正印'] as const;
export type TenGod = typeof TEN_GODS[number];

/**
 * Derives the Ten God for a target stem relative to the Day Master stem.
 */
export function getTenGod(dayMaster: HeavenlyStem, target: HeavenlyStem): TenGod {
  const dm = STEM_INFO[dayMaster];
  const tgt = STEM_INFO[target];
  const samePolarity = dm.yinYang === tgt.yinYang;

  // Same element (比劫)
  if (dm.element === tgt.element) {
    return samePolarity ? '比肩' : '劫财';
  }

  // Day Master generates target (食伤)
  const generates: Record<FiveElement, FiveElement> = {
    wood: 'fire',
    fire: 'earth',
    earth: 'metal',
    metal: 'water',
    water: 'wood'
  };
  if (generates[dm.element] === tgt.element) {
    return samePolarity ? '食神' : '伤官';
  }

  // Day Master controls target (财星)
  const controls: Record<FiveElement, FiveElement> = {
    wood: 'earth',
    fire: 'metal',
    earth: 'water',
    metal: 'wood',
    water: 'fire'
  };
  if (controls[dm.element] === tgt.element) {
    return samePolarity ? '偏财' : '正财';
  }

  // Target controls Day Master (官杀)
  if (controls[tgt.element] === dm.element) {
    return samePolarity ? '七杀' : '正官';
  }

  // Target generates Day Master (印星)
  if (generates[tgt.element] === dm.element) {
    return samePolarity ? '偏印' : '正印';
  }

  return '比肩';
}

// 60 JiaZi cycle array
export const SIXTY_JIAZI: string[] = [
  '甲子', '乙丑', '丙寅', '丁卯', '戊辰', '己巳', '庚午', '辛未', '壬申', '癸酉',
  '甲戌', '乙亥', '丙子', '丁丑', '戊寅', '己卯', '庚辰', '辛巳', '壬午', '癸未',
  '甲申', '乙酉', '丙戌', '丁亥', '戊子', '己丑', '庚寅', '辛卯', '壬辰', '癸巳',
  '甲午', '乙未', '丙申', '丁酉', '戊戌', '己亥', '庚子', '辛丑', '壬寅', '癸卯',
  '甲辰', '乙巳', '丙午', '丁未', '戊申', '己酉', '庚戌', '辛亥', '壬子', '癸丑',
  '甲寅', '乙卯', '丙辰', '丁巳', '戊午', '己未', '庚申', '辛酉', '壬戌', '癸亥'
];

// 12 Monthly Jie (节) solar terms that establish Month Branches
export const JIE_SOLAR_TERMS = [
  { name: '小寒', branch: '丑', monthIndex: 1, approxDay: 5 },
  { name: '立春', branch: '寅', monthIndex: 2, approxDay: 4 },
  { name: '惊蛰', branch: '卯', monthIndex: 3, approxDay: 5 },
  { name: '清明', branch: '辰', monthIndex: 4, approxDay: 5 },
  { name: '立夏', branch: '巳', monthIndex: 5, approxDay: 5 },
  { name: '芒种', branch: '午', monthIndex: 6, approxDay: 6 },
  { name: '小暑', branch: '未', monthIndex: 7, approxDay: 7 },
  { name: '立秋', branch: '申', monthIndex: 8, approxDay: 7 },
  { name: '白露', branch: '酉', monthIndex: 9, approxDay: 8 },
  { name: '寒露', branch: '戌', monthIndex: 10, approxDay: 8 },
  { name: '立冬', branch: '亥', monthIndex: 11, approxDay: 7 },
  { name: '大雪', branch: '子', monthIndex: 12, approxDay: 7 }
] as const;
