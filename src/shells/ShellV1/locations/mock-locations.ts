/*
 * mock-locations.ts
 * ────────────────────────────────────────────────────────────────────────────
 * Five hand-built mock sub-accounts shaped to match what
 * LocationCard97Plan.vue + Metrics.vue + report_helper.ts read at runtime.
 *
 * The shape is INFERRED from the upstream template (`{{ location.foo }}`)
 * and the buildReport switch in report_helper.ts:
 *   - location.id, name, address, city, state, postalCode, phone, status
 *   - location.report.{ users, calls, callsIn, callsOut, callDurationIn,
 *                       callDurationOut, emails, emailsIn, emailsOut,
 *                       sms, smsIn, smsOut, contacts, appointments,
 *                       reviews, reviewsPositive, reviewsNegative }
 *   - extras.filters.fields — string[] picking which metric kinds render.
 *
 * Names per design brief; addresses, phones, and metric values are
 * plausible synthetic data chosen to exercise all seven metric columns
 * with non-zero, varied numbers (so green/red comparison pills render).
 */

export interface MockLocation {
  id: string
  name: string
  address: string
  city: string
  state: string
  postalCode: string
  phone: string
  logo?: string
  /** Drives the right-hand status pill on the card. 'account' → "Closed (Won)". */
  status: 'account' | 'prospect'
  report: Record<string, number>
  /** When true, the "Show agency sub-accounts" toggle hides this card. */
  isAgencySubAccount: boolean
  /** ISO date string. Used by Sort By → Created Date. */
  createdAt: string
}

// Helper to build a report shape that exercises every metric kind the
// trimmed report_helper supports. Each call produces a slightly different
// ratio so the green/red comparison pills aren't all identical.
function makeReport(seed: number) {
  return {
    users: 4 + seed,
    calls: 1,
    callsIn: 12 + seed * 3,
    callsOut: 8 + seed * 2,
    callDurationIn: 1800 + seed * 120,
    callDurationOut: 1200 + seed * 90,
    emails: 1,
    emailsIn: 240 + seed * 40,
    emailsOut: 180 + seed * 30,
    sms: 1,
    smsIn: 90 + seed * 15,
    smsOut: 70 + seed * 12,
    contacts: 1240 + seed * 100,
    appointments: 36 + seed * 6,
    reviews: 1,
    reviewsPositive: 18 + seed * 2,
    reviewsNegative: 2 + seed,
  }
}

export const MOCK_LOCATIONS: MockLocation[] = [
  {
    id: 'loc-001',
    name: 'Blue Horizon Marketing',
    address: '420 W Huron St',
    city: 'Chicago',
    state: 'IL',
    postalCode: '60654',
    phone: '+13125551047',
    status: 'account',
    report: makeReport(1),
    isAgencySubAccount: true,
    createdAt: '2024-01-12T10:30:00Z',
  },
  {
    id: 'loc-002',
    name: 'Sunrise Dental Group',
    address: '1700 S Lamar Blvd',
    city: 'Austin',
    state: 'TX',
    postalCode: '78704',
    phone: '+15125558821',
    status: 'account',
    report: makeReport(2),
    isAgencySubAccount: false,
    createdAt: '2023-09-04T14:15:00Z',
  },
  {
    id: 'loc-003',
    name: 'Pacific Wave Media',
    address: '1010 University Ave',
    city: 'San Diego',
    state: 'CA',
    postalCode: '92103',
    phone: '+16195551206',
    status: 'account',
    report: makeReport(3),
    isAgencySubAccount: false,
    createdAt: '2024-06-21T09:00:00Z',
  },
  {
    id: 'loc-004',
    name: 'Pinnacle Legal Services',
    address: '125 Summer St',
    city: 'Boston',
    state: 'MA',
    postalCode: '02110',
    phone: '+16175553344',
    status: 'account',
    report: makeReport(4),
    isAgencySubAccount: true,
    createdAt: '2025-02-08T16:45:00Z',
  },
  {
    id: 'loc-005',
    name: 'Ember Studio Co.',
    address: '209 10th Ave S',
    city: 'Nashville',
    state: 'TN',
    postalCode: '37203',
    phone: '+16155551982',
    status: 'account',
    report: makeReport(5),
    isAgencySubAccount: false,
    createdAt: '2024-11-30T08:20:00Z',
  },
]

// `company` is only consulted by upstream LocationCard97Plan via
// `props.company` — not actually read in the template we vendored. Kept
// as a minimal shape so the `:company` binding in Locations.vue can
// resolve without TS errors.
export const MOCK_COMPANY = {
  id: 'preview-company',
  name: 'Preview Agency',
}

// `extras.filters.fields` drives buildReport's switch. The order here
// mirrors the production reference's metric column order.
export const MOCK_EXTRAS = {
  filters: {
    fields: [
      'users',
      'calls',
      'emails',
      'sms',
      'contacts',
      'appointments',
      'reviews',
    ],
  },
}
