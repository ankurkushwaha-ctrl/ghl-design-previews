/*
 * Date-range shortcuts for the filter-strip date picker.
 *
 * Mirrors the shape of `getDateRangeShortcuts()` in
 * ghl-revex-frontend/apps/locations/src/helpers/index.ts (a `Record<label, [start,end]>`),
 * but the labels here go through vue-i18n so the picker chrome reads
 * "Today / Yesterday / Last 7 Days / ..." in the active locale. Values are
 * `[number, number]` of millisecond timestamps — the format UIDatepicker's
 * `shortcuts` slot consumes for daterange pickers.
 */
import moment from 'moment'

type Range = [number, number]

export function buildDateShortcuts(t: (key: string) => string): Record<string, Range> {
  const startOfToday = () => moment().startOf('day').valueOf()
  const endOfToday = () => moment().endOf('day').valueOf()

  const startOfYesterday = () => moment().subtract(1, 'day').startOf('day').valueOf()
  const endOfYesterday = () => moment().subtract(1, 'day').endOf('day').valueOf()

  return {
    [t('today')]: [startOfToday(), endOfToday()],
    [t('yesterday')]: [startOfYesterday(), endOfYesterday()],
    [t('last7Days')]: [
      moment().subtract(6, 'day').startOf('day').valueOf(),
      endOfToday(),
    ],
    [t('last30Days')]: [
      moment().subtract(29, 'day').startOf('day').valueOf(),
      endOfToday(),
    ],
    [t('thisMonth')]: [
      moment().startOf('month').valueOf(),
      endOfToday(),
    ],
    [t('lastMonth')]: [
      moment().subtract(1, 'month').startOf('month').valueOf(),
      moment().subtract(1, 'month').endOf('month').valueOf(),
    ],
  }
}
