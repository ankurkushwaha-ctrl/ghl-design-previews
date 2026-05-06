/*
 * Models stub — replaces `spm-ts/src/models/index.ts` for vendored shell
 * components.
 *
 * Upstream's models are thin classes that mostly just type-and-shape data
 * coming back from APIs. The only reason we need them at all is that the
 * vendored components do `new Location(loc)` on store data. We keep the
 * constructor signature identical so the vendored line stays byte-verbatim.
 *
 *     // upstream:
 *     import { Location, User } from '@/models'
 *     // here:
 *     import { Location, User } from '../_stubs/models'
 */

// Permissions object — both Location and User carry one. Keys are
// feature flags (`contacts_enabled`, `opportunities_enabled`, etc.)
// mapped to booleans. Upstream types this loosely as `any`; we keep it
// loose here too because the actual key set is product-wide and not
// stable enough to enumerate.
type PermissionsMap = Record<string, boolean>;

// Mirrors a subset of spm-ts Location fields. Only the keys that vendored
// shell templates read are listed — extend this as new components are ported
// and reveal additional Location fields they reference.
export class Location {
  id?: string;
  _id?: string;
  name?: string;
  address?: string;
  city?: string;
  state?: string;
  email?: string;
  // Read by QuickActions.vue's `hasSearchPermission` computed. Path is
  // dead for our agency-mode scope (`location.value` is undefined), but
  // vue-tsc still type-checks the access — so the field has to exist.
  permissions?: PermissionsMap;

  constructor(data: Partial<Location> = {}) {
    Object.assign(this, data);
  }
}

// Mirrors a subset of spm-ts User fields. Type is one of 'agency' | 'account'.
export class User {
  id?: string;
  type?: 'agency' | 'account';
  name?: string;
  email?: string;
  pinnedLocations?: string[];
  // Same reason as Location.permissions above — referenced by
  // QuickActions's permission gate, dead in our scope but typed for
  // vue-tsc.
  permissions?: PermissionsMap;

  constructor(data: Partial<User> = {}) {
    Object.assign(this, data);
  }
}
