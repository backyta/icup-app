const toPercent = (decimal: number, fixed: number = 0): string => {
  return `${(decimal * 100).toFixed(fixed)}%`;
};

export const getPercent = (value: number, total: number): string => {
  if (total <= 0) return '0%';

  const ratio = value / total;
  return toPercent(ratio, 0);
};
