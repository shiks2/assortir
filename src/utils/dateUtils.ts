import { DateTime } from 'luxon'

export function formatQueryDate(isoString: string): string {
  const dt = DateTime.fromISO(isoString)
  const now = DateTime.now()

  if (dt.hasSame(now, 'day')) {
    return `Today at ${dt.toFormat('h:mm a')}`
  }

  if (dt.hasSame(now.minus({ days: 1 }), 'day')) {
    return `Yesterday at ${dt.toFormat('h:mm a')}`
  }

  if (dt > now.minus({ days: 7 })) {
    return dt.toFormat("cccc 'at' h:mm a")
  }

  return dt.toFormat('d MMM yyyy')
}

export function getResetDate(): string {
  const now = DateTime.now()
  const resetDate = now.plus({ months: 1 }).startOf('month')
  const daysUntil = Math.ceil(resetDate.diff(now, 'days').days)

  if (daysUntil === 1) return 'Resets tomorrow'
  if (daysUntil <= 7) return `Resets in ${daysUntil} days`
  return `Resets on ${resetDate.toFormat('d MMM')}`
}

export function formatWeatherTime(isoString: string): string {
  const dt = DateTime.fromISO(isoString)
  return `Updated ${dt.toRelative()}`
}

export function formatSubscriptionDate(isoString: string): string {
  return DateTime.fromISO(isoString).toFormat('d MMMM yyyy')
}

export function timeAgo(isoString: string): string {
  return DateTime.fromISO(isoString).toRelative() ?? ''
}

export function getCurrentMonthLabel(): string {
  return DateTime.now().toFormat('MMMM yyyy')
}
