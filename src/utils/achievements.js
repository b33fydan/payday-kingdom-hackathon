export const ACHIEVEMENT_DEFINITIONS = [
  {
    id: 'first-blood',
    icon: '⚔️',
    label: 'First Blood',
    description: 'Slay your first bill monster.',
    accentColor: '#ef4444',
    accentDarkColor: '#7f1d1d',
    shareLine: 'First monster down. The realm is awake.',
    check: (metrics) => metrics.totalBillsSlain >= 1,
  },
  {
    id: 'monster-hunter',
    icon: '🏅',
    label: 'Monster Hunter',
    description: 'Slay 10 bill monsters total.',
    accentColor: '#f59e0b',
    accentDarkColor: '#92400e',
    shareLine: 'Ten monsters down. The kingdom keeps collecting trophies.',
    check: (metrics) => metrics.totalBillsSlain >= 10,
  },
  {
    id: 'kingdom-builder',
    icon: '🏰',
    label: 'Kingdom Builder',
    description: 'Reach Village stage or higher.',
    accentColor: '#22c55e',
    accentDarkColor: '#166534',
    shareLine: 'Village stage reached. The island finally feels alive.',
    check: (metrics) => metrics.islandStage >= 3,
  },
  {
    id: 'dragons-hoard',
    icon: '💰',
    label: "Dragon's Hoard",
    description: 'Accumulate $10,000 saved across the kingdom.',
    accentColor: '#fbbf24',
    accentDarkColor: '#78350f',
    shareLine: 'The treasury is overflowing. The hoard keeps growing.',
    check: (metrics) => metrics.lifetimeSaved >= 10000,
  },
  {
    id: 'royal-guard',
    icon: '👑',
    label: 'Royal Guard',
    description: 'Reach hero level 5.',
    accentColor: '#60a5fa',
    accentDarkColor: '#1d4ed8',
    shareLine: 'Level 5 achieved. The realm now marches with a royal guard.',
    check: (metrics) => metrics.level >= 5,
  },
  {
    id: 'legend-of-the-realm',
    icon: '🌟',
    label: 'Legend of the Realm',
    description: 'Reach hero level 12.',
    accentColor: '#a78bfa',
    accentDarkColor: '#5b21b6',
    shareLine: 'Level 12 achieved. The hero is now legend.',
    check: (metrics) => metrics.level >= 12,
  },
  {
    id: 'ironclad',
    icon: '📅',
    label: 'Ironclad',
    description: 'Survive 6 consecutive months.',
    accentColor: '#94a3b8',
    accentDarkColor: '#334155',
    shareLine: 'Six straight months survived. The budget is holding the line.',
    check: (metrics) => metrics.monthsCompleted >= 6,
  },
  {
    id: 'diamond-discipline',
    icon: '💎',
    label: 'Diamond Discipline',
    description: 'Survive 12 consecutive months.',
    accentColor: '#67e8f9',
    accentDarkColor: '#155e75',
    shareLine: 'Twelve months survived. Discipline turned into a gem.',
    check: (metrics) => metrics.monthsCompleted >= 12,
  },
  {
    id: 'perfect-month',
    icon: '🎯',
    label: 'Perfect Month',
    description: 'Finish a month with bills paid and a 50%+ surplus.',
    accentColor: '#34d399',
    accentDarkColor: '#065f46',
    shareLine: 'A perfect month landed. Bills cleared with room to spare.',
    check: (metrics) =>
      metrics.history.some((entry) => entry.totalBills > 0 && entry.surplus >= entry.totalBills * 0.5),
  },
  {
    id: 'overkill',
    icon: '🗡️',
    label: 'Overkill',
    description: 'Slay a $1,000+ bill monster.',
    accentColor: '#fb7185',
    accentDarkColor: '#9f1239',
    shareLine: 'A giant bill monster fell. That was overkill in the best way.',
    check: (metrics) => metrics.history.some((entry) => (entry.largestBillPaid ?? 0) >= 1000),
  },
];

export const ACHIEVEMENT_MAP = Object.fromEntries(
  ACHIEVEMENT_DEFINITIONS.map((achievement) => [achievement.id, achievement]),
);

export function getUnlockedAchievementIds(metrics) {
  return ACHIEVEMENT_DEFINITIONS.filter((achievement) => achievement.check(metrics)).map(
    (achievement) => achievement.id,
  );
}

export function formatAchievementDate(unlockedAt) {
  if (!unlockedAt) {
    return 'Locked';
  }

  return new Intl.DateTimeFormat(undefined, {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  }).format(new Date(unlockedAt));
}
