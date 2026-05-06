/*
 * EventBus stub — replaces `spm-ts/src/models/event-bus.ts` for vendored
 * shell components.
 *
 * Upstream uses a mitt-style emitter to coordinate cross-component shell
 * events: 'openOverlay', 'closeOverlay', 'closeLocationsDropdown',
 * 'pinnedLocation', 'sub-account-switch', etc. Most of these are wired to
 * Vuex actions, scroll lock side effects, or feature flag checks that don't
 * exist in this preview repo.
 *
 * We keep the API shape identical to upstream so vendored components don't
 * need to be edited beyond the import line. The methods are real but inert:
 * subscribers register, emits fire, but every payload is dropped on the
 * floor since none of the upstream listeners are mounted here.
 *
 *     // upstream (spm-ts):
 *     import { EventBus } from '@/models/event-bus'
 *     // here:
 *     import { EventBus } from '../_stubs/event-bus'
 *
 * If a future preview surface needs real cross-component coordination (e.g.
 * the QuickActions dropdown closing the LocationSwitcher), this becomes a
 * real mitt instance — same API, just no-op replaced with mitt().
 */
type Handler = (payload?: unknown) => void;

const handlers: Record<string, Handler[]> = {};

export const EventBus = {
  $on(event: string, handler: Handler): void {
    handlers[event] ??= [];
    handlers[event].push(handler);
  },

  $off(event: string, handler?: Handler): void {
    if (!handlers[event]) return;
    if (!handler) {
      delete handlers[event];
      return;
    }
    handlers[event] = handlers[event].filter(h => h !== handler);
  },

  $emit(event: string, payload?: unknown): void {
    handlers[event]?.forEach(h => h(payload));
  },
};
