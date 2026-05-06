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

  constructor(data: Partial<User> = {}) {
    Object.assign(this, data);
  }
}
