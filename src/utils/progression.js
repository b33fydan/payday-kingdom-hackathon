export const LEVEL_THRESHOLDS = [1000, 3000, 6000, 10000, 20000, 50000];

export const HERO_TIERS = [
  {
    key: 'legend',
    label: 'Legend',
    minLevel: 12,
    armorColor: '#7dd3fc',
    swordColor: '#38bdf8',
    hasShield: true,
    capeColor: '#93c5fd',
    wings: true,
  },
  {
    key: 'champion',
    label: 'Champion',
    minLevel: 8,
    armorColor: '#fbbf24',
    swordColor: '#fb7185',
    hasShield: true,
    capeColor: '#f97316',
    wings: false,
  },
  {
    key: 'knight',
    label: 'Knight',
    minLevel: 5,
    armorColor: '#d1d5db',
    swordColor: '#e5e7eb',
    hasShield: true,
    capeColor: null,
    wings: false,
  },
  {
    key: 'soldier',
    label: 'Soldier',
    minLevel: 3,
    armorColor: '#b45309',
    swordColor: '#d1d5db',
    hasShield: false,
    capeColor: null,
    wings: false,
  },
  {
    key: 'recruit',
    label: 'Recruit',
    minLevel: 2,
    armorColor: '#78716c',
    swordColor: '#f59e0b',
    hasShield: false,
    capeColor: null,
    wings: false,
  },
  {
    key: 'peasant',
    label: 'Peasant',
    minLevel: 1,
    armorColor: '#92400e',
    swordColor: '#9ca3af',
    hasShield: false,
    capeColor: null,
    wings: false,
  },
];

export const ISLAND_STAGES = [
  { stage: 6, minMonths: 12, label: 'Kingdom' },
  { stage: 5, minMonths: 8, label: 'Castle' },
  { stage: 4, minMonths: 5, label: 'Town' },
  { stage: 3, minMonths: 3, label: 'Village' },
  { stage: 2, minMonths: 2, label: 'Settlement' },
  { stage: 1, minMonths: 1, label: 'Sprout' },
  { stage: 0, minMonths: 0, label: 'Barren' },
];

export function getLevelForXp(xp) {
  let level = 1;

  LEVEL_THRESHOLDS.forEach((threshold) => {
    if (xp >= threshold) {
      level += 1;
    }
  });

  return level;
}

export function getHeroTierForLevel(level) {
  return HERO_TIERS.find((tier) => level >= tier.minLevel) ?? HERO_TIERS[HERO_TIERS.length - 1];
}

export function getHeroTierByKey(key) {
  return HERO_TIERS.find((tier) => tier.key === key) ?? HERO_TIERS[HERO_TIERS.length - 1];
}

export function getNextLevelThreshold(xp) {
  return LEVEL_THRESHOLDS.find((threshold) => xp < threshold) ?? null;
}

export function getXpProgress(xp) {
  const nextThreshold = getNextLevelThreshold(xp);

  if (!nextThreshold) {
    return {
      current: xp,
      previousThreshold: LEVEL_THRESHOLDS[LEVEL_THRESHOLDS.length - 1],
      nextThreshold: null,
      ratio: 1,
    };
  }

  const previousThreshold =
    [...LEVEL_THRESHOLDS].reverse().find((threshold) => threshold <= xp) ?? 0;
  const span = nextThreshold - previousThreshold || 1;

  return {
    current: xp,
    previousThreshold,
    nextThreshold,
    ratio: (xp - previousThreshold) / span,
  };
}

export function getIslandStageForMonths(monthsCompleted) {
  return ISLAND_STAGES.find((stage) => monthsCompleted >= stage.minMonths) ?? ISLAND_STAGES[ISLAND_STAGES.length - 1];
}
