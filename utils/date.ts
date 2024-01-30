export function formatDate(date: string | Date): string {
  if (typeof date === 'string')
    date = new Date(date)

  return date.toLocaleDateString('zh-TW', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).replace(/\//g, '-')
}

export function ISODate(date: string | Date): string {
  if (typeof date === 'string')
    date = new Date(date)

  return date.toISOString()
}
