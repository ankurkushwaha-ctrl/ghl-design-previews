/*
 * report_helper.ts
 * ────────────────────────────────────────────────────────────────────────────
 * Trimmed vendor of:
 *   ghl-revex-frontend/apps/locations/src/helpers/report_helper.ts
 *
 * Why trimmed: upstream supports 13+ metric kinds (sms, email, calls, gmb,
 * facebook, instagram, whatsapp, surveys, funnels, websites, forms, etc.).
 * The production sub-accounts UI only renders seven columns by default —
 * Active Users, Calls, Emails, Text Messages, Number of Contacts,
 * Number of Appointments, Reviews — so this preview exercises only those
 * branches. The branch logic, classes (success-50/error-50), and percentage
 * delta math are byte-identical to upstream; the unused kinds are simply
 * omitted to keep the bundle small and avoid translating tooltip i18n keys
 * we don't have.
 *
 * If a future preview needs another metric kind, port the matching block
 * verbatim from upstream — they all follow the same getStatComparison shape.
 *
 * Import surgery applied (upstream → here):
 *   @/helpers (secondsToHms, reportNumbers) → inlined below.
 *   @gohighlevel/ghl-ui (renderIcon)        → kept as-is (real package).
 *   @gohighlevel/ghl-icons/24/outline       → kept as-is (real package).
 *   vue-i18n                                → kept as-is.
 */
import { renderIcon } from '@gohighlevel/ghl-ui'
import {
  ArrowDownIcon,
  ArrowUpIcon,
  CalendarCheck02Icon,
  FaceHappyIcon,
  FaceSadIcon,
  Hourglass03Icon,
  Inbox02Icon,
  Mail02Icon,
  MessageNotificationSquareIcon,
  MessageTextSquare02Icon,
  PhoneIncoming01Icon,
  PhoneOutgoing01Icon,
  Star01Icon,
  User03Icon,
  UserCheck02Icon,
} from '@gohighlevel/ghl-icons/24/outline'
import { useI18n } from 'vue-i18n'

// upstream: import { secondsToHms, reportNumbers } from '@/helpers'
// Inlined to avoid pulling the entire helpers/index.ts (which imports
// LocationService, axios retry config, and other things this preview can't
// resolve). Both functions are pure and copied byte-identical.
function secondsToHms(seconds: number) {
  const d = Number(seconds)
  if (d <= 0) {
    return '0m'
  }
  const h = Math.floor(d / 3600)
  const m = Math.floor((d % 3600) / 60)
  const s = Math.floor((d % 3600) % 60)
  const hDisplay = h > 0 ? h + 'hr ' : ''
  const mDisplay = m + 'm '
  const sDisplay = s + 's '
  return hDisplay + mDisplay + sDisplay
}

function reportNumbers(value: number) {
  if (!value) {
    value = 0
  }
  const locale = 'US'
  return Number(value).toLocaleString(locale, {
    maximumFractionDigits: 0,
    minimumFractionDigits: 0,
  })
}

// ─── getStatComparison ──────────────────────────────────────────────────────
// Verbatim from upstream — drives the green/red ▲▼ delta pill on each metric.
export function getStatComparison(
  stat = 0,
  prevStat: number | undefined = 0,
  inversePositive = false
) {
  if (prevStat === undefined) {
    return undefined
  }

  if (prevStat === stat) {
    return {
      icon: null,
      classes: ['bg-success-50', 'text-success-700'],
      value: 0,
    }
  }

  if (prevStat === 0) {
    if (inversePositive) {
      return {
        icon: renderIcon(ArrowUpIcon),
        classes: ['bg-error-50', 'text-error-700'],
        value: 100,
      }
    }
    return {
      icon: renderIcon(ArrowUpIcon),
      classes: ['bg-success-50', 'text-success-700'],
      value: 100,
    }
  }

  const diff = ((stat - prevStat) / prevStat) * 100
  const icon = diff < 0 ? ArrowDownIcon : ArrowUpIcon
  const classes: string[] = []
  if (inversePositive) {
    if (diff <= 0) {
      classes.push('text-success-700')
      classes.push('bg-success-50')
    } else {
      classes.push('text-error-700')
      classes.push('bg-error-50')
    }
  } else if (diff >= 0 || (inversePositive && diff <= 0)) {
    classes.push('text-success-700')
    classes.push('bg-success-50')
  } else {
    classes.push('text-error-700')
    classes.push('bg-error-50')
  }
  return {
    icon: renderIcon(icon),
    classes,
    value: Math.abs(diff < 99 ? parseFloat(diff.toFixed(2)) : Math.trunc(diff)),
  }
}

// ─── buildReport ────────────────────────────────────────────────────────────
// Trimmed to the seven metric kinds that the production sub-accounts page
// renders. Each branch is byte-identical to upstream; the rest were removed.
export function buildReport(
  fields: any,
  report: any,
  previousReport: any
) {
  const { t } = useI18n()
  const data: any[] = []
  if (!report) {
    return [[], []]
  }

  if (report.hasOwnProperty('users') && fields.includes('users')) {
    data.push({
      label: t('activeUsers'),
      metrics: [
        {
          key: 'users',
          label: t('activeUsers'),
          value: reportNumbers(report.users || 0),
          icon: renderIcon(UserCheck02Icon),
          tooltip: t('activeUsers'),
          comparison: getStatComparison(report.users, previousReport?.users),
        },
      ],
    })
  }

  if (report.hasOwnProperty('calls') && fields.includes('calls')) {
    const totalDuration =
      (report.callDurationIn || 0) + (report.callDurationOut || 0)
    const prevTotalDuration = previousReport
      ? (previousReport.callDurationIn || 0) +
        (previousReport.callDurationOut || 0)
      : 0
    const durationHms = secondsToHms(totalDuration)
    data.push({
      type: 'calls',
      label: t('calls'),
      metrics: [
        {
          label: 'Incoming',
          key: 'calls-in',
          value: reportNumbers(report.callsIn || 0),
          icon: renderIcon(PhoneIncoming01Icon),
          tooltip: t('incomingCalls'),
          comparison: getStatComparison(
            report.callsIn,
            previousReport?.callsIn
          ),
        },
        {
          label: 'Outgoing',
          key: 'calls-out',
          value: reportNumbers(report.callsOut || 0),
          icon: renderIcon(PhoneOutgoing01Icon),
          tooltip: t('outgoingCalls'),
          comparison: getStatComparison(
            report.callsOut,
            previousReport?.callsOut
          ),
        },
        {
          label: 'Duration',
          key: 'calls-duration',
          value: durationHms,
          icon: renderIcon(Hourglass03Icon),
          tooltip: t('totalTalktime'),
          comparison: getStatComparison(totalDuration, prevTotalDuration),
        },
      ],
    })
  }

  if (report.hasOwnProperty('emails') && fields.includes('emails')) {
    data.push({
      label: t('emails'),
      metrics: [
        {
          label: 'Incoming',
          key: 'emails-in',
          value: reportNumbers(report.emailsIn || 0),
          icon: renderIcon(Inbox02Icon),
          tooltip: t('incomingEmails'),
          comparison: getStatComparison(
            report.emailsIn,
            previousReport?.emailsIn
          ),
        },
        {
          label: 'Outgoing',
          key: 'emails-out',
          value: reportNumbers(report.emailsOut || 0),
          icon: renderIcon(Mail02Icon),
          tooltip: t('outgoingEmails'),
          comparison: getStatComparison(
            report.emailsOut,
            previousReport?.emailsOut
          ),
        },
      ],
    })
  }

  if (report.hasOwnProperty('sms') && fields.includes('sms')) {
    data.push({
      label: t('textMessages'),
      metrics: [
        {
          label: 'Incoming',
          key: 'sms-in',
          value: reportNumbers(report.smsIn || 0),
          icon: renderIcon(MessageNotificationSquareIcon),
          tooltip: t('incomingSms'),
          comparison: getStatComparison(report.smsIn, previousReport?.smsIn),
        },
        {
          label: 'Outgoing',
          key: 'sms-out',
          value: reportNumbers(report.smsOut || 0),
          icon: renderIcon(MessageTextSquare02Icon),
          tooltip: t('outgoingSms'),
          comparison: getStatComparison(report.smsOut, previousReport?.smsOut),
        },
      ],
    })
  }

  if (report.hasOwnProperty('contacts') && fields.includes('contacts')) {
    data.push({
      label: t('numberOfContacts'),
      metrics: [
        {
          label: 'No. of Contacts',
          key: 'contacts',
          value: reportNumbers(report.contacts || 0),
          icon: renderIcon(User03Icon),
          tooltip: t('contactsCreated'),
          comparison: getStatComparison(
            report.contacts,
            previousReport?.contacts
          ),
        },
      ],
    })
  }

  if (
    report.hasOwnProperty('appointments') &&
    fields.includes('appointments')
  ) {
    data.push({
      label: t('numberOfAppointments'),
      metrics: [
        {
          label: 'No. of Appointments',
          key: 'appointments',
          value: reportNumbers(report.appointments || 0),
          icon: renderIcon(CalendarCheck02Icon),
          tooltip: t('appointmentsBooked'),
          comparison: getStatComparison(
            report.appointments,
            previousReport?.appointments
          ),
        },
      ],
    })
  }

  if (report.hasOwnProperty('reviews') && fields.includes('reviews')) {
    data.push({
      label: t('reviews'),
      metrics: [
        {
          label: 'Reviews',
          value: reportNumbers(report.reviews || 0),
          key: 'reviews',
          icon: renderIcon(Star01Icon),
          tooltip: t('totalReviews'),
          comparison: getStatComparison(
            report.reviews,
            previousReport?.reviews
          ),
        },
        {
          label: 'Positives',
          key: 'reviews-p',
          value: reportNumbers(report.reviewsPositive || 0),
          icon: renderIcon(FaceHappyIcon),
          tooltip: t('positiveReviews'),
          comparison: getStatComparison(
            report.reviewsPositive,
            previousReport?.reviewsPositive
          ),
        },
        {
          label: 'Negatives',
          key: 'reviews-n',
          value: reportNumbers(report.reviewsNegative || 0),
          icon: renderIcon(FaceSadIcon),
          tooltip: t('negativeReviews'),
          comparison: getStatComparison(
            report.reviewsNegative,
            previousReport?.reviewsNegative
          ),
        },
      ],
    })
  }

  // Production card layout splits the seven metric kinds across two rows of
  // four. Upstream's split is `data.slice(0, 4), data.slice(4)`; preserve.
  return [data.slice(0, 4), data.slice(4)]
}
