export function formatCurrency(amount) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(amount || 0);
}

export function formatCompactCurrency(amount) {
  const sign = amount < 0 ? '-' : '';
  const value = Math.abs(amount || 0);

  return `${sign}$${new Intl.NumberFormat('en-US', {
    notation: 'compact',
    maximumFractionDigits: value >= 10000 ? 0 : 1,
  }).format(value)}`;
}
