/*
 * mock-data.ts
 * ────────────────────────────────────────────────────────────────────────────
 * Mock data for the Bulk Action History preview page.
 * Matches the shape returned by SaasService.getBulkActionHistory() and
 * SaasService.getBulkActionStats() in upstream ghl-revex-frontend.
 */

export interface BulkActionUser {
  id: string
  name: string
  firstName: string
  lastName: string
}

export interface BulkActionRecord {
  _id: string
  actionType: string
  actionLabel: string
  status: 'completed' | 'started' | 'failed'
  statusLabel: string
  totalCount: number
  completedCount: number
  failedCount: number
  createdAt: string
  completedAt: string | null
  user: BulkActionUser
}

export interface BulkActionDetail {
  locationId: string
  locationName: string
  error: string | null
}

const USERS: BulkActionUser[] = [
  { id: 'u1', name: 'Ankur Kushwaha', firstName: 'Ankur', lastName: 'Kushwaha' },
  { id: 'u2', name: 'Aryan Sharma', firstName: 'Aryan', lastName: 'Sharma' },
  { id: 'u3', name: 'Priya Patel', firstName: 'Priya', lastName: 'Patel' },
]

const SUB_ACCOUNTS = [
  { id: 'loc_bh001', name: 'Blue Horizon Marketing' },
  { id: 'loc_sd002', name: 'Sunrise Dental Group' },
  { id: 'loc_pw003', name: 'Pacific Wave Media' },
  { id: 'loc_pl004', name: 'Pinnacle Legal Services' },
  { id: 'loc_es005', name: 'Ember Studio Co.' },
]

export const MOCK_HISTORY: BulkActionRecord[] = [
  {
    _id: 'ba_001',
    actionType: 'ENABLE_SAAS_V2',
    actionLabel: 'Enable SaaS',
    status: 'completed',
    statusLabel: 'Completed',
    totalCount: 5,
    completedCount: 5,
    failedCount: 0,
    createdAt: '2026-05-07T09:30:00Z',
    completedAt: '2026-05-07T09:32:14Z',
    user: USERS[0],
  },
  {
    _id: 'ba_002',
    actionType: 'ENABLE_REBILLING',
    actionLabel: 'Enable Rebilling',
    status: 'completed',
    statusLabel: 'Completed',
    totalCount: 3,
    completedCount: 3,
    failedCount: 0,
    createdAt: '2026-05-06T14:15:00Z',
    completedAt: '2026-05-06T14:16:45Z',
    user: USERS[1],
  },
  {
    _id: 'ba_003',
    actionType: 'PAUSE_LOCATION',
    actionLabel: 'Pause Sub-Account',
    status: 'completed',
    statusLabel: 'Completed',
    totalCount: 2,
    completedCount: 1,
    failedCount: 1,
    createdAt: '2026-05-05T11:00:00Z',
    completedAt: '2026-05-05T11:01:30Z',
    user: USERS[2],
  },
  {
    _id: 'ba_004',
    actionType: 'CALENDAR_MODULES',
    actionLabel: 'Calendar Modules',
    status: 'completed',
    statusLabel: 'Completed',
    totalCount: 5,
    completedCount: 5,
    failedCount: 0,
    createdAt: '2026-05-03T16:45:00Z',
    completedAt: '2026-05-03T16:47:22Z',
    user: USERS[0],
  },
  {
    _id: 'ba_005',
    actionType: 'ENABLE_SAAS_V1',
    actionLabel: 'Enable SaaS',
    status: 'failed',
    statusLabel: 'Failed',
    totalCount: 4,
    completedCount: 1,
    failedCount: 3,
    createdAt: '2026-04-28T08:20:00Z',
    completedAt: '2026-04-28T08:22:10Z',
    user: USERS[1],
  },
  {
    _id: 'ba_006',
    actionType: 'ENABLE_REBILLING',
    actionLabel: 'Enable Rebilling',
    status: 'started',
    statusLabel: 'Started',
    totalCount: 5,
    completedCount: 2,
    failedCount: 0,
    createdAt: '2026-04-25T10:10:00Z',
    completedAt: null,
    user: USERS[0],
  },
  {
    _id: 'ba_007',
    actionType: 'PAUSE_LOCATION',
    actionLabel: 'Pause Sub-Account',
    status: 'completed',
    statusLabel: 'Completed',
    totalCount: 1,
    completedCount: 1,
    failedCount: 0,
    createdAt: '2026-04-20T13:30:00Z',
    completedAt: '2026-04-20T13:31:05Z',
    user: USERS[2],
  },
]

export function getMockDetails(record: BulkActionRecord): BulkActionDetail[] {
  const details: BulkActionDetail[] = []
  for (let i = 0; i < record.totalCount; i++) {
    const acct = SUB_ACCOUNTS[i % SUB_ACCOUNTS.length]
    const isFailed = i >= record.completedCount
    details.push({
      locationId: acct.id,
      locationName: acct.name,
      error: isFailed ? 'Operation failed — retry or contact support' : null,
    })
  }
  return details
}
