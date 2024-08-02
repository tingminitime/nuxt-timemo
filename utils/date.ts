export function formatDate(date: string | Date): string {
  if (!date)
    return ''

  const dayjs = useDayjs()

  return dayjs.tz(date).format('YYYY-MM-DD')
}

export function ISODate(date: string | Date): string {
  if (!date)
    return ''

  const dayjs = useDayjs()

  return dayjs.tz(date).toISOString()
}
