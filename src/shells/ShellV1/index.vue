<script lang="ts" setup>
import SideBar from './sidebar/SideBar.vue';
import TopBar from './topbar/TopBar.vue';

interface Props {
  active?: string;
}

withDefaults(defineProps<Props>(), { active: '' });
</script>

<template>
  <!--
    NOTE: We DO keep the `sidebar-v2-agency` class because the upstream
    `styles.sidebar.scss` scopes ~500 lines of icon, badge, and topmenu rules
    under it (lines 862–1356, including `.nav-fa-icon` color/size, FA icon
    sprites, location switcher, and topmenu spacing). Without the wrapper,
    icons render as bare bullets.

    The class also sets `overflow: hidden`, which would normally kill
    `position: sticky` on descendants. We work around that two ways:
      1. The sidebar uses `position: fixed` (not sticky), pinning it to the
         viewport directly. No sticky context needed.
      2. The TopBar is also `position: fixed`. Same reasoning.
    So `overflow: hidden` on this wrapper is harmless for our layout.

    Classes intentionally NOT used here:
      - `hl_wrapper`             — upstream forces `h-screen overflow-hidden
                                    pt-12 pl-0 width:calc(100vw - 14rem)`. That's
                                    the legacy "fixed topbar + fixed sidebar +
                                    inner-scroller" model. We use the document
                                    as the scroller, so we opt out by name.
      - `hl_wrapper--inner`      — upstream forces `h-screen overflow-auto` so
                                    the inner div scrolls instead of <body>.
                                    Same opt-out reason.
  -->
  <div class="sidebar-v2-agency shell-v1">
    <SideBar :active="active" />
    <section class="shell-v1__content">
      <TopBar :active="active" />
      <main class="shell-v1__main">
        <slot />
      </main>
    </section>
  </div>
</template>

<style scoped>
  /*
   * Scroll model — single scroll container = the document (<html>/<body>).
   *
   * Layout:
   *   .shell-v1                     ← block, plain document flow
   *     <aside id="sidebar-v2">     ← position: fixed, top:0, left:0, h:100vh
   *     .shell-v1__content          ← margin-left: 14rem (sidebar width),
   *                                    grows with page, scrolls with body
   *       <TopBar>                  ← position: fixed at top of content area
   *       <main>                    ← padding-top to clear the fixed topbar
   *
   * Why fixed instead of sticky:
   *   `position: sticky` requires a clean scroll-ancestor chain, and the PMD
   *   tree we inherit has multiple `overflow: hidden` and `h-screen` rules at
   *   various levels that we'd need to fight one-by-one. `position: fixed`
   *   is unambiguous — the chrome is anchored to the viewport regardless of
   *   ancestor overflow. The trade-off is we have to reserve space for the
   *   chrome via padding-top + margin-left on the content column. That's
   *   identical to how the production shell does it.
   *
   * The sidebar width 14rem and topbar height ~52px match upstream.
   */
  .shell-v1 {
    min-height: 100vh;
    /* No flex — keeps the layout as plain blocks so document body is the
       only scroll context. The sidebar is positioned via `fixed`, the
       content column is offset via margin-left to clear it. */
    position: relative;
  }

  /* Sidebar slot — the actual <aside id="sidebar-v2"> is the first child. */
  .shell-v1 > :deep(aside#sidebar-v2) {
    position: fixed;
    top: 0;
    left: 0;
    height: 100vh;
    /* Width comes from the sidebar's own `w-56` (14rem) Tailwind class.
       Force it here too as a safety net so the offset on content matches. */
    width: 14rem;
    /* Above the topbar so sidebar dropdowns aren't clipped. */
    z-index: 30;
  }

  /*
   * Content column. Offset by sidebar width on the left and topbar height
   * on top (handled inside .shell-v1__main via padding). The content itself
   * scrolls as part of the document — no inner overflow.
   */
  .shell-v1__content {
    margin-left: 14rem;
    min-height: 100vh;
    background: var(--gray-50);
  }

  /*
   * Reserve room for the fixed topbar (52px = .container-fluid height in
   * TopBar.vue). If the SaaS notification banner is showing inside the
   * topbar, it adds height; that's accepted as a minor visual overlap on
   * preview-only pages, since prod uses identical padding accounting.
   */
  .shell-v1__main {
    padding-top: 52px;
  }
</style>
