export function formatPriceKR(value: string | number) {
  const num = typeof value === 'string' ? Number(String(value).replace(/[^\d]/g, '')) : value;
  if (Number.isNaN(num)) return String(value);
  return new Intl.NumberFormat('ko-KR').format(num);
}

export function formatMinutes(min?: number | string) {
  if (min === undefined || min === null || min === '') return '';
  if (typeof min === 'number') return `${min}분`;
  return min;
}
