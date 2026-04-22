/** Format YYYY-MM-DD to e.g. "9 July 1956" (en-GB style). */
export function formatLongDate(isoDate: string): string {
  const d = new Date(`${isoDate}T12:00:00`);
  if (Number.isNaN(d.getTime())) {
    return isoDate;
  }
  return new Intl.DateTimeFormat('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(d);
}

/** Whole years between two calendar dates. */
export function ageBetween(birthIso: string, asOfIso: string): number {
  const birth = new Date(`${birthIso}T12:00:00`);
  const asOf = new Date(`${asOfIso}T12:00:00`);
  if (Number.isNaN(birth.getTime()) || Number.isNaN(asOf.getTime())) {
    return 0;
  }
  let age = asOf.getFullYear() - birth.getFullYear();
  const m = asOf.getMonth() - birth.getMonth();
  if (m < 0 || (m === 0 && asOf.getDate() < birth.getDate())) {
    age--;
  }
  return Math.max(0, age);
}

export function todayIsoDate(): string {
  const d = new Date();
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${y}-${m}-${day}`;
}
