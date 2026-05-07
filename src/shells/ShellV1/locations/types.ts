/*
 * Shared types for the interactive Sub-Accounts preview.
 *
 * The page is a "live Figma" — there is no backend. State that needs to be
 * shared across FilterStrip / BulkActionsRow / Locations is wired from the
 * top-level Locations.vue and passed via props/emits. These types describe
 * the contracts between those components so refactors stay safe.
 */

export type SortKey =
  | 'name'
  | 'createdAt'
  | 'users'
  | 'calls'
  | 'emails'
  | 'contacts'

export type SortDirection = 'asc' | 'desc'

export type ViewMode = 'card' | 'table'

/** Keys map 1:1 to the metric kinds buildReport understands. */
export type ColumnKey =
  | 'users'
  | 'calls'
  | 'emails'
  | 'sms'
  | 'contacts'
  | 'appointments'
  | 'reviews'

export type VisibleColumns = Record<ColumnKey, boolean>

export interface AdvancedFilters {
  status: 'all' | 'active' | 'suspended' | 'deleted'
  plan: 'all' | 'starter' | 'pro' | 'saas'
  createdRange: [number, number] | null
  activity: 'all' | 'active' | 'idle'
}

export const DEFAULT_VISIBLE_COLUMNS: VisibleColumns = {
  users: true,
  calls: true,
  emails: true,
  sms: true,
  contacts: true,
  appointments: true,
  reviews: true,
}

export const DEFAULT_ADVANCED_FILTERS: AdvancedFilters = {
  status: 'all',
  plan: 'all',
  createdRange: null,
  activity: 'all',
}
