/*
 * use-adaptive-header.ts
 * ────────────────────────────────────────────────────────────────────────────
 * A tiny provide/inject channel between the ShellV1 wrapper and the page slot.
 *
 * Pattern (intentional GitHub-repo-header / Linear-issue-header pattern):
 *   - The page header (e.g. <UIHeader title="Sub-accounts">) lives at the
 *     top of the scroll surface and scrolls with the content.
 *   - When the user scrolls past it, a slim "adaptive" version of the same
 *     title + primary CTA fades in INSIDE the TopBar so context never gets
 *     lost.
 *   - When the user scrolls back up, the adaptive version fades out.
 *
 * Why provide/inject (not Pinia / event bus): the channel only ever connects
 * one ShellV1 + one TopBar + one page. Provide/inject keeps the wiring local
 * and makes it impossible for an unrelated component to flip the state.
 *
 * Why optional: pages that don't define adaptive content (anything that
 * isn't a "header + primary action" layout) just don't call `setConfig` —
 * the TopBar then renders its default chrome unmodified.
 *
 * Wire-up (pages):
 *
 *     const adaptive = useAdaptiveHeader()
 *     onMounted(() => {
 *       adaptive?.setConfig({ title: 'Sub-accounts', cta: { label: 'Create', icon, onClick } })
 *       adaptive?.observe(headerEl.value)  // IntersectionObserver target
 *     })
 *     onBeforeUnmount(() => adaptive?.reset())
 */
import { inject, provide, ref, type InjectionKey, type Ref, type Component, type ShallowRef, shallowRef } from 'vue'

export interface AdaptiveCta {
  label: string
  /** Icon component from @gohighlevel/ghl-icons. Optional. */
  icon?: Component
  /** Click handler. The page owns the action — TopBar just relays. */
  onClick: () => void
  /** Maps to UIButton's `type` (default | primary | success | warning | error). */
  type?: 'primary' | 'default'
}

export interface AdaptiveConfig {
  title: string
  cta?: AdaptiveCta
}

export interface AdaptiveHeaderApi {
  /** Reactive: is the page's primary header out of view? */
  active: Ref<boolean>
  /** Reactive: title + cta to show when active. Null = no config registered. */
  config: ShallowRef<AdaptiveConfig | null>
  /** Page calls this once to register what should appear in adaptive mode. */
  setConfig: (config: AdaptiveConfig) => void
  /** Page calls this to point IntersectionObserver at its header element. */
  observe: (el: Element | null | undefined) => void
  /** Page calls this in onBeforeUnmount so the TopBar reverts cleanly on route changes. */
  reset: () => void
}

export const ADAPTIVE_HEADER_KEY: InjectionKey<AdaptiveHeaderApi> = Symbol('AdaptiveHeader')

/**
 * Called by the shell. Creates the reactive channel + an IntersectionObserver
 * lifecycle that flips `active` based on whether the page header is in view.
 */
export function provideAdaptiveHeader(): AdaptiveHeaderApi {
  const active = ref(false)
  // shallowRef: the config holds a function reference (onClick) and an icon
  // component — both are non-reactive primitives we don't want Vue to deep-walk.
  const config = shallowRef<AdaptiveConfig | null>(null)

  let observer: IntersectionObserver | null = null

  function disconnect() {
    if (observer) {
      observer.disconnect()
      observer = null
    }
  }

  function observe(el: Element | null | undefined) {
    disconnect()
    if (!el || typeof IntersectionObserver === 'undefined') return
    observer = new IntersectionObserver(
      ([entry]) => {
        // `isIntersecting === false` means the page header has scrolled past
        // the viewport's top edge, so the TopBar should adopt its title.
        active.value = !entry.isIntersecting
      },
      {
        /*
         * rootMargin: `-52px 0px 0px 0px` shrinks the IO root by the height
         * of the fixed TopBar so the page header is considered "out of view"
         * the moment it slides UNDER the topbar (rather than only when it
         * fully clears the top of the viewport). 52px matches
         * `.shell-v1__main { padding-top: 52px }` + the `.container-fluid`
         * height in TopBar.vue. Keep these two numbers in sync.
         */
        root: null,
        rootMargin: '-52px 0px 0px 0px',
        threshold: 0,
      }
    )
    observer.observe(el)
  }

  function setConfig(c: AdaptiveConfig) {
    config.value = c
  }

  function reset() {
    disconnect()
    config.value = null
    active.value = false
  }

  const api: AdaptiveHeaderApi = { active, config, setConfig, observe, reset }
  provide(ADAPTIVE_HEADER_KEY, api)
  return api
}

/**
 * Called by the page (or the TopBar). Returns null if nobody upstream
 * provided the channel — pages can safely no-op if they don't need it.
 */
export function useAdaptiveHeader(): AdaptiveHeaderApi | null {
  return inject(ADAPTIVE_HEADER_KEY, null)
}
